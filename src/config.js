const config = {
    allowDesktop: true,
    orCam: false,
    testScene: false,
<<<<<<< HEAD
    devMode: false,
    devModeScene: 1,
    devModeLocalSocketServer: false,
    devModeShowGUI: false
=======
    devMode: false, //disables all other devMode settings
    devModeScene: 0, //skip to scene
    devModeSkipIntro: false, //dont wait for unity
    devModeLocalSocketServer: false, //connect to locahost:1234
    devModeShowGUI: false, //show dat.gui
    devModeWhiteVignette: false, //start with a white vignette instead of a black one
    devModeConsoleLogMessage: {
        enabled: false,  //log sent messages to server
        type: "tapSheep" //only this type
    },
>>>>>>> cf662fb42c94e8db24c9e5a9b8daf0a33010ad76
}


export default config