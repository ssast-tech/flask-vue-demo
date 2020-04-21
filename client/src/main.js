import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.css'
import BootstrapVue from 'bootstrap-vue'
import qs from 'qs'
import _ from 'lodash'

Vue.config.productionTip=false
Vue.use(BootstrapVue)
Vue.prototype.qs=qs
Vue.prototype._=_

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
