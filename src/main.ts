import './assets/tailwind.css';
import './style.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { i18n } from './plugins/i18n/i18n.plugin';
import axios from 'axios';

import App from './App.vue';
import router from './router';

import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(i18n);
app.use(PrimeVue, {
  theme: 'none',
});
app.use(ToastService);

app.mount('#app');
