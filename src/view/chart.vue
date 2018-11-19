<template>
    <div class="chart-page">
        <slideTab @changeTabList="changeList" :hasAdd="false" :listData="personlistData"></slideTab>
        <div class="chart-im">
            <!--im 标题-->
            <div class="chart-imTitle" ref="imTitle">
                <span class="chart-adverse_input">对方正在输入...</span>
                <span>{{personDetail.personName}}</span>
                <span class="marginLeft_15">{{personDetail.downHospital}}</span>
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
                                    {{personDetail.personName}}<br>编号{{personDetail.personNumber}}
                                </div>
                                <div class="medical-list_operation">
                                    <span v-if="personDetail.mesType == '1'">本地新进患者通知</span>
                                    <span v-if="personDetail.mesType == '2'">检查结果通知</span>
                                    <span v-if="personDetail.mesType == '3'">转诊申请通知</span>
                                    <span v-if="personDetail.mesType == '4'">转诊结果通知</span>
                                </div>
                                <div class="medical-list_operation col-green">
                                    <span>{{personDetail.time}}</span>
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
            <el-button @click="closeAudio">关闭声音</el-button>
            <el-button @click="openAudio">打开声音</el-button>
            <el-button @click="closeVideo">关闭视频</el-button>
            <el-button @click="openVideo">打开视频</el-button>
            <el-button @click="stopWs">断开当前视频</el-button>
            <el-button @click="showVideo">显示视频</el-button>
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
    // import webRTCAPI from '../webRTCAPI/webRTCAPI.min'
    import slideTab from '../components/slideTab/index.vue'
    export default {
        name: 'chart',
        props: {
            userID: {//  userID
                type: String,
                default: ''
            },
            usersig: {//  usersig 音视频所需
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
                personlistData: [
                    {img: require("./../assets/logo.png"), personName: '刘奇', downHospital: '北医三院', downDoctor: '王主任', personSex: 0, personNumber: '00010220', mesNum: 0, finish: 3, unfinish: 4 ,mesType: 1,time: '2018.01.01',isRead: true},
                    {img: require("./../assets/logo.png"), personName: '刘1', downHospital: '北医三院', downDoctor: '刘主任', personSex: 1, personNumber: '00010220', mesNum: 2, finish: 0, unfinish: 2,mesType: 2,time: '2018.01.02',isRead: true},
                    {img: require("./../assets/logo.png"), personName: '刘2', downHospital: '北医三院', downDoctor: '李主任', personSex: 0, personNumber: '00010220', mesNum: 0, finish: 1, unfinish: 4,mesType: 3,time: '2018.01.02',isRead: true},
                    {img: require("./../assets/logo.png"), personName: '刘3', downHospital: '北医三院', downDoctor: '赵主任', personSex: 0, personNumber: '00010220', mesNum: 0, finish: 3, unfinish: 4,mesType: 4,time: '2018.01.03',isRead: true},
                    {img: require("./../assets/logo.png"), personName: '刘4', downHospital: '北医三院', downDoctor: '何主任', personSex: 1, personNumber: '00010220', mesNum: 2, finish: 1, unfinish: 4,mesType: 1,time: '2018.01.04',isRead: true},
                    {img: require("./../assets/logo.png"), personName: '刘5', downHospital: '北医三院', downDoctor: '左主任', personSex: 0, personNumber: '00010220', mesNum: 0, finish: 2, unfinish: 4,mesType: 1,time: '2018.01.06',isRead: true},
                    {img: require("./../assets/logo.png"), personName: '刘5', downHospital: '北医三院', downDoctor: '博主任', personSex: 1, personNumber: '00010220', mesNum: 6, finish: 3, unfinish: 2,mesType: 1,time: '2018.01.07',isRead: true}
                ],
                selfDetail:{
                    img: require("./../assets/logo.png"),
                    personName: '刘大夫'
                },
                personDetail: {},//人员详情信息
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
            }
        },
        mounted () {
            this.screenHeight = document.documentElement.clientHeight;
            this.screenWidth = document.documentElement.clientWidth;
            this.personDetail = this.personlistData[0];
            /*im 聊天部分高度设置*/
            this.imDialogueHei = this.screenHeight - this.$refs.imSend.offsetHeight - this.$refs.imTitle.offsetHeight;
        },
        watch: {
            'imDialogue': 'scrollToBottom'
        },
        methods: {
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
            //跳转到滚动跳底部
            scrollToBottom () {
                this.$nextTick(() => {
                    let div = this.$refs.imDialogueCartion;
                    div.scrollTop = div.scrollHeight
                })
            },
            //点击人员列表回调事件
            changeList (item) {
                this.personDetail = item;
            },
            showVideo () {
                this.isShowVideo = true
                this.isVideoState = true
                // document.querySelector("#localVideo").style.width = this.screenWidth +'px'
                // document.querySelector("#localVideo").style.height = this.screenHeight +'px'
                // this.videoOnline();
                this.dropImg = this.videoMes[0].photo;
            },
            closeAudio () {
                alert(1)
                this.RTC.closeAudio();
            },
            openAudio (){
                this.RTC.openAudio();
            },
            closeVideo () {
                this.RTC.closeVideo();
            },
            openVideo (){
                this.RTC.openVideo();
            },
            stopWs (){
                // this.RTC.global.websocket.close();
                this.isShowVideo=false;
            },
            videoOnline () {
                var roomid= 900099;
                var stream;
                let self = this;
                this.RTC = new WebRTCAPI({
                    useCloud: 0,
                    "userId": 'video_15770908',
                    "userSig": "eJxNjV1PgzAUhv8L18adtisf3rHBIhGibDqGWdLUUWajg44VNjT*dxuCmZfned73Pd-Wc7y65btd3Vaa6V4J684C62bAshCVlqUUjYGduWqGqOOAB*6Y4ErJgnHNSFP8K56KDzYow9AUAIgDmI5SXJRsBOOlHnYRpRSbyGg70ZxkXRmBAVGECcBVankQQ4V4totcgv-*yb3BSZjPozTwowWZrbv2zZ5myxSSdWbLz4fzF**zkm8nM82jMFiq-WMr0*jdjxVfJIFHafoaH8p8E3R*WxX0Pier7UT23tP5MsfJyzF0s6P18wtG-lpU",
                    "sdkAppId":  1400037025,
                    "accountType": 14418
                });
                console.log(this.RTC,'sdsadsads')
                this.RTC.getLocalStream({
                    video:true,
                    audio:true,
                    attributes:{
                        width:640,
                        height:480,
                        frameRate:20
                    }
                },function( info ){
                    // info { stream }
                    console.log(info,'----------')
                    stream = info.stream;
                },function ( error ){
                    console.error( error )
                });
                //初始化完成后调用进房接口
                this.RTC.enterRoom({
                    roomid : roomid
                },function(){
                    //进房成功，音视频推流

                    self.RTC.startRTC({
                        role : "user",   //画面设定的配置集名 （见控制台 - 画面设定 )
                        stream: stream
                    });
                },function(){

                });

                //本地流 新增
                this.RTC.on("onLocalStreamAdd", function(data){
                    if( data && data.stream){
                        document.querySelector("#localVideo").srcObject = data.stream;
                    }
                });
                //远端流 新增/更新
                this.RTC.on("onRemoteStreamUpdate", function(data){
                    if( data && data.stream){
                        console.log(data.stream,'////////////////////')
                        document.querySelector("#remoteVideo").srcObject = data.stream;
                    }
                });
                this.RTC.on( 'onStreamNotify' , function( info ){
                    console.log(info,'ghjkl')
                })
            }
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
