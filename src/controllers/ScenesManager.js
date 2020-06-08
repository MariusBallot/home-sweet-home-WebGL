import config from "../config"

const scenes = [
    {
        name: "Garden",
        camera: null,
        scene: null,
        shader: null,
        url: "/models/Scenes/Garden/scene.gltf",
        scale: 0.01,
    },
    {
        name: "Street",
        camera: null,
        scene: null,
        shader: null,
        url: "/models/Scenes/Street/scene.gltf",
        scale: 0.01,
    },
    {
        name: "Abstract",
        camera: null,
        scene: null,
        shader: null,
        url: "/models/Scenes/TestScene/scene.gltf",
        scale: 0.01,
    },
    {
        name: "Desert",
        camera: null,
        scene: null,
        shader: null,
        url: "/models/Scenes/Desert/scene.gltf",
        scale: 0.01,
    },
    {
        name: "Mountain",
        camera: null,
        scene: null,
        shader: null,
        url: "/models/Scenes/Mountain/scene.gltf",
        scale: 0.01,
    },
    {
        name: "Moon",
        camera: null,
        scene: null,
        shader: null,
        url: "/models/Scenes/Moon/scene.gltf",
        scale: 0.01,
    },
]
if (config.testScene)
    scenes.push({
        name: "TestScene",
        camera: null,
        scene: null,
        url: "/models/Scenes/TestScene/scene.gltf"
    })

export default scenes