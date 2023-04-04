import {
    createApp
} from 'vue'
import App from './App.vue'
import router from './router'

import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap/dist/css/bootstrap.min.css'

/* import the fontawesome core */
import {
    library
} from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import {
    FontAwesomeIcon
} from '@fortawesome/vue-fontawesome'

/* import specific icons */
import {
    fas
} from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(fas)

/* add font awesome icon component */
// component('font-awesome-icon', FontAwesomeIcon)


const app = createApp(App)
app.use(router)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app');