import Vue from 'vue'
import App from './App.vue'
import Router from './router'
import BootstrapVue from "bootstrap-vue"
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import axios from './axios'
import VueCookies from 'vue-cookies'
import VueCropper from 'vue-cropperjs'


Vue.prototype.$axios = axios
Vue.use(VueCookies)
Vue.use(BootstrapVue)
Vue.use(VueCropper)
Vue.config.productionTip = false



new Vue({
  router:Router,
  render: h => h(App),
}).$mount('#app')
