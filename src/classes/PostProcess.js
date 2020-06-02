import * as THREE from "three"
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import postShaderVert from "../shaders/postProcess.vert"
import postShaderFrag from "../shaders/postProcess.frag"

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
            },
            vertexShader: postShaderVert,
            fragmentShader: postShaderFrag,
        }

        this.shaderPass = new ShaderPass(this.shader)
        this.shaderPass.renderToScreen = true
        this.composer.addPass(this.shaderPass)
    }
}

const _instance = new PostProcess()
export default _instance