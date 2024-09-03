import myRequest from '@/api/myApi/myRequest'

const BASE_URL = '/broadband-combo'

export function comboAdd({ comboName, unit, value, price, bandwidth }) {
  return myRequest({
    url: `${BASE_URL}/add`,
    method: 'post',
    data: { comboName, unit, value, price, bandwidth }
  })
}

export function comboDel(id) {
  return myRequest({
    url: `${BASE_URL}/${id}`,
    method: 'delete'
  })
}

export function comboUpdate(data) {
  return myRequest({
    url: `${BASE_URL}/update`,
    method: 'put',
    data
  })
}

export function comboGetById(id) {
  return myRequest({
    url: `${BASE_URL}/${id}`,
    method: 'get'
  })
}

export function comboList({ comboName, unit, bandwidth, pageSize, pageNum }) {
  const params = new URLSearchParams({
    comboName, unit, bandwidth, pageSize, pageNum
  })

  return myRequest({
    url: `${BASE_URL}/list?${params}`,
    method: 'get'
  })
}
