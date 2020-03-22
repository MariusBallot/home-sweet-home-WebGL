import * as THREE from 'three'

class RaycastController {
    constructor() {
        this.bind()
        this.raycaster = new THREE.Raycaster()
        this.shootingPoint = new THREE.Vector2();

        this.onShoots = []

        this.targetCamera
        this.targetScene
    }

    addOnShoots({ name, callback }) {
        this.onShoots.push({ name: name, callback: callback })
    }

    setTarget({ camera, scene }) {
        this.targetCamera = camera
        this.targetScene = scene
    }

    shoot(event) {
        this.shootingPoint.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.shootingPoint.y = - (event.clientY / window.innerHeight) * 2 + 1;

        this.raycaster.setFromCamera(this.shootingPoint, this.targetCamera);

        // calculate objects intersecting the picking ray
        var intersects = this.raycaster.intersectObjects(this.targetScene.children);

        for (var i = 0; i < intersects.length; i++) {
            this.onShoots.forEach(onShoot => {
                onShoot.callback(intersects[i])
            });
            intersects[i].object.material.color.set(0xff0000);

        }
    }


    bind() {
        this.shoot = this.shoot.bind(this)
        this.addOnShoots = this.addOnShoots.bind(this)

        window.addEventListener('click', this.shoot)
    }
}

const _instance = new RaycastController()
export default _instance