import request from '@/utils/request'
import myRequest from '@/api/myApi/myRequest'

/** 套餐相关api */
export function adminComboList({ comboName, unit, bandwidth, pageSize, pageNum }) {
  const params = new URLSearchParams({
    comboName, unit, bandwidth, pageSize, pageNum
  })

  return request({
    url: `/broadband-combo/list?${params}`,
    method: 'get'
  })
}

export function adminComboUpdate({ comboId, comboName, unit, value, price, bandwidth }) {
  return request({
    url: `/broadband-combo/update`,
    method: 'put',
    data: { comboId, comboName, unit, value, price, bandwidth }
  })
}
export function adminComboAddImg({ comboId, comboImage }) {
  return request({
    url: `/broadband-combo/update`,
    method: 'put',
    data: { comboId, comboImage }
  })
}

export function adminComboDel(id) {
  return request({
    url: `/broadband-combo/${id}`,
    method: 'delete'
  })
}

export function adminComboAdd({ comboName, unit, value, price, bandwidth }) {
  return request({
    url: `/broadband-combo/add`,
    method: 'post',
    data: { comboName, unit, value, price, bandwidth }
  })
}

/** 用户相关api */
export function adminAccountList({ phoneNumber, name, pageSize, pageNum }) {
  const params = new URLSearchParams(
    { phoneNumber, name, pageSize, pageNum }
  )

  return request({
    url: `/account/list?${params}`,
    method: 'get'
  })
}

export function adminAccountUpdate({ accountId, amount, password, email, sex, status, latitude, longitude }) {
  return request({
    url: `/account/update`,
    method: 'put',
    data: { accountId, amount, password, email, sex, status, latitude, longitude }
  })
}

export function adminAccountDel(id) {
  return request({
    url: `/account/${id}`,
    method: 'delete'
  })
}

export function adminAccountAdd({ phoneNumber, password }) {
  return request({
    url: `/account/add`,
    method: 'post',
    data: { phoneNumber, password }
  })
}

/** 业务员相关api */
export function adminWorkerList({ userName, nodeName, name, pageSize, pageNum }) {
  const params = new URLSearchParams(
    { userName, nodeName, name, pageSize, pageNum }
  )
  return request({
    url: `/business-people/list?${params}`,
    method: 'get'
  })
}

export function adminWorkerUpdate({ businessPeopleId, name, phonenumber, email, sex, nodeName }) {
  return request({
    url: `/business-people`,
    method: 'put',
    data: { businessPeopleId, name, phonenumber, email, sex, nodeName }
  })
}

export function adminWorkerDel(id) {
  return request({
    url: `/business-people/${id}`,
    method: 'delete'
  })
}

export function adminWorkerAdd({ username, password }) {
  return request({
    url: `/business-people/add`,
    method: 'post',
    data: { username, password }
  })
}

/** 节点相关api */
export function adminNodeList({ nodeName, pageSize, pageNum }) {
  const params = new URLSearchParams(
    { nodeName, pageSize, pageNum }
  )
  return request({
    url: `/node/list?${params}`,
    method: 'get'
  })
}

export function adminNodeUpdate({ nodeId, nodeName, longitude, latitude }) {
  return request({
    url: `/node/update`,
    method: 'put',
    data: { nodeId, nodeName, longitude, latitude }
  })
}

export function adminNodeDel(id) {
  return request({
    url: `/node/${id}`,
    method: 'delete'
  })
}

export function adminNodeAdd({ nodeName, longitude, latitude }) {
  return request({
    url: `/node/add`,
    method: 'post',
    data: { nodeName, longitude, latitude }
  })
}

/** 服务相关api */
export function adminServiceList({ broadbandServiceName, typeId, pageSize, pageNum }) {
  const params = new URLSearchParams(
    { broadbandServiceName, typeId, pageSize, pageNum }
  )
  return request({
    url: `/broadband-service/list?${params}`,
    method: 'get'
  })
}

export function adminServiceUpdate({ broadbandServiceName, typeId, broadbandServiceId }) {
  return request({
    url: `/broadband-service/update`,
    method: 'put',
    data: { broadbandServiceName, typeId, broadbandServiceId }
  })
}

export function adminServiceDel(id) {
  return request({
    url: `/broadband-service/${id}`,
    method: 'delete'
  })
}

export function adminServiceAdd({ broadbandServiceName, typeId }) {
  return request({
    url: `/broadband-service/add`,
    method: 'post',
    data: { broadbandServiceName, typeId }
  })
}

/** 服务类型相关api */
export function adminServiceTypeList({ typeName }) {
  const params = new URLSearchParams(
    { typeName }
  )
  return request({
    url: `/service-type/typeTree?${params}`,
    method: 'get'
  })
}

export function adminServiceTypeUpdate({ typeId, typeName }) {
  return request({
    url: `/service-type/update`,
    method: 'put',
    data: { typeId, typeName }
  })
}

export function adminServiceTypeDel(id) {
  return request({
    url: `/service-type/${id}`,
    method: 'delete'
  })
}

export function adminServiceTypeAdd({ typeName, parentId }) {
  return request({
    url: `/service-type/add`,
    method: 'post',
    data: { typeName, parentId }
  })
}

/** 订单相关api */
export function adminWorkOrderList({ serviceName, businessPeopleName, accountName, workOrderName, pageSize, pageNum }) {
  const params = new URLSearchParams(
    { serviceName, businessPeopleName, accountName, workOrderName, pageSize, pageNum }
  )
  return request({
    url: `/workOrder/list?${params}`,
    method: 'get'
  })
}

export function adminWorkOrderDel(id) {
  return request({
    url: `/workOrder/${id}`,
    method: 'delete'
  })
}

export function adminWorkOrderInfoById(id) {
  return request({
    url: `/workOrder/${id}`,
    method: 'get'
  })
}

/** 文件上传api */
export function uploadFile(file) {
  const formData = new FormData()
  formData.append('file', file)

  return request({
    url: `/system/storage/upload`,
    method: 'post',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
