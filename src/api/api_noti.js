import * as API from './'
import qs from 'qs'

export default {
  // 获取医生列表
  boardroomnum: params => {
    return API.GET('/noti_api/boardroomnum', qs.stringify(params))
  },

}
