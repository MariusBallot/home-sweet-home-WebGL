import * as THREE from 'three'
import RAF from '../../../utils/raf'
import { SkeletonUtils } from "three/examples/jsm/utils/SkeletonUtils"


const defaultMesh = new THREE.Mesh(new THREE.BoxGeometry(.1, .1, .5), new THREE.MeshNormalMaterial)

export default class Boid {
    constructor({
        dirVector = new THREE.Vector3(0, 1, 0),
        mesh = defaultMesh
    }) {
        this.bind()
        this.mesh = SkeletonUtils.clone(mesh.model.scene)
        this.mixer = new THREE.AnimationMixer(this.mesh)
        // let animStart = Math.random() * MothLoader.animations[0].duration
        mesh.model.animations.forEach(anim => {
            this.mixer.clipAction(anim, this.mesh).play().startAt(Math.random())
        });
        this.dirVector = dirVector
        this.facingAxis = new THREE.Vector3(0, 0, 1)
        this.mesh.up = this.facingAxis
    }

    bind() {

    }
}