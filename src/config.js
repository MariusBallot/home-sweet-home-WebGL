const config = {
    allowDesktop: true,
    orCam: eval(localStorage.getItem("camType") || true),
    testScene: false,
    devMode: false,                     //disables all other devMode settings
    devModeScene: 0,                    //skip to scene
    devModeSkipIntro: false,             //dont wait for unity
    devModeLocalSocketServer: false,    //connect to locahost:1234
    devModeShowGUI: false               //show dat.gui
}


export default config