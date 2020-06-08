import * as THREE from "three"
import RAF from "../../utils/raf"
import SceneSwitcher from '../../controllers/SceneSwitcher'
import BlackTrans from "../BlackTrans"
import Scene3 from '../SceneClasses/Scene3'
// import MainScene from '../MainScene'

class Scene2 {
    constructor() {
        this.bind()
        this.touchPos = new THREE.Vector2()
        this.clickTime = new Date();
		this.finished = false;
		this.sceneId = 2
	}
	
    start({ camera, scene }) {
        this.camera = camera
		this.scene = scene

		// MainScene.scene.background = new THREE.Color(0xCCA770);
        RAF.subscribe("scene2", this.update)
        
        window.addEventListener('touchstart', this.onTStart)
    }

    stop() {
        RAF.unsubscribe("scene2")
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
			Scene3.start({camera: this.camera, scene: this.camera})
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

const _instance = new Scene2()
export default _instance

