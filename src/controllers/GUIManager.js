import * as DAT from "dat.gui"

class GUIManager {
    constructor() {
        this.bind()
        this.gui = new DAT.GUI()
    }

    addParam({
        object,
        prop,
        value,
        fromTo = [null, null],
        step = null
    }) {
        this.gui.add(object, prop, fromTo[0], fromTo[1], step)

    }

    bind() {
        this.addParam = this.addParam.bind(this)
    }
}

const _instance = new GUIManager
export default _instance