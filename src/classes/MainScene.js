import RAF from '@/utils/raf'
// import TestScene from '@/utils/TestScene'
import * as THREE from 'three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { DeviceOrientationControls } from 'three/examples/jsm/controls/DeviceOrientationControls'

import SocketServer from '../SocketServer'

import SceneLoader from './SceneLoader'
import BlackTrans from './BlackTrans'

import CameraController from '../controllers/CameraController'
import Scenes from '../controllers/ScenesManager'
import Characters from '../controllers/CharactersManager'
import RaycastController from '../controllers/RaycastController'

import config from '../config'

class MainScene {
    constructor() {
        this.bind()
        this.currentSceneId
    }

    start(_container) {
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        this.renderer.debug.checkShaderErrors = true
        _container.appendChild(this.renderer.domElement)

        this.debugCamera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 1000)
        this.debugControls = new OrbitControls(this.debugCamera, document.body)
        this.debugCamera.position.set(10, 10, 10)
        this.debugControls.update();

        this.orCamera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 1000)
        this.orCamera.position.set(0, 1, 0)
        this.orControls = new DeviceOrientationControls(this.orCamera);
        this.orControls.update();

        this.scene = new THREE.Scene()
        // this.scene.background = TestScene.background
        this.scene.background = new THREE.Color(0xAAAAFF)


        this.currentSceneId = 0
        this.scene.add(Characters[0].model.scene)
        Characters[0].model.scene.position.set(1, 0, 3)
        this.scene.add(Scenes[this.currentSceneId].scene)

        Scenes[this.currentSceneId].scene.traverse(child => {
            if (child instanceof THREE.Mesh) {
                child._shader.in()
            }
        })


        RaycastController.setTarget({ camera: this.camera, scene: this.scene })
        RaycastController.addOnShoots({ name: 'MainSceneOnShoot', callback: this.onShoot })

        BlackTrans.init({ renderer: this.renderer })

        this.scene.add(new THREE.AmbientLight())

        RAF.subscribe("mainSceneUpdate", this.update)
    }

    onShoot(int) {
        console.log(int)
        int.object.material = new THREE.MeshNormalMaterial()
    }

    switchScene() {
        BlackTrans.play()
        SocketServer.sendToServer('changeScene', { from: this.currentSceneId, to: (this.currentSceneId + 1) % Scenes.length })

        Scenes[this.currentSceneId].scene.traverse(child => {
            if (child instanceof THREE.Mesh) {
                child._shader.out()
            }
        })
        setTimeout(() => {
            this.scene.remove(Scenes[this.currentSceneId].scene)
            this.currentSceneId = (this.currentSceneId + 1) % Scenes.length
            this.scene.add(Scenes[this.currentSceneId].scene)

            Scenes[this.currentSceneId].scene.traverse(child => {
                if (child instanceof THREE.Mesh) {
                    child._shader.in()
                }
            })
        }, 1000)

    }

    destroy() {
        RAF.unsubscribe("mainSceneUpdate", this.update)
    }

    update() {

        let currCam = this.debugCamera
        if (config.orCam)
            currCam = this.orCamera
        this.renderer.autoClear = false
        this.renderer.render(this.scene, currCam)
        BlackTrans.update()

        if (config.orCam)
            this.orControls.update();
        else
            this.debugControls.update()

        if (SocketServer.connected)
            SocketServer.sendToServer('orientation', this.orCamera.rotation)
    }

    onWindowResize() {
        this.orCamera.aspect = window.innerWidth / window.innerHeight;
        this.orCamera.updateProjectionMatrix();

        this.de.aspect = window.innerWidth / window.innerHeight;
        this.de.updateProjectionMatrix();

        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    bind() {
        this.update = this.update.bind(this)
        this.start = this.start.bind(this)
        this.destroy = this.destroy.bind(this)
        this.onWindowResize = this.onWindowResize.bind(this)
        this.onShoot = this.onShoot.bind(this)
        this.switchScene = this.switchScene.bind(this)

        window.addEventListener('resize', this.onWindowResize)
    }
}

const _instance = new MainScene
export default _instance