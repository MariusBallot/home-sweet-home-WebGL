class RAF {
    constructor() {
        this.bind()
        this.callbacks = []
        this.dt = 0.15
        this.lastF = Date.now()
        this.render()

    }

    subscribe(name, callback) {
        this.callbacks.push({
            name: name,
            callback: callback
        })
    }

    unsubscribe(name) {
        this.callbacks.forEach((item, i) => {
            if (item.name == name) {
                this.callbacks.splice(i, 1)
            }
        });
    }

    render() {
        requestAnimationFrame(this.render)
        this.callbacks.forEach(item => {
            item.callback()
        });

        this.dt = Date.now() - this.lastF
        this.lastF = Date.now()
    }

    bind() {
        this.subscribe = this.subscribe.bind(this)
        this.unsubscribe = this.unsubscribe.bind(this)
        this.render = this.render.bind(this)

    }
}

const _instance = new RAF()
export default _instance