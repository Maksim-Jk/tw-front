import './assets/tailwind.css';
import './style.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { I18nPlugin } from './plugins/i18n/i18n.plugin';

import App from './App.vue';
import router from './router';

import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import { registerPlugin } from './helpers/register-plugin';
import Sidebar from 'primevue/sidebar';
import Menu from 'primevue/menu';
import Button from 'primevue/button';
import Card from 'primevue/card';
import Tag from 'primevue/tag';

const app = createApp(App);

app.use(createPinia());
app.use(router);
registerPlugin(app, I18nPlugin, {});
app.use(PrimeVue, {
  theme: 'none',
});
app.use(ToastService);
app.component('Sidebar', Sidebar);
app.component('Menu', Menu);
app.component('Button', Button);
app.component('Card', Card);
app.component('Tag', Tag);

app.mount('#app');
