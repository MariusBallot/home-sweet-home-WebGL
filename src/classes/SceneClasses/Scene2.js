import * as THREE from "three"
import RAF from "../../utils/raf"
import SceneSwitcher from '../../controllers/SceneSwitcher'
// import BlackTrans from "../BlackTrans"
import Scene3 from '../SceneClasses/Scene3'
// import MainScene from '../MainScene'
import PostProcess from '../PostProcess'

class Scene2 {
    constructor() {
        this.bind()
        this.touchPos = new THREE.Vector2()
        this.clickTime = new Date();
        this.finished = false;
        this.sceneId = 2
    }

    start({ camera, scene }) {
        this.camera = camera
        this.scene = scene

        this.weirdShit = new THREE.Group()
        this.stars = new THREE.Group()
        this.globe = new THREE.Mesh(new THREE.SphereGeometry(10, 30, 30), new THREE.MeshBasicMaterial({
            wireframe: true,
            color: 0x000000
        }))
        this.scene.add(this.weirdShit)
        this.scene.add(this.stars)
        this.scene.add(this.globe)

        PostProcess.shaderPass.material.uniforms.u_inte.value = 0.1
        PostProcess.updateUniforms = true

        let colorPool = [
            new THREE.Color(0x2E2E2E),
            new THREE.Color(0x503C1E),
            new THREE.Color(0x4E6D86),
            new THREE.Color(0xCCA770),
            new THREE.Color(0x000000),
            new THREE.Color(0x879199),
        ]

        let steps = 20
        for (let i = 0; i < Math.PI * 2; i += Math.PI * 2 / steps) {
            let r = 10
            let x = Math.cos(i) * r
            let z = Math.sin(i) * r
            let sphere = new THREE.Mesh(new THREE.SphereGeometry(2, 20, 20), new THREE.MeshLambertMaterial({
                color: colorPool[Math.round(Math.random() * colorPool.length)]
            }))
            sphere.position.set(x, 0, z)
            this.weirdShit.add(sphere)
        }

        this.randSpace = 5
        for (let i = 0; i < 100; i++) {
            let x = (Math.random() - 0.5) * this.randSpace
            let y = (Math.random() - 0.5) * this.randSpace
            let z = (Math.random() - 0.5) * this.randSpace
            let sphere = new THREE.Mesh(new THREE.SphereGeometry(0.03), new THREE.MeshBasicMaterial({
                color: colorPool[Math.round(Math.random() * colorPool.length)]
            }))
            sphere.position.set(x, y, z)
            this.stars.add(sphere)
        }

        // MainScene.scene.background = new THREE.Color(0xCCA770);
        RAF.subscribe("scene2", this.update)

        // window.addEventListener('touchstart', this.onTStart)
        this.addEventListeners()
    }

    stop() {
        RAF.unsubscribe("scene2")
    }

    update() {
        this.weirdShit.rotateX(0.005)
        this.weirdShit.rotateY(0.01)

        this.globe.rotateX(-0.0004)
        this.globe.rotateY(-0.0005)

        this.weirdShit.children.forEach((child, i) => {
            child.position.y = Math.sin((child.position.x + child.position.z) * 0.1 + Date.now() * 0.001) * 3
            let s = Math.cos((child.position.x + child.position.z) + Date.now() * 0.001) + 2
            child.scale.set(s, s, s)
        });

        this.stars.children.forEach((child, i) => {
            child.position.y += 0.1
            if (child.position.y >= this.randSpace) {
                child.position.y = -this.randSpace
            }
        });
    }

    onTStart() {
        //touch twice in a second to load next scene
        const newClickTime = new Date();
        console.log(newClickTime)
        if (newClickTime.getSeconds() === this.clickTime.getSeconds()) {
            this.endScene();
        } else {
            this.clickTime = newClickTime;
        }
    }

    endScene() {
        if (this.finished) return
        this.finished = true
        console.log("switching")
        this.scene.remove(this.weirdShit)
        this.scene.remove(this.stars)
        this.scene.remove(this.globe)

        SceneSwitcher.hideScene(this.sceneId)
        PostProcess.shaderPass.material.uniforms.u_inte.value = 0
        PostProcess.updateUniforms = false

        // BlackTrans.in()
        PostProcess.fade("in")
        window.removeEventListener('touchstart', this.onTStart)
    }

    loadNextScene() {
        // BlackTrans.out()
        PostProcess.fade("out")
        SceneSwitcher.showScene(this.sceneId + 1)
        Scene3.start({ camera: this.camera, scene: this.scene })
        this.stop()
    }

    addEventListeners() {
        const onReadyForNextScene = (message) => {
            console.log(JSON.parse(message));
            if (this.finished) {
                window.EM.off('readyForNextScene', onReadyForNextScene)
                this.loadNextScene()
            }
        }
        window.addEventListener('touchstart', this.onTStart)
        window.EM.on('readyForNextScene', onReadyForNextScene)
    }

    bind() {
        this.start = this.start.bind(this)
        this.stop = this.stop.bind(this)
        this.update = this.update.bind(this)
        this.loadNextScene = this.loadNextScene.bind(this)
        this.onTStart = this.onTStart.bind(this)
    }
}

const _instance = new Scene2()
export default _instance

