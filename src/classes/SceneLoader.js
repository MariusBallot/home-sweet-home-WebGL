import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'


class SceneLoader {
    constructor() {
        this.bind()
        this.scenes = []
    }


    load(scene, onloaded) {
        this.scene = scene
        const sceneCount = 1
        for (let i = 0; i < sceneCount; i++) {
            new GLTFLoader().load('/models/test' + i + '.glb', (obj) => {
                console.log(obj)
                this.scenes.push(obj.scene)
                if (i == sceneCount - 1) {
                    onloaded()
                }
            }, function (xhr) {

                console.log((xhr.loaded / xhr.total * 100) + '% loaded');

            })
        }
    }

    show(sceneID) {
        this.scene.add(this.scenes[sceneID])
    }

    hide(sceneID) {
        this.scene.remove(this.scenes[sceneID])
    }

    bind() {
        this.load = this.load.bind(this)
        this.show = this.show.bind(this)
        this.hide = this.hide.bind(this)
    }
}

const _instance = new SceneLoader()

export default _instance