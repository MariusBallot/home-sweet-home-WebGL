import * as THREE from "three"
import RAF from "../../utils/raf"
import SceneSwitcher from '../../controllers/SceneSwitcher'
import BlackTrans from "../BlackTrans"
import Scene5 from '../SceneClasses/Scene5'
import PostProcess from '../PostProcess'
import SocketServer from '../../SocketServer'
import MainScene from '../MainScene'
 
class Scene4 {
    constructor() {
        this.bind()
        this.touchPos = new THREE.Vector2()
        this.clickTime = new Date();
		this.finished = false;
		this.sceneId = 4
	}
	
    start({ camera, scene }) {
        this.camera = camera
        this.scene = scene

        RAF.subscribe("scene4", this.update)
        
        this.addEventListeners()
    }

    stop() {
        RAF.unsubscribe("scene4")
    }

    update() {

    }

    onTStart(){
        SocketServer.sendToServer("tapSheep", "tapped");
    }

    disappear(){
        MainScene.scene.background = new THREE.Color(0x000000)
        SceneSwitcher.disappear(this.sceneId)
        setTimeout(() => {
            BlackTrans.in();
        }, 300);
    }

    appear(){
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
        window.removeEventListener('touchstart', this.onTStart)
    }

    loadNextScene() {
        // BlackTrans.out()
        PostProcess.fade("out")
        SceneSwitcher.showScene(this.sceneId+1)
        Scene5.start({camera: this.camera, scene: this.camera})
        this.stop()
    }

    onReadyForNextScene(message) {
        console.log(JSON.parse(message));
        if(this.finished){
            window.EM.off('readyForNextScene', this.onReadyForNextScene)
            this.loadNextScene()
        }
    }

    addEventListeners(){
        window.addEventListener('touchstart', this.onTStart)
        window.EM.on('readyForNextScene', this.onReadyForNextScene)
        window.EM.on('dropPhone', ()=>{this.disappear()})
        window.EM.on('liftPhone', ()=>{this.appear()})
    }

    bind() {
        this.start = this.start.bind(this)
        this.stop = this.stop.bind(this)
        this.update = this.update.bind(this)
        this.loadNextScene = this.loadNextScene.bind(this)
        this.onTStart = this.onTStart.bind(this)
        this.addEventListeners = this.addEventListeners.bind(this)
        this.onReadyForNextScene = this.onReadyForNextScene.bind(this)
    }
}

const _instance = new Scene4()
export default _instance

