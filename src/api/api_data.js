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
  //  创建诊疗计划
  medicalplan: params => {
    return API.POST('/data_api/medicalplan', params)
  },
  //  修改诊疗计划
  medicalplanPatch: (id, params) => {
    return API.PATCHID('/data_api/medicalplan', id, params)
  },
  //  创建诊断
  comment: params => {
    return API.POST('/data_api/comment', params)
  },
  //  修改诊断
  commentPatch: (id, params) => {
    return API.PATCHID('/data_api/comment', id, params)
  },
  //  诊疗结果的创建
  diagresult: params => {
    return API.POST('/data_api/diagresult', params)
  },
  //  诊疗结果的修改
  diagresultPatch: (id, params) => {
    return API.PATCHID('/data_api/diagresult', id, params)
  },
  //  既往病史  个人史  婚育史 男女生殖检查 的创建
  history: params => {
    return API.POST('/data_api/history', params)
  },
  //  既往病史  个人史  婚育史 男女生殖检查 的修改
  historyPatch: (id, params) => {
    return API.PATCHID('/data_api/history', id, params)
  },
  //  基本病要下的表单
  firstindex: params => {
    return API.POST('/data_api/firstindex', qs.stringify(params))
  },

}
