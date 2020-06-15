import SocketServer from '../SocketServer'
import Scenes from './ScenesManager'
import * as THREE from "three"

class SceneSwitcher {
    constructor() {
        this.bind()
    }

    init({ scene }) {
        this.scene = scene
    }

    hideScene(sceneId) {
        SocketServer.sendToServer('changeScene', { from: this.currentSceneId, to: (this.currentSceneId + 1) % Scenes.length })


        setTimeout(() => { this.scene.remove(Scenes[sceneId].scene) }, 999)
    }

    disappear(sceneId) {
        Scenes[sceneId].scene.traverse(child => {
            if (child instanceof THREE.Mesh) {
                if (child._shader != undefined)
                    child._shader.out()
            }
        })
    }

    appear(sceneId) {
        Scenes[sceneId].scene.traverse(child => {
            if (child instanceof THREE.Mesh) {
                if (child._shader != undefined)
                    child._shader.in()
            }
        })
    }

    showScene(sceneId) {
        console.log(Scenes[sceneId].name)
        this.scene.add(Scenes[sceneId].scene)
        this.appear(sceneId)
    }

    bind() {
        this.init = this.init.bind(this)
        this.hideScene = this.hideScene.bind(this)
        this.showScene = this.showScene.bind(this)
    }
}

const _instance = new SceneSwitcher()
export default _instance 