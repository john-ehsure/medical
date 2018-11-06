<template>
  <div class="medical-page">
    <div class="medical-page_silde" ref="pageSilde" :class="{'silde-collapse':collapse}" :style="{'z-index': isFristLogin?'auto':''}">
        <span class="medical-head_flexIcon">
          <i class="hui-icon-ziyuan5" @click="toggleSilde"></i>
        </span>
      <div class="medical-page_head">
          <!--个人资料弹窗部分-->
        <el-popover
              placement="right-start"
              width="600"
              :offset="20"
              @show="popoverShow"
              trigger="click">
              <el-row :gutter="20">
                  <i class="hui-icon-ziyuan31 popover-icon" v-if="!isFrist" @click="isFrist = !isFrist"></i>
                  <i class="el-icon-check popover-icon" v-else @click="infoSubmit"></i>
                  <el-col :span="8" v-for="item in person.personMes">
                      <div class="medical-col_flex">
                          <i class="medical-col_icon" :class="item.icon"></i>
                          <div class="medical-col_content">
                              <p class="medical-col_title">{{item.title}}</p>
                              <p class="medical-col_detail" v-if="!isFrist">{{item.field == ''?item.value: infoTitle(item.field) }}</p>
                              <p class="medical-col_detail" v-else-if="item.field == ''">{{item.value}}</p>
                              <el-select v-model="formPractitioner[item.field]" placeholder="请选择" size="mini" v-else-if="item.field == 'title'">
                                  <el-option v-for="title in titleOptions" :key="title.value" :label="title.label" :value="title.value"></el-option>
                              </el-select>
                              <el-select v-model="formPractitioner[item.field]" placeholder="请选择" size="mini" v-else-if="item.field == 'hospital'">
                                  <el-option v-for="hospital in hospitalOptions" :key="hospital.value" :label="hospital.label" :value="hospital.value"></el-option>
                              </el-select>
                              <el-input v-model="formPractitioner[item.field]" v-else placeholder="请输入内容" size="mini"></el-input>
                          </div>
                      </div>
                  </el-col>
              </el-row>
              <div class="medical-page_headImg" slot="reference">
                  <span class="medical-headImg_num" v-if="person.number > 0">{{person.number}}</span>
                  <img :src=" person.photo" />
              </div>
        </el-popover>
        <span class="medical-page_headTitle">{{person.name}}</span>
      </div>
        <!--左侧导航部分-->
      <ul class="medical-page_menu el-menu">
          <li class="el-menu-item" :class="{'is-active':$route.path == item.path}" v-for="item in routesOptions" @click="linkTo(item)">
              <span class="el-menu_icon"><i :class="item.iconType"></i></span>
              <span class="el-menu_title">{{collapse ? item.miniTitle : item.title}}</span>
          </li>
      </ul>
    </div>
    <div class="medical-page_view">
      <transition name="fade">
        <router-view :contentWidth="contentWidth"/>
      </transition>
    </div>
     <div class="medical-guide" v-if="isFristLogin">
        <div class="medical-guide_one" v-if="guideone">
            <img src="./../assets/guide_one.png" />
        </div>
     </div>
  </div>
</template>

