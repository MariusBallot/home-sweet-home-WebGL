import RAF from "../../utils/raf"

export default class CameraController {
    constructor(camera) {
        this.bind()
        this.camera = camera
        this.cursor = [0, 0]
        this.ease = 0.05
        this.sensitivity = 0.001
        this.enabled = true

        RAF.subscribe('cameraControllerUpdate', this.update)
    }

    mouseMove(e) {
        this.cursor[0] = -(e.clientX - window.innerWidth / 2) * this.sensitivity
        this.cursor[1] = (e.clientY - window.innerHeight / 2) * this.sensitivity
    }


    update() {
        if (!this.enabled)
            return
        this.camera.position.x += (this.cursor[0] - this.camera.position.x) * this.ease
        this.camera.position.y += (this.cursor[1] - this.camera.position.y) * this.ease

        this.camera.lookAt(0, 0, 0)
    }

    bind() {
        this.update = this.update.bind(this)
        this.mouseMove = this.mouseMove.bind(this)
        window.addEventListener('mousemove', this.mouseMove)
    }
}