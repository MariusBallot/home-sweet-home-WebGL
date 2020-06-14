import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import postShaderVert from "../shaders/postProcess.vert"
import postShaderFrag from "../shaders/postProcess.frag"
// import MYGUI from '../controllers/GUIManager'
import RAF from "../utils/raf"
import config from '../config'
import { TweenLite } from "gsap/gsap-core";

window.THREE = require('three')
const fxaa = require('three-shader-fxaa')

class PostProcess {
    constructor() {
        this.bind()
        this.updateUniforms = config.devModeShowGUI
        this.parameters = {
            vignetteIntensity: 8.0,
            vignetteColorMode: config.devMode && config.devModeWhiteVignette ? 1.0 : -1.0
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
                u_vignetteIntensity: { value: this.parameters.vignetteIntensity }, //float : 0.1 = default, 8.0 = max
                u_vignetteColorMode: { value: this.parameters.vignetteColorMode } //float : 1 = white, -1 = black
            },
            vertexShader: postShaderVert,
            fragmentShader: postShaderFrag,
        }

        this.shaderPass = new ShaderPass(this.shader)
        this.shaderPass.renderToScreen = true
        this.composer.addPass(this.shaderPass)

        // MYGUI.addParam({
        //     object: this.parameters,
        //     prop: "vignetteIntensity",
        //     fromTo: [0.1, 10.0],
        //     step: 0.1,
        //     name: "Vignette Intensity"
        // })
        // MYGUI.addParam({
        //     object: this.parameters,
        //     prop: "vignetteColorMode",
        //     fromTo: [-1, 1],
        //     step: 0.1,
        //     name: "Vignette Mode:"
        // })

        RAF.subscribe('postProcessUpdate', this.update)

        // window.addEventListener('keydown', e=>{
        //     console.log(e.key)
        //     if(e.key === "ArrowLeft") this.fade("in");
        //     if(e.key === "ArrowRight") this.fade("out");
        //     if(e.key === "ArrowUp") this.fade("toWhite");
        //     if(e.key === "ArrowDown") this.fade("toBlack");
        // })
    }

    /**
     * @param {string} mode
     */
    fade(mode) {
        const onTweenStart = () => {
            this.updateUniforms = true;
        }
        const onTweenComplete = () => {
            this.updateUniforms = false;
        }
        switch (mode) {
            case "in":
                TweenLite.to(this.parameters, 2, {
                    vignetteIntensity: 8.0,
                    onStart: onTweenStart,
                    onComplete: onTweenComplete
                })
                break;
            case "out":
                TweenLite.to(this.parameters, 2, {
                    vignetteIntensity: 0.1,
                    onStart: onTweenStart,
                    onComplete: onTweenComplete
                })
                break;
            case "toBlack":
                TweenLite.to(this.parameters, 1, {
                    vignetteColorMode: -1.0,
                    onStart: onTweenStart,
                    onComplete: onTweenComplete
                })
                break;
            case "toWhite":
                TweenLite.to(this.parameters, 1, {
                    vignetteColorMode: 1.0,
                    onStart: onTweenStart,
                    onComplete: onTweenComplete
                })
                break;
            default:
                break;
        }

    }

    update() {
        if(this.updateUniforms) {
            this.shaderPass.material.uniforms.u_vignetteIntensity.value = this.parameters.vignetteIntensity
            this.shaderPass.material.uniforms.u_vignetteColorMode.value = this.parameters.vignetteColorMode
        }
    }

    bind() {
        this.init = this.init.bind(this)
        this.update = this.update.bind(this)
        this.fade = this.fade.bind(this)
    }
}

const _instance = new PostProcess()
export default _instance