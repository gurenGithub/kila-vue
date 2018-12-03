import Vue from 'vue'
import Router from 'vue-router'
import routerConfig from  '@/configs/router.config.js';
// 各页面都做懒加载

Vue.use(Router)
export default new Router(routerConfig)
