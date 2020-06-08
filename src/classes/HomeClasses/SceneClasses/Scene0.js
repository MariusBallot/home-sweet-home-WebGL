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

        this.boy.position.set(0, -5, 0)
        this.boy.scale.multiplyScalar(.04)

        let animTime = 2

        TweenLite.fromTo(this.boy.position, animTime, {
            z: -2
        }, {
            z: 0,
            ease: Power3.easeInOut
        })

        this.boy.traverse(child => {
            if (child instanceof THREE.Mesh) {
                console.log(child)
                child.material.transparent = true
                TweenLite.fromTo(child.material, animTime, {
                    opacity: 0
                }, {
                    opacity: 1,
                    ease: Power3.easeInOut
                })
            }
        })
    }

    stop() {

    }

    bind() {
        this.start = this.start.bind(this)
        this.stop = this.stop.bind(this)
    }
}

const _instance = new Scene0()
export default _instance