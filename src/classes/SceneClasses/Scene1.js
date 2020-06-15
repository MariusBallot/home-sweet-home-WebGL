import * as THREE from "three"
import RAF from "../../utils/raf"
import Boids from './boidStuff/Boids'
import SceneSwitcher from '../../controllers/SceneSwitcher'
import BlackTrans from "../BlackTrans"
import Scene2 from '../SceneClasses/Scene2'
import Characters from '../../controllers/CharactersManager'

class Scene1 {
    constructor() {
        this.bind()
        this.touchPos = new THREE.Vector2()
        this.clickTime = new Date();
        this.finished = false;
        this.sceneId = 1
    }

    start({ camera, scene }) {
        this.camera = camera
        this.scene = scene

        Characters.forEach(char => {
            if (char.name == "birdHand")
                this.birdHand = char
        });
        console.log(this.birdHand)

        this.BHModel = this.birdHand.model.scene
        this.BHAnims = this.birdHand.actions

        this.BHAnims.forEach(anim => {
            anim.loop = THREE.LoopOnce
            anim.clampWhenFinished = true
            anim.play()
            anim.paused = true
        });

        this.scene.add(this.BHModel)

        Boids.init({
            scene: this.scene,
        })
        RAF.subscribe("scene1", this.update)

        window.addEventListener('touchstart', this.onTStart)
    }

    stop() {
        RAF.unsubscribe("scene1")
    }

    update() {
        this.BHModel.position.copy(this.camera.position)
        this.BHModel.quaternion.copy(this.camera.quaternion)
    }

    onTStart() {
        console.log('hey')

        this.BHAnims.forEach(anim => {
            anim.play()
            anim.paused = false

        });
        //touch twice in a second to load next scene
        const newClickTime = new Date();
        console.log(newClickTime)
        if (newClickTime.getSeconds() === this.clickTime.getSeconds()) {
            this.loadNextScene();
        } else {
            this.clickTime = newClickTime;
        }
    }

    loadNextScene() {
        if (this.finished) return
        this.finished = true
        console.log("switching")
        SceneSwitcher.hideScene(this.sceneId)
        BlackTrans.in()
        window.removeEventListener('touchstart', this.onTStart)
        Boids.stop();
        setTimeout(() => {
            BlackTrans.out()
            SceneSwitcher.showScene(this.sceneId + 1)
            Scene2.start({ camera: this.camera, scene: this.camera })
            this.stop()
        }, 2000)
    }

    bind() {
        this.start = this.start.bind(this)
        this.stop = this.stop.bind(this)
        this.update = this.update.bind(this)
        this.loadNextScene = this.loadNextScene.bind(this)
        this.onTStart = this.onTStart.bind(this)

        // window.addEventListener('touchstart', this.onTStart)
        // window.addEventListener('touchend', this.onTEnd)
    }
}

const _instance = new Scene1()
export default _instance

