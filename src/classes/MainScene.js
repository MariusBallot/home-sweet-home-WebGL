import RAF from '@/utils/raf'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { DeviceOrientationControls } from 'three/examples/jsm/controls/DeviceOrientationControls'
import SocketServer from '../SocketServer'
import PhysicsEngine from './PhysicsEngine'
import Scenes from '../controllers/ScenesManager'
import SceneSwitcher from '../controllers/SceneSwitcher'
import Scene0 from './SceneClasses/Scene0'
import config from '../config'
import BlackTrans from './BlackTrans'


class MainScene {
    constructor() {
        this.bind()
        this.currentSceneId
    }

    start(_container) {
        this.renderer = new THREE.WebGLRenderer({ antialias: true })
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        this.renderer.debug.checkShaderErrors = true
        _container.appendChild(this.renderer.domElement)

        this.scene = new THREE.Scene()

        this.debugCamera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 1000)
        this.debugControls = new OrbitControls(this.debugCamera, document.body)
        this.debugCamera.position.set(0, 1, 10)
        this.debugControls.update();

        this.orCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
        this.orCamera.position.set(0, 2, 0)
        this.orControls = new DeviceOrientationControls(this.orCamera);
        this.orControls.update();

        SceneSwitcher.init({
            scene: this.scene
        })
        SceneSwitcher.showScene(0)

        this.scene.background = new THREE.Color(0xCCCCCC)
        Scene0.start({
            camera: this.orCamera,
            scene: this.scene
        })

        this.scene.add(new THREE.AmbientLight())
        let pL = new THREE.PointLight()
        pL.position.set(1, 3, 1)
        this.scene.add(pL)

        RAF.subscribe("mainSceneUpdate", this.update)
        BlackTrans.init({ renderer: this.renderer })
        PhysicsEngine.start()
    }


    // switchScene() {
    //     BlackTrans.play()
    //     SocketServer.sendToServer('changeScene', { from: this.currentSceneId, to: (this.currentSceneId + 1) % Scenes.length })

    //     Scenes[this.currentSceneId].scene.traverse(child => {
    //         if (child instanceof THREE.Mesh) {
    //             if (child._shader != undefined)
    //                 child._shader.out()
    //         }
    //     })
    //     setTimeout(() => {
    //         this.scene.remove(Scenes[this.currentSceneId].scene)
    //         this.currentSceneId = (this.currentSceneId + 1) % Scenes.length
    //         this.scene.add(Scenes[this.currentSceneId].scene)

    //         Scenes[this.currentSceneId].scene.traverse(child => {
    //             if (child instanceof THREE.Mesh) {
    //                 if (child._shader != undefined)
    //                     child._shader.in()
    //             }
    //         })
    //     }, 1000)

    // }

    destroy() {
        RAF.unsubscribe("mainSceneUpdate", this.update)
    }

    update() {

        let currCam = this.debugCamera
        if (config.orCam)
            currCam = this.orCamera
        this.renderer.autoClear = false
        this.renderer.render(this.scene, currCam)
        this.orControls.update();
        this.debugControls.update()



        if (SocketServer.connected)
            SocketServer.sendToServer('orientation', this.orCamera.rotation)
    }

    onWindowResize() {
        this.orCamera.aspect = window.innerWidth / window.innerHeight;
        this.orCamera.updateProjectionMatrix();

        this.debugCamera.aspect = window.innerWidth / window.innerHeight;
        this.debugCamera.updateProjectionMatrix();

        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    bind() {
        this.update = this.update.bind(this)
        this.start = this.start.bind(this)
        this.destroy = this.destroy.bind(this)
        this.onWindowResize = this.onWindowResize.bind(this)
        // this.switchScene = this.switchScene.bind(this)

        window.addEventListener('resize', this.onWindowResize)
    }
}

const _instance = new MainScene
export default _instance