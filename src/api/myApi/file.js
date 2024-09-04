import myRequest from '@/api/myApi/myRequest'

const BASE_URL = '/system/storage'

export function uploadFile(file) {
  const formData = new FormData()
  formData.append('file', file)

  return myRequest({
    url: `${BASE_URL}/upload`,
    method: 'post',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
