import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import LoadingController from './LoadingController'

class ModelLoader {
    constructor() {
        this.bind()
        this.loader = new GLTFLoader(LoadingController.manager)
        this.models = [
            {
                url: "models/Home/0/scene.gltf"
            },
            {
                url: "models/Home/1/scene.gltf"
            },
            {
                url: "models/Home/2/scene.gltf"
            },
        ]
    }
    start() {
        this.models.forEach(model => {
            this.loader.load(model.url, (obj) => {
                model.scene = obj
                console.log(model.scene)
            })
        });
    }

    bind() {
        this.start = this.start.bind(this)
    }


}


const _instance = new ModelLoader()
export default _instance