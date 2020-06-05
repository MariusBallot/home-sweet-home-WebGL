import SoundController from "./controllers/SoundController"

class SocketServer {
    constructor() {
        this.bind()

        this.WEBSOCKET
        this.connected
        this.DEBUG_MODE = true;
    }

    start() {
        const url = this.DEBUG_MODE ? "ws://localhost:1234" : "wss://home-sweet-home--ws.herokuapp.com/"

        this.WEBSOCKET = new WebSocket(url)

        this.WEBSOCKET.onopen = this.onServerOpen
        this.WEBSOCKET.onmessage = this.onServerMessage
    }

    sendToServer(typeString, value) {
        if (this.WEBSOCKET.readyState === this.WEBSOCKET.CLOSED) return

        const id = sessionStorage.getItem('accessKey') ? sessionStorage.getItem('accessKey') : "";
        const message = { id: id, type: typeString, message: JSON.stringify(value) }
        const string = JSON.stringify(message)

        this.WEBSOCKET.send(string)
    }

    onServerOpen() {
        this.connected = true
    }

    onServerMessage(event) {
        let data
        let message
        if (event.data instanceof Blob) {
            event.data.text().then(text => {
                data = this.getWebSocketDataFromBlobText(text) //{id:..., type:...,message:{...}}
                message = JSON.parse(data.message)
                // if(this.DEBUG_MODE) console.log(data.id, data.type, message)
                switch (data.type) {
                    case 'sound':
                        SoundController.onNotif();
                        break;
                    case 'readyForNextScene':
                        window.EM.emit('readyForNextScene', JSON.stringify(message));
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


    handleOrientation(event) {
        sendToServer('orientation', {
            alpha: alphaValue,
            beta: betaValue,
            gamma: gammaValue,
        })
    }

    bind() {
        this.sendToServer = this.sendToServer.bind(this)
        this.onServerOpen = this.onServerOpen.bind(this)
        this.onServerMessage = this.onServerMessage.bind(this)
    }
}

const _instance = new SocketServer()
export default _instance
