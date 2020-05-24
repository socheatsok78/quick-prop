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

class Todo extends QuickProp {
    constructor(data = {}) {
        super({
            title: {
                type: String,
                required: true
            },
            completed: {
                type: Boolean,
                default: () => false
            }
        })

        this.import(data)
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

    it('should output Vue.js style props', () => {
        user.toProps = jest.fn()
        user.toProps()
        expect(user.toProps).toHaveBeenCalled()
    })

    it('should be able to import data to the instance', () => {
        const todoStub = {
            title: 'Example',
            completed: false
        }

        const todo = new Todo(todoStub)

        expect(todo.toJSON()).toEqual(todoStub)
    })
})
