import axios from 'axios'

const service = axios.create({
  baseURL: process.env.BASE_API,
  timeout: 5000
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // console.log('config中进行需求的判断，比如token值的有无来确定是否拦截')
    sessionStorage.setItem('token', '123123')
    config.headers['Authorization'] = sessionStorage.getItem('token')
    return config
  },
  error => {
    console.log(error)
    Promise.reject(error)
  }
)
// 相应拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    // 在这里利用state状态值与token进行需要的拦截
    if (response.status !== 200) {
      // some code
      // console.log(response)
      const err = 'error'
      return Promise.reject(err)
    }
    return res
  },
  // 若请求错误在这里处理
  error => {
    console.log('err' + error)
    return Promise.reject(error)
  }
)
export default service