<script>
import APIUSER from '@/api/api_user.js'
import APIDATA from '@/api/api_data.js'
import {bus} from '@/bus/bus.js'
export default {
  name: 'Home',
  data () {
    return {
      contentWidth: 800, //  页面右侧容器的宽度
      isFristLogin: false, //   是否是第一次登陆进来的
      guideone: true, //    是否显示引导页的第一页
      isFrist: false, //    是否填写主页的个人信息
      collapse: false, //   默认是不收起  true为收起
      titleOptions: [ //    职称类型
        {label: "知名专家", value: 'A'},
        {label: "主任医师", value: 'B'},
        {label: "副主任医师", value: 'C'}
      ],
      hospitalOptions: [ //   医院名称
        {label: "滨医附院", value: 1}
      ],
      routesOptions: [], // 菜单导航
      person: { //  个人信息详情
        photo: require("./../assets/logo.png"),
        name: '刘奇',
        number: 2,
        personMes:[
          {icon: 'hui-icon-ziyuan6', title: '证件类型', value: '身份证', field: ''},
          {icon: 'hui-icon-ziyuan10', title: '执业证书编号', value: '', field: 'qualification_id'},
          // {icon: 'hui-icon-ziyuan15', title: '医院等级', value: '三甲医院', field: ''},
          {icon: 'hui-icon-ziyuan7', title: '证件号码', value: '', field: 'id_no'},
          {icon: 'hui-icon-ziyuan11', title: '发证机构', value: '', field: 'qualification_issuer'},
          {icon: 'hui-icon-ziyuan14', title: '医生执照有效期', value: '', field: 'qualification_period'},
          {icon: 'hui-icon-ziyuan8', title: '联系方式', value: '', field: 'telecom'},
          {icon: 'hui-icon-ziyuan12', title: '医院名称', value: '', field: 'hospital'},
          {icon: 'hui-icon-ziyuan16', title: '职称', value: '', field: 'title'}
        ]
      },
      practitionersEditId: null,
      formPractitioner: {
        id: null,
        user: null,
        id_no: '300111222333000222',
        telecom: '13611112222',
        hospital: '北医三院',
        title: '住院医师',
        qualification_id: '987654321',
        qualification_issuer: '北医三院',
        qualification_period: '864987543',
        photo: ''
      }
    }
  },
  created () {
    // console.log(this.$router.options.routes[1].children)
    this.routesOptions = this.$router.options.routes[1].children;
    bus.$on('goto', (url) => {
      this.$router.push(url);
    })
  },
  mounted () {
    this.contentWidth = document.documentElement.clientWidth - this.$refs.pageSilde.offsetWidth

    this.userProfile();
    this.practitionersDetail();
  },
  methods: {
    //  编辑提交个人信息
    infoSubmit () {
      APIDATA.practitionersEdit(this.formPractitioner).then((res) => {
        console.log(res)
        this.isFrist = !this.isFrist
        this.isFristLogin = false
      })
    },
    //  获取个人信息
    practitionersDetail () {
      APIDATA.practitionersDetail().then((res) => {
        // this.practitionersEditId = res[0].id
        this.formPractitioner.id = res[0].id
        this.formPractitioner.user = res[0].user
        this.formPractitioner.id_no = res[0].id_no
        this.formPractitioner.telecom = res[0].telecom
        this.formPractitioner.hospital = res[0].hospital
        this.formPractitioner.title = res[0].title
        this.formPractitioner.qualification_id = res[0].qualification_id
        this.formPractitioner.qualification_issuer = res[0].qualification_issuer
        this.formPractitioner.qualification_period = res[0].qualification_period
        this.formPractitioner.photo = res[0].photo
      })
    },
    //  获取用户信息
    userProfile () {
      APIUSER.userprofile().then((res) => {
        console.log(res)
        let data = res[0];
        this.isFristLogin = data.is_FirstLogin
        this.person.name = data.username
      })
    },
    //  导航切换
    toggleSilde () {
      this.collapse = !this.collapse
      let pageSildeWidth = 180
      if (this.collapse) {
        pageSildeWidth = 80
      }
      this.contentWidth = document.documentElement.clientWidth - pageSildeWidth
        // console.log(this.$refs.pageSilde.offsetWidth,this.contentWidth)
    },
    //  页面跳转
    linkTo (item) {
      // console.log(item)
      this.$router.push({path:item.path})
    },
    //监听弹窗显示事件
    popoverShow () {
      this.guideone = false
      if (this.isFristLogin) {
        this.isFrist = true
      }
    },
    infoTitle (val) {
      let titleStr = ''
      if (val == 'title') {
        switch (this.formPractitioner[val]) {
          case 'A':
            titleStr = '知名专家'
            break
          case 'B':
            titleStr = '主任医师'
            break
          case 'C':
            titleStr = '副主任医师'
            break
        }
      } else if(val == 'hospital'){
        switch (this.formPractitioner[val]) {
          case 1:
              titleStr = '滨医附院'
              break
          case 'C':
              titleStr = '副主任医师'
              break
        }
      }else {
        titleStr = this.formPractitioner[val]
      }
      return titleStr
    }
  }
}
</script>

<style lang="scss">
  @import '../scss/default.scss';
  .fade-enter-active {
    transition: all 0.5s
  }
  .fade-leave-active {
    transition: all 0s
  }
  .fade-enter, .fade-leave-active {
    opacity: 0;
    transform: translate(-100px,0);
  }

