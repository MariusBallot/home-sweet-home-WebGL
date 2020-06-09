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
        this.scene.add(this.boy)
        this.boy.traverse(child => {
            if (child instanceof THREE.Mesh) {
                child.material.transparent = true
                child.material.opacity = 0
            }
        })

        this.boy.position.set(0, -5, -2)
        this.boy.scale.multiplyScalar(.04)

        this.enter()

        window.EM.on('tScroll', (ind) => {
            if (ind == 0) this.enter()
            if (ind == 1) this.leave()
        })
    }

    enter() {
        this.animTime = 2

        TweenLite.to(this.boy.position, this.animTime, {
            z: 0,
            ease: Power3.easeInOut
        })

        this.boy.traverse(child => {
            if (child instanceof THREE.Mesh) {
                TweenLite.to(child.material, this.animTime, {
                    opacity: 1,
                    ease: Power3.easeInOut
                })
            }
        })
    }

    leave(ind) {
        TweenLite.to(this.boy.position, this.animTime, {
            z: -2,
            ease: Power3.easeInOut
        })

        this.boy.traverse(child => {
            if (child instanceof THREE.Mesh) {
                child.material.transparent = true
                TweenLite.to(child.material, this.animTime, {
                    opacity: 0,
                    ease: Power3.easeInOut
                })
            }
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