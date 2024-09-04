import myRequest from '@/api/myApi/myRequest'

const BASE_URL = '/workOrder'

export function genOrder(serviceId) {
  return myRequest({
    url: `${BASE_URL}/generateOrder`,
    method: 'post',
    data: { serviceId }
  })
}

export function orderList({ serviceName, businessPeopleName, accountName, workOrderName, pageSize, pageNum }) {
  const params = new URLSearchParams({
    serviceName, businessPeopleName, accountName, workOrderName, pageSize, pageNum
  })

  return myRequest({
    url: `${BASE_URL}/list`,
    method: 'get'
  })
}
