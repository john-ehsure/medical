<template>
  <div class="medical-page">
    <div class="medical-page_silde" :class="{'silde-collapse':collapse}" :style="{'z-index': isFristLogin?'auto':''}">
        <span class="medical-head_flexIcon" @click="collapse = !collapse">
          <i class="hui-icon-ziyuan5"></i>
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
                  <i class="el-icon-edit popover-icon" v-if="!isFrist" @click="isFrist = !isFrist"></i>
                  <i class="el-icon-check popover-icon" v-else @click="isFrist = !isFrist; isFristLogin = false"></i>
                  <el-col :span="8" v-for="item in person.personMes">
                      <div class="medical-col_flex">
                          <i class="medical-col_icon" :class="item.icon"></i>
                          <div class="medical-col_content">
                              <p class="medical-col_title">{{item.title}}</p>
                              <p class="medical-col_detail" v-if="!isFrist">{{item.value}}</p>
                              <el-input v-model="item.value" v-else placeholder="请输入内容" size="mini"></el-input>
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
        <router-view/>
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
export default {
  name: 'Home',
  data () {
    return {
      isFristLogin: false,//是否是第一次登陆进来的
      guideone: true,//是否显示引导页的第一页
      isFrist: false,//是否填写主页的个人信息
      collapse: false,//默认是不收起  true为收起
      routesOptions: [],//菜单导航
      person: {//个人信息详情
        photo: require("./../assets/logo.png"),
        name: '刘奇',
        number: 2,
        personMes:[
          {icon: 'hui-icon-ziyuan6', title: '证件类型', value: '身份证'},
          {icon: 'hui-icon-ziyuan10', title: '执业证书编号', value: '987654321'},
          {icon: 'hui-icon-ziyuan15', title: '医院等级', value: '三甲医院'},
          {icon: 'hui-icon-ziyuan7', title: '证件号码', value: '300111222333000222'},
          {icon: 'hui-icon-ziyuan11', title: '发证机构', value: '北医三院'},
          {icon: 'hui-icon-ziyuan14', title: '医院编号', value: '864987543'},
          {icon: 'hui-icon-ziyuan8', title: '联系方式', value: '13611112222'},
          {icon: 'hui-icon-ziyuan12', title: '医院名称', value: '北医三院'},
          {icon: 'hui-icon-ziyuan16', title: '职称', value: '住院医师'}
        ]
      },
      gridData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }]
    }
  },
  created () {
    console.log(this.$router.options.routes[1].children)
    this.routesOptions = this.$router.options.routes[1].children;
  },
  methods: {
    linkTo (item) {
      console.log(item)
      this.$router.push({path:item.path})
    },
    //监听弹窗显示事件
    popoverShow () {
      this.guideone = false
      if (this.isFristLogin) {
        this.isFrist = true
      }
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
      padding-right: 20%;
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
            font-size:$medical-font_16;
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
