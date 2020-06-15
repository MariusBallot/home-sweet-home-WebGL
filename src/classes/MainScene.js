import RAF from '@/utils/raf'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { DeviceOrientationControls } from 'three/examples/jsm/controls/DeviceOrientationControls'
import SocketServer from '../SocketServer'
import PhysicsEngine from './PhysicsEngine'
import SceneSwitcher from '../controllers/SceneSwitcher'
import Scene0 from './SceneClasses/Scene0'
import Scene1 from './SceneClasses/Scene1'
import Scene2 from './SceneClasses/Scene2'
import Scene3 from './SceneClasses/Scene3'
import Scene4 from './SceneClasses/Scene4'
import Scene5 from './SceneClasses/Scene5'
import config from '../config'
import BlackTrans from './BlackTrans'
import PostProcess from './PostProcess'


class MainScene {
    constructor() {
        this.bind()
    }

    start(_container) {
        this.renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" })
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

        this.scene.background = new THREE.Color(0xB8C6D1)
        this.scene.add(new THREE.AmbientLight())
        let pL = new THREE.PointLight()
        pL.position.set(1, 3, 1)
        this.scene.add(pL)

        PostProcess.init({
            renderer: this.renderer,
            scene: this.scene,
            camera: this.orCamera
        })

        RAF.subscribe("mainSceneUpdate", this.update)
        BlackTrans.init({ renderer: this.renderer })
        PhysicsEngine.start()

        this.addEventListeners()
        if(config.devMode && config.devModeSkipIntro) this.loadNextScene()
    }


    destroy() {
        RAF.unsubscribe("mainSceneUpdate", this.update)
    }

    update() {
        this.renderer.autoClear = false

        if (config.orCam)
            this.renderer.render(this.scene, this.debugCamera)
        else
            PostProcess.composer.render(RAF.dt * 0.001)
        this.orControls.update();
        this.debugControls.update()

        if (SocketServer.connected && this.orCamera && this.orCamera.rotation)
            SocketServer.sendToServer('orientation', this.orCamera.rotation)
    }


    loadNextScene(){
        PostProcess.fade("out")
        this.scene.background = new THREE.Color(0xB8C6D1)

        if (config.devMode) {
            const sceneClasses = [Scene0, Scene1, Scene2, Scene3, Scene4, Scene5]
            SceneSwitcher.showScene(config.devModeScene)
            sceneClasses[config.devModeScene].start({
                camera: this.orCamera,
                scene: this.scene
            })
        } else {
            SceneSwitcher.showScene(0)
            Scene0.start({
                camera: this.orCamera,
                scene: this.scene
            })
        }
    }

    onWindowResize() {
        this.orCamera.aspect = window.innerWidth / window.innerHeight;
        this.orCamera.updateProjectionMatrix();

        this.debugCamera.aspect = window.innerWidth / window.innerHeight;
        this.debugCamera.updateProjectionMatrix();

        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    addEventListeners() {
        window.addEventListener('resize', this.onWindowResize)
        const onReadyForNextScene = (message) => {
            window.EM.off('readyForNextScene', onReadyForNextScene)
            console.log(JSON.parse(message));
            this.loadNextScene()
        }
        window.EM.on('readyForNextScene', onReadyForNextScene)
        window.EM.on('hasSlidUp', ()=>{PostProcess.fade("toWhite")})
    }

    bind() {
        this.update = this.update.bind(this)
        this.start = this.start.bind(this)
        this.destroy = this.destroy.bind(this)
        this.onWindowResize = this.onWindowResize.bind(this)
        this.addEventListeners = this.addEventListeners.bind(this)
    }
}

const _instance = new MainScene
export default _instance