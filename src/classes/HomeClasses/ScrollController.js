class ScrollController {
    constructor() {
        this.bind()
        this.timer = null
        this.wheelFlag = true
        this.scrollIndex = 0
        this.maxIndex = 4
    }

    init() {
        window.addEventListener('wheel', this.onWheel)

    }

    onWheel(e) {
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
    }
}


const _instance = new ScrollController()
export default _instance