<template>
  <div class="diagnoseUp-page">
    <slideTab @changeTabList="changeList" :hasAdd="false" :listData="tablistData"></slideTab>
    <div class="diagnoseUpt-content">
      <div class="diagnoseUpt-top" ref="diagnoseUptStepsHei">
        <el-steps :active="stepsNum" align-center>
          <el-step title="转诊内容填写" icon="hui-icon-ziyuan22"></el-step>
          <el-step title="选择时间与医院" icon="hui-icon-ziyuan23"></el-step>
          <el-step title="确认信息" icon="hui-icon-ziyuan24"></el-step>
        </el-steps>
      </div>
      <div class="diagnoseUpt-box">

        <!--转诊内容填写 start-->
        <div class="diagnoseUpt-info" v-if="stepsNum == 1">
          <span class="diagnoseUpt-info_img">
            <img :src="doctorDetail.img"/>
          </span>
          <div class="diagnoseUpt-info_title">
            <p class="col_blue fontSize_26 fontFamily-BigHYQiHei">{{doctorDetail.personName}} <i class="marginLeft_15 fontSize_18" :class="doctorDetail.personSex?'hui-icon-ziyuan18 col_orange':'hui-icon-ziyuan19 col_green'"></i></p>
            <p>下级医院 <span class="marginLeft_15">{{doctorDetail.downHospital}}</span></p>
            <p>下级医生 <span class="marginLeft_15">{{doctorDetail.downDoctor}}</span></p>
            <p>生成单号 <span class="marginLeft_15">{{doctorDetail.personNumber}}</span></p>
          </div>
          <div class="diagnoseUpt-box_next" v-if="stepsNum == 1">
            <el-button type="primary" class="el-button-large" icon="el-icon-arrow-right" @click.native="nextHandle" circle></el-button>
          </div>
        </div>
        <!--转诊内容填写 end-->
        <!--选择时间和医院 start-->
        <div class="diagnoseUpt-form" ref="diagnoseUptFormHei" v-if="stepsNum == 2">
          <el-row :gutter="20">
            <el-col :span="12">
              <p class="col_blue diagnoseUpt-form_title">转诊日期预约</p>
              <div class="diagnoseUpt-form_list">
                <el-date-picker
                  v-model="datePickerValue"
                  type="daterange"
                  :editable="false"
                  popper-class="mini-datePicker"
                  range-separator="-"
                  format="yyyy.MM.dd"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
              </div>
            </el-col>
            <el-col :span="12">
              <p class="col_blue diagnoseUpt-form_title">去向医院</p>
              <div class="diagnoseUpt-form_list">
                <el-input v-model="doctor.hospital" placeholder="" @keyup.enter.native="toHistory"></el-input>
              </div>
            </el-col>
            <el-col :span="12">
              <p class="col_blue diagnoseUpt-form_title">去向医生等级</p>
              <div class="diagnoseUpt-form_list">
                <el-select v-model="selectValue" placeholder="请选择" @change="handleSelect">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </el-col>
            <el-col :span="12">
              <p class="col_blue diagnoseUpt-form_title">医生姓名</p>
              <div class="diagnoseUpt-form_list">
                <el-input v-model="doctor.name" placeholder=""></el-input>
              </div>
            </el-col>
          </el-row>
          <div class="diagnoseUpt-box_confirm" v-if="stepsNum == 2 && doctor.name">
            <el-button type="primary" class="el-button-large" icon="el-icon-check" @click.native="nextHandle" circle></el-button>
          </div>
        </div>
        <div class="diagnoseUpt-table"  v-if="stepsNum == 2 && visibleSelect">
          <el-table :data="tableData" :height="tableHeight">
            <el-table-column prop="hospital" label="医院" width="150">
            </el-table-column>
            <el-table-column prop="name" label="医生姓名" width="100">
            </el-table-column>
            <el-table-column prop="doctorPost" label="职称">
            </el-table-column>
            <el-table-column prop="address" label="">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" round @click="handleClick(scope.row)">查看</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!--选择时间和医院 end-->
        <!--信息确认  start-->
        <div class="diagnoseUpt-last" v-if="stepsNum == 3 && submitVisible">
          <p class="col_green diagnoseUpt-last_top">
            <el-button type="success" class="el-button-large" icon="el-icon-check" @click.native="nextHandle" circle></el-button>
            <span class="fontSize_36 marginLeft_15 fontFamily-BigHYQiHei">信息确认</span>
            <span class="col_999 diagnoseUpt-last_topRight">单号 0987654321</span>
          </p>
          <div class="diagnoseUpt-last_content">
            <ul>
              <li>转院患者<span>王新欣</span></li>
              <li>下级医院<span>山东医院</span></li>
              <li>上级医院<span>山西医院</span></li>
              <li>转诊医院<span>北医三院</span></li>
              <li>医生姓名<span>王主任</span></li>
              <li>医生职称<span>主任</span></li>
              <li>转诊预约时间<span>2018.09.09</span></li>
            </ul>
            <div class="diagnoseUpt-last_contentBottom">
              <el-button type="primary" round @click.native="confimHandle">确&nbsp;&nbsp;&nbsp;&nbsp;认</el-button>
              <el-button type="info" round @click.native="backHandle">上一步</el-button>
            </div>
          </div>
        </div>
        <div class="diagnoseUpt-submit" v-if="stepsNum == 3 && !submitVisible">
          <p class="diagnoseUpt-submit_title">
            <el-button type="success" icon="el-icon-check" @click.native="nextHandle" circle></el-button>
            <span class="fontFamily-BigHYQiHei">提交成功</span>
          </p>
          <p>正在返回患者首页...</p>
        </div>
        <!--信息确认  end-->
      </div>
      <!--医生信息弹窗 start-->
      <el-dialog title="" :modal=false :close-on-click-modal=false custom-class="disanose-dialog" width="65%" :visible.sync="dialogTableVisible">
            <!--<el-button type="warning" icon="el-icon-close" class="el-dialog-closed" circle></el-button>-->
            <div class="disanose-dialog_img">
                <img :src="dialogDetail.img" />
            </div>
            <p><span class="col_blue">医院</span>{{dialogDetail.hospital}}</p>
            <p><span class="col_blue">医生姓名</span>{{dialogDetail.name}}</p>
            <p><span class="col_blue">职称</span>{{dialogDetail.doctorPost}}</p>
            <div class="disanose-dialog_time">
                <div class="col_blue fontSize_14">可选时间</div>
                <ul>
                    <li v-for="timeItem in dialogDetail.time">
                        <el-radio v-model="timeRadio" :label="timeItem.value" text-color="#666666">{{timeItem.datePicker}}<span class="float-right">{{timeItem.timePicker}}</span></el-radio>
                    </li>
                </ul>
            </div>
            <div class="diagnose-dialog_confirm">
                <el-button type="primary" class="el-button-large" icon="el-icon-check" @click.native="comfigDetail" circle></el-button>
            </div>
        </el-dialog>
      <!--医生信息弹窗 end-->
    </div>
  </div>
