// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App'
import router from './router'
import VueAxios from 'vue-axios'
import { plainConnection, authConnection } from './backend/axios'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(VueAxios, {
  plain: plainConnection,
  authed: authConnection
})

Vue.mixin({
  methods: {
    isEmpty (obj) {
      return Object.keys(obj).length === 0
    },
    setError (error, text) {
      this.$emit('setError', error, text)
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  plainConnection,
  authConnection,
  components: { App },
  template: '<App/>'
})
