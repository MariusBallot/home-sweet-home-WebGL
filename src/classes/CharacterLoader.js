import * as THREE from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"

import LoadingController from "../controllers/LoadingController"
import Characters from "../controllers/CharactersManager"

import RAF from '../utils/raf'
class CharacterLoader {
    constructor() {
        this.bind()
        this.loader = new GLTFLoader(LoadingController.manager)
    }

    start() {
        Characters.forEach(character => {
            console.log(character)
            this.loader.load(character.url, (obj) => {
                console.log(obj)
                character.model = obj
                if (character.scale != undefined)
                    character.model.scene.scale.set(character.scale, character.scale, character.scale)
                character.mixer = new THREE.AnimationMixer(character.model.scene)
                character.actions = []
                obj.animations.forEach((animation, i) => {
                    console.log(animation.name, animation.duration)
                    character.actions.push(character.mixer.clipAction(animation))
                    character.actions[i].play()
                });
            })
        })
        RAF.subscribe('CharacterLoaderUpdate', this.update)
    }

    update() {
        Characters.forEach(character => {
            if (character.mixer != undefined) {
                character.mixer.update(RAF.dt * 0.001)
            }
        });
    }

    bind() {
        this.start = this.start.bind(this)
        this.update = this.update.bind(this)
    }
}

const _instance = new CharacterLoader()
export default _instance