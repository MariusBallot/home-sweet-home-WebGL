import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import * as THREE from 'three'


class SceneLoader {
    constructor() {
        this.bind()
        this.scenes = []
        this.cameras = []
        this.currentCam
    }


    load(scene, onloaded) {
        this.scene = scene
        const sceneCount = 1
        for (let i = 0; i < sceneCount; i++) {
            new GLTFLoader().load('/models/Scene' + i + '.glb', (glb) => {
                console.log(glb)
                this.scenes.push(glb.scene)
                this.cameras.push(glb.cameras[0])
                glb.scene.traverse((child) => {
                    if (child.name == "Floor") {
                        child.material = new THREE.MeshBasicMaterial({
                            map: new THREE.TextureLoader().load('/Textures/FloorBaking.png')
                        })
                    }
                })
                if (i == sceneCount - 1) {
                    onloaded()
                }
            }, function (xhr) {

                console.log((xhr.loaded / xhr.total * 100) + '% loaded');

            })
        }
    }

    show(sceneID) {
        this.currentCam = this.cameras[0]
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