.medical-page {
  width:100%;
  height:100%;
  display: flex;
  .medical-page_silde {
    width: 180px;
    height: 100%;
    position: relative;
    z-index: 3;
    background-color: $medical-bgCol_white;
    box-shadow: 0px 0px 15px $medical-shadow_grey;
    transition: all 0.4s;
    background:$medical-bgCol_gradientred;
      .medical-head_flexIcon{
          position: absolute;
          z-index: 99;
          width:100%;
          top: auto;
          bottom: 10px;
          color: $medical-col_white;
          right: 0px;
          text-align: right;
          i{
              margin-right: 15px;
          }
      }
    .medical-page_head {
      height: 220px;
      padding-top: 15px;
      /*padding-right: 20%;*/
      box-sizing: border-box;
      position: relative;
      /*background: url('./../assets/person_bg.png') no-repeat;
      background-size: 100% 100%;*/
      color: $medical-col_white;
      .medical-page_headImg {
        width: 100px;
        height: 100px;
        transition: all 0.4s;
        position: relative;
        z-index: 9999;
        box-sizing: border-box;
        font-size: 0px;
        border-radius: 100%;
        margin: 0px auto 15px;
        border: 4px solid $medical-borCol_white;
        box-shadow: 0px 0px 10px $medical-shadow_grey;
        .medical-headImg_num {
          position: absolute;
          right: 3px;
          top: 3px;
          font-size: 12px;
          line-height: 18px;
          min-width: 18px;
          border-radius: 10px;
          background-color: $medical-bgCol_orange;
        }
        img {
          width: 100%;
          height: 100%;
          border-radius: 100%;
          overflow: hidden;
        }
      }
      .medical-page_headTitle{
        font-size:$medical-font_15;
      }
    }
    .medical-page_menu {
      border-right: 0px;
      margin-top:10px;
      text-align: left;
      background-color:$medical-bgCol_tran;
      .el-menu-item {
        font-size: 15px;
        height: 50px;
        line-height: 50px;
        margin: 8px 0px;
        border-left: 5px solid $medical-borCol_tran;
        color:rgba(255,255,255,0.8);
        .el-menu_icon{
          width:30px;
          display: inline-block;
          text-align: center;
          margin-right:5px;
          i {
            font-size:$medical-font_18;
            color:rgba(255,255,255,0.8);
          }
        }
        &.is-active {
          border-left: 5px solid $medical-borCol_tran;
          /*color: #333;*/
          background-color: $medical-bgCol_grey;
        }
      }
      .el-menu-item:not(.is-active):hover {
        background-color: $medical-bgCol_grey;
      }
    }
  }
  .medical-page_silde.silde-collapse{
      width: 80px;
      background:$medical-bgCol_gradientred;

      .medical-page_head{
          /*background:none;*/
          padding-right:0px;
          .medical-page_headImg{
              width:60px;
              height:60px;
              border-width:2px;
              .medical-headImg_num{
                  right:-2px;
                  top:-2px;
              }
          }
      }
      .el-menu{
          background-color:$medical-bgCol_tran;
          .el-menu-item{
              border-width:0px;
              text-align: center;
              color:rgba(255,255,255,0.8);
              padding:10px 0px;
              height:auto;
              line-height: 1.4;
              &.is-active{
                  border-width: 0px;
                  background-color: rgba(0,0,0,0.1);
              }
              .el-menu_icon{
                  width:100%;
                  margin-right: 0px;
                  display: block;
                  & > i{
                      color:rgba(255,255,255,0.8);
                  }
              }
              .el-menu_title{
                  display: block;
                  width:100%;
              }
          }
      }
  }
  .medical-page_view {
    height: 100%;
    flex: 1;
    background-color: $medical-bgCol_grey;
  }
    .medical-guide{
        position: absolute;
        width:100%;
        height:100%;
        left:0px;
        top:0px;
        z-index:2000;
        background-color:rgba(0,0,0,0.6);
        .medical-guide_one{
            width:500px;
            font-size: 0px;
            margin:60px 0px 0px 130px;
            img{
                width:100%;
            }
        }
    }
}
  /*个人资料弹窗*/
  .medical-col_flex{
    display: flex;
    color:$medical-col_blue;
    .medical-col_icon{
      color:#c5cae2;
      margin-top:3px;
      margin-right:10px;
      font-size:18px;
    }
    .medical-col_content{
      flex:1;
      font-size:14px;
      p{
        margin:0px;
        line-height:1.7;
      }
      .medical-col_detail{
        color:$medical-col_default;
        min-height: 23px;
      }
    }
  }
    .el-popover{
        .el-row .popover-icon{
            position: absolute;
            right: 5px;
            top:-15px;
            color:#c5cae2;
            font-size: 20px;
        }
    }
</style>
