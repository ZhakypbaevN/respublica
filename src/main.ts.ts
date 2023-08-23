import { createApp } from 'vue'
import './assets/scss/Normalize.scss';
import './assets/scss/Variables.scss';
import './assets/scss/Wrapper.scss';
import './assets/scss/Landing.scss';
import './assets/fonts/stylesheet.css';

import App from './App.vue'
import router from './router/index'

createApp(App)
  .use(router)
  .mount('#app')
