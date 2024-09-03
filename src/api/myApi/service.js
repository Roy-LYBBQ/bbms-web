import myRequest from '@/api/myApi/myRequest'

const BASE_URL = '/broadband-service'

export function serviceAdd({ broadbandServiceName, typeId }) {
  return myRequest({
    url: `${BASE_URL}/add`,
    method: 'post',
    data: { broadbandServiceName, typeId }
  })
}

export function serviceGetInfo() {
  return myRequest({
    url: `${BASE_URL}/getInfo`,
    method: 'get'
  })
}

export function serviceDel(id) {
  return myRequest({
    url: `${BASE_URL}/${id}`,
    method: 'delete'
  })
}

export function serviceUpdate({ broadbandServiceName, typeId, broadbandServiceId }) {
  return myRequest({
    url: `${BASE_URL}`,
    method: 'put',
    data: { broadbandServiceName, typeId, broadbandServiceId }
  })
}

export function serviceGetById(id) {
  return myRequest({
    url: `${BASE_URL}/${id}`,
    method: 'get',
  })
}

export function serviceList({ broadbandServiceName, typeId, pageSize, pageNum }) {
  const params = new URLSearchParams({
    broadbandServiceName, typeId, pageSize, pageNum
  })

  return myRequest({
    url: `${BASE_URL}/list?${params}`,
    method: 'get',
  })
}


