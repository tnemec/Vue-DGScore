import Vue from 'vue'
import App from './App'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import store from './store/'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import vueAwesome from 'vue-awesome/components/Icon'
import vueMoment from 'vue-moment'



Vue.use(BootstrapVue);
Vue.use(vueMoment);
Vue.component('icon', vueAwesome)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
