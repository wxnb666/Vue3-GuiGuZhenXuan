import instance from './axios'
export const loginAPI = (data: { username: string; password: string }) => {
  return instance.post(`/login`, data)
}
export const registerAPI = (data: { username: string; password: string }) => {
  return instance.post(`/register`, data)
}
