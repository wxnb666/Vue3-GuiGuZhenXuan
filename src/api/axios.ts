import axios from 'axios'
// 创建一个 axios 实例
const instance = axios.create({
  baseURL: 'http://localhost:3000/api', // 直接写死地址，简单明了
  timeout: 10000, // 设置超时时间
})
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
instance.interceptors.response.use(
  (res) => {
    return res.data
  },
  (err) => {
    if (err.response) {
      11
      const { status } = err.response
      if (status === 401) {
        alert('未鉴权')
      }
    }
    return Promise.reject(err)
  },
)
// 导出这个实例
export default instance
