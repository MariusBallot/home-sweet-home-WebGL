import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import LoadingController from "../controllers/LoadingController"
import Scenes from "../controllers/ScenesManager"
import * as THREE from 'three'


class SceneLoader {
    constructor() {
        this.bind()
        this.loader = new GLTFLoader(LoadingController.manager)
    }


    start() {
        // for (let i = 0; i < sceneCount; i++) {
        //     this.loader.load('/models/Scene' + i + '.glb', (glb) => {
        //         console.log(glb)
        //         this.scenes.push(glb.scene)
        //         this.cameras.push(glb.cameras[0])
        //         glb.scene.traverse((child) => {
        //             if (child.name == "Floor") {
        //                 child.material = new THREE.MeshBasicMaterial({
        //                     map: new THREE.TextureLoader().load('/Textures/FloorBaking.png')
        //                 })
        //             }
        //         })
        //         if (i == sceneCount - 1) {
        //             onloaded()
        //         }
        //     })
        // }

        Scenes.forEach(scene => {
            this.loader.load(scene.url, (gltf) => {
                scene.scene = gltf.scene
                if (scene.scale)
                    scene.scene.scale.set(scene.scale, scene.scale, scene.scale)
                if (gltf.cameras[0] != undefined)
                    scene.camera = gltf.cameras[0]


            })
        });
    }

    show(sceneID) {
        this.currentCam = this.cameras[0]
        this.scene.add(this.scenes[sceneID])
    }

    hide(sceneID) {
        this.scene.remove(this.scenes[sceneID])
    }

    bind() {
        this.start = this.start.bind(this)
        this.show = this.show.bind(this)
        this.hide = this.hide.bind(this)
    }
}

const _instance = new SceneLoader()

export default _instance