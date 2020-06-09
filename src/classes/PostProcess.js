import * as THREE from "three"
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import postShaderVert from "../shaders/postProcess.vert"
import postShaderFrag from "../shaders/postProcess.frag"
import MYGUI from '../controllers/GUIManager'

window.THREE = require('three')
const fxaa = require('three-shader-fxaa')

class PostProcess {
    constructor() {

    }

    init({ renderer, scene, camera }) {
        this.composer = new EffectComposer(renderer)
        this.composer.addPass(new RenderPass(scene, camera))

        this.fxaaPass = new ShaderPass(fxaa())
        this.fxaaPass.uniforms.resolution.value.set(window.innerWidth, window.innerHeight)
        this.composer.addPass(this.fxaaPass)

        this.shader = {
            uniforms: {
                tDiffuse: { value: null },
                u_vignetteIntensity: { value: 1.0 } //float : 1 = default, 1000 = max
            },
            vertexShader: postShaderVert,
            fragmentShader: postShaderFrag,
        }

        this.shaderPass = new ShaderPass(this.shader)
        this.shaderPass.renderToScreen = true
        this.composer.addPass(this.shaderPass)

        MYGUI.addParam({ object: this.shader.uniforms.u_vignetteIntensity, prop: "value", fromTo: [1, 1000], step: 10, name: "Vignette" })
    }
}

const _instance = new PostProcess()
export default _instance