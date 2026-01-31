// src/api/axios.ts

import axios from 'axios'

// 创建一个 axios 实例
const instance = axios.create({
  baseURL: 'http://localhost:3000/api', // 直接写死地址，简单明了
  timeout: 10000, // 设置超时时间
})

// 导出这个实例
export default instance
