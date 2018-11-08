import * as API from './'
import qs from 'qs'

export default {
  // 填写并提交个⼈人信息表单
  practitionersEdit: (id, params) => {
    return API.PATCHID('/data_api/practitioners', id, qs.stringify(params))
  },
  //  获取个人信息
  practitionersDetail: params => {
    return API.GET('/data_api/practitioners', params)
  },
  //  患者列表新建患者接口
  createPatients: params => {
    return API.POST('/data_api/patients', qs.stringify(params))
  },
  //  获取患者列表接口
  patients: params => {
    return API.GET('/data_api/patients', params)
  },
  //  患者对应的详细信息
  patientsDetail: (id, params) => {
    return API.GETID('/data_api/patients', id, params)
  },
  //  患者基本病要信息
  medicalRecord: params => {
    return API.GET('/data_api/medical_record', params)
  },
  //  生成电子病历主键
  medicalRecordId: params => {
    return API.POST('/data_api/medical_record', qs.stringify(params))
  },
  //  基本病要下的表单
  firstindex: params => {
    return API.POST('/data_api/firstindex', qs.stringify(params))
  },
  // 查询用户是否注册 第二步
  // reg_second: params => {
  //   return API.POST('/auth_api/reg_second/', qs.stringify(params))
  // },
  // 用户登录
  // login: params => {
  //   return API.POST('/auth_api/token/', qs.stringify(params))
  // },
  //  获取用户基本信息
  // userprofile: params => {
  //   return API.GET('/auth_api/userprofile', params)
  // },
}
