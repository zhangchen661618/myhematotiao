import axios from 'axios'
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0' // 将后台接口的地址给 axios 的baseURL

// 请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求前做一些业务处理
  // 进行配置的注入
  let userInfo = window.localStorage.getItem('user-info') // 获取用户的存储信息
  let token = userInfo ? JSON.parse(userInfo).token : null // 获取token
  config.headers.Authorization = `Bearer ${token}` // 直接将token注入到请求参数中

  return config
}, function (error) {
  // 对请求失败做处理
  return Promise.reject(error)
})

// 响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做处理
  console.log(response)
  return response.data ? response.data : {}
}, function (error) {
  // 对响应错误做处理
  return Promise.reject(error)
})
export default axios
