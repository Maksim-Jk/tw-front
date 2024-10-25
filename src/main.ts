import './assets/tailwind.css'
import './style.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { i18n } from './locales/i18n'

import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)
app.use(PrimeVue, {
  theme: 'none',
})
app.use(ToastService)

app.mount('#app')
