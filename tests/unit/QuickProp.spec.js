/// <reference types="jest" />

const stub = jest.fn()
console.error = stub

import QuickProp from '../../lib'

const props = {
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    dummy: {
        type: String,
        required: false,
        validator: jest.fn()
    },
    food: {
        type: Array,
        required: false,
        default: () => (['banana', 'apple'])
    }
}

class User extends QuickProp {
    constructor() {
        super(props)
    }
}

describe('QuickProp', () => {
    const user = new User()

    it('should be able to extends class', () => {
        expect(user).toBeInstanceOf(QuickProp)
    })

    it('should be able to validate given value', () => {
        // stub called 1st time
        user.dummy = 'example'
        expect(props.dummy.validator).toHaveBeenCalled()
    })

    it('should be able to set default value', () => {
        expect(user.food).toEqual(['banana', 'apple'])
    })

    it('should output error when given incorrect data type', () => {
        user.id = 'example' // stub called 2nd times
        user.name = 1 // stub called 3rd times
        expect(stub).toHaveBeenCalledTimes(3)
    })
})
