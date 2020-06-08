import * as THREE from "three"
import RAF from "../../utils/raf"
import PhysicsEngine from '../PhysicsEngine'
import Scenes from '../../controllers/ScenesManager'
import Characters from '../../controllers/CharactersManager'
import SocketServer from '../../SocketServer'
import SceneSwitcher from '../../controllers/SceneSwitcher'
import BlackTrans from "../BlackTrans"

class Scene0 {
    constructor() {
        this.bind()
        this.touchPos = new THREE.Vector2()
    }
    start({ camera, scene }) {
        this.camera = camera
        this.scene = scene
        this.scene0Mods = new THREE.Group()
        //DisplaysHand
        this.handModel = Characters[0].model.scene
        this.scene0Mods.add(this.handModel)
        Characters[0].actions.forEach((action, i) => {
            if (action._clip.name == "main_balle_idle")
                this.handIdle = action
            if (action._clip.name == "balle_idle_baked")
                this.ballIdle = action
            if (action._clip.name == "main_balle_throw") {
                action.clampWhenFinished = true
                action.loop = THREE.LoopOnce
                this.handThrow = action
            }
            if (action._clip.name == "balle_throw_baked") {
                action.clampWhenFinished = true
                action.loop = THREE.LoopOnce
                this.ballThrow = action
            }
        });
        this.handIdle.play()
        this.ballIdle.play()

        //gets ball in hand
        this.ballPosition = new THREE.Vector3()
        Characters[0].model.scene.traverse((child) => {
            child.frustumCulled = false;
            if (child instanceof THREE.Object3D && child.name == "balle_main") {
                this.handBall = child
            }
        });

        //displays true ball
        this.ballModel = Characters[1].model.scene
        this.rad = this.ballModel.children[0].children[0].geometry.boundingSphere.radius * Characters[1].scale
        this.scene0Mods.add(this.ballModel)


        //displays true ball collider
        this.sphereCol = new THREE.Mesh(new THREE.SphereGeometry(this.rad), new THREE.MeshBasicMaterial({ wireframe: true }))
        // this.scene0Mods.add(this.sphereCol)
        this.sphereBod = PhysicsEngine.addBody({
            name: "Scene0Ball",
            type: "sphere",
            mesh: this.sphereCol,
            active: false
        })

        //displays ground collider
        this.ground = new THREE.Mesh(new THREE.PlaneGeometry(500, 500), new THREE.MeshNormalMaterial())
        this.ground.rotateX(-Math.PI / 2)
        this.ground.position.y = 0.2
        // this.scene0Mods.add(this.ground)
        PhysicsEngine.addBody({
            name: "Scene0Ground",
            type: "ground",
            mesh: this.ground
        })

        this.wall = new THREE.Mesh(new THREE.PlaneGeometry(50, 10, 50, 10), new THREE.MeshBasicMaterial({ wireframe: true }))
        this.wall.rotateY(-Math.PI / 2)
        this.wall.position.x = 12
        this.scene0Mods.add(this.wall)
        PhysicsEngine.addBody({
            name: "Scene0Wall",
            type: "ground",
            mesh: this.wall
        })

        //Displays Dog
        this.dog = Characters[2].model.scene
        this.dogActions = Characters[2].actions
        this.scene0Mods.add(this.dog)
        this.dog.position.y = .2

        //starts dog Idle
        this.dogActions[0].play()
        this.dogActions[1].play()
        this.dogActions[1].enabled = false
        this.dogRunning = false

        this.dogDir = new THREE.Vector3()
        this.dogForward = new THREE.Vector3(0, 0, 1)
        this.runningBack = false
        this.ballLaunched = false
        this.finished = false

        this.scene.add(this.scene0Mods)
        RAF.subscribe("scene0", this.update)
    }

    runDogToggle() {
        let transiSpeed = .5

        if (this.dogRunning) {
            this.dogRunning = false
            this.dogActions[0].enabled = true
            this.dogActions[0].fadeIn(transiSpeed)
            this.dogActions[1].fadeOut(transiSpeed)
        } else {
            this.dogRunning = true
            this.dogActions[1].enabled = true
            this.dogActions[1].fadeIn(transiSpeed)
            this.dogActions[0].fadeOut(transiSpeed)
        }
    }

