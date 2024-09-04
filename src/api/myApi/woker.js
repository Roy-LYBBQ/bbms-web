import myRequest from '@/api/myApi/myRequest'

const BASE_URL = '/business-people'

export function workerLogin({ username, password }) {
  return myRequest({
    url: `${BASE_URL}/login`,
    method: 'post',
    data: { username, password }
  })
}

export function workerAdd({ username, password }) {
  return myRequest({
    url: `${BASE_URL}/add`,
    method: 'post',
    data: { username, password }
  })
}

export function workerGetInfo() {
  return myRequest({
    url: `${BASE_URL}/getInfo`,
    method: 'get'
  })
}

export function workerDel(id) {
  return myRequest({
    url: `${BASE_URL}/${id}`,
    method: 'delete'
  })
}

export function workerUpdate(data) {
  return myRequest({
    url: `${BASE_URL}`,
    method: 'put',
    data
  })
}

export function workerGetById(id) {
  return myRequest({
    url: `${BASE_URL}/${id}`,
    method: 'get'
  })
}

export function workerList({ userName, nodeName, name, pageSize, pageNum }) {
  return myRequest({
    url: `${BASE_URL}/list`,
    method: 'get',
    data: { userName, nodeName, name, pageSize, pageNum }
  })
}

export function workerOrderFinish(id) {
  return myRequest({
    url: `${BASE_URL}/finish/${id}`,
    method: 'get',
  })
}

export function workerOrderList({ serviceName, accountName, pageSize, pageNum }) {
  const params = new URLSearchParams({
    serviceName, accountName, pageSize, pageNum
  })

  return myRequest({
    url: `${BASE_URL}/listOrder?${params}`,
    method: 'get'
  })
}
