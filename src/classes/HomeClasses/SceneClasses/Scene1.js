import HomeThree from "../HomeThree"
import ModelLoader from "../ModelLoader"
import { TimelineMax, Power3 } from 'gsap'
import * as THREE from "three"

class Scene1 {
    constructor() {
        this.bind()
        this.tweens = []
    }

    start() {
        this.camera = HomeThree.homeCamera
        this.scene = HomeThree.scene

        this.street = ModelLoader.models[1].scene.scene

        this.street.scale.multiplyScalar(.005)
        this.street.position.set(8, -.7, 0)
        this.street.rotateY(-.8)
        this.animTime = 1

        this.initAnims()

        this.isActive = false
        window.EM.on('tScroll', (ind) => {
            this.ind = ind
            this.checkInd()
        })

        window.EM.on("inCredits", () => { if (this.isActive) this.leave() });
        window.EM.on("outCredits", () => { if (this.isActive) this.checkInd() });
    }

    checkInd() {
        if (this.ind == 1) {
            this.enter()
            this.isActive = true
        }
        else if (this.isActive) {
            this.isActive = false
            this.leave()
        }
    }

    initAnims() {
        this.inFaceAnim = new TimelineMax({
            paused: true
        })
        this.inFaceAnim.to(this.street.rotation, this.animTime, {
            y: -Math.PI / 2,
            ease: Power3.easeInOut
        }, 0)

        this.outFaceAnim = new TimelineMax({
            paused: true
        })
        this.outFaceAnim.to(this.street.rotation, this.animTime, {
            y: -.8,
            ease: Power3.easeInOut
        }, 0)

        this.enterAnim = new TimelineMax({
            paused: true
        })
        this.enterAnim.to(this.street.position, this.animTime, {
            x: 0,
            ease: Power3.easeInOut,
        }, 0)
        this.enterAnim.to(this.street.rotation, this.animTime, {
            y: -.8,
            ease: Power3.easeInOut
        }, 0)

        this.leaveAnim = new TimelineMax({
            paused: true
        })
        this.leaveAnim.to(this.street.position, this.animTime, {
            x: -8,
            ease: Power3.easeInOut,
            onComplete: () => {
                this.scene.remove(this.street)
            }
        }, 0)

    }

    inFace() {
        this.inFaceAnim.invalidate().progress(0).pause();
        this.outFaceAnim.invalidate().progress(0).pause();
        this.inFaceAnim.play()
    }

    outFace() {
        this.inFaceAnim.invalidate().progress(0).pause();
        this.outFaceAnim.invalidate().progress(0).pause();
        this.outFaceAnim.play()
    }

    enter() {
        this.scene.add(this.street)
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
        this.leave = this.leave.bind(this)
        this.enter = this.enter.bind(this)
        this.inFace = this.inFace.bind(this)
        this.outFace = this.outFace.bind(this)
        this.initAnims = this.initAnims.bind(this)
        this.checkInd = this.checkInd.bind(this)

    }
}

const _instance = new Scene1()
export default _instance