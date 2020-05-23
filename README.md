# QuickModel
If you are familliar with VueJS component's prop, you already knows how to use QuickModel.

QuickModel is a JavaScript data model made easy.

```js
import QuickModel from 'quick-model'

class User extends QuickModel {
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
