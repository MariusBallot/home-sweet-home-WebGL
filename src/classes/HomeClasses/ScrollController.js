import LoadingController from './LoadingController'

class ScrollController {
    constructor() {
        this.bind()
        this.timer = null
        this.wheelFlag = true
        this.scrollIndex = 0
        this.maxIndex = 4
        this.active = false
    }

    init() {
        window.addEventListener('wheel', this.onWheel)
        window.EM.on("inCredits", () => { this.active = false });
        window.EM.on("outCredits", () => { this.active = true });
    }

    onWheel(e) {
        if (!this.active)
            return
        if (this.timer !== null) {
            clearTimeout(this.timer);
        }
        this.timer = setTimeout(() => {
            this.wheelFlag = true
        }, 150);

        if (this.wheelFlag) {
            this.wheelFlag = false
            if (e.wheelDelta < 0) this.scrollIndex++
            if (e.wheelDelta > 0) this.scrollIndex--

            if (this.scrollIndex >= this.maxIndex)
                this.scrollIndex = this.maxIndex
            if (this.scrollIndex <= 0)
                this.scrollIndex = 0

            window.EM.emit('tScroll', this.scrollIndex)
        }
    }

    bind() {
        this.onWheel = this.onWheel.bind(this)
        this.init = this.init.bind(this)

        LoadingController.addOnLoad('whellOnLoad', () => { this.active = true })


    }
}


const _instance = new ScrollController()
export default _instance