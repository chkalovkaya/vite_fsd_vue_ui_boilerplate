import { createApp } from 'vue'

import { Notifications, router, store } from '@shared/lib'
import { directives } from '@shared/lib/directives'
import { components } from '@shared/ui'

import App from './index.vue'

const app = createApp(App)

directives.forEach(directive => app.directive(directive.name, directive))
components.forEach(component => app.component(component.name, component))

app.use(store).use(router).use(Notifications).mount('#app')
