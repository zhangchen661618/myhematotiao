import Vue from 'vue'
import App from './App.vue'
import router from './permission'
import ElementUI from 'element-ui' // 引入elementui组件
import Component from './components/index' // 引入自己定义的插件
import 'element-ui/lib/theme-chalk/index.css' // 引入样式
import './style/index.less' // 引入重置的基础样式
import axios from './utils/axios.config.js' // 引入自定义的axios

Vue.prototype.$axios = axios // 把 axios 插件给了 vue 对象的原型属性

Vue.use(ElementUI) // 注册 element 组件
Vue.use(Component) // 注册全局的自定义组件
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
