import * as THREE from 'three'
import { TweenLite } from "gsap"

import RAF from '../utils/raf'

import sceneVert from '../shaders/scene.vert'
import sceneFrag from '../shaders/scene.frag'

export default class SceneShader {
    constructor(map) {
        this.bind()

        this.border = 0.1
        this.uniforms = {
            u_tex: {
                type: 't',
                value: map
            },
            u_time: {
                type: 'f',
                value: 0
            },
            u_border: {
                type: 'f',
                value: .1
            },
            u_th: {
                type: 'f',
                value: -1 + this.border
            },
        }

        this.shader = new THREE.ShaderMaterial({
            vertexShader: sceneVert,
            fragmentShader: sceneFrag,
            uniforms: this.uniforms,
            transparent: true
        })

    }

    out() {
        TweenLite.to(this.uniforms.u_th, 1, {
            value: -1 + this.border
        })
    }

    in() {
        TweenLite.to(this.uniforms.u_th, 1, {
            value: 1 + this.border
        })
    }


    update() {
        this.uniforms.u_time.value += 1
    }

    bind() {
        this.update = this.update.bind(this)
        this.out = this.out.bind(this)
        this.in = this.in.bind(this)
        RAF.subscribe('shaderUpdate', this.update)
    }
}