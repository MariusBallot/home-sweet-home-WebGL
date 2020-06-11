import HomeThree from "../HomeThree"
import ModelLoader from "../ModelLoader"
import { TweenLite, Power3 } from 'gsap'
import * as THREE from "three"

class Scene0 {
    constructor() {
        this.bind()
    }

    start() {
        this.camera = HomeThree.homeCamera
        this.scene = HomeThree.scene

        this.boy = ModelLoader.models[0].scene.scene


        this.boy.position.set(0, -5, -2)
        this.boy.scale.multiplyScalar(.04)
        this.boy.updateMatrix()

        this.plane = new THREE.Mesh(new THREE.PlaneGeometry(70, 300), new THREE.MeshBasicMaterial({
            transparent: true,
            color: 0x000000,
            opacity: 1
        }))
        this.plane.position.set(0, 50, 50)
        this.boy.add(this.plane)

        this.enter()

        window.EM.on('tScroll', (ind) => {
            if (ind == 0) this.enter()
            if (ind == 1) this.leave()
        })
    }

    enter() {
        this.animTime = 1

        TweenLite.to(this.boy.position, this.animTime, {
            z: 0,
            ease: Power3.easeInOut
        })


        TweenLite.to(this.plane.material, this.animTime, {
            opacity: 0,
            onStart: () => {
                this.scene.add(this.boy)
            },
            ease: Power3.easeInOut
        })

    }

    leave(ind) {
        TweenLite.to(this.boy.position, this.animTime, {
            z: -6,
            ease: Power3.easeInOut
        })

        TweenLite.to(this.plane.material, this.animTime, {
            opacity: 1,
            onComplete: () => {
                this.scene.remove(this.boy)
            },
            ease: Power3.easeInOut
        })
    }

    bind() {
        this.start = this.start.bind(this)
        this.leave = this.leave.bind(this)
        this.enter = this.enter.bind(this)

    }
}

const _instance = new Scene0()
export default _instance