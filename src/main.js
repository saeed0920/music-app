import './assets/style.scss'
import './assets/main.css'

import 'animate.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import customPlugin from './includes/validation'
import firebase from './includes/firebase'
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(customPlugin)
app.mount('#app')
