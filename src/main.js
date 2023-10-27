import { createApp } from 'vue'
import './assets/scss/Normalize.scss';
import './assets/scss/Variables.scss';
import './assets/scss/Wrapper.scss';
import './assets/scss/Landing.scss';
import './assets/scss/Helpers.scss';
import './assets/scss/Skeleton.scss';
import './assets/scss/CKEditor-reset.scss';
import './assets/fonts/stylesheet.css';

import App from './App.vue'
import router from './router/index'

import VueTheMask from 'vue-the-mask'
import VWave from 'v-wave'

import CKEditor from '@ckeditor/ckeditor5-vue';
import Upload from './components/common/Upload.vue';
import Select from './components/common/select/index.vue';
import SvgIcon from './components/common/SvgIcon.vue'
import Button from './components/common/Button.vue'
import Input from './components/common/Input.vue'
import Checkbox from './components/common/Checkbox.vue'
import Form from './components/common/Form.vue';
import Modal from './components/common/Modal.vue';

import LandingLayout from './components/uiLanding/layouts/landingLayout.vue';
import Header from './components/uiLanding/layouts/header.vue';
import Footer from './components/uiLanding/layouts/footer.vue';

import Collapse from './directives/collapse.js'
import clickOutside from './directives/clickOutside'
import loading from './directives/loading.js'

// AOS
import AOS from 'aos';
import 'aos/dist/aos.css';

// Lang
import { languages, defaultLocale } from './assets/lang'
import { createI18n } from 'vue-i18n'

const messages = Object.assign(languages)
const i18n = createI18n({
  legacy: false,
  locale: defaultLocale,
  fallbackLocale: 'de',
  messages
})

AOS.init();
createApp(App)
  .use(i18n)
  .use(router)
  .use(VWave)
  .use(VueTheMask)
  .use(CKEditor)
  .directive('click-outside', clickOutside())
  .directive('collapse', Collapse)
  .directive('loading', loading())
  .component('Checkbox', Checkbox)
  .component('SvgIcon', SvgIcon)
  .component('Upload', Upload)
  .component('Select', Select)
  .component('Button', Button)
  .component('Input', Input)
  .component('Form', Form)
  .component('Modal', Modal)
  .component('LandingLayout', LandingLayout)
  .component('Header', Header)
  .component('Footer', Footer)
  .mount('#app')
