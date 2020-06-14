import * as THREE from "three"
import RAF from "../../utils/raf"
import SceneSwitcher from '../../controllers/SceneSwitcher'
import BlackTrans from "../BlackTrans"
import MainScene from '../MainScene'
import PostProcess from '../PostProcess'
import MYGUI from '../../controllers/GUIManager'
import CustomEase from 'gsap/CustomEase'
import gsap from "gsap"

class Scene5 {
    constructor() {
        this.bind()
        this.touchPos = new THREE.Vector2()
        this.clickTime = new Date()
        this.finished = false
        this.sceneId = 5
        this.parameters = {
            camera:{
                position: {
                    x: 0,
                    y: 2,
                    z: 0
                }
            },
            jumping:{
                currentJump: 0,
                ready: false,
                isJumping: false,
                height: {
                    firstJump: 4.25,
                    secondJump: 8.5,
                    thirdJump: 50
                },
                speed: 4.5,
                timeline: {
                    firstJump: null,
                    secondJump: null,
                    thirdJump: null
                },
                onStart: () => {
                    this.parameters.jumping.isJumping = true
                },
                onComplete: () => {
                    this.parameters.jumping.ready = false
                    this.parameters.jumping.isJumping = false
                    this.parameters.jumping.timeline.firstJump.pause()
                    this.parameters.jumping.timeline.secondJump.pause()
                    this.parameters.jumping.timeline.thirdJump.pause()
                }
            },
            running: {
                distance: 5,
            }
        }
	}
	
    start({ camera, scene }) {
        this.camera = camera
        this.scene = scene

        gsap.registerPlugin(CustomEase)
        CustomEase.create("jumpUp", "M0,0,C0,0.204,0.474,0.918,1,1")
        CustomEase.create("run", "M0,0 C0.068,0.204 0.552,0.73 1,1 ")

        //jump 1
        this.parameters.jumping.timeline.firstJump = gsap.timeline({onStart: this.parameters.jumping.onStart, onComplete: this.parameters.jumping.onComplete})
        this.parameters.jumping.timeline.firstJump.to(this.parameters.camera.position, {
            y : this.parameters.jumping.height.firstJump, 
            duration: this.parameters.jumping.speed, 
            ease: "jumpUp"
        })
        this.parameters.jumping.timeline.firstJump.to(this.parameters.camera.position, {
            y : 2, 
            duration: this.parameters.jumping.speed-2, 
            ease: "power1.in"
        })
        this.parameters.jumping.timeline.firstJump.pause()

        //jump 2
        this.parameters.jumping.timeline.secondJump = gsap.timeline({onStart: this.parameters.jumping.onStart, onComplete: this.parameters.jumping.onComplete})
        this.parameters.jumping.timeline.secondJump.to(this.parameters.camera.position, {
            y : this.parameters.jumping.height.secondJump, 
            duration: this.parameters.jumping.speed, 
            ease: "jumpUp"
        })
        this.parameters.jumping.timeline.secondJump.to(this.parameters.camera.position, {
            y : 2, 
            duration: this.parameters.jumping.speed-2, 
            ease: "power1.in"
        })
        this.parameters.jumping.timeline.secondJump.pause()

        //jump 3
        this.parameters.jumping.timeline.thirdJump = gsap.timeline({onStart: this.parameters.jumping.onStart, onComplete: this.parameters.jumping.onComplete})
        this.parameters.jumping.timeline.thirdJump.to(this.parameters.camera.position, {
            y : this.parameters.jumping.height.thirdJump, 
            duration: this.parameters.jumping.speed * 2.2, 
            ease: "power3.out"
        })
        this.parameters.jumping.timeline.thirdJump.pause()

        this.parameters.jumping.timeline.firstJump.pause()
        this.parameters.jumping.timeline.secondJump.pause()
        this.parameters.jumping.timeline.thirdJump.pause()

        this.parameters.camera.position.x = this.camera.position.x
        this.parameters.camera.position.y = this.camera.position.y
        this.parameters.camera.position.z = this.camera.position.z

        MYGUI.addParam({
            object: this.parameters.camera.position,
            prop: "x",
            fromTo: [0, 10.0],
            step: 0.1,
            name: "Camera X",
            listen: true
        })

        MYGUI.addParam({
            object: this.parameters.camera.position,
            prop: "y",
            fromTo: [0, 10.0],
            step: 0.1,
            name: "Camera Y",
            listen: true
        })

        MYGUI.addParam({
            object: this.parameters.camera.position,
            prop: "z",
            fromTo: [0, 10.0],
            step: 0.1,
            name: "Camera Z",
            listen: true
        })

        // MYGUI.addParam({
        //     object: this.parameters.jumping,
        //     prop: "speed",
        //     fromTo: [0, 10.0],
        //     step: 0.1,
        //     name: "Jumping speed",
        //     listen: true
        // })

        // MYGUI.addParam({
        //     object: this.parameters.jumping,
        //     prop: "height",
        //     fromTo: [0, 10.0],
        //     step: 0.1,
        //     name: "Jumping height",
        //     listen: true
        // })

        MainScene.scene.background = new THREE.Color(0x000000)

        RAF.subscribe("scene5", this.update)
        this.addEventListeners()
    }

    stop() {
        RAF.unsubscribe("scene5")
    }

    update() {
        if(this.parameters.jumping.ready && !this.parameters.jumping.isJumping){
            this.parameters.jumping.isJumping = true
            this.parameters.jumping.currentJump += 1;

            switch (this.parameters.jumping.currentJump) {
                case 1:
                    this.parameters.jumping.timeline.firstJump.resume()

                    gsap.to(this.parameters.camera.position, {x: this.camera.position.x + this.parameters.running.distance, duration: this.parameters.jumping.speed*2 - 2, ease: "run"});
                    break;

                case 2:
                    this.parameters.jumping.timeline.secondJump.resume()
                    gsap.to(this.parameters.camera.position, {x: this.camera.position.x + this.parameters.running.distance * 2, duration: this.parameters.jumping.speed * 2 - 2, ease: "run"});
                    break;

                case 3:
                    this.parameters.jumping.timeline.thirdJump.resume()
                    gsap.to(this.parameters.camera.position, {x: this.camera.position.x + this.parameters.running.distance * 3, duration: this.parameters.jumping.speed * 2 - 2, ease: "run"});
                    break;
            
                default:
                    break;
            }   



        }
        
        if(this.parameters.jumping.isJumping){
            this.camera.position.x = this.parameters.camera.position.x
            this.camera.position.y = this.parameters.camera.position.y
            this.camera.position.z = this.parameters.camera.position.z
        }
    }

    onTStart(){
        this.parameters.jumping.ready = true
        this.parameters.running.ready = true
    }

    endScene() {        
        if (this.finished) return
        this.finished = true
        SceneSwitcher.hideScene(this.sceneId)
        PostProcess.fade("in")
        window.removeEventListener('touchstart', this.onTStart)
    }

    loadNextScene() {
        PostProcess.fade("out")
        this.stop()
    }

    addEventListeners(){
        window.addEventListener('touchstart', this.onTStart)
    }

    loadNextScene(){
        if (this.finished) return
        this.finished = true
        console.log("ending")
        SceneSwitcher.hideScene(this.sceneId)
        BlackTrans.in()
        window.removeEventListener('touchstart', this.onTStart)
    }

    bind() {
        this.start = this.start.bind(this)
        this.stop = this.stop.bind(this)
        this.update = this.update.bind(this)
        this.loadNextScene = this.loadNextScene.bind(this)
        this.onTStart = this.onTStart.bind(this)
    }
}

const _instance = new Scene5()
export default _instance

