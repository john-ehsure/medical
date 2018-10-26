<template>
    <div class="chart-page">
        <slideTab @changeTabList="changeList" :hasAdd="false" :listData="personlistData"></slideTab>
        <div class="chart-im">
            <div class="chart-imTitle" ref="imTitle">
                <span>{{personDetail.personName}}</span>
                <span class="marginLeft_15">{{personDetail.downHospital}}</span>
            </div>
            <div class="medical-table" ref="imTable">
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
            <div class="chart-imDialogue" :style="{height: imDialogueHei+'px'}">
                <ul>
                    <li :class="[item.isSelf?'imDialogue_self':'']" v-for="item in imDialogue">
                        <div class="chart-imDialogue_img"><img :src="item.isSelf ? selfDetail.img : personDetail.img"/></div>
                        <div class="chart-imDialogue_content">
                            <img v-if="item.isImg" :src="item.img" />
                            <span v-else>{{item.title}}</span>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="chart-imSend" ref="imSend">
                <!--<el-form>-->
                    <div class="el-input el-input--small">
                        <input type="text" autocomplete="off" @keyup="abb(event)" @click="abc(event)" @keydown="acc(event)" placeholder="请输入内容" class="el-input__inner">
                    </div>
                <!--</el-form>-->
                <i class="el-icon-picture-outline imSend-icon"></i>
                <i class="el-icon-printer imSend-icon"></i>
            </div>
        </div>
        <div style="display: none">
            <el-button @click="closeAudio">关闭声音</el-button>
            <el-button @click="openAudio">打开声音</el-button>
            <el-button @click="closeVideo">关闭视频</el-button>
            <el-button @click="openVideo">打开视频</el-button>
            <el-button @click="stopWs">断开当前视频</el-button>
            <el-button @click="showVideo">显示视频</el-button>
        </div>
        <div class="chart-video" v-show = "isShowVideo">
            <video class="localVideo" id="localVideo" muted autoplay playsinline></video>
            <!-- 远端视频流 -->
            <video class="remoteVideo" id="remoteVideo" autoplay playsinline></video>
        </div>

    </div>
</template>

<script>
    import webRTCAPI from '../webRTCAPI/webRTCAPI.min'
    import slideTab from '../components/slideTab/index.vue'
    export default {
        name: 'chart',
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
                isShowVideo: false,//是否显示视频界面
                imDialogueHei: 400,//聊天信息部分默认高度
                screenWidth: 1000,//屏幕宽度
                screenHeight: 500,//屏幕高度
                RTC: {},//视频流对象信息
            }
        },
        mounted () {
            this.screenHeight = document.documentElement.clientHeight;
            this.screenWidth = document.documentElement.clientWidth;
            this.personDetail = this.personlistData[0];
            /*im 聊天部分高度设置*/
            this.imDialogueHei = this.screenHeight - this.$refs.imSend.offsetHeight - this.$refs.imTitle.offsetHeight - this.$refs.imTable.offsetHeight -2;
        },
        methods: {
            abb (e){
                if(event.keyCode == 13){
                    alert(1)
                }
            },
            abc(e){
                if(event.keyCode == 13){
                    alert(2)
                }
            },
            acc (e) {
                if(event.keyCode == 13){
                    alert(3)
                }
            },
            //点击人员列表回调事件
            changeList (item) {
                this.personDetail = item;
            },
            showVideo () {
                this.isShowVideo = true
                document.querySelector("#localVideo").style.width = this.screenWidth +'px'
                document.querySelector("#localVideo").style.height = this.screenHeight +'px'
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
                this.RTC.global.websocket.close();
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
            background-color:$medical-bgCol_white;
            .chart-imTitle{
                text-align: center;
                font-size: $medical-font_18;
                position: relative;
                color:$medical-col_999;
                margin:0px 15px;
                padding:10px 0px;
                box-sizing: border-box;
                border-bottom:1px solid $medical-borCol_ddd;
            }
            .chart-nowTime{
                text-align: center;
            }
            .medical-table{
                padding-top:10px;
                padding-bottom: 0px;
                .medical-table_list{
                    margin:0px 0px;
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
                        border-radius:18px;
                        background-color:$medical-bgCol_cyan;
                        & > img{
                            max-width: 150px;
                            margin:3px;
                            border-radius: 7px;
                        }
                        & > span{
                            font-size:$medical-font_15;
                            margin:0px 8px;
                        }
                        &:before{
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
                        }
                    }
                    &.imDialogue_self{
                        text-align: right;
                        .chart-imDialogue_img{
                            float: right;
                        }
                        .chart-imDialogue_content{
                            margin-left:0px;
                            margin-right: 20px;
                            background-color:$medical-bgCol_ce;
                            &:before{
                                border-right-width:0px;
                                left:auto;
                                right:-7px;
                                border-left:8px solid $medical-borCol_ce;
                            }
                        }
                    }
                }
            }
            .chart-imSend{
                display: flex;
                align-items:center;
                padding:7px 15px;
                .imSend-icon{
                    font-size: 24px;
                    color:$medical-col_999;
                    margin-left:15px;
                }
                .el-input{
                    flex:1;
                    box-shadow: 0px 0px 10px $medical-shadow_lightGrey;
                    .el-input__inner{
                        border-radius: 4px;
                    }
                }
            }
        }
    }
    .chart-video{
        position: fixed;
        left:0px;
        top:0px;
        width:100%;
        height:100%;
        z-index: 9999;
        background-color:rgba(0,0,0,1)
    }
</style>
