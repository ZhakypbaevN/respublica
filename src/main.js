import { createApp } from 'vue'
import './assets/scss/Normalize.scss';
import './assets/scss/Variables.scss';
import './assets/scss/Wrapper.scss';
import './assets/scss/Landing.scss';
import './assets/fonts/stylesheet.css';

import App from './App.vue'
import router from './router/index'

import VueTheMask from 'vue-the-mask'

import SvgIcon from './components/common/SvgIcon.vue'
import Button from './components/common/Button.vue'
import Input from './components/common/Input.vue'
import Form from './components/common/Form.vue';
import Modal from './components/common/Modal.vue';

import Collapse from './directives/collapse.js'
import clickOutside from './directives/clickOutside'
import loading from './directives/loading.js'

createApp(App)
  .use(router)
  .use(VueTheMask)
  .directive('click-outside', clickOutside())
  .directive('collapse', Collapse)
  .directive('loading', loading())
  .component('SvgIcon', SvgIcon)
  .component('Button', Button)
  .component('Input', Input)
  .component('Form', Form)
  .component('Modal', Modal)
  .mount('#app')
