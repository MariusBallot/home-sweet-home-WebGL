import RAF from "../../utils/raf"

class CustomCursor {
    constructor() {
        this.bind()
    }
    customCursorInit(container) {
        this.dpi = window.devicePixelRatio
        this.cursParameters = {
            circleSize: 26 * this.dpi,
            circleWidth: .9 * this.dpi,
            smooshness: 0.001,
            followingSpeed: 0.16,
            sliderOpenness: 0,
            sliderInTime: .3,
            sliderRad: 50 * this.dpi,
            arrowOppenes: 10 * this.dpi,
            aInnerCircleSize: 0,
            linkTime: 0.1,
            imgArrowScale: 0,
            playImgScale: 0,
            playerBgRad: 52 * this.dpi
        }

        this.arrowImg = document.querySelector('.arrowsvg')
        this.playImg = document.querySelector('.playsvg')

        this.cursCont = container
        this.cursCanvas = document.createElement('canvas')
        this.cursCont.appendChild(this.cursCanvas)
        this.ctx = this.cursCanvas.getContext('2d')
        this.cursor = [0, 0]
        this.lastCursor = [0, 0]
        this.speed = [0, 0]
        this.targetPos = [0, 0]
        this.width = this.ctx.canvas.width = window.innerWidth * this.dpi
        this.height = this.ctx.canvas.height = window.innerHeight * this.dpi
        RAF.subscribe("canvasUpdate", this.update)
    }

    update() {
        this.targetPos[0] += (this.cursor[0] - this.targetPos[0]) * this.cursParameters.followingSpeed
        this.targetPos[1] += (this.cursor[1] - this.targetPos[1]) * this.cursParameters.followingSpeed
        this.speed[0] = Math.abs(this.cursor[0] - this.targetPos[0])
        this.speed[1] = Math.abs(this.cursor[1] - this.targetPos[1])
        this.ctx.clearRect(0, 0, this.width, this.height)
        this.drawCursor()

    }
    drawCursor() {
        this.ctx.beginPath()
        this.ctx.strokeStyle = "#151515"
        this.ctx.lineWidth = this.cursParameters.circleWidth
        this.ctx.translate(this.targetPos[0], this.targetPos[1])
        this.ctx.scale(1 - this.speed[1] * this.cursParameters.smooshness, 1 - this.speed[0] * this.cursParameters.smooshness)
        this.ctx.arc(0, 0, this.cursParameters.circleSize * (1 - this.cursParameters.sliderOpenness), 0, 2 * Math.PI)
        this.ctx.closePath()
        this.ctx.stroke()
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);

    }


    mouseMove(e) {
        this.cursor[0] = e.clientX * this.dpi
        this.cursor[1] = e.clientY * this.dpi

        this.lastCursor[0] = this.cursor[0]
        this.lastCursor[1] = this.cursor[1]
    }

    resizeCanvas() {
        this.width = this.ctx.canvas.width = window.innerWidth * this.dpi
        this.height = this.ctx.canvas.height = window.innerHeight * this.dpi
    }

    mouseLeft() {
        TweenLite.to(this.cursParameters, .3, {
            circleSize: 0,
            playImgScale: 0
        })
    }

    mouseEntered() {
        TweenLite.to(this.cursParameters, .3, {
            circleSize: 26 * this.dpi,
        })
    }

    bind() {
        this.customCursorInit = this.customCursorInit.bind(this)
        this.update = this.update.bind(this)
        this.resizeCanvas = this.resizeCanvas.bind(this)
        this.mouseMove = this.mouseMove.bind(this)
        this.mouseLeft = this.mouseLeft.bind(this)
        this.mouseEntered = this.mouseEntered.bind(this)

        window.addEventListener('resize', this.resizeCanvas)
        window.addEventListener('mousemove', this.mouseMove)
        document.addEventListener('mouseleave', this.mouseLeft)
        document.addEventListener('mouseenter', this.mouseEntered)

    }
}
