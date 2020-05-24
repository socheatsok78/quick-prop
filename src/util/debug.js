// @flow
import { noop } from './shared'

export let warn = noop

if (process.env.NODE_ENV !== 'production') {
    warn = (msg: string) => {
        console.error(`[QuickProp warn]: ${msg}`)
    }
}
