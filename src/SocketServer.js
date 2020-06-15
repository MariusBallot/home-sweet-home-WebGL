import SoundController from "./controllers/SoundController"
import config from './config'

class SocketServer {
    constructor() {
        this.bind()

        this.WEBSOCKET
        this.connected
    }

    start() {
        const url = config.devMode && config.devModeLocalSocketServer ? "ws://localhost:1234" : "wss://home-sweet-home--ws.herokuapp.com/"

        this.WEBSOCKET = new WebSocket(url)

        this.WEBSOCKET.onopen = this.onServerOpen
        this.WEBSOCKET.onmessage = this.onServerMessage
    }

    sendToServer(typeString, value) {
        if (this.WEBSOCKET.readyState === this.WEBSOCKET.CLOSED) return

        const id = sessionStorage.getItem('accessKey') ? sessionStorage.getItem('accessKey') : "";
        const message = { id: id, type: typeString, message: JSON.stringify(value) }
        const string = JSON.stringify(message)

        if (config.devModeConsoleLogMessage.enabled && config.devModeConsoleLogMessage.type === typeString) console.log(string)

        this.WEBSOCKET.send(string)
    }

    onServerOpen() {
        this.connected = true
        console.log("connected")
    }

    onServerMessage(event) {
        let data
        let message
        if (event.data instanceof Blob) {
            event.data.text().then(text => {
                data = this.getWebSocketDataFromBlobText(text) //{id:..., type:...,message:{...}}
                message = JSON.parse(data.message)
                if(config.devMode) console.log(data.id, data.type, message)
                switch (data.type) {
                    case 'sound':
                        SoundController.onNotif();
                        break;
                    case 'readyForNextScene':
                        window.EM.emit('readyForNextScene', JSON.stringify(message));
                        break;
                    case 'readyToSwipe':
                        window.EM.emit('readyToSwipe', JSON.stringify(message));
                        break;
                    case 'isDead':
                        window.EM.emit('end')
                        break;
                    case 'showCredits':
                        window.EM.emit('showCredits')
                        break;
                    case 'dropPhone':
                        console.log("dropPhone")
                        window.EM.emit('dropPhone')
                        break;
                    case 'liftPhone':
                        window.EM.emit('liftPhone')
                        break;
                    default:
                        break;
                }
            })
        }
    }

    getWebSocketDataFromBlobText(text) {
        const regex = /.*(type)(\W)(.*)(\W)(message)(\W)(.*)(\W)(id)(\W)(.*).*/gm
        let matches
        let data = {
            id: '',
            type: '',
            message: {},
        }

        while ((matches = regex.exec(text)) !== null) {
            // This is necessary to avoid infinite loops with zero-width matches
            if (matches.index === regex.lastIndex) {
                regex.lastIndex++
            }

            // The result can be accessed through the `matches`-variable.
            matches.forEach((match, groupIndex) => {
                switch (groupIndex) {
                    case 3:
                        data.type = match
                        break
                    case 7:
                        data.message = match
                        break
                    case 11:
                        data.id = match
                        break
                    default:
                        break
                }
            })
        }

        return data
    }

    bind() {
        this.sendToServer = this.sendToServer.bind(this)
        this.onServerOpen = this.onServerOpen.bind(this)
        this.onServerMessage = this.onServerMessage.bind(this)
    }
}

const _instance = new SocketServer()
export default _instance
