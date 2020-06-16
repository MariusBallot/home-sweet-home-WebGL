import Boid from './Boid'
import * as THREE from "three"
import RAF from "../../../utils/raf"
import { Vector3 } from 'three'
import MYGUI from '../../../controllers/GUIManager'
import Characters from '../../../controllers/CharactersManager'
import MicController from '../../../controllers/MicController'


let boidParams = {
    speed: .045,
    visioDistance: .6,
    visioMesh: false,
    visioAngle: Math.PI * 0.8,
    repellForce: 0.006,
    followingForce: 0.001,
    centeringForce: .002,
    targetVecor: new THREE.Vector3(10, 10, 0),
    targetCenterForce: 0.0002,
    bounddingRad: 10,
    boundingForce: 0.005,
    boundingVisibility: false,
    directionVector: false,
    numberOfBoids: 150
}



class Boids {

    constructor() {
        this.bind()
        this.group = new THREE.Group()
        this.boidClasses = []
        this.blowed = false

        MYGUI.addParam({ object: boidParams, prop: "speed", fromTo: [0.001, .1], step: .001 })
        MYGUI.addParam({ object: boidParams, prop: "visioDistance", fromTo: [0.001, 1], step: .001 })
        MYGUI.addParam({ object: boidParams, prop: "repellForce", fromTo: [0.0001, 0.005], step: .0001 })
        MYGUI.addParam({ object: boidParams, prop: "followingForce", fromTo: [0.0001, 0.005], step: .0001 })
        MYGUI.addParam({ object: boidParams, prop: "bounddingRad", fromTo: [1, 30], step: .001 })
        MYGUI.addParam({ object: boidParams, prop: "targetCenterForce", fromTo: [0.0001, 0.001], step: .0001 })
        MYGUI.addParam({ object: boidParams, prop: "boundingVisibility" })
        MYGUI.addParam({ object: boidParams, prop: "directionVector" })
        MYGUI.addParam({ object: boidParams, prop: "visioMesh" })
    }

    init({ scene }) {
        this.scene = scene

        Characters.forEach(char => {
            if (char.name == "boidBird")
                this.birdBoid = char
        });

        for (let i = 0; i < 20; i++) {
            let boidClass = new Boid({
                mesh: this.birdBoid,
                dirVector: new THREE.Vector3(Math.random() - .5,
                    Math.random() - .5,
                    Math.random() - .5
                )
            })
            boidClass.mesh.position.set(Math.random() * 8 + 8, 0.2, (Math.random() - 0.5) * 8)
            this.group.add(boidClass.mesh)
            this.boidClasses.push(boidClass)
        }
        console.log(this.group)
        this.scene.add(this.group)

        this.boundingSphere = new THREE.Mesh(
            new THREE.SphereGeometry(1, 10, 10),
            new THREE.MeshBasicMaterial({ wireframe: true }))
        this.boundingSphere.scale.multiplyScalar(boidParams.bounddingRad)
        this.group.add(this.boundingSphere)


        RAF.subscribe('boidsUpdate', this.update)
    }

