import * as THREE from "three"
import { TweenLite } from "gsap/gsap-core";

import blackTransVert from '../shaders/blackTrans.vert'
import blackTransFrag from '../shaders/blackTrans.frag'

const ANIMTIME = 2;

class BlackTrans {
    constructor() {
        this.bind()
    }

    init({ renderer }) {
        this.renderer = renderer

        this.scene = new THREE.Scene()
        this.camera = new THREE.OrthographicCamera(-1, 1, window.innerHeight / window.innerWidth, window.innerHeight / -window.innerWidth, 1, 1000);
        this.camera.position.set(0, 0, 1)

        this.camera.lookAt(this.scene.position)

        this.uniforms = {
            u_time: { value: 0. },
            u_height: { value: 1.1 },
        }


        this.material = new THREE.ShaderMaterial({
            transparent: true,
            uniforms: this.uniforms,
            vertexShader: blackTransVert,
            fragmentShader: blackTransFrag
        })


        this.plane = new THREE.Mesh(new THREE.PlaneGeometry(2, window.innerHeight / window.innerWidth * 2),
            this.material)
        this.scene.add(this.plane)

    }

    play() {
        TweenLite.to(this.uniforms.u_height, ANIMTIME / 2, {
            value: -0.5,
        })
        TweenLite.to(this.uniforms.u_height, ANIMTIME / 2, {
            value: 1.1,
            delay: ANIMTIME / 2
        })
    }

    update() {
        this.renderer.render(this.scene, this.camera)
        this.uniforms.u_time.value++
    }

    bind() {
        this.init = this.init.bind(this)
        this.update = this.update.bind(this)
        this.play = this.play.bind(this)
    }
}

const _instance = new BlackTrans()
export default _instance