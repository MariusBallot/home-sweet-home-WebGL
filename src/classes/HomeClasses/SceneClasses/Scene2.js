import HomeThree from "../HomeThree"
import ModelLoader from "../ModelLoader"
import { TimelineMax, Power3 } from 'gsap'
import * as THREE from "three"

class Scene2 {
    constructor() {
        this.bind()
        this.tweens = []

        this.positions = {
            origin: {
                pos: new THREE.Vector3(-60, -20, 0),
                rot: new THREE.Vector3(0, 0, 0)
            },
            books: {
                pos: new THREE.Vector3(-22, -20, 0),
                rot: new THREE.Vector3(0, 0, 0)
            },
            table: {
                pos: new THREE.Vector3(-2, -10, -50),
                rot: new THREE.Vector3(0, -1, 0)
            },
            leave: {
                pos: new THREE.Vector3(80, -10, -50),
                rot: new THREE.Vector3(0, -1, 0)
            },
        }
    }

    start() {
        this.camera = HomeThree.homeCamera
        this.scene = HomeThree.scene

        this.room = ModelLoader.models[2].scene.scene

        this.room.scale.multiplyScalar(.1)
        this.room.position.copy(this.positions.origin.pos)
        this.room.rotation.y = this.positions.origin.rot.y
        this.animTime = 1

        this.initAnims()

        this.isActive = false
        window.EM.on('tScroll', (ind) => {
            this.ind = ind
            this.checkInd()
        })
        window.EM.on("inCredits", () => { if (this.isActive) this.toOrigin() });
        window.EM.on("outCredits", () => {
            if (this.isActive) {
                this.scene.add(this.room)
                this.checkInd()
            }
        });
    }

    checkInd() {
        if (this.ind == 2) {
            this.toBooks()
            this.isActive = true
        } else if (this.ind == 3) {
            this.toTable()
            this.isActive = true
        } else if (this.isActive && this.ind == 1) {
            this.isActive = false
            this.toOrigin()
        } else if (this.isActive && this.ind == 4) {
            this.isActive = false
            this.leave()
        }

    }

    initAnims() {
        this.toOriginAnim = new TimelineMax({
            paused: true
        })
        this.toOriginAnim.to(this.room.position, this.animTime, {
            x: this.positions.origin.pos.x,
            y: this.positions.origin.pos.y,
            z: this.positions.origin.pos.z,
            ease: Power3.easeInOut,
            onComplete: () => {
                this.scene.remove(this.room)
            }

        }, 0)
        this.toOriginAnim.to(this.room.rotation, this.animTime, {
            y: this.positions.origin.rot.y,
            ease: Power3.easeInOut,
        }, 0)

        this.toBooksAnim = new TimelineMax({
            paused: true
        })
        this.toBooksAnim.to(this.room.position, this.animTime, {
            x: this.positions.books.pos.x,
            y: this.positions.books.pos.y,
            z: this.positions.books.pos.z,
            ease: Power3.easeInOut,
        }, 0)
        this.toBooksAnim.to(this.room.rotation, this.animTime, {
            y: this.positions.books.rot.y,
            ease: Power3.easeInOut,

        }, 0)

        this.toTableAnim = new TimelineMax({
            paused: true
        })
        this.toTableAnim.to(this.room.position, this.animTime, {
            x: this.positions.table.pos.x,
            y: this.positions.table.pos.y,
            z: this.positions.table.pos.z,
            ease: Power3.easeInOut,

        }, 0)
        this.toTableAnim.to(this.room.rotation, this.animTime, {
            y: this.positions.table.rot.y,
            ease: Power3.easeInOut,

        }, 0)

        this.leaveAnim = new TimelineMax({
            paused: true
        })
        this.leaveAnim.to(this.room.position, this.animTime, {
            x: this.positions.leave.pos.x,
            y: this.positions.leave.pos.y,
            z: this.positions.leave.pos.z,
            ease: Power3.easeInOut,
            onComplete: () => {
                this.scene.remove(this.room)
            }

        }, 0)
        this.leaveAnim.to(this.room.rotation, this.animTime, {
            y: this.positions.leave.rot.y,
            ease: Power3.easeInOut,

        }, 0)

    }

    toOrigin() {
        this.toOriginAnim.invalidate().progress(0).pause();
        this.toTableAnim.invalidate().progress(0).pause();
        this.toBooksAnim.invalidate().progress(0).pause();
        this.leaveAnim.invalidate().progress(0).pause();
        this.toOriginAnim.play()
    }

    toBooks() {
        if (!this.isActive)
            this.scene.add(this.room)
        this.toOriginAnim.invalidate().progress(0).pause();
        this.toTableAnim.invalidate().progress(0).pause();
        this.toBooksAnim.invalidate().progress(0).pause();
        this.leaveAnim.invalidate().progress(0).pause();
        this.toBooksAnim.play()

    }

    toTable() {
        if (!this.isActive)
            this.scene.add(this.room)
        this.toOriginAnim.invalidate().progress(0).pause();
        this.toTableAnim.invalidate().progress(0).pause();
        this.toBooksAnim.invalidate().progress(0).pause();
        this.leaveAnim.invalidate().progress(0).pause();
        this.toTableAnim.play()
    }

    leave() {
        this.toOriginAnim.invalidate().progress(0).pause();
        this.toTableAnim.invalidate().progress(0).pause();
        this.toBooksAnim.invalidate().progress(0).pause();
        this.leaveAnim.invalidate().progress(0).pause();
        this.leaveAnim.play()
    }

    bind() {
        this.start = this.start.bind(this)
        this.toOrigin = this.toOrigin.bind(this)
        this.toBooks = this.toBooks.bind(this)
        this.toTable = this.toTable.bind(this)
        this.leave = this.leave.bind(this)
        this.checkInd = this.checkInd.bind(this)

    }
}

const _instance = new Scene2
    ()
export default _instance