import * as THREE from 'three'
// import MothLoader from './MothLoader'
import RAF from '../../../utils/raf'


const defaultMesh = new THREE.Mesh(new THREE.BoxGeometry(.1, .1, .5), new THREE.MeshNormalMaterial)

export default class Boid {
    constructor({
        dirVector = new THREE.Vector3(0, 1, 0),
        mesh = defaultMesh
    }) {
        this.bind()
        this.mesh = mesh.clone()
        this.mixer = new THREE.AnimationMixer(this.mesh)
        // let animStart = Math.random() * MothLoader.animations[0].duration
        // MothLoader.animations.forEach(anim => {
        //     this.mixer.clipAction(anim, this.mesh).play().startAt(animStart)
        // });
        this.dirVector = dirVector
        this.facingAxis = new THREE.Vector3(0, 0, 1)
        this.mesh.up = this.facingAxis

        this.dirMesh = new THREE.Line(
            new THREE.BufferGeometry().setFromPoints([
                this.mesh.position,
                this.mesh.position.clone().add(this.facingAxis)
            ]),
            new THREE.LineBasicMaterial({ color: 0xffffff })
        )
        this.dirMesh.name = 'dirVec'
        this.dirMesh.scale.multiplyScalar(10)
        this.mesh.add(this.dirMesh)

        this.visioMesh = new THREE.Mesh(new THREE.SphereGeometry(), new THREE.MeshBasicMaterial({
            color: 0x0000FF,
            transparent: true,
            opacity: .5
        }))
        this.visioMesh.name = "visioMesh"

        this.mesh.add(this.visioMesh)


    }

    bind() {

    }
}