</template>

<script>
import slideTab from '../components/slideTab/index.vue'
export default {
  name: 'diagnoseUp',
  components: {
    slideTab
  },
  data () {
    return {
      doctorDetail: {},
      tablistData: [
        {img: require("./../assets/logo.png"), personName: '刘奇', downHospital: '北医三院', downDoctor: '王主任', personSex: 0, personNumber: '00010220', mesNum: 0, finish: 3, unfinish: 4},
        {img: require("./../assets/logo.png"), personName: '刘1', downHospital: '北医三院', downDoctor: '刘主任', personSex: 1, personNumber: '00010220', mesNum: 2, finish: 0, unfinish: 2},
        {img: require("./../assets/logo.png"), personName: '刘2', downHospital: '北医三院', downDoctor: '李主任', personSex: 0, personNumber: '00010220', mesNum: 0, finish: 1, unfinish: 4},
        {img: require("./../assets/logo.png"), personName: '刘3', downHospital: '北医三院', downDoctor: '赵主任', personSex: 0, personNumber: '00010220', mesNum: 0, finish: 3, unfinish: 4},
        {img: require("./../assets/logo.png"), personName: '刘4', downHospital: '北医三院', downDoctor: '何主任', personSex: 1, personNumber: '00010220', mesNum: 2, finish: 1, unfinish: 4},
        {img: require("./../assets/logo.png"), personName: '刘5', downHospital: '北医三院', downDoctor: '左主任', personSex: 0, personNumber: '00010220', mesNum: 0, finish: 2, unfinish: 4},
        {img: require("./../assets/logo.png"), personName: '刘5', downHospital: '北医三院', downDoctor: '博主任', personSex: 1, personNumber: '00010220', mesNum: 6, finish: 3, unfinish: 2}
      ],
      stepsNum: 1,
      datePickerValue: '',
      options: [
        {
          value: '1',
          label: '住院医生'
        }, {
          value: '2',
          label: '主任'
        }, {
          value: '3',
          label: '副主任'
        }, {
          value: '4',
          label: '手术医生'
        }
      ],
      selectValue: '',
      doctor: {},
      visibleSelect: false,//是否显示table表格
      tableHeight: 200,
      tableData: [{
        img: require("./../assets/logo.png"),
        hospital: '北医三院',
        name: '张三',
        doctorPost: '主治医师',
        time: [
          {value: '00', datePicker: '2018.09.09', timePicker: '10:00'},
          {value: '01', datePicker: '2018.09.09', timePicker: '10:00'},
          {value: '02', datePicker: '2018.09.09', timePicker: '10:00'},
          {value: '03', datePicker: '2018.09.09', timePicker: '10:00'},
          {value: '04', datePicker: '2018.09.09', timePicker: '10:00'},
          {value: '05', datePicker: '2018.09.09', timePicker: '10:00'},
          {value: '06', datePicker: '2018.09.09', timePicker: '10:00'}
        ]
      }, {
        img: require("./../assets/logo.png"),
        hospital: '北医四院',
        name: '李三',
        doctorPost: '主治医师',
        time: [
          {value: '11', datePicker: '2018.09.08', timePicker: '10:00'},
          {value: '12', datePicker: '2018.09.08', timePicker: '10:00'},
          {value: '13', datePicker: '2018.09.08', timePicker: '10:00'},
          {value: '14', datePicker: '2018.09.08', timePicker: '10:00'},
          {value: '15', datePicker: '2018.09.08', timePicker: '10:00'},
          {value: '16', datePicker: '2018.09.08', timePicker: '10:00'},
          {value: '17', datePicker: '2018.09.08', timePicker: '10:00'}
        ]
      }, {
        img: require("./../assets/logo.png"),
        hospital: '北医五院',
        name: '王三',
        doctorPost: '主治医师',
        time: [
          {value: '21', datePicker: '2018.09.07', timePicker: '10:00'},
          {value: '22', datePicker: '2018.09.07', timePicker: '10:00'},
          {value: '23', datePicker: '2018.09.07', timePicker: '10:00'},
          {value: '24', datePicker: '2018.09.07', timePicker: '10:00'},
          {value: '25', datePicker: '2018.09.07', timePicker: '10:00'},
          {value: '26', datePicker: '2018.09.07', timePicker: '10:00'},
          {value: '27', datePicker: '2018.09.07', timePicker: '10:00'}
        ]
      }, {
        img: require("./../assets/logo.png"),
        hospital: '北医六院',
        name: '赵三',
        doctorPost: '主治医师',
        time: [
          {value: '31', datePicker: '2018.09.06', timePicker: '10:00'},
          {value: '32', datePicker: '2018.09.06', timePicker: '10:00'},
          {value: '33', datePicker: '2018.09.06', timePicker: '10:00'},
          {value: '34', datePicker: '2018.09.06', timePicker: '10:00'},
          {value: '35', datePicker: '2018.09.06', timePicker: '10:00'},
          {value: '36', datePicker: '2018.09.06', timePicker: '10:00'},
          {value: '37', datePicker: '2018.09.06', timePicker: '10:00'}
        ]
      }, {
        img: require("./../assets/logo.png"),
        hospital: '北医六院',
        name: '赵三',
        doctorPost: '主治医师',
        time: [
          {value: '41', datePicker: '2018.09.05', timePicker: '10:00'},
          {value: '42', datePicker: '2018.09.05', timePicker: '10:00'},
          {value: '43', datePicker: '2018.09.05', timePicker: '10:00'},
          {value: '44', datePicker: '2018.09.05', timePicker: '10:00'},
          {value: '45', datePicker: '2018.09.05', timePicker: '10:00'},
          {value: '46', datePicker: '2018.09.05', timePicker: '10:00'},
          {value: '47', datePicker: '2018.09.05', timePicker: '10:00'}
        ]
      }],
      dialogTableVisible: false,//医生详情 弹窗
      dialogDetail: {},//医生详情信息
      timeRadio:'',//选中的预约时间
      submitVisible: true,//是否显示提交页面 true显示  false 显示提交成功页面
    }
  },
  mounted () {
    this.doctorDetail = this.tablistData[0];
  },
  methods: {
    //回车事件测试
    toHistory () {
      alert(this.doctor.hospital,111)
    },
    //列表选择事件close
    changeList (item) {
      this.doctorDetail = item;
    },
    //下一步
    nextHandle () {
      this.stepsNum++
      if(this.stepsNum == 2){
        this.$nextTick(function () {
          this.tableHeight = document.documentElement.clientHeight - this.$refs.diagnoseUptFormHei.offsetHeight - this.$refs.diagnoseUptStepsHei.offsetHeight -155;
        })
      }
    },
    //上一步
    backHandle () {
      this.stepsNum--
    },
    // 确认
    confimHandle () {
      //  调用接口 提交数据
      let self = this
      this.submitVisible = false
      setTimeout(function () {
          self.$router.push({path: '/personList'})
      }, 3000);
    },
    //下拉框选择事件
    handleSelect (val){
      if(val != ''){
        //调用接口获取详情
        this.visibleSelect = true;
      }
    },
    //详情弹窗
    handleClick (row){
      console.log(row)
      this.dialogTableVisible = true;
      this.dialogDetail = row;
    },
    //确认弹窗信息
    comfigDetail () {
      this.dialogTableVisible = false;
      this.doctor = this.dialogDetail;
    }
  }
}
</script>

