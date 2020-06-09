import HomeThree from "../HomeThree"
import ModelLoader from "../ModelLoader"
import { TweenLite, Power3 } from 'gsap'
import * as THREE from "three"

class Scene0 {
    constructor() {
        this.bind()
        this.tweens = []
    }

    start() {
        this.camera = HomeThree.homeCamera
        this.scene = HomeThree.scene

        this.street = ModelLoader.models[1].scene.scene
        this.scene.add(this.street)

        this.street.scale.multiplyScalar(.005)
        this.street.position.set(7, -.7, 0)
        this.street.rotateY(-.8)
        this.animTime = 2


        this.isActive = false
        window.EM.on('tScroll', (ind) => {
            if (ind == 1) {
                this.street.position.x = 7
                this.street.rotation.y = -.8
                this.enter()
                this.isActive = true
            }
            else if (this.isActive) {
                this.isActive = false
                this.leave()
            }
        })

        window.addEventListener('click', this.inFace)
    }

    inFace() {
        this.tweens.push(TweenLite.to(this.street.rotation, this.animTime, {
            y: -Math.PI / 2,
            ease: Power3.easeInOut
        }))
    }

    enter() {

        this.tweens.push(TweenLite.to(this.street.position, this.animTime, {
            x: 0,
            ease: Power3.easeInOut,
            delay: .5
        }))

    }

    leave() {
        this.tweens.push(TweenLite.to(this.street.position, this.animTime, {
            x: -7,
            ease: Power3.easeInOut
        }))
    }

    bind() {
        this.start = this.start.bind(this)
        this.leave = this.leave.bind(this)
        this.enter = this.enter.bind(this)
        this.inFace = this.inFace.bind(this)

    }
}

const _instance = new Scene0()
export default _instance