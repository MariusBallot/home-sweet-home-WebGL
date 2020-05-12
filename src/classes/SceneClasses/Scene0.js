import * as THREE from "three"
import RAF from "../../utils/raf"
import PhysicsEngine from '../PhysicsEngine'
import Scenes from '../../controllers/ScenesManager'
import Characters from '../../controllers/CharactersManager'

class Scene0 {
    constructor() {
        this.bind()
    }
    start({ camera, scene }) {
        this.camera = camera
        this.scene = scene

        //DisplaysHand
        this.handModel = Characters[0].model.scene
        this.scene.add(this.handModel)
        Characters[0].actions.forEach((action, i) => {
            action.setLoop(THREE.LoopOnce);
            action.clampWhenFinished = true;
        });

        //gets ball in hand
        this.ballPosition = new THREE.Vector3()
        Characters[0].model.scene.traverse((child) => {
            child.frustumCulled = false;
            if (child instanceof THREE.Object3D && child.name == "balle_main") {
                this.handBall = child
                console.log(this.handBall)
            }
        });

        //displays true ball
        this.ballModel = Characters[1].model.scene
        this.rad = this.ballModel.children[0].children[0].geometry.boundingSphere.radius * Characters[1].scale
        this.scene.add(this.ballModel)


        //displays true ball collider
        this.sphereCol = new THREE.Mesh(new THREE.SphereGeometry(this.rad), new THREE.MeshBasicMaterial({ wireframe: true }))
        // this.scene.add(this.sphereCol)
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
        // this.scene.add(this.ground)
        PhysicsEngine.addBody({
            name: "Scene0Ground",
            type: "ground",
            mesh: this.ground
        })

        this.wall = new THREE.Mesh(new THREE.PlaneGeometry(50, 10, 50, 10), new THREE.MeshBasicMaterial({ wireframe: true }))
        this.wall.rotateY(-Math.PI / 2)
        this.wall.position.x = 12
        this.scene.add(this.wall)
        PhysicsEngine.addBody({
            name: "Scene0Wall",
            type: "ground",
            mesh: this.wall
        })


        RAF.subscribe("scene0", this.update)
    }

    throw() {
        Characters[0].actions.forEach((action, i) => {
            action.play()
        });
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
        }, 800)
    }

    stop() {
        RAF.unsubscribe("scene0")
    }

    update() {
        this.handModel.position.copy(this.camera.position)
        this.handModel.quaternion.copy(this.camera.quaternion)

        this.handBall.getWorldPosition(this.ballPosition)
        if (this.sphereBod.active == false) {
            console.log('huzai')
            this.sphereCol.position.copy(this.ballPosition)
        }
    }

    bind() {
        this.start = this.start.bind(this)
        this.stop = this.stop.bind(this)
        this.update = this.update.bind(this)
        this.throw = this.throw.bind(this)

        window.addEventListener('click', this.throw)
    }
}

const _instance = new Scene0()
export default _instance