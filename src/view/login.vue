<template>
    <div class="medical-loginContent">
        <transition name="medical-fade-in">
            <div class="medical-login medical-login_noForm" v-if="initialize" key="noform">
                <div class="medical-login_centerLogo">
                    <img src="./../assets/medical-logo.png"/>
                </div>
            </div>
        <!--</transition>
        <transition name="medical-fade-in">-->
            <div class="medical-login" v-else key="form">
                <div class="medical-login_box">
                    <div class="medical-login_img" v-if="type != 1">
                        <img :src="imageUrl" />
                    </div>
                    <div class="medical-login_img" v-else>
                        <el-upload
                            action=""
                            :on-preview="handlePictureCardPreview">
                            <span>上传图片</span>
                        </el-upload>
                    </div>
                    <!--登陆 start-->
                    <div class="medical-login_form form-two" v-if="type == 0">
                        <el-form ref="loginForm" :model="loginForm" label-width="0px" size="medium ">
                            <el-form-item>
                                <el-input v-model="loginForm.name" placeholder="姓名">
                                    <i slot="prefix" class="el-input__icon hui-icon-ziyuan9 "></i>
                                </el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-input v-model="loginForm.password" placeholder="密码">
                                    <i slot="prefix" class="el-input__icon hui-icon-ziyuan "></i>
                                </el-input>
                            </el-form-item>
                            <p class="medical-login_formTitle">
                                <span @click="register">注册</span> <span @click="forget">忘记密码？</span>
                            </p>
                        </el-form>
                    </div>
                    <!--登陆 end-->
                    <!--注册 start-->
                    <div class="medical-login_form" v-if="type == 1">
                        <el-form ref="registerForm" :model="registerForm" label-width="0px" size="medium ">
                            <el-form-item>
                                <el-input v-model="registerForm.number" placeholder="医生执业证编号">
                                    <i slot="prefix" class="el-input__icon hui-icon-ziyuan14 "></i>
                                </el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-input v-model="registerForm.hospital" placeholder="医院">
                                    <i slot="prefix" class="el-input__icon hui-icon-ziyuan12 "></i>
                                </el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-input v-model="registerForm.section" placeholder="科室">
                                    <i slot="prefix" class="el-input__icon hui-icon-ziyuan11 "></i>
                                </el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-input v-model="registerForm.name" placeholder="姓名">
                                    <i slot="prefix" class="el-input__icon hui-icon-ziyuan9 "></i>
                                </el-input>
                            </el-form-item>
                        </el-form>
                    </div>
                    <!--注册 end-->
                    <!--忘记密码 start-->
                    <div class="medical-login_form form-two" v-if="type == 2">
                        <el-form ref="setPassForm" :model="setPassForm" label-width="0px" size="medium ">
                            <el-form-item>
                                <el-input v-model="setPassForm.password" placeholder="密码">
                                    <i slot="prefix" class="el-input__icon hui-icon-ziyuan "></i>
                                </el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-input v-model="setPassForm.checkPassword" placeholder="再次确认">
                                    <i slot="prefix" class="el-input__icon el-icon-circle-check "></i>
                                </el-input>
                            </el-form-item>
                        </el-form>
                    </div>
                    <!--忘记密码 end-->
                    <!--提交成功 跳转中 start-->
                    <div class="medical-login_form form-title" v-if="type == 3">
                        <p class="medical-login_formTitle">
                            <el-button type="success" icon="el-icon-check" @click.native="nextHandle" circle></el-button>
                            <span class="fontFamily-BigHYQiHei">提交成功</span>
                        </p>
                        <p>正在返回患者首页...</p>
                    </div>
                    <!--提交成功 跳转中 end-->
                    <div class="medical-login_bottomGroup">
                        <el-button type="info" v-if="type == 1 || type == 2" icon="el-icon-back" @click.native="type = 0" circle></el-button>
                        <el-button type="primary" v-if="type == 0" icon="el-icon-arrow-right" @click.native="submitForm" circle></el-button>
                        <el-button type="primary" v-if="type == 1" icon="el-icon-arrow-right" @click.native="type = 2" circle></el-button>
                        <el-button type="primary" v-if="type == 2" icon="el-icon-check" @click.native="type = 0" circle></el-button>
                    </div>

                </div>
                <div class="medical-login_bottomLogo">
                    <img src="./../assets/medical-logo.png"/>
                </div>
            </div>
        </transition>
    </div>

