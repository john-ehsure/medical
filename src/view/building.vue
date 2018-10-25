<template>
  <div class="chart-page">
    <!--<h1>{{ msg }}</h1>-->
      <el-button @click="closeAudio">关闭声音</el-button>
      <el-button @click="openAudio">打开声音</el-button>
      <el-button @click="closeVideo">关闭视频</el-button>
      <el-button @click="openVideo">打开视频</el-button>
      <el-button @click="stopWs">断开当前视频</el-button>
      <el-button @click="showVideo">显示视频</el-button>
      <div class="chart-video" v-show = "isShowVideo">
          <video id="localVideo" muted autoplay playsinline></video>
          <!-- 远端视频流 -->
          <video id="remoteVideo" autoplay playsinline></video>
      </div>

  </div>
</template>

<script>
import webRTCAPI from '../webRTCAPI/webRTCAPI.min'
export default {
  name: 'notBuild',
  data () {
    return {
      msg: '当前功能正在建设中...',
        isShowVideo: false,//是否显示视频界面
        screenWidth: 1000,//屏幕宽度
        screenHeight: 500,//屏幕高度
        RTC: {}
    }
  },
  mounted () {
      this.screenHeight = document.documentElement.clientHeight;
      this.screenWidth = document.documentElement.clientWidth;
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
  },
    methods:{
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
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.chart-page{
    .chart-video{
        position: fixed;
        left:0px;
        top:0px;
        width:100%;
        height:100%;
        z-index: 9999;
        background-color:rgba(0,0,0,1)
    }
}
</style>
