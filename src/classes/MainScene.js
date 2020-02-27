import RAF from '@/utils/raf'
import * as THREE from 'three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import SceneLoader from './SceneLoader'
import CameraController from '../controllers/CameraController'

class MainScene {
    constructor() {
        this.bind()
    }

    start(_container) {
        this.renderer = new THREE.WebGLRenderer({ antialias: true })
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        this.renderer.debug.checkShaderErrors = true
        _container.appendChild(this.renderer.domElement)

        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
        this.camera.position.set(0, 1, 0)

        this.scene = new THREE.Scene()

        // this.controls = new OrbitControls(this.camera, this.renderer.domElement)
        // this.controls.enabled = true
        // this.controls.maxDistance = 1500
        // this.controls.minDistance = 0


        let light = new THREE.AmbientLight()
        let pointLight = new THREE.PointLight()
        pointLight.position.set(10, 10, 0)

        let cube = new THREE.Mesh(new THREE.BoxGeometry(), new THREE.MeshNormalMaterial())
        this.scene.add(light, pointLight, cube)

        SceneLoader.load(this.scene, () => {
            SceneLoader.show(0)
            this.camera = SceneLoader.currentCam
            new CameraController(this.camera)
        })

        RAF.subscribe("mainSceneUpdate", this.update)
    }

    destroy() {
        RAF.unsubscribe("mainSceneUpdate", this.update)
    }

    update() {
        this.renderer.render(this.scene, this.camera)
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

        window.addEventListener('resize', this.onWindowResize)
    }
}

const _instance = new MainScene
export default _instance