</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      initialize: false,//是否为初始化状态 true 不显示登陆框
      type:0,//0为登陆  1为注册 2 为设置密码
      imageUrl: require('./../assets/logo.png'),
      //登陆
      loginForm: {
        name: '',
        password: '',
      },
      //  注册
      registerForm: {
        number: '',
        hospital: '',
        section: '',
        name: ''
      },
      //  设置密码
      setPassForm: {
        password: '',
        checkPassword: '',
      },
    }
  },
  mounted () {
    // let self = this
    // setTimeout(function () {
    //     self.initialize = false
    // },500)
  },
  methods: {
    handlePictureCardPreview (file) {
      this.imageUrl = file.url;
    },
    //注册
    register () {
      this.type = 1
    },
    //忘记密码
    forget () {
        this.$alert('请联系系统管理员', '', {
            confirmButtonText: '确定',
            center: true,
            customClass: 'medical-alert',
            callback: action => {
                // this.$message({
                //   type: 'info',
                //   message: `action: ${ action }`
                // });
            }
        });
    },
    //提交
    submitForm () {
      //  调用接口 提交数据
      let self = this
      self.type = 3
      sessionStorage.setItem("loginName",'liuqi')
      setTimeout(function () {
        self.$router.push({path: '/'})
      }, 3000);
    }
  }
}
</script>

<style lang="scss">
  @import '../scss/default.scss';
  .medical-fade-in-enter-active {
      transition: all 0.5s linear;
  }
  .medical-fade-in-leave-active {
      transition: all 0.3s linear;
  }
  .medical-fade-in-enter{
      opacity: 0;
      transform: translate(0px,0);
  }
  .medical-fade-in-leave-active {
      opacity: 0;
      transform: translate(0px,0);
  }
.medical-loginContent{
    width:100%;
    height:100%;
}
.medical-login{
  font-family: 'fontHYQiHei' !important;
  width:100%;
  height:100%;
  background:url('./../assets/login_bg.png') no-repeat;
  background-size:100% 100%;
  padding:10px;
  box-sizing: border-box;
  position: relative;
  &.medical-login_noForm{
    background:url('./../assets/login_bottom_bg.png') no-repeat;
    background-size:100%;
    background-position: bottom;
  }
  .medical-login_centerLogo{
    position: absolute;
    left:50%;
    top:50%;
    margin-left:-60px;
    margin-top:-65px;
    width:120px;
    font-size:0px;
    img{
      width:100%;
      height:100%;
    }
  }
  .medical-login_bottomLogo{
    position: absolute;
    bottom:20px;
    right:20px;
    width:60px;
    font-size:0px;
    img{
      width:100%;
      height:100%;
    }
  }
  .medical-login_box{
    width:350px;
    padding:20px 30px 45px;
    box-sizing: border-box;
    position: relative;
    margin: 10% auto 0;
    background:url('./../assets/login-box_bg.png') no-repeat;
    background-size:100%;
    background-color:$medical-bgCol_white;
    border-radius:50px;
    box-shadow:0px 0px 15px $medical-shadow_grey;
    .medical-login_topGroup{
      position: absolute;
      width:100%;
      box-sizing: border-box;
      padding:0px 20px;
      left:0px;
      top:-15px;
      text-align: right;
      .el-button.is-circle{
        padding:5px !important;
        font-size:18px !important;
      }
    }
    .medical-login_bottomGroup{
      position: absolute;
      width:100%;
      box-sizing: border-box;
      padding:0px 20px;
      left:0px;
      bottom:-23px;
      text-align: center;
      .el-button.is-circle{
        padding:10px !important;
        font-size:24px !important;
      }
    }
    .medical-login_img{
      width:135px;
      height:135px;
      margin:35px auto 50px;
      border-radius:100%;
      overflow: hidden;
      border:4px solid $medical-borCol_white;
      box-shadow:0px 0px 15px $medical-shadow_grey;
      box-sizing: border-box;
      background-color:$medical-bgCol_ddd;
      img{
        width:100%;
        height:100%;
      }
      .el-upload--text{
        width:100%;
        span{
          color:$medical-col_999;
          font-size:$medical-font_18;
          line-height: 130px;
        }
      }
    }
    .medical-login_form{
      padding:10px 10px;
      &.form-two{
        .el-form-item{
          margin-bottom:35px;
        }
      }
      &.form-title{
        color:$medical-col_green;
        text-align: center;
        font-size: 24px;
        padding-bottom: 60px;
        p{
          margin:15px 0;
        }
        .medical-login_formTitle{
          text-align: center;
          font-size: 32px;
          color:$medical-col_green;
          .el-button.is-circle{
            padding:6px !important;
            font-size:24px !important;
          }
        }
      }
      .el-input--medium .el-input__inner{
        border-color:rgba(0,0,0,0);
        border-bottom:2px solid $medical-borCol_grey;
        padding-left: 45px;
        font-size: $medical-font_18;
      }
      [class*=" hui-icon-"], [class^=hui-icon-]{
        font-size:20px;
        transition: all 0s;
      }
      [class*=" el-icon-"], [class^=el-icon-]{
        font-size:24px;
      }
      .medical-login_formTitle{
        text-align: right;
        color:$medical-col_999;
      }
    }
  }
  .el-input--medium .el-input__icon{
      color:#c5cae2;
  }
}
</style>
