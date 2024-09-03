import myRequest from '@/api/myApi/myRequest'

const BASE_URL = '/node'

export function nodeAdd({ nodeName, longitude, latitude }) {
  return myRequest({
    url: `${BASE_URL}/add`,
    method: 'post',
    data: { nodeName, longitude, latitude }
  })
}

export function nodeDel(id) {
  return myRequest({
    url: `${BASE_URL}/${id}`,
    method: 'delete'
  })
}

export function nodeUpdate(data) {
  return myRequest({
    url: `${BASE_URL}/update`,
    method: 'put',
    data
  })
}

export function nodeGetById(id) {
  return myRequest({
    url: `${BASE_URL}/${id}`,
    method: 'get'
  })
}

export function nodeList({ name, pageSize, pageNum }) {
  const params = new URLSearchParams({
    pageSize, pageNum
  })

  return myRequest({
    url: `${BASE_URL}/list?${params}`,
    method: 'get',
    data: { name }
  })
}
