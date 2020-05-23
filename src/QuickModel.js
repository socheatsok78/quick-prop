import {
    simpleCheckRE,
    assertType,
    getInvalidTypeMessage
} from './util/shared'

import { warn } from './util/debug'

export type PropOptions = {
    type: Function | Array<Function> | null,
    default: any,
    required: ?boolean,
    validator: ?Function
};

export type PropsTypes = {
    [key: string]: PropOptions
};

export type StateTypes = {
    [key: string]: any
}

export default class QuickModel {
    #props: PropsTypes;
    #state: StateTypes;

    constructor(props: PropsTypes) {
        this.#props = props;
        this.#state = {}

        this._compile(this.#props)
    }

    validate() {
        const attributes: string[] = Object.keys(this.#props);

        attributes.forEach(attr => {
            const prop = this.#props[attr]
            const value = this.#state[attr]
            this.assertType(attr, value, prop)
        })
    }

    _compile(props: PropsTypes) {
        const attributes: string[] = Object.keys(props);

        attributes.forEach(attr => {
            const prop = this.#props[attr];
            const def = prop.default;

            const value = typeof def === 'function'
                ? def()
                : def

            this.#state[attr] = value;
            this._defineProperties(attr, prop)
        })
    }

    _defineProperties(attr: string, prop: PropOptions) {
        Object.defineProperty(this, attr, {
            enumerable: true,
            get() {
                return this.#state[attr];
            },
            set(value) {
                if (this._assertType(attr, value, prop)) {
                    this.#state[attr] = value;
                    return true
                }
            }
        })
    }

    _assertType(attr, value, prop) {
        if ((value == null || value == undefined) && prop.required) {
            warn('Missing required prop: "' + attr + '"')
            return false
        }

        if ((value == null || value == undefined) && !prop.required) {
            return false
        }

        let type = prop.type
        let valid = !type || type === true
        const expectedTypes = []

        if (type) {
            if (!Array.isArray(type)) {
                type = [type]
            }
            for (let i = 0; i < type.length && !valid; i++) {
                const assertedType = assertType(value, type[i])
                expectedTypes.push(assertedType.expectedType || '')
                valid = assertedType.valid
            }
        }

        if (!valid) {
            warn(getInvalidTypeMessage(attr, value, expectedTypes))
            return false
        }

        return true
    }

    set(attr, value) {
        this.#state[attr] = value;
    }

    toJSON() {
        return this.#state;
    }

    toString() {
        return this.toJSON()
    }
}
