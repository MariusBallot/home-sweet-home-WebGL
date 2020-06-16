import * as THREE from "three"
import RAF from "../../utils/raf"
import Boids from './boidStuff/Boids'
import SceneSwitcher from '../../controllers/SceneSwitcher'
// import BlackTrans from "../BlackTrans"
import Scene2 from '../SceneClasses/Scene2'
import PostProcess from '../PostProcess'
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

        this.addEventListeners()
    }

	onTEnd(e) {
		let d = this.touchPos.distanceTo(new THREE.Vector2(e.changedTouches[0].clientX, e.changedTouches[0].clientY));
		if (d >= 200 && this.touchPos.y > e.changedTouches[0].clientY) {
			this.throw();
		}
	}

    stop() {
        Boids.stop()
        this.scene.remove(this.BHModel)
        RAF.unsubscribe("scene1")
    }

    update() {
        this.BHModel.position.copy(this.camera.position)
        this.BHModel.quaternion.copy(this.camera.quaternion)
    }

    onTStart(e) {
        this.touchPos.x = e.touches[0].clientX;
        this.touchPos.y = e.touches[0].clientY;

        //touch twice to lift arm
        const newClickTime = new Date();
        if(newClickTime.getSeconds() === this.clickTime.getSeconds()){
            this.BHAnims.forEach(anim => {
                anim.play()
                anim.paused = false
            });
            setTimeout(() => {
                this.endScene()
            }, 5000);
        }else{
            this.clickTime = newClickTime;
        }
    }

    onTEnd(e) {
        let d = this.touchPos.distanceTo(new THREE.Vector2(e.changedTouches[0].clientX, e.changedTouches[0].clientY));
		if (d >= 150 && this.touchPos.y > e.changedTouches[0].clientY) {
			Boids.blowed = true
		}
    }

    endScene() {        
        if (this.finished) return
        this.finished = true
        console.log("switching")
        SceneSwitcher.hideScene(this.sceneId)
        // BlackTrans.in()
        PostProcess.fade("in")
        window.removeEventListener('touchstart', this.onTStart)
        window.removeEventListener('touchend', this.onTEnd);
        Boids.stop();
    }

    loadNextScene() {
        // BlackTrans.out()
        PostProcess.fade("out")
        SceneSwitcher.showScene(this.sceneId+1)
        Scene2.start({camera: this.camera, scene: this.camera})
        this.stop()
    }

    addEventListeners(){
        const onReadyForNextScene = (message) => {
            console.log(JSON.parse(message));
            if(this.finished){
                window.EM.off('readyForNextScene', onReadyForNextScene)
                this.loadNextScene()
            }
        }
        window.addEventListener('touchstart', this.onTStart)
        window.addEventListener('touchend', this.onTEnd);
        window.EM.on('readyForNextScene', onReadyForNextScene)
    }

    bind() {
        this.start = this.start.bind(this)
        this.stop = this.stop.bind(this)
        this.update = this.update.bind(this)
        this.loadNextScene = this.loadNextScene.bind(this)
        this.onTStart = this.onTStart.bind(this)
        this.onTEnd = this.onTEnd.bind(this);
    }
}

const _instance = new Scene1()
export default _instance

