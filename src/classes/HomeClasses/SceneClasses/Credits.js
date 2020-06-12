import HomeThree from "../HomeThree"
import ModelLoader from "../ModelLoader"
import { TimelineMax, Power3 } from 'gsap'
import * as THREE from "three"

class Credits {
    constructor() {
        this.bind()
        this.tweens = []
    }

    start() {
        this.camera = HomeThree.homeCamera
        this.scene = HomeThree.scene

        this.zoo = ModelLoader.models[3].scene.scene
        this.zoo.scale.multiplyScalar(.0001)

        this.zoo.position.set(.3, -5, 4)
        this.zoo.rotation.set(0, -1, 0)

        this.scene.add(this.zoo)

        this.initAnims()

        window.EM.on("inCredits", () => {
            this.enter()
        });
        window.EM.on("outCredits", () => {
            this.leave()
        });

    }
    initAnims() {
        this.animTime = 1

        this.enterAnim = new TimelineMax({
            paused: true
        })
        this.enterAnim.to(this.zoo.position, this.animTime, {
            y: -.7,
            ease: Power3.easeInOut
        }, 0)
        this.enterAnim.to(HomeThree.camParallax, this.animTime, {
            sensitivity: 0.0001
        })

        this.leaveAnim = new TimelineMax({
            paused: true
        })
        this.leaveAnim.to(this.zoo.position, this.animTime, {
            y: -5,
            ease: Power3.easeInOut
        }, 0)
        this.leaveAnim.to(HomeThree.camParallax, this.animTime, {
            sensitivity: 0.0005
        })
    }

    enter() {
        this.enterAnim.invalidate().progress(0).pause();
        this.leaveAnim.invalidate().progress(0).pause();
        this.enterAnim.play()
    }


    leave() {
        this.enterAnim.invalidate().progress(0).pause();
        this.leaveAnim.invalidate().progress(0).pause();
        this.leaveAnim.play()
    }

    bind() {
        this.start = this.start.bind(this)
        this.initAnims = this.initAnims.bind(this)
        this.enter = this.enter.bind(this)
        this.leave = this.leave.bind(this)
    }
}

const _instance = new Credits()
export default _instance