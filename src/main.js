import './assets/style.scss'
import './assets/main.css'

import 'animate.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import customPlugin from './includes/validation'

import { auth } from './includes/firebase'

let app
auth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App)
    app.use(createPinia())
    app.use(router)
    app.use(customPlugin)
    app.mount('#app')
  }
})
