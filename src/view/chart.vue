<template>
    <div class="chart-page">
        <slideTab :hasAdd="false" :listData="personlistData">
            <li slot="slideLi" @click="changeList(item,index)" v-for="(item,index) in personlistData" :class="{'active': index == tabNum}">
                <div class="slideTab-list_img">
                    <!--<span class="slideTab-list_mesNum" v-if="item.mesNum">{{item.mesNum}}</span>-->
                    <img :src="item.img"/>
                </div>
                <div class="slideTab-list_content">
                    <p>{{item.pinfo.name}} {{item.gender==1 ? '男' : '女'}}</p>
                    <p>编号 {{item.pinfo.id_no}}</p>
                </div>
            </li>
        </slideTab>
        <div class="chart-im">
            <!--im 标题-->
            <div class="chart-imTitle" ref="imTitle">
                <span class="chart-adverse_input">对方正在输入...</span>
                <span>{{personDetail.pinfo.name}}</span>
                <span class="marginLeft_15">{{personDetail.pinfo.hospital}}</span>
                <span class="marginLeft_15">{{personDetail.pinfo.subject}}</span>
                <div class="chart-imTitle_button">
                    <i class="hui-icon-ziyuan36"></i>
                    <i class="hui-icon-ziyuan32" @click="showVideo"></i>
                    <i class="hui-icon-ziyuan33"></i>
                </div>
            </div>
            <!--im 聊天部分-->
            <div class="chart-imDialogue" :style="{height: imDialogueHei+'px'}" ref="imDialogueCartion">
                <div class="medical-table">
                    <div class="chart-nowTime"><el-button type="info" size="mini" round disabled>03:22</el-button></div>
                    <ul class="medical-table_list">
                        <li>
                            <div class="medical-list_flex" :class=" personDetail.isRead ? 'medical-list_read' : 'medical-list_unread' ">
                                <div class="medical-list_img">
                                    <img :src="personDetail.img"/>
                                </div>
                                <div class="medical-list_mes">
                                    {{personDetail.pinfo.name}}<br>编号{{personDetail.pinfo.id_no}}
                                </div>
                                <div class="medical-list_operation">
                                    <span>{{personDetail.pinfo.hospital}}</span>
                                    <!--<span v-if="personDetail.mesType == '1'">本地新进患者通知</span>
                                    <span v-if="personDetail.mesType == '2'">检查结果通知</span>
                                    <span v-if="personDetail.mesType == '3'">转诊申请通知</span>
                                    <span v-if="personDetail.mesType == '4'">转诊结果通知</span>-->
                                </div>
                                <div class="medical-list_operation col-green">
                                    <span>{{personDetail.pinfo.subject}}</span>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <ul>
                    <li :class="[item.isSelf?'imDialogue_self':'']" v-for="item in imDialogue">
                        <div class="chart-imDialogue_img"><img :src="item.isSelf ? selfDetail.img : personDetail.img"/></div>
                        <div class="chart-imDialogue_content">
                            <img v-if="item.isImg" :src="item.img" />
                            <span v-else>{{item.title}}</span>
                            <div class="mesage-state">已读</div>
                        </div>
                    </li>
                </ul>
            </div>
            <!--im 发生消息部分-->
            <div class="chart-imSend" ref="imSend">
                <!--<el-form>-->
                    <div class="el-input">
                        <input type="text" autocomplete="off" v-model="imSendMes" placeholder="请输入内容" class="el-input__inner">
                    </div>
                <!--</el-form>-->
                <el-button type="success" class="imSend-botton" @click.native="sendMes">发送</el-button>
            </div>
        </div>
        <!--测试功能使用-->
        <div style="display: none">
            <!--<el-button @click="closeAudio">关闭声音</el-button>-->
            <!--<el-button @click="openAudio">打开声音</el-button>-->
            <!--<el-button @click="closeVideo">关闭视频</el-button>-->
            <!--<el-button @click="openVideo">打开视频</el-button>-->
            <!--<el-button @click="stopWs">断开当前视频</el-button>-->
            <!--<el-button @click="showVideo">显示视频</el-button>-->
        </div>
        <!--打开视频通话部分-->
        <div class="chart-video" :class="[isVideoState?'':'chart-editPhoto']" v-show = "isShowVideo">
            <!-- 本地视频流 -->
            <video class="localVideo" id="localVideo" muted autoplay playsinline></video>
            <!-- 远端视频流 -->
            <video class="remoteVideo" id="remoteVideo" autoplay playsinline></video>
            <div class="chart-video_button">
                <i class="el-icon-edit" v-if="isVideoState" @click="isVideoState = !isVideoState"></i>
                <i class="el-icon-phone-outline" v-else  @click="isVideoState = !isVideoState"></i>
                <i class="el-icon-edit close-video" @click="stopWs"></i>
            </div>
            <!--修改选中的图片-->
            <div class="edit-photo_content" v-if="!isVideoState">
                <drop class="edit-photo_drop" @arrive="arrive" @away="away" name="imgDrag">
                    <img class="edit-photo_dropImg" :src="dropImg">
                </drop>
                <!--工具部分-->
                <div class="edit-photoTool">
                    <i class="edit-photoTool_pencil"></i><br>
                    <i class="edit-photoTool_eraser"></i><br>
                    <i class="edit-photoTool_color tool-colorRed " :class="{'edit-photoTool_active': toolPencilType}" @click="toolPencilType = true"></i><br>
                    <i class="edit-photoTool_color tool-colorCyan" :class="{'edit-photoTool_active': !toolPencilType}" @click="toolPencilType = false"></i>
                </div>
            </div>
            <!--视频时右侧聊天部分-->
            <div class="chart-video_photo">
                <ul :style="{height:(screenHeight-48)+'px'}">
                    <li :class="[item.isSelf?'self-photo':'']" v-for="item in videoMes">
                        <div class="chart-video_img"><img :src="item.isSelf ? selfDetail.img : personDetail.img"/></div>
                        <div class="chart-video_content">
                            <drag duplicate constantly @dragend="dragEnd" :packet="{img:item}" target="imgDrag">
                                <img :src="item.photo"/>
                            </drag>
                        </div>
                    </li>
                </ul>
                <div class="chart-video_mes">
                    <div class="el-input el-input--mini mes-flex">
                        <input type="text" autocomplete="off" placeholder="请输入内容" class="el-input__inner">
                    </div>
                    <i class="el-icon-picture"></i>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    // WebRTC SDK
    // require('../WebWX/webRTCAPI.min')
    // import webRTCAPI from '../WebWX/webRTCAPI.min'
    //<!-- WebIM SDK -->
    // require('../WebWX/webim.min.js')
    //<!-- 白板SDK -->
    // require('../WebWX/board_sdk.mini.js')
    //<!-- COS SDK -->
    // require('../WebWX/cos.mini.js')
    // import cosMini from '../WebWX/cos.mini.js'
    //<!-- TIC SDK -->
    // require('../WebWX/TICSDK.mini.js')
    // import TICSDK from '../WebWX/TICSDK.mini.js'

    require('../WebWX/OSS.min.js')
    import slideTab from '../components/slideTab/index.vue'
    import APINOTI from '@/api/api_noti.js'
    export default {
        name: 'chart',
        props: {
            userID: {//  userID 医生端登陆时的用户名
                type: String,
                default: ''
            },
            userSig: {//  usersig 音视频所需 用户签名
                type: String,
                default: ''
            },
        },
        components: {
            slideTab
        },
        data () {
            return {
                //人元列表
                tabNum: 0,
                personlistData: [
                    // {img: require("./../assets/logo.png"), personName: '刘奇', downHospital: '北医三院', downDoctor: '王主任', personSex: 0, personNumber: '00010220', mesNum: 0, finish: 3, unfinish: 4 ,mesType: 1,time: '2018.01.01',isRead: true},
                    // {img: require("./../assets/logo.png"), personName: '刘1', downHospital: '北医三院', downDoctor: '刘主任', personSex: 1, personNumber: '00010220', mesNum: 2, finish: 0, unfinish: 2,mesType: 2,time: '2018.01.02',isRead: true},
                    // {img: require("./../assets/logo.png"), personName: '刘2', downHospital: '北医三院', downDoctor: '李主任', personSex: 0, personNumber: '00010220', mesNum: 0, finish: 1, unfinish: 4,mesType: 3,time: '2018.01.02',isRead: true},
                    // {img: require("./../assets/logo.png"), personName: '刘3', downHospital: '北医三院', downDoctor: '赵主任', personSex: 0, personNumber: '00010220', mesNum: 0, finish: 3, unfinish: 4,mesType: 4,time: '2018.01.03',isRead: true},
                    // {img: require("./../assets/logo.png"), personName: '刘4', downHospital: '北医三院', downDoctor: '何主任', personSex: 1, personNumber: '00010220', mesNum: 2, finish: 1, unfinish: 4,mesType: 1,time: '2018.01.04',isRead: true},
                    // {img: require("./../assets/logo.png"), personName: '刘5', downHospital: '北医三院', downDoctor: '左主任', personSex: 0, personNumber: '00010220', mesNum: 0, finish: 2, unfinish: 4,mesType: 1,time: '2018.01.06',isRead: true},
                    // {img: require("./../assets/logo.png"), personName: '刘5', downHospital: '北医三院', downDoctor: '博主任', personSex: 1, personNumber: '00010220', mesNum: 6, finish: 3, unfinish: 2,mesType: 1,time: '2018.01.07',isRead: true}
                ],
                selfDetail:{
                    img: require("./../assets/logo.png"),
                    personName: '刘大夫'
                },
                personDetail: {
                    online: true,
                    pinfo: {}
                },//人员详情信息
                imDialogue: [
                    {isSelf:true,title:'这是一个好东西啊'},
                    {isSelf:false,title:'这是一个好东西啊'},
                    {isSelf:true,title:'这是一个好这是一个好东西啊这是一个好东西啊这是一个好东西啊这是一个好东西啊东西啊'},
                    {isSelf:false,title:'这是一个好东西啊'},
                    {isSelf:true,title:'这是一个好东西啊'},
                    {isSelf:false,title:'这是一个好东西啊'},
                    {isSelf:false,title:'这是一个好东西啊',isImg: true,img: require("./../assets/logo.png")},
                    {isSelf:true,title:'这是一个好东西啊'},
                    {isSelf:true,title:'这是一个好东西啊'},
                    {isSelf:false,title:'这是一个好东西啊'},
                    {isSelf:true,title:'这是一个好东西啊'},
                ],
                isVideoState: true,//是否为视频状态  false为编辑图片状态
                videoMes:[
                    {isSelf:true,photo:require("./../assets/photo.jpg")},
                    {isSelf:false,photo:require("./../assets/logo.png")},
                    {isSelf:true,photo:require("./../assets/logo.png")},
                    {isSelf:false,photo:require("./../assets/photo.jpg")},
                ],
                toolPencilType: true,//铅笔的颜色 true 为红色  false 为青色
                dropImg:'',//默认编辑的图片
                isShowVideo: false,//是否显示视频界面
                imDialogueHei: 400,//聊天信息部分默认高度
                screenWidth: 1000,//屏幕宽度
                screenHeight: 500,//屏幕高度
                RTC: {},//视频流对象信息
                imSendMes: '',//im部分聊天发送信息

                // 以下为音视频 im 白板部分所需要的字段
                step:'first',
                pushModel: 0, // 1  自动推流 0 手动推流
                account: localStorage.getItem('IIC_USERID'),
                // userID: sessionStorage.getItem('IIC_USERNAME'),  //医生端登陆时的用户名
                sdkAppId: '1400159415',   // 腾讯sdkAppId
                // userSig: '',    //用户签名
                nickName: sessionStorage.getItem('IIC_NICKNAME'), //用户名称+userID
                roomID:'',
                ticSdk: null,
                isFirstConnected: 0, //是否是第一次链接
                enableCamera: true,
                enableMic: true,
                client: null,  //向OSS传输照片的代理
                msgs: [],
                isPushing: 0, // 是否正在推流
                isPushCamera: 0, // 是否推摄像头流
                devices: {
                    camera: [],
                    mic: []
                },

                cameraIndex: 0,
                micIndex: 0,

                imMsg: {
                    common: {},
                    custom: {}
                },

                boardData: {
                    data: {
                        current: null,
                        list: []
                    },
                    page: {
                        current: 0,
                        total: 0
                    }
                },

                loginConfig: {
                    identifier: null,
                    identifierNick: null,
                    userHeadImg: null,
                    userSig: null,
                    sdkAppId: null
                },

                webrtcConfig: {
                    closeLocalMedia: true,
                    audio: true,
                    video: true,
                    role: null
                },

                boardConfig: {
                    id: null,
                    canDraw: null,
                    color: null,
                    globalBackgroundColor: null
                },

                cosConfig: {
                    appid: null,
                    bucket: null,
                    region: null,
                    sign: null
                },

                ossConfig: {
                    accessKeyId: null,
                    accessKeySecret: null,
                    stsToken: null,
                    endpoint: null,
                    bucket: null
                },

                endpoint: '',
                bucket: '',

                uploadUrl: '',
                jwt:'',
                remoteVideos: {}
            }
        },
        mounted () {
            this.screenHeight = document.documentElement.clientHeight;
            this.screenWidth = document.documentElement.clientWidth;
            /*im 聊天部分高度设置*/
            this.imDialogueHei = this.screenHeight - this.$refs.imSend.offsetHeight - this.$refs.imTitle.offsetHeight;
            this.boardroomnum()
            this.getTencentConf()
        },
        watch: {
            'imDialogue': 'scrollToBottom'
        },
        methods: {
            /**
             * 设置医生的默认信息
             */
            getTencentConf () {
                this.loginConfig = {
                    identifier: this.userID,
                    identifierNick: '用户昵称' + this.userID,
                    userSig: this.userSig,
                    sdkAppId: this.sdkAppId,
                    accountType: 1
                };
                console.log(this.loginConfig);
                this.ticSdk = new TICSDK();
                this.ticSdk.init();
                this.initEvent();
                this.ticSdk.login(this.loginConfig);

                this.step = 'second';
            },
            /**
             * 初始化链接
             */
            initEvent() {
                this.ticSdk.on(TICSDK.CONSTANT.EVENT.IM.CONNECTION_EVENT, res => {
                    switch (res.ErrorCode) {
                        case webim.CONNECTION_STATUS.ON:
                            console.log('连接状态正常...');
                            break;
                        case webim.CONNECTION_STATUS.OFF:
                            this.showErrorTip('IM 连接已断开，无法收到新消息，请检查下你的网络是否正常');
                            console.error('连接已断开，无法收到新消息，请检查下你的网络是否正常');
                            break;
                        default:
                            this.showErrorTip('未知连接状态,status=' + res.ErrorCode);
                            console.error('未知连接状态,status=' + res.ErrorCode);
                            break;
                    }
                });



                this.ticSdk.on(TICSDK.CONSTANT.EVENT.IM.LOGIN_ERROR, err => {
                    this.showErrorTip('IM 登录失败');
                    console.error('IM 登录失败', err);
                    this.step = 'first';
                });

                this.ticSdk.on(TICSDK.CONSTANT.EVENT.IM.GROUP_IS_ALREADY_USED_ERROR, err => {
                    this.showErrorTip('房间已经被使用，请换其他房间');
                    console.error('房间已经被使用，请换其他房间', err);
                    this.step = 'first';
                });


                this.ticSdk.on(TICSDK.CONSTANT.EVENT.BOARD.HISTROY_DATA_COMPLETE, () => {
                    this.showTip('历史数据加载完成');
                    console.log('TICSDK.CONSTANT.EVENT.BOARD.HISTROY_DATA_COMPLETE');
                });

                this.ticSdk.on(TICSDK.CONSTANT.EVENT.TIC.CREATE_CLASS_ROOM_ERROR, res => {
                    this.showErrorTip('创建课堂失败');
                    console.log('TICSDK.CONSTANT.EVENT.TIC.CREATE_CLASS_ROOM_ERROR');
                    this.step = 'first';
                });

                this.ticSdk.on(TICSDK.CONSTANT.EVENT.WEBRTC.INIT_SUCC, res => {
                    this.showTip('WebRTC初始化成功');
                    console.log('TICSDK.CONSTANT.EVENT.WEBRTC.INIT_SUCC');

                });

                this.ticSdk.on(TICSDK.CONSTANT.EVENT.WEBRTC.INIT_ERROR, err => {
                    console.log('TICSDK.CONSTANT.EVENT.WEBRTC.INIT_ERROR');
                    this.step = 'first';
                    this.showErrorTip('WebRTC初始化失败');
                });
                this.ticSdk.on(TICSDK.CONSTANT.EVENT.WEBRTC.LOCAL_STREAM_ADD, data => {
                    document.getElementById('localVideo').srcObject = data.stream;
                    this.isPushing = 1; // 正在推流
                    this.showTip('WebRTC接收到本地流');
                });
                this.ticSdk.on(TICSDK.CONSTANT.EVENT.WEBRTC.REMOTE_STREAM_UPDATE, data => {
                    this.$set(this.remoteVideos, data.videoId, data);
                    this.$nextTick(() => {
                        if (document.getElementById(data.videoId)) {
                            document.getElementById(data.videoId).srcObject = data.stream;
                        }
                    });
                    this.showTip('WebRTC接收到远端流');
                });

                this.ticSdk.on(TICSDK.CONSTANT.EVENT.WEBRTC.REMOTE_STREAM_REMOVE, data => {
                    this.$delete(this.remoteVideos, data.videoId);
                    this.showTip('WebRTC 远端流断开');
                });

                this.ticSdk.on(TICSDK.CONSTANT.EVENT.WEBRTC.PEER_CONNECTION_ADD, data => {
                    console.log('WebRTC PEER_CONNECTION_ADD');
                    this.showTip('WebRTC PEER_CONNECTION_ADD');
                });

                this.ticSdk.on(TICSDK.CONSTANT.EVENT.WEBRTC.ERROR_NOTIFY, data => {
                    console.log('WebRTC ERROR_NOTIFY');
                    this.showTip('WebRTC ERROR_NOTIFY');
                });

                this.ticSdk.on(TICSDK.CONSTANT.EVENT.WEBRTC.WEBSOCKET_NOTIFY, data => {
                    console.log('WebRTC WEBSOCKET_NOTIFY');
                    this.showTip('WebRTC WEBSOCKET_NOTIFY');
                });

                this.ticSdk.on(TICSDK.CONSTANT.EVENT.WEBRTC.STREAM_NOTIFY, data => {
                    console.log('WebRTC STREAM_NOTIFY');
                    this.showTip('WebRTC STREAM_NOTIFY');
                });

                //
                this.ticSdk.on(TICSDK.CONSTANT.EVENT.TIC.ROOMID_NOT_FOUND, data => {
                    this.showTip('学生进入房间请输入房间号');
                });

                this.ticSdk.on(TICSDK.CONSTANT.EVENT.TIC.JOIN_CLASS_ROOM_SUCC, data => {
                    this.showTip('加入课堂成功');
                    // window.IM = app.ticSdk.getIminstance();
                    window.board = this.ticSdk.getBoardInstance();
                    window.WebRTC = this.ticSdk.getWebRTCInstance();

                    // 如果是主动推流
                    if (this.pushModel === 1) {
                        this.startRTC();
                    }
                });

                this.ticSdk.on(TICSDK.CONSTANT.EVENT.TIC.JOIN_CLASS_ROOM_ERROR, data => {
                    this.showErrorTip('加入课堂失败,请确定该课堂是否已经由老师创建');
                    this.step = 'first';
                });


                this.ticSdk.on(TICSDK.CONSTANT.EVENT.IM.GROUP_SYSTEM_NOTIFYS, imEvent => {
                    if (imEvent.event_type === 5) { // 群被解散
                        this.ticSdk.quitClassroom();
                        this.showTip(`老师解散了课堂`);
                    } else if (imEvent.event_type === 8) {
                        this.showTip(`退出了课堂`);
                    }
                });

                // 接收到聊天群组消息
                this.ticSdk.on(TICSDK.CONSTANT.EVENT.IM.RECEIVE_CHAT_ROOM_MSG, msgs => {
                    console.log('TICSDK.CONSTANT.EVENT.IM.RECEIVE_CHAT_ROOM_MSG');
                    msgs.elems.forEach(msg => {
                        var content = msg.getContent();
                        if (msgs.getFromAccount() === '@TIM#SYSTEM') { // 接收到系统消息
                            var opType = content.getOpType(); // 通知类型
                            if (opType === webim.GROUP_TIP_TYPE.JOIN) { // 加群通知
                                this.msgs.push({
                                    send: '群消息提示：',
                                    content: content.getOpUserId() + '进群了'
                                });
                            } else if (opType === webim.GROUP_TIP_TYPE.QUIT) { // 退群通知
                                this.msgs.push({
                                    send: '群消息提示：',
                                    content: content.getOpUserId() + '退群了'
                                });
                            } else if (opType === webim.GROUP_TIP_TYPE.KICK) { // 踢人通知

                            } else if (opType === webim.GROUP_TIP_TYPE.SET_ADMIN) { // 设置管理员通知

                            } else if (opType === webim.GROUP_TIP_TYPE.CANCEL_ADMIN) { // 取消管理员通知

                            } else if (opType === webim.GROUP_TIP_TYPE.MODIFY_GROUP_INFO) { // 群资料变更

                            } else if (opType === webim.GROUP_TIP_TYPE.MODIFY_MEMBER_INFO) { //群成员资料变更

                            }
                        } else { // 接收到群聊天消息
                            var type = msg.getType();
                            if (type === 'TIMTextElem') {
                                this.msgs.push({
                                    send: msgs.getFromAccount() + '：',
                                    content: content.getText()
                                });
                            } else if (type === 'TIMCustomElem') {
                                this.msgs.push({
                                    send: msgs.getFromAccount() + '：',
                                    content: `data: ${content.getData()} desc: ${content.getDesc()} ext: ${content.getExt()}`
                                });
                            }
                        }
                    });
                });

                // 接收到C2C消息
                this.ticSdk.on(TICSDK.CONSTANT.EVENT.IM.RECEIVE_C2C_MSG, msgs => {
                    console.log('TICSDK.CONSTANT.EVENT.IM.RECEIVE_C2C_MSG');
                    msgs.elems.forEach(msg => {
                        var content = msg.getContent();
                        var type = msg.getType();
                        if (type === 'TIMTextElem') {
                            this.msgs.push({
                                send: msgs.getFromAccount() + '：',
                                content: content.getText()
                            });
                        } else if (type === 'TIMCustomElem') {
                            this.msgs.push({
                                send: msgs.getFromAccount() + '：',
                                content: `data: ${content.getData()} desc: ${content.getDesc()} ext: ${content.getExt()}`
                            });
                        }
                    });
                });

                // 接收到普通消息
                this.ticSdk.on(TICSDK.CONSTANT.EVENT.IM.MSG_NOTIFY, msgs => {
                    console.log('TICSDK.CONSTANT.EVENT.IM.MSG_NOTIFY');
                });

                this.ticSdk.on(TICSDK.CONSTANT.EVENT.BOARD.ADD_BOARD, data => {
                    this.proBoardData(data);
                    console.log('TICSDK.CONSTANT.EVENT.BOARD.ADD_BOARD', '白板增加一页');
                });

                this.ticSdk.on(TICSDK.CONSTANT.EVENT.BOARD.DELETE_BOARD, data => {
                    this.proBoardData(data);
                    console.log('TICSDK.CONSTANT.EVENT.BOARD.DELETE_BOARD', '白板删除一页');
                });

                this.ticSdk.on(TICSDK.CONSTANT.EVENT.BOARD.SWITCH_BOARD, data => {
                    this.proBoardData(data);
                    console.log('TICSDK.CONSTANT.EVENT.BOARD.SWITCH_BOARD', '白板切换');
                });

                this.ticSdk.on(TICSDK.CONSTANT.EVENT.BOARD.ADD_GROUP, gid => {
                    console.log('TICSDK.CONSTANT.EVENT.BOARD.ADD_GROUP', '增加白板组');
                });

                this.ticSdk.on(TICSDK.CONSTANT.EVENT.BOARD.DELETE_GROUP, gid => {
                    console.log('TICSDK.CONSTANT.EVENT.BOARD.DELETE_GROUP', '删除白板组');
                });

                this.ticSdk.on(TICSDK.CONSTANT.EVENT.BOARD.SWITCH_GROUP, gid => {
                    console.log('TICSDK.CONSTANT.EVENT.BOARD.SWITCH_GROUP', '切换白板组');
                });

                this.ticSdk.on(TICSDK.CONSTANT.EVENT.BOARD.REAL_TIME_DATA, data => {
                    console.log('TICSDK.CONSTANT.EVENT.BOARD.REAL_TIME_DATA', '接收到白板实时数据', data);
                });

                this.ticSdk.on(TICSDK.CONSTANT.EVENT.BOARD.ADD_DATA_ERROR, data => {
                    console.log('TICSDK.CONSTANT.EVENT.BOARD.ADD_DATA_ERROR', '接收到白板其他用户数据有错误');
                });

                this.ticSdk.on(TICSDK.CONSTANT.EVENT.BOARD.VERIFY_SDK_SUCC, () => {
                    console.log('白板SDK鉴权通过');
                });

                this.ticSdk.on(TICSDK.CONSTANT.EVENT.BOARD.VERIFY_SDK_ERROR, () => {
                    console.log('白板SDK鉴权不通过');
                });

                this.ticSdk.on(TICSDK.CONSTANT.EVENT.BOARD.IMG_START_LOAD, (data) => {
                    console.log('TICSDK.CONSTANT.EVENT.BOARD.ADD_DATA_ERROR', '开始加载图片', data);
                    this.showTip('开始加载图片');
                });

                this.ticSdk.on(TICSDK.CONSTANT.EVENT.BOARD.IMG_LOAD, (data) => {
                    console.log('TICSDK.CONSTANT.EVENT.BOARD.ADD_DATA_ERROR', '图片加载成功', data);
                    this.showTip('图片加载成功');
                });

                this.ticSdk.on(TICSDK.CONSTANT.EVENT.BOARD.IMG_ERROR, (data) => {
                    console.log('TICSDK.CONSTANT.EVENT.BOARD.ADD_DATA_ERROR', '图片加载失败', data);
                    this.showTip('图片加载失败');
                });

                this.ticSdk.on(TICSDK.CONSTANT.EVENT.BOARD.IMG_ABORT, (data) => {
                    console.log('TICSDK.CONSTANT.EVENT.BOARD.ADD_DATA_ERROR', '图片中断加载', data);
                    this.showTip('图片中断加载');
                });

                this.ticSdk.on(TICSDK.CONSTANT.EVENT.COS.TASK_READY, data => {
                    console.log('TICSDK.CONSTANT.EVENT.COS.TASK_READY', '上传任务创建时的回调函数，返回一个 taskId');
                });

                this.ticSdk.on(TICSDK.CONSTANT.EVENT.COS.HASH_PROGRESS, data => {
                    console.log('TICSDK.CONSTANT.EVENT.COS.HASH_PROGRESS', '计算文件 MD5 值的进度回调函数');
                });


                this.ticSdk.on(TICSDK.CONSTANT.EVENT.COS.PROGRESS, data => {
                    console.log('TICSDK.CONSTANT.EVENT.COS.PROGRESS', '上传文件的进度回调函数 data.percent:', data);
                    this.showTip(`上传进度：${Math.floor(data.percent * 100)}%`);
                });

                this.ticSdk.on(TICSDK.CONSTANT.EVENT.COS.GET_SIGN_ERROR, data => {
                    this.showTip(`获取sigin错误`);
                });

                this.ticSdk.on(TICSDK.CONSTANT.EVENT.COS.GET_SIGN_SUCCESS, data => {
                    this.showTip(`获取sigin成功`);
                });

                this.ticSdk.on(TICSDK.CONSTANT.EVENT.COS.UPLOAD_SUCCESS, data => {
                    this.showTip(`上传成功`);
                    this.showTip(`文件上传完成，正在获取文件总页数~`);
                });

                this.ticSdk.on(TICSDK.CONSTANT.EVENT.COS.UPLOAD_ERROR, data => {
                    this.showTip(`上传失败`);
                });

                this.ticSdk.on(TICSDK.CONSTANT.EVENT.TIC.QUIT_CLASS_ROOM_SUCC, data => {
                    this.step = 'first';
                    this.showTip(`退出课堂成功`);
                });

                this.ticSdk.on(TICSDK.CONSTANT.EVENT.TIC.QUIT_CLASS_ROOM_ERROR, data => {
                    this.showErrorTip(`退出课堂失败`);
                });

                this.ticSdk.on(TICSDK.CONSTANT.EVENT.TIC.DESTROY_CLASS_ROOM_SUCC, () => {
                    this.step = 'first';
                    this.showTip(`销毁课堂成功`);
                });

                this.ticSdk.on(TICSDK.CONSTANT.EVENT.TIC.DESTROY_CLASS_ROOM_ERROR, () => {
                    this.showErrorTip(`销毁课堂失败`);
                });

                this.ticSdk.on(TICSDK.CONSTANT.EVENT.IM.KICKED, () => {
                    alert(`其他地方登录，被T了`);
                    this.step = 'first';
                });
            },
            /**
             * 显示错误信息
             */
            showErrorTip(title, time) {
                /*
                this.$toasted.error(title, {
                  position: "top-right",
                  duration: time || 2000
                });
                */
                alert('Error:' + title)
                console.log('Error:' + title)
            },
            /**
             * 获取左侧医生好友列表
             */
            boardroomnum () {
                APINOTI.boardroomnum().then(res=>{
                    console.log(res)
                    res.forEach((v,i)=>{
                        v.img =  require("./../assets/logo.png")
                    })
                    this.personlistData = res
                    this.personDetail = this.personlistData[0];
                })
            },
            /**
             * 离开
             * @param dropComponent
             */
            away(dropComponent) {
                dropComponent.$el.style.opacity = '1'
                dropComponent.$el.style.backgroundColor = ''
            },
            /**
             * 进入
             * @param packet
             * @param dropComponent
             */
            arrive(packet, dropComponent) {
                dropComponent.$el.style.backgroundColor = '#fff'
                dropComponent.$el.style.opacity = '.6'
            },
            /**
             * 拖动结束
             * @param e
             * @param self
             * @param dropComponent
             */
            dragEnd(e, self, dropComponent) {
                if (!dropComponent) { // 没有落在drop组件中,dropComponent为null
                    return
                }
                let itemImg = dropComponent.$el
                this.dropImg = self.packet.img.photo;
                itemImg.style.border = '2px dashed #ccc'
                itemImg.style.opacity = '1'
            },
            /**
             * im信息发送
             */
            sendMes () {
                // this.imSendMes    imDialogue
                if(this.imSendMes == ''){
                    return
                }
                let newMes = {isSelf:true,title:this.imSendMes};
                this.imDialogue.push(newMes);
                this.imSendMes = '';
                console.log('11s')
            },
            /**
             * 跳转到滚动跳底部
             */
            scrollToBottom () {
                this.$nextTick(() => {
                    let div = this.$refs.imDialogueCartion;
                    div.scrollTop = div.scrollHeight
                })
            },
            /**
             * 点击人员列表回调事件
             * @param item  单条列表信息
             * @param index 列表序号
             */
            changeList (item, index) {
                if (this.tabNum == index) {
                    return;
                }
                // let params = {
                //     "to_practitioner" : item.to_practitioner,
                //     "from_practitioner":item.from_practitioner
                // }
                // APINOTI.creatboardroomnum(params).then(res=>{
                //     console.log(res)
                // })

                this.tabNum = index
                this.personDetail = item;
            },
            showVideo () {
                this.isShowVideo = true
                this.isVideoState = true

                let params = {
                    from_practitioner: this.personDetail.from_practitioner,
                    to_practitioner: this.personDetail.to_practitioner,
                    content: ''
                }
                // 判断好友是否在线
                if(this.personDetail.online){
                    params.content = '通话请求'
                }else{
                    params.content = '离线消息'
                }

                APINOTI.noterequest(params).then(res=>{
                    console.log(res)
                })

                // document.querySelector("#localVideo").style.width = this.screenWidth +'px'
                // document.querySelector("#localVideo").style.height = this.screenHeight +'px'
                // this.videoOnline();
                this.dropImg = this.videoMes[0].photo;
            },
            // closeAudio () {
            //     alert(1)
            //     this.RTC.closeAudio();
            // },
            // openAudio (){
            //     this.RTC.openAudio();
            // },
            // closeVideo () {
            //     this.RTC.closeVideo();
            // },
            // openVideo (){
            //     this.RTC.openVideo();
            // },
            stopWs (){
                // this.RTC.global.websocket.close();
                this.isShowVideo=false;
            },
            // videoOnline () {
            //     var roomid= 900099;
            //     var stream;
            //     let self = this;
            //     this.RTC = new WebRTCAPI({
            //         useCloud: 0,
            //         "userId": 'video_15770908',
            //         "userSig": "eJxNjV1PgzAUhv8L18adtisf3rHBIhGibDqGWdLUUWajg44VNjT*dxuCmZfned73Pd-Wc7y65btd3Vaa6V4J684C62bAshCVlqUUjYGduWqGqOOAB*6Y4ErJgnHNSFP8K56KDzYow9AUAIgDmI5SXJRsBOOlHnYRpRSbyGg70ZxkXRmBAVGECcBVankQQ4V4totcgv-*yb3BSZjPozTwowWZrbv2zZ5myxSSdWbLz4fzF**zkm8nM82jMFiq-WMr0*jdjxVfJIFHafoaH8p8E3R*WxX0Pier7UT23tP5MsfJyzF0s6P18wtG-lpU",
            //         "sdkAppId":  1400037025,
            //         "accountType": 14418
            //     });
            //     console.log(this.RTC,'sdsadsads')
            //     this.RTC.getLocalStream({
            //         video:true,
            //         audio:true,
            //         attributes:{
            //             width:640,
            //             height:480,
            //             frameRate:20
            //         }
            //     },function( info ){
            //         // info { stream }
            //         console.log(info,'----------')
            //         stream = info.stream;
            //     },function ( error ){
            //         console.error( error )
            //     });
            //     //初始化完成后调用进房接口
            //     this.RTC.enterRoom({
            //         roomid : roomid
            //     },function(){
            //         //进房成功，音视频推流
            //
            //         self.RTC.startRTC({
            //             role : "user",   //画面设定的配置集名 （见控制台 - 画面设定 )
            //             stream: stream
            //         });
            //     },function(){
            //
            //     });
            //
            //     //本地流 新增
            //     this.RTC.on("onLocalStreamAdd", function(data){
            //         if( data && data.stream){
            //             document.querySelector("#localVideo").srcObject = data.stream;
            //         }
            //     });
            //     //远端流 新增/更新
            //     this.RTC.on("onRemoteStreamUpdate", function(data){
            //         if( data && data.stream){
            //             console.log(data.stream,'////////////////////')
            //             document.querySelector("#remoteVideo").srcObject = data.stream;
            //         }
            //     });
            //     this.RTC.on( 'onStreamNotify' , function( info ){
            //         console.log(info,'ghjkl')
            //     })
            // }
        },
        filters:{
             formatDateTime(inputTime){
                var date = new Date(inputTime);
                var y = date.getFullYear();
                var m = date.getMonth() + 1;
                m = m < 10 ? ('0' + m) : m;
                var d = date.getDate();
                d = d < 10 ? ('0' + d) : d;
                var h = date.getHours();
                h = h < 10 ? ('0' + h) : h;
                var minute = date.getMinutes();
                var second = date.getSeconds();
                minute = minute < 10 ? ('0' + minute) : minute;
                second = second < 10 ? ('0' + second) : second;
                return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    @import '../scss/default.scss';
    .chart-page{
        display: flex;
        width:100%;
        height:100%;
        .slideTab-search{
            width:215px;
            box-sizing: border-box;
        }
        .chart-im{
            flex:1;
            /*background-color:$medical-bgCol_white;*/
            .chart-imTitle{
                text-align: left;
                font-size: 24px;
                position: relative;
                color:#a4a4a6;
                margin:0px 20px;
                padding:10px 0px 20px;
                box-sizing: border-box;
                & > .chart-adverse_input{
                    position: absolute;
                    left:0px;
                    bottom:5px;
                    font-size:$medical-font_14;
                    color:$medical-col_d3;
                }
                .chart-imTitle_button{
                    float: right;
                    display: inline-block;
                    vertical-align: middle;
                    font-size: 0px;
                    margin-top:8px;
                    color:#7d90d2;
                    & > i{
                        font-size: 24px;
                        margin-left:15px;
                    }
                }
            }
            .chart-nowTime{
                text-align: center;
            }
            .medical-table{
                padding-top:10px;
                padding-bottom: 0px;
                .medical-table_list{
                    margin:0px 0px;
                    padding: 0px 0px;
                    & > li{
                        padding:10px 10px;
                    }
                    /*.medical-list_flex{
                        box-shadow: none;
                    }*/
                }
            }
            .chart-imDialogue{
                height:400px;
                overflow-y: auto;
                padding:0px 25px;
                ul > li{
                    text-align: left;
                    overflow: hidden;
                    padding:3px 10px;
                    line-height:1.4;
                    .chart-imDialogue_img{
                        width:60px;
                        height:60px;
                        float: left;
                        overflow: hidden;
                        box-sizing: border-box;
                        border:2px solid $medical-borCol_white;
                        box-shadow: 0px 0px 10px $medical-shadow_grey;
                        border-radius: 100%;
                        font-size: 0px;
                        img{
                            width:100%;
                            height:100%;
                        }
                    }
                    .chart-imDialogue_content{
                        display: inline-block;
                        text-align: left;
                        max-width: 55%;
                        min-width:60px;
                        margin-left:20px;
                        margin-top:13px;
                        position: relative;
                        color:$medical-col_white;
                        font-size:0px;
                        padding:7px 7px;
                        border-radius:7px;
                        background:$medical-bgCol_gradientIm;
                        & > img{
                            max-width: 150px;
                            margin:3px;
                            border-radius: 7px;
                        }
                        & > span{
                            font-size:$medical-font_15;
                            margin:0px 8px;
                        }
                        & > .mesage-state{
                            position: absolute;
                            display: inline-block;
                            right:-35px;
                            bottom:0px;
                            font-size:$medical-font_12;
                            color:#b8b8ba;
                        }
                        /*&:before{
                            position: absolute;
                            content:'';
                            left:-7px;
                            top:12px;
                            width:0px;
                            height:0px;
                            border-right:8px solid $medical-borCol_cyan;
                            border-top:5px solid transparent;
                            border-bottom:5px solid transparent;
                            z-index: 2;
                        }*/
                    }
                    &.imDialogue_self{
                        text-align: right;
                        .chart-imDialogue_img{
                            float: right;
                        }
                        .chart-imDialogue_content{
                            margin-left:0px;
                            margin-right: 20px;
                            background:#b1b8c8;
                            & > .mesage-state{
                                right:auto;
                                left:-35px;
                            }
                           /* &:before{
                                border-right-width:0px;
                                left:auto;
                                right:-7px;
                                border-left:8px solid $medical-borCol_ce;
                            }*/
                        }
                    }
                }
            }
            .chart-imSend{
                display: flex;
                align-items:center;
                padding:5px 15px 5px 5px;
                background-color:$medical-bgCol_white;
                .imSend-botton{
                    /*font-size: 24px;
                    color:$medical-col_999;*/
                    margin-left:15px;
                }
                .el-input{
                    flex:1;
                    /*box-shadow: 0px 0px 10px $medical-shadow_lightGrey;*/
                    .el-input__inner{
                        border-radius: 4px;
                        font-size: 16px;
                        border-color:$medical-borCol_tran;
                    }
                }
            }
        }
    }
    .chart-video{
        position: absolute;
        left:0px;
        top:0px;
        width:100%;
        height:100%;
        z-index: 9999;
        background-color:rgba(0,0,0,1);
        .localVideo{
            position: absolute;
            z-index: 2;
            width:200px;
            left:0px;
            top:0px;
        }
        .remoteVideo{
            position: absolute;
            display: block;
            z-index: 1;
            width:100%;
            height:100%;
            left:0px;
            top:0px;
        }
        .chart-video_button{
            display: inline-block;
            position: absolute;
            z-index: 100;
            bottom:20px;
            left:20%;
            width:35%;
            text-align: center;
            i{
                font-size: 24px;
                margin:0px 15px;
                border-radius: 100%;
                padding:15px;
                color:$medical-col_white;
                border:2px solid $medical-borCol_white;
                &.close-video{
                    background-color:$medical-bgCol_orange;
                    border-color:$medical-borCol_orange;
                }
            }
        }
        .chart-video_photo{
            width:25%;
            position: absolute;
            height:100%;
            z-index: 101;
            right:0px;
            top:0px;
            background-color:rgba(255,255,255,0.5);
            & > ul{
                height:100%;
                margin:0 auto;
                overflow-y: auto;
            }
            & > ul > li{
                display: flex;
                padding:5px 10px;
                flex-direction:row;
                flex-wrap: nowrap;
                .chart-video_img{
                    width:40px;
                    height:40px;
                    border-radius:100%;
                    display: inline-block;
                    overflow: hidden;
                    margin-right:10px;
                    img{
                        width:100%;
                        height:100%;
                    }
                }
                .chart-video_content{
                    flex: 1;
                    margin:10px 10px 0px;
                    position: relative;
                    padding:10px;
                    border-radius:0px 8px 8px 8px;
                    background:$medical-bgCol_white;
                    font-size: 0px;
                    .drag{
                        width:100%;
                    }
                    & img{
                        width:100%;
                    }
                    &:before{
                        content:'';
                        width:0px;
                        height:0px;
                        position: absolute;
                        top:0px;
                        left:-4px;
                        border-bottom:8px solid transparent;
                        border-right:5px solid $medical-borCol_white;
                    }
                }
                &.self-photo{
                    flex-direction:row-reverse;
                    .chart-video_img{
                        margin-right:0px;
                        margin-left:10px;
                    }
                    .chart-video_content{
                        background:linear-gradient(to right, rgb(0,209,204) , rgb(27,199,253));;
                        border-radius:8px 0px 8px 8px;
                        &:before{
                            left:auto;
                            right:-4px;
                            border-right-width:0px;
                            border-left:5px solid rgb(27,199,253);
                        }
                    }
                }
            }
            .chart-video_mes{
                display: flex;
                justify-content: center;
                align-items: center;
                background-color:$medical-bgCol_ce;
                padding:10px;
                box-sizing: border-box;
                .mes-flex{
                    flex:1;
                    border-color:$medical-borCol_white;
                    .el-input__inner{
                        border-radius: 4px;
                    }
                }
                & > i{
                    margin-left: 10px;
                    font-size: 28px;
                    color: $medical-col_white;
                }
            }
        }
    }
    .chart-video.chart-editPhoto{
        background:url('./../assets/chart-tranBg.png') repeat;
        background-color:$medical-bgCol_white;
        .localVideo{
            display: none;
        }
        .remoteVideo{
            display: none;
        }
    }
    .edit-photo_content{
        position: absolute;
        z-index: 99;
        width:75%;
        left:0%;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        padding-bottom: 80px;
        box-sizing: border-box;
        .edit-photo_drop{
            display: inline-block;
            max-width:400px;
            min-width: 200px;
            min-height: 200px;
            max-height:100%;
            border:2px dashed $medical-borCol_white;
            font-size: 0px;
            .edit-photo_dropImg{
                width:100%;
            }
        }
        .edit-photoTool{
            position: absolute;
            bottom:40px;
            left:0px;
            z-index: 10;
            text-align: left;
            display: inline-block;
            & > i{
                display: inline-block;
                margin:8px 0px;
            }
            .edit-photoTool_pencil{
                width:123px;
                height:32px;
                background:url('./../assets/pencil.png') no-repeat;
                background-size:100% 100%;
            }
            .edit-photoTool_eraser{
                width:76px;
                height:35px;
                background:url('./../assets/eraser.png') no-repeat;
                background-size:100% 100%;
            }
            .edit-photoTool_color{
                width:32px;
                height:32px;
                position: relative;
                border-radius:100%;
                margin-bottom:0px;
                margin-left:15px;
                &.tool-colorRed{
                    background-color:#ff0b0b;
                }
                &.tool-colorCyan{
                    background-color:#11cbeb;
                }
                &.edit-photoTool_active:after{
                    position: absolute;
                    content: '';
                    left:-3px;
                    top:-3px;
                    width:36px;
                    height:36px;
                    border-radius:100%;
                    border:1px solid transparent;
                }
                &.tool-colorRed.edit-photoTool_active:after{
                    border-color:#ff0b0b;
                }
                &.tool-colorCyan.edit-photoTool_active:after{
                    border-color:#11cbeb;
                }
            }
        }
    }
</style>