    repell(currentBoid) {
        this.boidClasses.forEach(nBoid => {
            let d = currentBoid.mesh.position.distanceTo(nBoid.mesh.position)
            if (d < boidParams.visioDistance) {
                let dirToN = new Vector3()
                dirToN.subVectors(nBoid.mesh.position, currentBoid.mesh.position).normalize()
                var angle = currentBoid.dirVector.angleTo(dirToN);
                if (angle <= boidParams.visioAngle) {
                    let force = new Vector3()
                    force.subVectors(currentBoid.mesh.position, nBoid.mesh.position).normalize().multiplyScalar(boidParams.repellForce)
                    currentBoid.dirVector.add(force)
                }
            }
        });
    }
    align(currentBoid) {
        let nearBoidDir = []
        this.boidClasses.forEach(nBoid => {
            let d = currentBoid.mesh.position.distanceTo(nBoid.mesh.position)
            if (d < boidParams.visioDistance) {
                let dirToN = new Vector3()
                dirToN.subVectors(nBoid.mesh.position, currentBoid.mesh.position).normalize()
                var angle = currentBoid.dirVector.angleTo(dirToN);
                if (angle <= boidParams.visioAngle) {
                    nearBoidDir.push(nBoid.dirVector)
                }
            }
        });

        let force = new Vector3(0, 0, 0)
        nearBoidDir.forEach(dirVec => {
            force.add(dirVec)
        });
        force.divideScalar(nearBoidDir.length).normalize().multiplyScalar(boidParams.followingForce)
        currentBoid.dirVector.add(force)
    }
    center(currentBoid) {
        let nearBoidPos = []
        this.boidClasses.forEach(nBoid => {
            let d = currentBoid.mesh.position.distanceTo(nBoid.mesh.position)
            if (d < boidParams.visioDistance) {
                let dirToN = new Vector3()
                dirToN.subVectors(nBoid.mesh.position, currentBoid.mesh.position).normalize()
                var angle = currentBoid.dirVector.angleTo(dirToN);
                if (angle <= boidParams.visioAngle) {
                    nearBoidPos.push(nBoid.mesh.position)
                }
            }
        });

        let avgPos = new Vector3(0, 0, 0)
        nearBoidPos.forEach(dirVec => {
            avgPos.add(dirVec)
        });
        avgPos.divideScalar(nearBoidPos.length)

        let force = new THREE.Vector3()
        force.subVectors(avgPos, currentBoid.mesh.position).normalize().multiplyScalar(boidParams.centeringForce)
        currentBoid.dirVector.add(force)
    }

    targetTo(currentBoid) {
        let force = new Vector3()
        force.subVectors(boidParams.targetVecor, currentBoid.mesh.position).normalize().multiplyScalar(boidParams.targetCenterForce)
        currentBoid.dirVector.add(force)
    }

    checkBounding(currentBoid) {
        let d = currentBoid.mesh.position.distanceTo(boidParams.targetVecor)
        let force = new Vector3()
        if (d >= boidParams.bounddingRad - boidParams.visioDistance || currentBoid.mesh.position.y <= 0.5 + boidParams.visioDistance) {
            force = force.subVectors(boidParams.targetVecor, currentBoid.mesh.position).normalize().multiplyScalar(boidParams.boundingForce)
            currentBoid.dirVector.add(force)
        }
    }

    stop() {
        RAF.unsubscribe('boidsUpdate')
        this.scene.remove(this.group)
    }


    update() {
        this.boundingSphere.visible = boidParams.boundingVisibility

        if (MicController.volume >= 25 )
            this.blowed = true
        if (!this.blowed)
            return
            
        this.boidClasses.forEach((boidClass, i) => {
            this.repell(boidClass)
            this.align(boidClass)
            this.center(boidClass)

            this.targetTo(boidClass)
            this.checkBounding(boidClass)


            boidClass.dirVector.normalize()
            boidClass.dirVector.multiplyScalar(boidParams.speed)
            let goingTo = new THREE.Vector3()
            goingTo.addVectors(boidClass.mesh.position, boidClass.dirVector)
            boidClass.mesh.lookAt(goingTo);
            boidClass.mesh.position.add(boidClass.dirVector)


            boidClass.mixer.update(RAF.dt * 0.001)

        });


        this.boundingSphere.scale.set(boidParams.bounddingRad, boidParams.bounddingRad, boidParams.bounddingRad)
    }

    bind() {
        this.init = this.init.bind(this)
        this.update = this.update.bind(this)
        this.repell = this.repell.bind(this)
        this.targetTo = this.targetTo.bind(this)
        this.center = this.center.bind(this)
        this.stop = this.stop.bind(this)
        this.checkBounding = this.checkBounding.bind(this)
    }
}

const _instnace = new Boids()
export default _instnace