import CANNON from "cannon"
import * as THREE from "three"
import RAF from '../utils/raf'
class PhysicsEngine {
    constructor() {
        this.bind()
        this.world = new CANNON.World()
        this.timeStep = 1 / 60
        this.world.gravity.set(0, -9.18, 0);
        this.world.broadphase = new CANNON.NaiveBroadphase();
        this.world.solver.iterations = 10

        this.bodyObjs = []
    }

    start() {
        RAF.subscribe('physicsUpdate', this.update)
    }

    addBody({ name, mesh, type, active, mass }) {
        let bodyObj = {
            name: name,
            mesh: mesh,
            active: active,
            mass: mass || 1,
            children: []
        }
        if (active == undefined)
            bodyObj.active = true


        if (type == "ground") {
            var groundMaterial = new CANNON.Material();
            groundMaterial.friction = .4;
            bodyObj.body = new CANNON.Body({ mass: 0, shape: new CANNON.Plane() });
            bodyObj.body.material = groundMaterial
            bodyObj.body.position.copy(mesh.position)
            bodyObj.body.quaternion.copy(mesh.quaternion)
        }

        if (type == "box") {
            let boxParams = mesh.geometry.parameters
            let groundMaterial = new CANNON.Material();
            groundMaterial.friction = .4;
            bodyObj.body = new CANNON.Body({
                mass: bodyObj.mass,
                shape: new CANNON.Box(new CANNON.Vec3(boxParams.width / 2, boxParams.height / 2, boxParams.depth / 2))
            });
            bodyObj.body.material = groundMaterial
            bodyObj.body.position.copy(mesh.position)
            bodyObj.body.quaternion.copy(mesh.quaternion)
        }

        if (type == "sphere") {
            let sphereParams = mesh.geometry.parameters
            let groundMaterial = new CANNON.Material();
            groundMaterial.friction = .4;
            bodyObj.body = new CANNON.Body({
                mass: bodyObj.mass,
                shape: new CANNON.Sphere(sphereParams.radius)
            });
            bodyObj.body.angularDamping = 0.8
            bodyObj.body.material = groundMaterial
            bodyObj.body.position.copy(mesh.position)
            bodyObj.body.quaternion.copy(mesh.quaternion)
        }

        if (bodyObj.active == true) {
            this.world.add(bodyObj.body);
        }
        this.bodyObjs.push(bodyObj)
        return bodyObj
    }

    addForce({ name, dir, pos, power }) {

        this.bodyObjs.forEach((bodyObj, i) => {
            if (bodyObj.name == name) {
                bodyObj.body.applyForce(new CANNON.Vec3(dir.x * power, dir.y * power, dir.z * power), new CANNON.Vec3(pos.x, pos.y, pos.z))
            }
        });
    }

    attachTo({ mesh, parentName }) {
        this.bodyObjs.forEach((bodyObj, i) => {
            if (bodyObj.name == parentName) {
                console.log(mesh)
                bodyObj.children.push(mesh)
            }
        });
    }

    activate(bodyName) {

        this.bodyObjs.forEach((bodyObj, i) => {
            if (bodyObj.name == bodyName) {
                this.world.add(bodyObj.body);
                console.log(bodyObj.active)
                bodyObj.active = true

            }
        });
    }

    update() {
        this.world.step(this.timeStep);

        this.bodyObjs.forEach(bodyObj => {
            if (bodyObj.active == false) {
                bodyObj.body.position.copy(bodyObj.mesh.position)
                bodyObj.body.quaternion.copy(bodyObj.mesh.quaternion);
            }
            else {
                bodyObj.mesh.position.copy(bodyObj.body.position)
                bodyObj.mesh.quaternion.copy(bodyObj.body.quaternion);
                bodyObj.children.forEach(child => {
                    child.position.copy(bodyObj.body.position)
                    child.quaternion.copy(bodyObj.body.quaternion);
                });
            }
        });
    }

    bind() {
        this.start = this.start.bind(this)
        this.update = this.update.bind(this)
        this.addBody = this.addBody.bind(this)
        this.addForce = this.addForce.bind(this)
        this.activate = this.activate.bind(this)
        this.attachTo = this.attachTo.bind(this)
    }

}

const _instance = new PhysicsEngine()
export default _instance