import myRequest from '@/api/myApi/myRequest'

const BASE_URL = '/account'

// 登录
export function accountLogin({ phoneNumber, password }) {
  return myRequest({
    url: `${BASE_URL}/login`,
    method: 'post',
    data: { phoneNumber, password }
  })
}

// 注册
export function accountRegister({ phoneNumber, password, code }) {
  return myRequest({
    url: `${BASE_URL}/register`,
    method: 'post',
    data: { phoneNumber, password, code }
  })
}

// 获取验证码
export function sendCode(phoneNumber) {
  return myRequest({
    url: `${BASE_URL}/sendCode/${phoneNumber}`,
    method: 'get'
  })
}

// 获取账户信息
export function accountGetInfo() {
  return myRequest({
    url: `${BASE_URL}/getInfo`,
    method: 'get'
  })
}

export function accountGetById(id) {
  return myRequest({
    url: `${BASE_URL}/${id}`,
    method: 'get'
  })
}

export function accountUpdate(data) {
  return myRequest({
    url: `${BASE_URL}`,
    method: 'put',
    data
  })
}

export function accountDel(id) {
  return myRequest({
    url: `${BASE_URL}/${id}`,
    method: 'delete'
  })
}

export function accountList(data) {
  return myRequest({
    url: `${BASE_URL}/list`,
    method: 'get',
    data
  })
}

export function accountGetCombo() {
  return myRequest({
    url: `${BASE_URL}/combo`,
    method: 'get'
  })
}

export function accountAddCombo(id) {
  return myRequest({
    url: `${BASE_URL}/addCombo/${id}`,
    method: 'post'
  })
}

export function accountAddAmount(amount) {
  return myRequest({
    url: `${BASE_URL}/addAmount`,
    method: 'post',
    data: { amount }
  })
}
