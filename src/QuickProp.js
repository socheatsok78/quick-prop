// @flow

import {
    simpleCheckRE,
    assertType,
    getInvalidTypeMessage
} from './util/shared'

import { warn } from './util/debug'

type PropOptions = {
    type: Function | Array<Function> | null,
    default: any,
    required: ?boolean,
    validator: ?Function
};

type PropsTypes = {
    [key: string]: PropOptions
};

type StateTypes = {
    [key: string]: any
}

export default class QuickProp {
    #props: PropsTypes;
    #state: StateTypes;

    /**
     * Create a new instance of QuickProp
     * @param {PropsTypes} props
     */
    constructor(props: PropsTypes) {
        this.#props = props;
        this.#state = {}

        this._compile(this.#props)
    }

    /**
     * Validate properties
     * @returns {boolean}
     */
    validate() {
        const attributes: string[] = Object.keys(this.#props);
        let valid = true;

        attributes.forEach(attr => {
            const prop = this.#props[attr];
            const value = this.#state[attr];
            valid = this._assertType(attr, value, prop);
        })

        return valid;
    }

    /**
     * Compile attribute properties
     * @param {PropsTypes} props
     */
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

    /**
     * Define property getter and setter
     * @param {string} attr
     * @param {PropOptions} prop
     */
    _defineProperties(attr: string, prop: PropOptions) {
        const self = this;

        Object.defineProperty(this, attr, {
            enumerable: true,
            get() {
                return self.#state[attr];
            },
            set(value: any) {
                if (this._assertType(attr, value, prop)) {
                    self.#state[attr] = value;
                    return
                }
            }
        })
    }

    /**
     * Assert the given value match property types
     * @param {string} attr
     * @param {any} value
     * @param {PropOptions} prop
     */
    _assertType(attr: string, value: any, prop: PropOptions) {
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

    /**
     * Internally update attribute property without trigger validation
     * @param {string} attr
     * @param {any} value
     */
    set(attr: string, value: any) {
        this.#state[attr] = value;
    }

    toJSON() {
        return this.#state;
    }

    toString() {
        return this.toJSON()
    }
}
