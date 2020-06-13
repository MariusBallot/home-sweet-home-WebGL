const config = {
    allowDesktop: true,
    orCam: eval(localStorage.getItem("camType") || true),
    testScene: false,
    devMode: false,
    devModeScene: 0,
    devModeSkipIntro: false,
    devModeLocalSocketServer: false,
    devModeShowGUI: false
}


export default config