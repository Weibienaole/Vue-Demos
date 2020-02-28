import axios from 'axios'

const service = axios.create({
  baseURL: '',
  timeout: 5000
})

service.interceptors.request.use(
  config => {
    console.log('请求拦截')
    console.log('config', config)
    return config
  },
  error => {
    console.log('err', error)
    Promise.reject(error)
  }
)
// service.interceptors.response.use(
//   config => {
//     console.log('相应拦截')
//     console.log('config', config)
//     return config
//   },
//   error => {
//     console.log('err', error)
//     Promise.reject(error)
//   }
// )
export default service
