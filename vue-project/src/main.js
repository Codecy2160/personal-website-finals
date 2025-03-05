import { createApp } from 'vue'

import App from './App.vue'
import RestAPI from './components/RestAPI.vue'
import PersonalProfile from './components/PersonalProfile.vue'

const app = createApp(App)
app.component('PersonalProfile', PersonalProfile)
app.component('RestAPI', RestAPI)
app.mount('#app')