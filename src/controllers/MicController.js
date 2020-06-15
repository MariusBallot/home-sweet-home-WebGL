class MicController {
    constructor() {
        this.bind()
        this.volume = 0
    }

    init() {
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(this.onMicOn)
            .catch(function (err) {
                console.log(err)
            });
    }

    onMicOn(stream) {
        this.audioContext = new AudioContext();
        this.analyser = this.audioContext.createAnalyser();
        this.microphone = this.audioContext.createMediaStreamSource(stream);
        this.javascriptNode = this.audioContext.createScriptProcessor(2048, 1, 1);

        this.analyser.smoothingTimeConstant = 0.8;
        this.analyser.fftSize = 1024;

        this.microphone.connect(this.analyser);
        this.analyser.connect(this.javascriptNode);
        this.javascriptNode.connect(this.audioContext.destination);
        this.javascriptNode.onaudioprocess = () => {
            var array = new Uint8Array(this.analyser.frequencyBinCount);
            this.analyser.getByteFrequencyData(array);
            var values = 0;

            var length = array.length;
            for (var i = 0; i < length; i++) {
                values += (array[i]);
            }

            var average = values / length;
            this.volume = Math.round(average)
        }
    }

    bind() {
        this.onMicOn = this.onMicOn.bind(this)
    }
}

const _instance = new MicController()
export default _instance