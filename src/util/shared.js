// @flow
export const simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
const _toString = Object.prototype.toString

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
export function noop(a?: any, b?: any, c?: any) { }

/**
 * Create a cached version of a pure function.
 */
export function cached<F: Function>(fn: F): F {
    const cache = Object.create(null)
    return (function cachedFn(str: string) {
        const hit = cache[str]
        return hit || (cache[str] = fn(str))
    }: any)
}

/**
 * Capitalize a string.
 */
export const capitalize = cached((str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1)
})

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
export function isPlainObject(obj: any): boolean {
    return _toString.call(obj) === '[object Object]'
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType(fn) {
    const match = fn && fn.toString().match(/^\s*function (\w+)/)
    return match ? match[1] : ''
}

export function toRawType(value: any): string {
    return _toString.call(value).slice(8, -1)
}

function styleValue(value, type) {
    if (type === 'String') {
        return `"${value}"`
    } else if (type === 'Number') {
        return `${Number(value)}`
    } else {
        return `${value}`
    }
}

function isExplicable(value) {
    const explicitTypes = ['string', 'number', 'boolean']
    return explicitTypes.some(elem => value.toLowerCase() === elem)
}

function isBoolean(...args) {
    return args.some(elem => elem.toLowerCase() === 'boolean')
}

export function getInvalidTypeMessage(name: any, value: any, expectedTypes: any) {
    let message = `Invalid prop: type check failed for prop "${name}".` +
        ` Expected ${expectedTypes.map(capitalize).join(', ')}`
    const expectedType = expectedTypes[0]
    const receivedType = toRawType(value)
    const expectedValue = styleValue(value, expectedType)
    const receivedValue = styleValue(value, receivedType)
    // check if we need to specify expected value
    if (expectedTypes.length === 1 &&
        isExplicable(expectedType) &&
        !isBoolean(expectedType, receivedType)) {
        message += ` with value ${expectedValue}`
    }
    message += `, got ${receivedType} `
    // check if we need to specify received value
    if (isExplicable(receivedType)) {
        message += `with value ${receivedValue}.`
    }
    return message
}

export function assertType(value: any, type: Function): {
    valid: boolean;
    expectedType: string;
} {
    let valid
    const expectedType = getType(type)
    if (simpleCheckRE.test(expectedType)) {
        const t = typeof value
        valid = t === expectedType.toLowerCase()
        // for primitive wrapper objects
        if (!valid && t === 'object') {
            valid = value instanceof type
        }
    } else if (expectedType === 'Object') {
        valid = isPlainObject(value)
    } else if (expectedType === 'Array') {
        valid = Array.isArray(value)
    } else {
        valid = value instanceof type
    }
    return {
        valid,
        expectedType
    }
}

export function isObjectEmpty(value: Object) {
    return Object.keys(value).length === 0;
}
