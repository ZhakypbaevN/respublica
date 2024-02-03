import { createApp } from 'vue'
import '@/assets/scss/Normalize.scss';
import '@/assets/scss/Variables.scss';
import '@/assets/scss/Wrapper.scss';
import '@/assets/scss/Landing.scss';
import '@/assets/scss/Helpers.scss';
import '@/assets/scss/Skeleton.scss';
import '@/assets/scss/CKEditor-reset.scss';
import '@/assets/fonts/tilda-sans/stylesheet.css';
import '@/assets/fonts/montserrat/stylesheet.css';

import App from '@/App.vue'
import router from '@/router/index'

import VueTheMask from 'vue-the-mask'
import VWave from 'v-wave'

import CKEditor from '@ckeditor/ckeditor5-vue';
import Pagination from '@/components/common/Pagination.vue';
import Upload from '@/components/common/Upload.vue';
import Dropdown from '@/components/common/dropdown/index.vue'
import DropdownItem from '@/components/common/dropdown/DropdownItem.vue'
import Select from '@/components/common/select/index.vue';
import SvgIcon from '@/components/common/SvgIcon.vue'
import Button from '@/components/common/Button.vue'
import BackButton from '@/components/common/BackButton.vue'
import Input from '@/components/common/Input.vue'
import Checkbox from '@/components/common/Checkbox.vue'
import Form from '@/components/common/Form.vue';
import Modal from '@/components/common/Modal.vue';
import Empty from '@/components/common/Empty.vue';
import Filter from '@/components/common/Filter.vue';
import LangToggle from '@/components/common/LangToggle.vue';
import ShowMoreBtn from '@/components/common/ShowMoreBtn.vue';
import Loading from '@/components/common/Loading.vue';

import LandingLayout from '@/components/uiLanding/layouts/LandingLayout.vue';
import Header from '@/components/uiLanding/layouts/HeaderCustom.vue';
import Footer from '@/components/uiLanding/layouts/FooterCustom.vue';

import Collapse from '@/directives/collapse.js'
import clickOutside from '@/directives/clickOutside'
import loading from '@/directives/loading.js'

// AOS
import AOS from 'aos';
import 'aos/dist/aos.css';

// Lang
import i18n from '@/assets/lang'

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
  .component('Loading', Loading)
  .component('SvgIcon', SvgIcon)
  .component('Upload', Upload)
  .component('Select', Select)
  .component('Button', Button)
  .component('BackButton', BackButton)
  .component('Dropdown', Dropdown)
  .component('DropdownItem', DropdownItem)
  .component('Pagination', Pagination)
  .component('Input', Input)
  .component('Filter', Filter)
  .component('Form', Form)
  .component('Modal', Modal)
  .component('Empty', Empty)
  .component('LangToggle', LangToggle)
  .component('LandingLayout', LandingLayout)
  .component('ShowMoreBtn', ShowMoreBtn)
  .component('Header', Header)
  .component('Footer', Footer)
  .mount('#app')
