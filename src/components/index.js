import layoutAside from './home/layout-aside'
import layoutHeader from './home/layout-header'
import breadCrumb from './common/bread-crumb'
import Vue from 'vue'
Vue.component('layout-aside', layoutAside)
Vue.component('layout-header', layoutHeader)

// elementUI 导出的对象，对象里有一个方法
// vue.use(elementUI) 时会调用提供的install方法，并且在方法中传入vue对象
export default {
  insatll (Vue) {
    Vue.component('layout-header', layoutHeader) // 注册 layout-header组件
    Vue.component('layout-aside', layoutAside) // 注册左侧菜单组件
    Vue.component('bread-crumb', breadCrumb) // 注册面包屑组件
  }
}