    throw() {
        if (this.ballLaunched)
            return
        this.ballLaunched = true
        this.handIdle.enabled = false
        this.ballIdle.enabled = false
        this.handThrow.play()
        this.ballThrow.play()
        setTimeout(() => {
            PhysicsEngine.activate(this.sphereBod.name)
            let camF = new THREE.Vector3(0, 0, -1)
            let shootdir = camF
            camF.applyQuaternion(this.camera.quaternion)
            PhysicsEngine.addForce({
                name: this.sphereBod.name,
                dir: shootdir,
                pos: this.sphereCol.position,
                power: 500
            })
            this.handBall.visible = false

            PhysicsEngine.attachTo({
                mesh: this.ballModel,
                parentName: this.sphereBod.name
            })
            setTimeout(() => {
                this.runDogToggle()
                this.dogDir.subVectors(this.ballModel.position, this.dog.position).normalize()

            }, 800)
        }, 800)
    }

    onTStart(e) {
        this.touchPos.x = e.touches[0].clientX
        this.touchPos.y = e.touches[0].clientY
    }
    onTEnd(e) {
        let d = this.touchPos.distanceTo(new THREE.Vector2(e.changedTouches[0].clientX, e.changedTouches[0].clientY))
        if (d >= 200 && this.touchPos.y > e.changedTouches[0].clientY) {
            this.throw()
        }
    }

    ballReached() {
        this.runDogToggle()
        this.dogDir.subVectors(new THREE.Vector3(0, 0, 0), this.dog.position).normalize()
        this.ballModel.visible = false

        setTimeout(() => {
            this.runDogToggle()
            this.runningBack = true
        }, 1000)
    }

    stop() {
        RAF.unsubscribe("scene0")
    }

    dogCameBack() {
        if (this.finished)
            return
        this.finished = true
        this.runDogToggle()
        this.dogRunning = false
        SocketServer.sendToServer("finishedScene", "Scene0")
        SceneSwitcher.hideScene(0)
        BlackTrans.in()
        setTimeout(() => {
            BlackTrans.out()
            this.scene.remove(this.scene0Mods)
            SceneSwitcher.showScene(1)
            PhysicsEngine.stop()
            console.log('it works')
            this.stop()
        }, 2000)
    }

    update() {
        if (this.finished)
            return
        this.handModel.position.copy(this.camera.position)
        this.handModel.quaternion.copy(this.camera.quaternion)

        this.handBall.getWorldPosition(this.ballPosition)
        if (this.sphereBod.active == false) {
            this.sphereCol.position.copy(this.ballPosition)
        }

        if (this.dogRunning) {
            this.dog.position.x += this.dogDir.x / 10
            this.dog.position.z += this.dogDir.z / 10
            let dDogBall = this.dog.position.distanceTo(this.ballModel.position)
            if (dDogBall <= 1)
                this.ballReached()

            this.dog.quaternion.setFromUnitVectors(this.dogForward, new THREE.Vector3(this.dogDir.x, 0, this.dogDir.z));
            if (this.runningBack) {
                let dDog0 = this.dog.position.distanceTo(this.scene.position)
                if (dDog0 <= 1)
                    this.dogCameBack()
            }
        }


    }

    bind() {
        this.start = this.start.bind(this)
        this.stop = this.stop.bind(this)
        this.update = this.update.bind(this)
        this.throw = this.throw.bind(this)
        this.runDogToggle = this.runDogToggle.bind(this)
        this.onTStart = this.onTStart.bind(this)
        this.onTEnd = this.onTEnd.bind(this)
        this.ballReached = this.ballReached.bind(this)
        this.dogCameBack = this.dogCameBack.bind(this)

        // window.addEventListener('click', this.throw)
        window.addEventListener('touchstart', this.onTStart)
        window.addEventListener('touchend', this.onTEnd)
    }
}

const _instance = new Scene0()
export default _instance

