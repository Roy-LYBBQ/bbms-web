import myRequest from '@/api/myApi/myRequest'

const BASE_URL = '/service-type'

export function typeTree() {
  return myRequest({
    url: `${BASE_URL}/typeTree`,
    method: 'get'
  })
}
