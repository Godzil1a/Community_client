import axios from 'axios'

const instance = axios.create({
  timeout: 5000
})
// 超时后的处理

// 添加请求拦截器
instance.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 添加响应拦截器
instance.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    return Promise.reject(error)
  }
)

export default instance
