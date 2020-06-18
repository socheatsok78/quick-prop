# QuickProp

If you are familiar with Vue.js component's prop, you already knows how to use QuickProp.
QuickProp is a JavaScript data model made easy.

[![npm-version](https://img.shields.io/npm/v/quick-prop/latest)][npm-url]
[![npm-download](https://img.shields.io/npm/dm/quick-prop)][npm-url]
[![Jest CI](https://github.com/socheatsok78/quick-prop/workflows/Jest%20CI/badge.svg)][github-action-jest]
[![Total alerts](https://img.shields.io/lgtm/alerts/g/socheatsok78/quick-prop.svg?logo=lgtm&logoWidth=18)][lgtm-url]

## Installation

```sh
npm i quick-prop
```

## Usage
```js
import QuickProp from 'quick-prop'
import { v4 as uuidv4 } from 'uuid';

class Todo extends QuickProp {
    constructor(todo = {}) {
        super({
            id: {
                type: [Number, String],
                default() {
                    return uuidv4()
                }
            },
            title: {
                type: String,
                required: true
            },
            completed: {
                type: Boolean,
                default: () => false
            }
        }, todo)
    }
}

const todo = new Todo({
    title: 'Example todo'
})

todo.completed = true

console.log(JSON.stringify(todo))
```

Result:
```json
{
    "id": "f24b19a2-e327-4199-88e9-1c5c8e4b8b82",
    "title": "Example todo",
    "completed": true
}
```

## Todo

- [x] Better implementation
- [x] Add Type Decorator

#### License
License under [MIT](LICENSE)

<!-- variables -->
[npm-url]: https://www.npmjs.com/package/quick-prop
[github-action-jest]: https://github.com/socheatsok78/quick-prop/actions?query=workflow%3A%22Jest+CI%22
[lgtm-url]: https://lgtm.com/projects/g/socheatsok78/quick-prop/alerts/
