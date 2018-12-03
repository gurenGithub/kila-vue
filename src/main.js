// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import store from './store'
import filters from './filters'
import components from './components'
import vueExtends from './components/extends'

const init = () => {
  Vue.config.productionTip = false
  Vue.use(components)
  Vue.use(filters)
  vueExtends(Vue);
  const { $loadingBar } = Vue.prototype
  router.beforeEach((to, from, next) => {
    if (to.meta.title) {
      document.title = to.meta.title
    }
    Vue.$loadingBar.show()
    next()
  })
  router.afterEach((to, from, next) => {
    Vue.$loadingBar.hide()
  })
  window.xVue = new Vue({
    router,
    store
  }).$mount('#kbuild_container')
}
init()
