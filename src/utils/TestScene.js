import * as THREE from "three"

function sceneMaker() {
    const scene = new THREE.Scene()
    const cubetextureLoader = new THREE.CubeTextureLoader()

    cubetextureLoader.path = "/Textures/CubeMaps/SimpleGrass/"
    var textureCube = cubetextureLoader.load([
        'px.png', 'nx.png',
        'py.png', 'ny.png',
        'pz.png', 'nz.png'
    ]);

    scene.background = textureCube

    for (let i = 0; i < Math.PI * 2; i += Math.PI * 2 / 10) {
        let box = new THREE.Mesh(new THREE.BoxGeometry(), new THREE.MeshNormalMaterial())
        let x = Math.cos(i) * 5
        let z = Math.sin(i) * 5
        box.position.set(x, 0, z)
        scene.add(box)
    }
    return scene
}

const TestScene = sceneMaker()
export default TestScene