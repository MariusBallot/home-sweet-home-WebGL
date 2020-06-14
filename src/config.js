const config = {
    allowDesktop: true,
    orCam: eval(localStorage.getItem("camType") || true),
    testScene: false,
    devMode: true,                     //disables all other devMode settings
    devModeScene: 5,                    //skip to scene
    devModeSkipIntro: true,             //dont wait for unity
    devModeLocalSocketServer: false,    //connect to locahost:1234
    devModeShowGUI: false,               //show dat.gui
    devModeWhiteVignette: true
}


export default config