import * as THREE from "three"
import RAF from "../../utils/raf"
import Boids from './boidStuff/Boids'

class Scene0 {
    constructor() {
        this.bind()
        this.touchPos = new THREE.Vector2()
    }
    start({ camera, scene }) {
        this.camera = camera
        this.scene = scene

        Boids.init({
            scene: this.scene,
        })
        RAF.subscribe("scene0", this.update)
    }


    stop() {
        RAF.unsubscribe("scene0")
    }


    update() {


    }

    bind() {
        this.start = this.start.bind(this)
        this.stop = this.stop.bind(this)
        this.update = this.update.bind(this)

        // window.addEventListener('click', this.throw)
        window.addEventListener('touchstart', this.onTStart)
        window.addEventListener('touchend', this.onTEnd)
    }
}

const _instance = new Scene0()
export default _instance

