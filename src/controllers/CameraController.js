import * as THREE from 'three'
import { DeviceOrientationControls } from 'three/examples/jsm/controls/DeviceOrientationControls'
import RAF from '../utils/raf'

export default class CameraController {
    constructor(camera) {
        this.bind()
        this.camera = camera

        this.controls = new DeviceOrientationControls(camera)
    }

    update() {
        this.controls.update()
    }

    bind() {
        this.update = this.update.bind(this)

        RAF.subscribe('camControllerUpdate', this.update)
    }

}