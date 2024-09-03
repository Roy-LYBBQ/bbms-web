// 导入axios
import axios from 'axios'
// 导入store
import myStore from '@/store/myStore'
// 引入router
import myRouter from '@/router/myRouter'
import { Message } from 'element-ui'
// 定义公共前缀
const baseURL = '/dev-api'
// 创建axios自带instance实例
const instance = axios.create({ baseURL })

/**
 * 请求拦截器
 */
instance.interceptors.request.use(
  config => {
    let store = ''
    // 1.获取store
    if (myStore.getters.curType === 'account') {
      store = myStore.getters.account
    } else {
      store = myStore.getters.worker
    }

    // 2.判断是否有token
    if (store.getter.getToken()) {
      // 3.在请求头中携带token
      config.headers.Authorization = store.getter.getToken()
    } else if (config.url !== '/account/login' && config.url !== '/account/register'
      && config.url !== '/business-people/login' && !config.url.startsWith('/account/sendCode')) {
      myRouter.push('/')
      Message({ message: '请先登录', type: 'error' })
      return Promise.reject('without login')
    }
    return config
  },
  error => {
    Message({ message: error, type: 'error' })
    return Promise.reject(error)
  }
)

/**
 * 响应拦截器
 */
instance.interceptors.response.use(
  result => {
    if (result.data.code === 200) {
      return result.data
    }
    //异步的状态转化成失败的状态，同步等待调用时，则执行不到后续操作
    return Promise.reject(result.data.msg ? result.data.msg : '服务异常')
  },
  error => {
    console.log(error)
    // 判断响应状态码是否为401，如果是则跳转到登录页面
    if (error.response.status === 401) {
      myRouter.push('/')
      Message({ message: '请先登录', type: 'error' })
    } else {
      Message({ message: error, type: 'error' })
    }
    //异步的状态转化成失败的状态
    return Promise.reject(error)
  }
)

export default instance
