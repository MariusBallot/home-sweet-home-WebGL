import * as DAT from "dat.gui"
import config from '../config'

class GUIManager {
    constructor() {
        this.bind()
        this.gui = new DAT.GUI()
        if(!config.devMode || config.devMode && !config.devModeShowGUI) this.gui.hide()
    }

    addParam({
        object,
        prop,
        fromTo = [null, null],
        step = null,
        name = null,
        listen = null
    }) {
        if(!listen){
            !name ? this.gui.add(object, prop, fromTo[0], fromTo[1], step) : this.gui.add(object, prop, fromTo[0], fromTo[1], step).name(name)
        }else{
            !name ? this.gui.add(object, prop, fromTo[0], fromTo[1], step) : this.gui.add(object, prop, fromTo[0], fromTo[1], step).name(name).listen()
        }

    }

    bind() {
        this.addParam = this.addParam.bind(this)
    }
}

const _instance = new GUIManager
export default _instance