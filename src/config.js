const config = {
    allowDesktop: true,
    orCam: eval(localStorage.getItem("camType") || true),
    testScene: false,
    devMode: true,
    devModeScene: 0,
    devModeLocalSocketServer: false,
    devModeShowGUI: true
}


export default config