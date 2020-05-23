# QuickProp

[![npm-version](https://img.shields.io/npm/v/quick-prop/latest)][npm-url]
[![npm-download](https://img.shields.io/npm/dm/quick-prop)][npm-url]
[![Jest CI](https://github.com/socheatsok78/quick-prop/workflows/Jest%20CI/badge.svg)][github-action-jest]

If you are familiar with Vue.js component's prop, you already knows how to use QuickProp.
QuickProp is a JavaScript data model made easy.

## Installation

```sh
npm i quick-prop
```

## Usage
```js
import QuickProp from 'quick-prop'

class User extends QuickProp {
    constructor() {
        super({
            id: {
                type: Number,
                required: true,
                default() {
                    return 1
                }
            },
            name: {
                type: String,
                required: true
            },
            email: {
                type: String,
                required: true,
                validator(value) {
                    return /^[^@]+@[^@]+\.[^@]+$/.test(value)
                }
            }
        })
    }
}

const user = new User()

// By assign the 'user.id' as string will cause a warning in the console
user.id = 'my string'

/**
 * [QuickProp warn]: Invalid prop: type check failed for prop "id".
 * Expected Number with value NaN, got String with value "my string".
 * /
```

## Todo

- [ ] Better implementation
- [x] Add Type Decorator

#### License
License under [MIT](LICENSE)

<!-- variables -->
[npm-url]: https://www.npmjs.com/package/quick-prop
[github-action-jest]: https://github.com/socheatsok78/quick-prop/actions?query=workflow%3A%22Jest+CI%22
