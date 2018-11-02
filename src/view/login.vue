<template>
    <div class="medical-loginContent">
        <transition name="medical-fade-in">
            <div class="medical-login medical-login_noForm" v-if="initialize" key="noform">
                <div class="medical-login_centerLogo">
                    <img src="./../assets/medical-logo.png"/>
                </div>
            </div>
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
                        <el-form ref="loginForm" :rules="rulesLoginForm" :model="loginForm" label-width="0px" size="medium ">
                            <el-form-item prop="username">
                                <el-input v-model="loginForm.username" placeholder="姓名">
                                    <i slot="prefix" class="el-input__icon hui-icon-ziyuan9 "></i>
                                </el-input>
                            </el-form-item>
                            <el-form-item prop="password">
                                <el-input v-model="loginForm.password" type="password" placeholder="密码">
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
                        <el-form ref="registerForm" :rules="rulesRegisterForm" :model="registerForm" label-width="0px" size="medium ">
                            <el-form-item prop="doctor_cer">
                                <el-input v-model="registerForm.doctor_cer" placeholder="医生执业证编号">
                                    <i slot="prefix" class="el-input__icon hui-icon-ziyuan14 "></i>
                                </el-input>
                            </el-form-item>
                            <el-form-item prop="hos_area">
                                <el-input v-model="registerForm.hos_area" placeholder="医院">
                                    <i slot="prefix" class="el-input__icon hui-icon-ziyuan12 "></i>
                                </el-input>
                            </el-form-item>
                            <el-form-item prop="subject">
                                <el-input v-model="registerForm.subject" placeholder="科室">
                                    <i slot="prefix" class="el-input__icon hui-icon-ziyuan11 "></i>
                                </el-input>
                            </el-form-item>
                            <el-form-item prop="name">
                                <el-input v-model="registerForm.name" placeholder="姓名">
                                    <i slot="prefix" class="el-input__icon hui-icon-ziyuan9 "></i>
                                </el-input>
                            </el-form-item>
                        </el-form>
                    </div>
                    <!--注册 end-->
                    <!--设置密码 start-->
                    <div class="medical-login_form form-two" v-if="type == 2">
                        <el-form ref="setPassForm" :rules="rulesSetPassForm" :model="setPassForm" label-width="0px" size="medium ">
                            <el-form-item prop="setpassword">
                                <el-input v-model="setPassForm.setpassword" type="password" placeholder="密码">
                                    <i slot="prefix" class="el-input__icon hui-icon-ziyuan "></i>
                                </el-input>
                            </el-form-item>
                            <el-form-item prop="checkPassword">
                                <el-input v-model="setPassForm.checkPassword" type="password" placeholder="再次确认">
                                    <i slot="prefix" class="el-input__icon el-icon-circle-check "></i>
                                </el-input>
                            </el-form-item>
                        </el-form>
                    </div>
                    <!--设置密码 end-->
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
                        <el-button type="info" v-if="type == 1 || type == 2" icon="el-icon-back" @click.native="backLogin" circle></el-button>
                        <el-button type="primary" v-if="type == 0" icon="el-icon-arrow-right" @click.native="submitForm('loginForm')" circle></el-button>
                        <el-button type="primary" v-if="type == 1" icon="el-icon-arrow-right" @click.native="submitRegisterForm('registerForm')" circle></el-button>
                        <el-button type="primary" v-if="type == 2" icon="el-icon-check" @click.native="submitSetPassForm('setPassForm')" circle></el-button>
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
import API from '@/api/api_user.js'
export default {
  name: 'login',
  data () {
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.setPassForm.checkPassword !== '') {
          this.$refs.setPassForm.validateField('checkPassword');
        }
        callback();
      }
    };
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.setPassForm.setpassword) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      initialize: false, // 是否为初始化状态 true 不显示登陆框
      type: 0, //   0为登陆  1为注册 2 为设置密码
      imageUrl: require('./../assets/logo.png'),
      //    登陆
      loginForm: {
        username: '',
        password: ''
      },
      rulesLoginForm: {
        username: [
          {required: true, message: '请输入姓名', trigger: 'blur'},
          {min: 2, max: 4, message: '长度在 2 到 4 个字符', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ]
      },
      //  注册
      registerForm: {
        doctor_cer: '',
        hos_area: '',
        subject: '',
        name: ''
      },
      rulesRegisterForm: {
        doctor_cer: [
          {required: true, message: '请输入医生职业编号', trigger: 'blur'},
          {min: 1, max: 10, message: '编号格式不对', trigger: 'blur'}
        ],
        hos_area: [
          {required: true, message: '请输入医院', trigger: 'blur'}
        ],
        subject: [
          {required: true, message: '请输入科室', trigger: 'blur'}
        ],
        name: [
          {required: true, message: '请输入姓名', trigger: 'blur'},
          {min: 2, max: 4, message: '长度在 2 到 4 个字符', trigger: 'blur'}
        ]
      },
      //  设置密码
      setPassForm: {
        setpassword: '',
        checkPassword: ''
      },
      rulesSetPassForm: {
        setpassword: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPassword: [
          { validator: validatePass2, trigger: 'blur' }
        ],
      }
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
    //  注册
    register () {
      this.$refs.loginForm.resetFields();
      this.type = 1
    },
    //  忘记密码
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
    //  设置密码
    submitSetPassForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //  调接口
          let regSecondForm = {
            username: this.registerForm.name,
            password: this.setPassForm.setpassword,
            qualification_id: this.registerForm.doctor_cer,
            hospital: this.registerForm.hos_area,
            subject: this.registerForm.subject
          }
          API.reg_second(regSecondForm).then((res) => {
              localStorage.setItem('token',res.token);
              self.type = 3
              setTimeout(function () {
                self.$router.push({path: '/'})
              }, 3000);
          })
          // this.type = 0
          // this.$refs.setPassForm.resetFields();
        }
      });
    },
    //  返回登录
    backLogin () {
      if (this.type == 2) {
        this.$refs.setPassForm.resetFields();
      }
      this.$refs.registerForm.resetFields();
      this.type = 0
    },
    //  注册提交
    submitRegisterForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //  调接口
          API.reg_first(this.registerForm).then((res)=>{
              console.log(res)
              if(res){
                this.type = 2
              }

          })
          // this.$refs.registerForm.resetFields();
        }
      });
    },
    //  登录提交
    submitForm (formName) {
      //  调用接口 提交数据
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let self = this
          API.login(this.loginForm).then((res) => {
            console.log(res)
            localStorage.setItem("token" ,res.token)
            self.type = 3
            setTimeout(function () {
              self.$router.push({path: '/'})
            }, 3000);
          })
        }
      });
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
