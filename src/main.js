import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Element from 'element-ui' // 引入elementui组件
import 'element-ui/lib/theme-chalk/index.css' // 引入样式

Vue.use(Element) // 注册 element 组件
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
