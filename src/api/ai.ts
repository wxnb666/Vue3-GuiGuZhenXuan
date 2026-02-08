import instance from './axios'
export const aiAskAPI=(data)=>{
    return instance.post(`/ai`,data)
}