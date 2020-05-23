# QuickProp
If you are familiar with Vue.js component's prop, you already knows how to use QuickProp.

QuickProp is a JavaScript data model made easy.

```js
import QuickProp from 'quick-prop'

class User extends QuickProp {
    constructor() {
        super({
            id: {
                type: [Number],
                required: true,
                default() {
                    return 1
                }
            },
            name: {
                type: String,
                required: true
            }
        })
    }
}

const user = new User()
```
