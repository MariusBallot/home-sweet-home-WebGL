import HomeThree from "../HomeThree"
import ModelLoader from "../ModelLoader"
import { TimelineMax, TweenLite, Power3 } from 'gsap'
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

        this.initAnims()
        this.enter()

        window.EM.on('tScroll', (ind) => {
            if (ind == 0) this.enter()
            if (ind == 1) this.leave()
        })
    }

    initAnims() {
        this.animTime = 1

        this.enterAnim = new TimelineMax({
            paused: true
        })
        this.enterAnim.to(this.boy.position, this.animTime, {
            z: 0,
            ease: Power3.easeInOut
        }, 0)
        this.enterAnim.to(HomeThree.camParallax, this.animTime, {
            sensitivity: 0.005,
            ease: Power3.easeInOut
        }, 0)
        this.enterAnim.to(this.plane.material, this.animTime, {
            opacity: 0,
            onStart: () => {
                this.scene.add(this.boy)
            },
            ease: Power3.easeInOut
        }, 0)

        this.leaveAnim = new TimelineMax({
            paused: true
        })
        this.leaveAnim.to(HomeThree.camParallax, this.animTime, {
            sensitivity: 0.001,
            ease: Power3.easeInOut
        }, 0)

        this.leaveAnim.to(this.boy.position, this.animTime, {
            z: -6,
            ease: Power3.easeInOut
        }, 0)

        this.leaveAnim.to(this.plane.material, this.animTime, {
            opacity: 1,
            onComplete: () => {
                this.scene.remove(this.boy)
            },
            ease: Power3.easeInOut
        }, 0)

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
        this.leave = this.leave.bind(this)
        this.enter = this.enter.bind(this)
        this.initAnims = this.initAnims.bind(this)

    }
}

const _instance = new Scene0()
export default _instance