import RAF from '@/utils/raf'
import * as THREE from 'three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import SceneLoader from './SceneLoader'
import CameraController from '../controllers/CameraController'
import Scenes from '../controllers/ScenesManager'

class MainScene {
    constructor() {
        this.currentSceneId
        this.bind()
    }

    start(_container) {
        this.renderer = new THREE.WebGLRenderer({ antialias: true })
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        this.renderer.debug.checkShaderErrors = true
        _container.appendChild(this.renderer.domElement)

        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
        this.camera.position.set(0, 5, 5)
        this.camera.lookAt(0, 0, 0)
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.update();

        this.currentSceneId = 0
        this.scene = Scenes[this.currentSceneId].scene

        let cube = new THREE.Mes(new THREE.BoxGeometry(), new THREE.MeshNormalMaterial())
        let pointLight = new THREE.PointLight()
        let ambient = new THREE.AmbientLight()
        this.scene.add(pointLight, ambient, cube)

        RAF.subscribe("mainSceneUpdate", this.update)
    }

    switchScene() {
        console.log(this.currentSceneId)
        this.currentSceneId = (this.currentSceneId + 1) % Scenes.length
        console.log(this.currentSceneId)
        this.scene = Scenes[this.currentSceneId].scene
        console.log(this.scene)
    }

    destroy() {
        RAF.unsubscribe("mainSceneUpdate", this.update)
    }

    update() {
        this.renderer.render(this.scene, this.camera)
        this.controls.update();

    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    bind() {
        this.update = this.update.bind(this)
        this.start = this.start.bind(this)
        this.destroy = this.destroy.bind(this)
        this.onWindowResize = this.onWindowResize.bind(this)
        this.switchScene = this.switchScene.bind(this)

        window.addEventListener('resize', this.onWindowResize)
    }
}

const _instance = new MainScene
export default _instance