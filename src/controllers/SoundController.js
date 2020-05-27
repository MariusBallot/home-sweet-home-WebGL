class SoundController {
    constructor() {
        this.bind()
    }

    onNotif() {
        var audio = new Audio('notif.mp3');
        window.navigator.vibrate(250);
        audio.play();
    }

    bind() {
        this.onNotif = this.onNotif.bind(this)
    }
}

const _instance = new SoundController()
export default _instance