<style lang="scss">
  @import '../scss/default.scss';
.diagnoseUp-page{
  width:100%;
  display: flex;
  background-color:$medical-bgCol_white;
  .diagnoseUpt-content{
    flex:1;
    padding:20px;
    overflow: hidden;
    position: relative;
    .diagnoseUpt-top{
      text-align:left;
      display: inline-block;
      position: relative;
      left:-10%;
      margin:10px 0px;
      width: 120%;
    }
    .diagnoseUpt-box{
      padding:0px 20px;
      margin-top:80px;
      position: relative;
      .diagnoseUpt-info{
        padding:50px;
        border-radius:8px;
        background-color:$medical-bgCol_white;
        display: flex;
        position: relative;
        box-shadow: 0px 0px 10px $medical-shadow_grey;
        .diagnoseUpt-info_img{
          width:130px;
          height:130px;
          display: inline-block;
          border-radius:100%;
          box-sizing: border-box;
          overflow: hidden;
          border:4px solid $medical-borCol_white;
          box-shadow: 0px 0px 10px $medical-shadow_grey;
          & > img{
            width:100%;
            height: 100%;
          }
        }
        .diagnoseUpt-info_title{
          text-align: left;
          font-size:$medical-font_18;
          color:$medical-col_999;
          margin-left: 20px;
          flex: 1;
          & > p{
            margin:10px 0px;
          }
          [class*=el-icon-]{
            font-size:18px;
          }
        }
      }
      .diagnoseUpt-form{
        padding:30px 30px 50px;
        text-align: left;
        border-radius:8px;
        position: relative;
        background-color:$medical-bgCol_white;
        box-shadow: 0px 0px 10px $medical-shadow_grey;
        .diagnoseUpt-form_title{
          line-height:2.5;
          margin-bottom:10px;
        }
        .diagnoseUpt-form_list{
          margin-bottom:15px;
          .el-input__inner{
            border-color:$medical-borCol_green;
          }
          .el-range-editor.el-input__inner,.el-select{
            width:100%;
            border-radius:20px;
          }
          .el-range-editor.el-input__inner{
            .el-icon-date{
               display: none;
            }
          }
        }
        .diagnoseUpt-box_confirm{
          position: absolute;
          width:100%;
          left: 0px;
          text-align: center;
          bottom:5px;
        }
      }
      .diagnoseUpt-table{
        margin-top: 15px;
        line-height: 1;
        .el-table td, .el-table th{
          padding:7px 0px;
          text-align: center;
        }
      }
      .diagnoseUpt-last{
        text-align: left;
        padding:0px 20px;
        .diagnoseUpt-last_top{
          span{
            vertical-align: middle;
          }
          .diagnoseUpt-last_topRight{
            float: right;
            font-size:22px;
            margin-top: 10px;
          }
        }
        .diagnoseUpt-last_content{
          position: relative;
          padding:25px 30px 60px;
          border-radius: 10px;
          margin-top:15px;
          background-color:$medical-bgCol_white;
          box-shadow: 0px 0px 10px $medical-shadow_grey;
          ul{
            margin:0px;
            li{
              color:$medical-col_blue;
              font-size:$medical-font_14;
              line-height:2;
              padding:3px 10px;
              span{
                float: right;
                vertical-align: middle;
                color:$medical-col_999;
              }
              &:nth-child(2n+1){
                background-color:$medical-bgCol_grey;
              }
            }
          }
          .diagnoseUpt-last_contentBottom{
            position: absolute;
            width:100%;
            left: 0;
            bottom:-18px;
            text-align: center;
          }
        }
      }
      .diagnoseUpt-submit{
        margin-top: 30%;
        color: $medical-col_green;
        font-size:$medical-font_20;
        .diagnoseUpt-submit_title{
          font-size:46px;
          vertical-align: middle;
          .el-button.is-circle{
            padding: 12px !important;
          }
          span{
            vertical-align: middle;
          }
          [class^=el-icon-]{
            font-size:24px;
          }
        }
      }
      .diagnoseUpt-box_next{
        position: absolute;
        width:100%;
        left: 0px;
        text-align: center;
        bottom:-70px;
      }
    }


  }
  /*自定义弹窗部分*/
  .el-dialog__wrapper{
    background-color:$medical-bgCol_grey;
    position: absolute;
    .disanose-dialog{
      border-radius:15px;
      max-width:400px;
      & > .el-dialog__header{
        padding:0px 20px;
        .el-dialog__headerbtn{
           z-index: 10;
           padding: 5px;
           top:10px;
           right:10px;
           background-color: $medical-bgCol_orange;
           border-color:$medical-borCol_orange;
           border-radius: 100%;
            font-size: 0px;
            i{
                font-size:$medical-font_18;
                color:$medical-col_white;
            }
        }
      }
      & > .el-dialog__body{
        padding:20px 50px;
        background:url('../assets/dialog_bg.png') no-repeat;
        background-size:100%;
        text-align: left;
        position: relative;
        .disanose-dialog_img{
          width:150px;
          height:150px;
          margin:0px auto 10px;
          border-radius:100%;
          overflow: hidden;
          border:5px solid $medical-borCol_white;
          box-shadow: 0px 0px 10px $medical-shadow_lightGrey;
          img{
            width:100%;
            height:100%;
          }
        }
        & > p{
          font-size:$medical-font_20;
          padding:3px 0px;
          span{
            width:60%;
            display: inline-block;
          }
        }
        .disanose-dialog_time{
          padding:10px 0px;
          ul{
            margin:0px;
            max-height:140px;
            overflow-y: auto;
            li{
              color:$medical-col_666;
              .el-radio{
                width:100%;
                box-sizing: border-box;
                padding:10px 10px;
                .el-radio__input.is-checked .el-radio__inner{
                  border-color:$medical-borCol_orange;
                  background-color:$medical-bgCol_orange;
                  &:after{
                    background-color:$medical-bgCol_tran;
                  }
                }
                .el-radio__input.is-checked+.el-radio__label{
                  color:$medical-col_666;
                }
              }
              &:nth-child(2n+1){
                background-color:$medical-bgCol_grey;
              }
            }
          }
        }
        .diagnose-dialog_confirm{
          text-align: center;
        }
      }
    }
  }

}
</style>
