import * as THREE from "three"
import RAF from "../../utils/raf"
import Boids from './boidStuff/Boids'
import SceneSwitcher from '../../controllers/SceneSwitcher'
import BlackTrans from "../BlackTrans"
import Scene2 from '../SceneClasses/Scene2'

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

    }

    onTStart(){
        //touch twice in a second to load next scene
        const newClickTime = new Date();
        console.log(newClickTime)
        if(newClickTime.getSeconds() === this.clickTime.getSeconds()){
            this.loadNextScene();
        }else{
            this.clickTime = newClickTime;
        }
    }

    loadNextScene(){
        if (this.finished) return
        this.finished = true
        console.log("switching")
        SceneSwitcher.hideScene(this.sceneId)
        BlackTrans.in()
        window.removeEventListener('touchstart', this.onTStart)
        setTimeout(() => {
            BlackTrans.out()
            SceneSwitcher.showScene(this.sceneId+1)
            Scene2.start({camera: this.camera, scene: this.camera})
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

