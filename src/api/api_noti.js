import * as API from './'
import qs from 'qs'

export default {
  //  消息推送
  //   notification =
  // 获取医生列表
  boardroomnum: params => {
    return API.GET('/noti_api/boardroomnum', params)
  },
  //  生成房间号
  creatboardroomnum: params => {
    return API.POST('/noti_api/boardroomnum', qs.stringify(params))
  },
  // 离线信息 视频邀请 接受拒绝
  noterequest: params => {
    return API.POST('/noti_api/note', qs.stringify(params))
  },
}
