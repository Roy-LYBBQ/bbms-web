import myRequest from '@/api/myApi/myRequest'

const BASE_URL = '/account'

// 登录
export function accountLogin({ phoneNumber, password }) {
  return myRequest({
    url: BASE_URL + '/login',
    method: 'post',
    data: { phoneNumber, password }
  })
}
