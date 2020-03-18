import * as THREE from 'three'

class LoadingController {
    constructor() {
        this.bind()
        this.progress = 0
        this.callbacks = []
        this.onLoads = []
        this.manager = new THREE.LoadingManager()
        this.manager.onProgress = this.onProgress
        this.manager.onLoad = this.onLoad
        this.manager.onStart = this.onStart
    }
    onStart(url, itemsLoaded, itemsTotal) {
    }
    onProgress(item, loaded, total) {
        this.progress = (loaded / total * 100)
        this.callbacks.forEach(callback => {
            callback.fct(this.progress)
        });

    }

    addCallback(name, fct) {
        this.callbacks.push({ name: name, fct: fct })
    }
    removeCallback(name) {
        this.callbacks.forEach((callback, i) => {
            if (callback.name == name) {
                this.callbacks.splice(i, i + 1)
            }
        });
    }
    addOnLoad(name, fct) {
        this.onLoads.push({ name: name, fct: fct })
    }
    removeOnLoad(name) {
        this.onLoads.forEach((callback, i) => {
            if (callback.name == name) {
                this.onLoads.splice(i, i + 1)
            }
        });
    }

    onLoad(item) {

        if (this.progress >= 100) {
            this.onLoads.forEach(onLoadCallback => {
                onLoadCallback.fct()
            });
        }
    }
    bind() {
        this.onProgress = this.onProgress.bind(this)
        this.onLoad = this.onLoad.bind(this)
        this.addCallback = this.addCallback.bind(this)
        this.removeCallback = this.removeCallback.bind(this)
        this.addOnLoad = this.addOnLoad.bind(this)
        this.removeOnLoad = this.removeOnLoad.bind(this)
        this.onStart = this.onStart.bind(this)
    }
}

const _instance = new LoadingController()
export default _instance