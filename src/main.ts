import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router';
import 'material-design-icons-iconfont/dist/material-design-icons.css'

createApp(App)
.use(vuetify)
.use(router)
.mount('#app');
