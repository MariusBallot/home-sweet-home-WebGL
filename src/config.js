const config = {
    allowDesktop: true,
    orCam: eval(localStorage.getItem("camType") || true),
    testScene: false,
    devMode: false,                     //disables all other devMode settings
    devModeScene: 0,                    //skip to scene
    devModeSkipIntro: false,             //dont wait for unity
    devModeLocalSocketServer: false,    //connect to locahost:1234
    devModeShowGUI: false,               //show dat.gui
    devModeWhiteVignette: true,
    devModeConsoleLogMessage: {
        enabled: false,  //log sent messages to server
        type: "tapSheep" //only this type
    },
}


export default config