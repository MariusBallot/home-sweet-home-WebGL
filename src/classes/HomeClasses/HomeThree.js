import RAF from '@/utils/raf'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as THREE from 'three'
import Scene0 from './SceneClasses/Scene0'
import CamParallax from './CamParallax'

class HomeThree {
    constructor() {
        this.bind()
        this.currentSceneId
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

        this.homeCamera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 1000)
        this.homeCamera.position.set(0, 0, 10)
        this.camParallax = new CamParallax(this.homeCamera)

        let cube = new THREE.Mesh(new THREE.BoxGeometry(), new THREE.MeshNormalMaterial())
        this.scene.add(cube)

        this.scene.add(new THREE.AmbientLight())
        let pL = new THREE.PointLight()
        pL.position.set(1, 3, 1)
        this.scene.add(pL)

        Scene0.start()

        RAF.subscribe("HomeThreeUpdate", this.update)
    }


    stop() {
        RAF.unsubscribe("HomeThreeUpdate", this.update)
    }

    update() {
        let currCam = this.debugCamera
        currCam = this.homeCamera
        this.renderer.autoClear = false
        this.renderer.render(this.scene, currCam)
        this.debugControls.update()
    }

    onWindowResize() {
        this.homeCamera.aspect = window.innerWidth / window.innerHeight;
        this.homeCamera.updateProjectionMatrix();

        this.debugCamera.aspect = window.innerWidth / window.innerHeight;
        this.debugCamera.updateProjectionMatrix();

        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }


    bind() {
        this.update = this.update.bind(this)
        this.start = this.start.bind(this)
        this.stop = this.stop.bind(this)
        this.onWindowResize = this.onWindowResize.bind(this)

        window.addEventListener('resize', this.onWindowResize)
    }
}

const _instance = new HomeThree
export default _instance