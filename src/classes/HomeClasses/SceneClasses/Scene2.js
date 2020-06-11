import HomeThree from "../HomeThree"
import ModelLoader from "../ModelLoader"
import { TweenLite, Power3 } from 'gsap'
import * as THREE from "three"

class Scene0 {
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
        this.scene.add(this.room)

        this.room.scale.multiplyScalar(.1)
        this.room.position.copy(this.positions.origin.pos)
        this.room.rotation.y = this.positions.origin.rot.y
        this.animTime = 1


        this.isActive = false
        window.EM.on('tScroll', (ind) => {
            if (ind == 2) {
                console.log("yeah")
                this.toBooks()
                this.isActive = true
            }
            if (ind == 3) {
                this.toTable()
                this.isActive = true
            }
            if (this.isActive && ind == 1) {
                this.isActive = false
                this.toOrigin()
            }
            if (this.isActive && ind == 4) {
                this.isActive = false
                this.leave()
            }

        })

    }

    inFace() {
        TweenLite.to(this.room.rotation, this.animTime, {
            y: -Math.PI / 2,
            ease: Power3.easeInOut
        })
    }

    outFace() {
        TweenLite.to(this.room.rotation, this.animTime, {
            y: -.8,
            ease: Power3.easeInOut
        })
    }

    toOrigin() {
        TweenLite.to(this.room.position, this.animTime, {
            x: this.positions.origin.pos.x,
            y: this.positions.origin.pos.y,
            z: this.positions.origin.pos.z,
            ease: Power3.easeInOut,

        })
        TweenLite.to(this.room.rotation, this.animTime, {
            y: this.positions.origin.rot.y,
            ease: Power3.easeInOut,

        })
    }

    toBooks() {
        TweenLite.to(this.room.position, this.animTime, {
            x: this.positions.books.pos.x,
            y: this.positions.books.pos.y,
            z: this.positions.books.pos.z,
            ease: Power3.easeInOut,

        })
        TweenLite.to(this.room.rotation, this.animTime, {
            y: this.positions.books.rot.y,
            ease: Power3.easeInOut,

        })
    }

    toTable() {
        TweenLite.to(this.room.position, this.animTime, {
            x: this.positions.table.pos.x,
            y: this.positions.table.pos.y,
            z: this.positions.table.pos.z,
            ease: Power3.easeInOut,

        })
        TweenLite.to(this.room.rotation, this.animTime, {
            y: this.positions.table.rot.y,
            ease: Power3.easeInOut,

        })
    }

    leave() {
        TweenLite.to(this.room.position, this.animTime, {
            x: this.positions.leave.pos.x,
            y: this.positions.leave.pos.y,
            z: this.positions.leave.pos.z,
            ease: Power3.easeInOut,

        })
        TweenLite.to(this.room.rotation, this.animTime, {
            y: this.positions.leave.rot.y,
            ease: Power3.easeInOut,

        })
    }

    bind() {
        this.start = this.start.bind(this)
        this.toOrigin = this.toOrigin.bind(this)
        this.toBooks = this.toBooks.bind(this)
        this.toTable = this.toTable.bind(this)
        this.inFace = this.inFace.bind(this)
        this.outFace = this.outFace.bind(this)
        this.leave = this.leave.bind(this)

    }
}

const _instance = new Scene0()
export default _instance