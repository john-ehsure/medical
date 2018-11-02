import * as API from './'
import qs from 'qs'

export default {
  // 填写并提交个⼈人信息表单
  practitioners: params => {
    return API.POST('/data_api/practitioners/', qs.stringify(params))
  },
    practitionersDetail: params => {
        return API.GET('/data_api/practitioners/', params)
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
