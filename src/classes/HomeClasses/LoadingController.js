import * as THREE from 'three'

class LoadingController {
    constructor() {
        this.bind()
        this.progress = 0
        this.onProgresses = []
        this.onLoads = []
        this.manager = new THREE.LoadingManager()
        this.manager.onProgress = this.onProgress
        this.manager.onLoad = this.onLoad
        this.manager.onStart = this.onStart
        this.manager.onError = (error) => {
            console.log(error)
        }
    }
    onStart(url, itemsLoaded, itemsTotal) {
    }
    onProgress(item, loaded, total) {
        this.progress = (loaded / total * 100)
        this.onProgresses.forEach(callback => {
            callback.fct(this.progress)
        });

    }

    addOnProgress(name, fct) {
        this.onProgresses.push({ name: name, fct: fct })
    }
    removeOnProgress(name) {
        this.onProgresses.forEach((callback, i) => {
            if (callback.name == name) {
                this.onProgresses.splice(i, i + 1)
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
        this.addOnProgress = this.addOnProgress.bind(this)
        this.removeOnProgress = this.removeOnProgress.bind(this)
        this.addOnLoad = this.addOnLoad.bind(this)
        this.removeOnLoad = this.removeOnLoad.bind(this)
        this.onStart = this.onStart.bind(this)
    }
}

const _instance = new LoadingController()
export default _instance