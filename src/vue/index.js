import QuickProp from "../../lib/QuickProp";

export const QuickPropVue = {
    installed: false,

    /**
     * Extend QuickProp Observable plugin from Vue
     * @param {any} Vue
     */
    install(Vue) {
        if (this.installed) return
        this.installed = true

        QuickProp.observable = Vue.observable
    }
}
