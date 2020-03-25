class SoundController {
    constructor() {
        this.bind()
    }


    onNotif() {
        var audio = new Audio('sur.mp3');
        audio.play();
    }

    bind() {
        this.onNotif = this.onNotif.bind(this)
    }
}

const _instance = new SoundController()
export default _instance