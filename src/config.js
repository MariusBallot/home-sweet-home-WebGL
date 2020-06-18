const config = {
    allowDesktop: true,
    orCam: false,
    testScene: false,
    devMode: false, //disables all other devMode settings except websocketfiltering
    devModeScene: 2, //skip to scene
    devModeSkipIntro: true, //dont wait for unity
    devModeLocalSocketServer: false, //connect to locahost:1234
    devModeShowGUI: false, //show dat.gui
    devModeWhiteVignette: true, //start with a white vignette instead of a black one
    devModeConsoleLogMessage: {
        enabled: false,  //log sent messages to server
        type: "tapSheep" //only this type
    },
    devModeDisableWebsocketFiltering: true, //use all clients
}


export default config