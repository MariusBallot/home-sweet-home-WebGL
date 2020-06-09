import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import postShaderVert from "../shaders/postProcess.vert"
import postShaderFrag from "../shaders/postProcess.frag"
import MYGUI from '../controllers/GUIManager'
import RAF from "../utils/raf"

window.THREE = require('three')
const fxaa = require('three-shader-fxaa')

class PostProcess {
    constructor(){
        this.bind()
        this.parameters = {
            vignetteIntensity: 1.0
        }
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
                u_vignetteIntensity: { value: this.parameters.vignetteIntensity } //float : 1.0 = default, 1000.0 = max
            },
            vertexShader: postShaderVert,
            fragmentShader: postShaderFrag,
        }

        this.shaderPass = new ShaderPass(this.shader)
        this.shaderPass.renderToScreen = true
        this.composer.addPass(this.shaderPass)

        MYGUI.addParam({ 
            object: this.parameters, 
            prop: "vignetteIntensity", 
            fromTo: [1.0, 1000.0], 
            step: 10.0, 
            name: "Vignette Intensity" 
        })

        RAF.subscribe('postProcessUpdate', this.update)
    }

    update() {
        this.shader.uniforms.u_vignetteIntensity.value += 1
    }

    bind() {
        this.init = this.init.bind(this)
        this.update = this.update.bind(this)
    }
}

const _instance = new PostProcess()
export default _instance