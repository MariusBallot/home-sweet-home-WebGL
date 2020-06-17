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

    addEventListener(){
        window.addEventListener('touchstart', this.shoot)
    }

    addOnShoots({ name, callback }) {
        this.onShoots.push({ name: name, callback: callback })
    }

    setTarget({ camera, scene }) {
        this.targetCamera = camera
        this.targetScene = scene
    }

    shoot(event) {
        this.shootingPoint.x = (event.touches[0].clientX / window.innerWidth) * 2 - 1;
        this.shootingPoint.y = - (event.touches[0].clientY / window.innerHeight) * 2 + 1;
        console.log(this.shootingPoint)

        this.raycaster.setFromCamera(this.shootingPoint, this.targetCamera);

        // calculate objects intersecting the picking ray
        var intersects = this.raycaster.intersectObjects(this.targetScene.children, true);
        for (var i = 0; i < intersects.length; i++) {
            this.onShoots.forEach(onShoot => {
                onShoot.callback(intersects[i])
            });
        }
    }


    bind() {
        this.shoot = this.shoot.bind(this)
        this.addOnShoots = this.addOnShoots.bind(this)
        this.addEventListener = this.addEventListener.bind(this)
    }
}

const _instance = new RaycastController()
export default _instance