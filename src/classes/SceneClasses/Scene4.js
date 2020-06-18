import * as THREE from "three"
import RAF from "../../utils/raf"
import SceneSwitcher from '../../controllers/SceneSwitcher'
import BlackTrans from "../BlackTrans"
import Scene5 from '../SceneClasses/Scene5'
import PostProcess from '../PostProcess'
import SocketServer from '../../SocketServer'
import MainScene from '../MainScene'
import Characters from '../../controllers/CharactersManager'
import RaycastController from '../../controllers/RaycastController'
import { TweenLite, Power1 } from 'gsap'

class Scene4 {
    constructor() {
        this.bind()
        this.touchPos = new THREE.Vector2()
        this.clickTime = new Date();
        this.finished = false;
        this.sceneId = 4

        this.haterTouch = 0
        this.haterFlag = true
    }

    start({ camera, scene }) {
        this.camera = camera
        this.scene = scene

        this.camera.position.x = 0
        this.camera.position.z = 0

        this.sheeps = []

        Characters.forEach(char => {
            if (char.name.includes("sheep")) {
                this.sheeps.push(char)
                this.scene.add(char.model.scene)
            }
        })
        console.log(this.scene)
        console.log(this.sheeps)

        this.sheeps.forEach(sheep => {
            sheep.actions.forEach(action => {
                console.log(action._clip.name)
                if (action._clip.name.includes("idle"))
                    action.play()

            })
        })

        // MainScene.orControls.alphaOffset = -Math.PI

        RAF.subscribe("scene4", this.update)
        RaycastController.addEventListener();
        RaycastController.setTarget({ camera: this.camera, scene: this.scene })
        RaycastController.addOnShoots({ name: 'sheepOnShoot', callback: this.onShoot })

        console.log(this.scene)

        this.addEventListeners()
    }

    onShoot(e) {
        if (e.object.parent.parent.name.includes("hater"))
            this.touchedHater()
        // else if (e.object.parent.parent.name.includes("mouton"))
        console.log(e.object)
    }

    touchedHater() {
        console.log("heyyy")
        if (!this.haterFlag)
            return
        this.haterFlag = false
        if (this.haterFlag == 0)
            SocketServer.sendToServer("tapSheep", "tapped");
        this.haterTouch++
        if (this.haterTouch == 2) {
            this.sheeps.forEach(sheep => {
                if (sheep.name.includes('hater')) {
                    console.log('hate')
                    sheep.actions.forEach(action => {
                        console.log(action._clip.name)
                        if (action._clip.name.includes("idle"))
                            action.fadeOut(0.5)
                        if (action._clip.name.includes("run")) {
                            action.play()
                            action.fadeIn(0.5)
                        }
                        TweenLite.to(sheep.model.scene.position, 1, {
                            z: -10,
                            ease: Power1.easeIn,
                            onComplete: () => {
                                SocketServer.sendToServer("tapSheep", "tapped");
                            }
                        })

                    })
                }
            })
        }

        setTimeout(() => { this.haterFlag = true }, 500)
    }

    stop() {
        this.sheeps.forEach(sheep=>{
            sheep.model.visible = false;
            sheep.model.scene.position.y = -10;
        })
        RAF.unsubscribe("scene4")
    }

    update() {
        console.log(1)
    }

    disappear() {
        MainScene.scene.background = new THREE.Color(0x000000)
        SceneSwitcher.disappear(this.sceneId)
        setTimeout(() => {
            BlackTrans.in();
        }, 300);
    }

    appear() {
        this.scene.background = new THREE.Color(0xB8C6D1)
        BlackTrans.out();
        setTimeout(() => {
            SceneSwitcher.appear(this.sceneId)
        }, 300);
        setTimeout(() => {
            this.endScene()
        }, 5000);
    }

    endScene() {
        if (this.finished) return
        this.finished = true
        console.log("switching")
        SceneSwitcher.hideScene(this.sceneId)
        // BlackTrans.in()
        PostProcess.fade("in")
    }

    loadNextScene() {
        // MainScene.orControls.alphaOffset = -Math.PI/2
        // BlackTrans.out()
        PostProcess.fade("out")
        SceneSwitcher.showScene(this.sceneId + 1)
        Scene5.start({ camera: this.camera, scene: this.scene })
        this.stop()
    }

    onReadyForNextScene(message) {
        console.log(JSON.parse(message));
        if (this.finished) {
            window.EM.off('readyForNextScene', this.onReadyForNextScene)
            this.loadNextScene()
        }
    }

    addEventListeners() {
        window.EM.on('readyForNextScene', this.onReadyForNextScene)
        window.EM.on('dropPhone', () => { this.disappear() })
        window.EM.on('liftPhone', () => { this.appear() })
    }

    bind() {
        this.start = this.start.bind(this)
        this.stop = this.stop.bind(this)
        this.update = this.update.bind(this)
        this.loadNextScene = this.loadNextScene.bind(this)
        this.addEventListeners = this.addEventListeners.bind(this)
        this.onReadyForNextScene = this.onReadyForNextScene.bind(this)
        this.onShoot = this.onShoot.bind(this)
    }
}

const _instance = new Scene4()
export default _instance

