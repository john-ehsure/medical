import * as API from './'
import qs from 'qs'

export default {
  // 查询用户是否注册 第一步
  reg_first: params => {
    return API.POST('/auth_api/reg_first', qs.stringify(params))
  },
  // 查询用户是否注册 第二步
  reg_second: params => {
    return API.POST('/auth_api/reg_second', qs.stringify(params))
  },
  // 用户登录
  login: params => {
    return API.POST('/auth_api/token', qs.stringify(params))
  },
  //  获取用户基本信息
  userprofile: params => {
    return API.GET('/auth_api/userprofile', params)
  },

}
