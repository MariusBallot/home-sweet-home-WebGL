import SoundController from "./controllers/SoundController"

class SocketServer {
    constructor() {
        this.bind()

        this.HOST
        this.WEBSOCKET
        this.DEBUG_TIME

        this.WEBSOCKET
        this.WEBSOCKET

        this.connected
    }

    start() {
        this.HOST = location.origin.replace(/^https/, 'wss')
        this.WEBSOCKET = new WebSocket("wss://home-sweet-home--ws.herokuapp.com/")
        this.DEBUG_TIME = false

        this.WEBSOCKET.onopen = this.onServerOpen
        this.WEBSOCKET.onmessage = this.onServerMessage
    }

    getClientTime() {
        const hours = now.getHours()
        const minutes = now.getMinutes()
        const seconds = now.getSeconds()
        const milliseconds = now.getMilliseconds()

        const dateString = `${hours}:${minutes}:${seconds}:${milliseconds}`

        return dateString
    }

    sendToServer(type, value) {
        const message = { type: type, message: JSON.stringify(value) }
        const string = JSON.stringify(message)
        this.WEBSOCKET.send(string)


    }

    onServerOpen() {
        this.connected = true
    }

    onServerMessage(event) {
        const data = JSON.parse(event.data)
        const message = JSON.parse(data.message)
        switch (data.type) {
            case 'time':
                if (DEBUG_TIME) setNode('time-server', message.time)
                break
            case 'orientation':
                // setNode('alpha-server', message.alpha)
                // setNode('beta-server', message.beta)
                // setNode('gamma-server', message.gamma)
                break
            case 'notif':
                SoundController.onNotif()
            default:
                break
        }
    }

    handleOrientation(event) {
        sendToServer('orientation', {
            alpha: alphaValue,
            beta: betaValue,
            gamma: gammaValue,
        })
    }

    bind() {
        this.getClientTime = this.getClientTime.bind(this)
        this.sendToServer = this.sendToServer.bind(this)
        this.onServerOpen = this.onServerOpen.bind(this)
        this.onServerMessage = this.onServerMessage.bind(this)
    }
}

const _instance = new SocketServer()
export default _instance
