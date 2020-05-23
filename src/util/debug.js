import { noop } from './shared'

export let warn = noop

if (process.env.NODE_ENV !== 'production') {
    warn = (msg) => {
        console.error(`[QuickProp warn]: ${msg}`)
    }
}
