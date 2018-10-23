<template>
  <div class="personList-page">
    <slideTab class="personList-slide" @changeTabList="changeList" :listData="tablistData"></slideTab>
    <div class="personList-content">
      <div class="personList-title" ref="titleHei">
        <div class="personList-title_picture">
          <img src="./../assets/logo.png"/>
          <!--<p>
            <el-button :type="buttonActive?'primary':''" size="mini" round @click="handleDeatil(true)">病例</el-button>
            <el-button :type="!buttonActive?'primary':''" size="mini" round @click="handleDeatil(false)">项目</el-button>
          </p>-->
        </div>
        <div class="personList-title_personMes">
          <p><span class="col_blue fontSize_26 fontFamily-BigHYQiHei">{{personDetail.topTitle.personName}}</span> <i class="marginLeft_15" :class="personDetail.topTitle.personSex?'hui-icon-ziyuan18 col_orange':'hui-icon-ziyuan19 col_green'"></i></p>
          <P class="fontSize_12"><i class="hui-icon-ziyuan6 fontSize_14 col_d3"></i> {{personDetail.topTitle.personAge}} 岁</P>
          <P class="fontSize_12"><i class="hui-icon-ziyuan13 fontSize_14 col_d3"></i> {{personDetail.topTitle.personNumber}}</P>
          <P class="fontSize_12"><i class="hui-icon-ziyuan8 fontSize_14 col_d3"></i> {{personDetail.topTitle.personPhone}}</P>
          <P class="col_orange fontSize_12"><i class="hui-icon-ziyuan2 fontSize_14"></i> 向上转诊</P>
        </div>
        <div class="personList-title_info">
          <div class="personList-title_infoNum">
            未完成<p class="col_orange fontFamily-regular">{{personDetail.topTitle.finish}}</p>
          </div>
          <div class="personList-title_infoNum">
            已完成<p class="col_cyan fontFamily-regular">{{personDetail.topTitle.unfinish}}</p>
          </div>
        </div>
      </div>

        <div class="personList-contain_tab">
            <span :class="{'tab-active':buttonActive}" @click="handleDeatil(true)">病例</span>
            <span :class="{'tab-active':!buttonActive}" @click="handleDeatil(false)">项目</span>
        </div>
        <!--<div class="personList-contain">
dfdsfdsfdsfdsfds
        </div>-->
      <!--个人病例部分 start-->
      <div class="personList-detail" v-if="buttonActive && !isEditDetail">
        <!--信息展示 start-->
        <ul>
          <li v-for="item in personDetail.personInfor">{{item.title}}<span>{{item.value}}</span></li>
        </ul>
        <!--信息展示 end-->
        <span class="personList-detail_btnGroud"><el-button type="primary" @click="editDetail">修改</el-button></span>
      </div>
      <div class="personList-editDetail" v-else-if="buttonActive && isEditDetail">
        <!--信息编辑 start-->
        <el-form ref="form" :model="sizeForm" label-width="80px" size="mini">
          <el-form-item label="病人主诉">
            <el-input v-model="sizeForm.name"></el-input>
          </el-form-item>
          <el-form-item label="现病史">
            <el-input v-model="sizeForm.name"></el-input>
          </el-form-item>
          <el-form-item label="既往史">
            <el-input v-model="sizeForm.name"></el-input>
          </el-form-item>
          <el-form-item label="个人史">
            <el-input v-model="sizeForm.name"></el-input>
          </el-form-item>
          <el-form-item label="家族史">
            <el-input v-model="sizeForm.name"></el-input>
          </el-form-item>
          <el-form-item label="体格检查">
            <el-input v-model="sizeForm.name"></el-input>
          </el-form-item>
          <el-form-item label="专科检查">
            <el-input v-model="sizeForm.name"></el-input>
          </el-form-item>
          <el-form-item label="辅助检查">
            <el-input v-model="sizeForm.name"></el-input>
          </el-form-item>
          <el-form-item label="诊断">
            <el-input v-model="sizeForm.name"></el-input>
          </el-form-item>
          <el-form-item label="本次医嘱">
            <el-input v-model="sizeForm.name"></el-input>
          </el-form-item>
          <el-form-item label="西城药">
            <el-input v-model="sizeForm.name"></el-input>
          </el-form-item>
        </el-form>
        <span class="personList-editDetail_btnGroud">
          <el-button type="primary" @click="onSubmit">确定</el-button>
        </span>
        <!--信息编辑 end-->
      </div>
      <!--个人病例部分 end-->
      <!--个人检查项目列表 start-->
      <div class="personList-items" v-else>
        <div class="medical-table">
          <ul class="medical-table_list marginBottom_0 marginTop_0 table_title" ref="table_title">
            <li class="marginBottom_0">
                <div class="medical-list_flexTitle">
                    <span class="medical-list_flexTitle_th">项目名称</span>
                    <span class="medical-list_flexTitle_th">检查时间</span>
                    <span class="medical-list_flexTitle_th">标本类型</span>
                    <span class="medical-list_flexTitle_th">附件</span>
                    <span class="medical-list_flexTitle_th">完成程度</span>
                </div>
            </li>
          </ul>
          <ul class="medical-table_list marginTop_0 marginBottom_0" :style="{height:warpHeight+'px'}">
            <li v-for="(item,index) in tableList">
              <!--list列表-->
              <div class="medical-list_flex" :class=" item.finishType=='1' ? 'medical-list_read' : 'medical-list_unread' ">
                <el-checkbox v-model="item.checked" size="medium"></el-checkbox>
                <div class="medical-list_operation col_blue fontSize_15" @click="item.stateDeatilVisible = !item.stateDeatilVisible">
                  <span>{{item.name}}</span>
                </div>
                <div class="medical-list_operation" @click="item.stateDeatilVisible = !item.stateDeatilVisible">
                  <span>{{item.time}}</span>
                </div>
                <div class="medical-list_operation" @click="item.stateDeatilVisible = !item.stateDeatilVisible">
                  <span>{{item.specimenType}}</span>
                </div>
                <div class="medical-list_operation">
                  <i class="hui-icon-ziyuan17 col_green"></i>
                </div>
                <div class="medical-list_operation" :class="item.finishType == '1'?'col_green':'col_orange'" @click="item.stateDeatilVisible = !item.stateDeatilVisible">
                  <span v-if="item.finishType == '1'">已完成</span>
                  <span v-if="item.finishType == '2'">未完成</span>
                  <span v-if="item.finishType == '3'">待填写</span>
                </div>
                <!--<div class="medical-list_icon">-->
                  <!--<i class="el-icon-view"></i>-->
                <!--</div>-->
                <div class="medical-list_icon" @click="item.stateDeatilVisible = !item.stateDeatilVisible">
                  <i class="el-icon-caret-bottom"></i>
                </div>
                <div class="medical-list_bg" @click="item.stateDeatilVisible = !item.stateDeatilVisible"></div>
              </div>
              <!--病人状态 详情 start-->
              <div class="medical-state" v-show="item.stateDeatilVisible">
                <!--未完成 start-->
                <ul class="medical-stateBoxP stripe" v-if="item.finishType == '2'">
                  <li v-for="sick in item.itemsDetail">{{sick.title}}<span :class="sick.isBotton ? 'col_green':''">{{sick.value}}</span></li>
                  <span class="medical-state_btnGroud">
                    <el-button type="primary" @click.native="openAlert(item.finishType,'确定要进行检查吗？',index)">进行检查</el-button>
                  </span>
                </ul>
                <!--未完成 end-->
                <!--项目详情查看 start-->
                <div class="medical-stateBoxTable" v-else>
                  <table>
                    <tr>
                        <th>项目</th>
                        <th>检查结果</th>
                        <th>参考范围</th>
                        <th>单位</th>
                        <th>状态</th>
                        <th v-if="item.finishType != '1'">操作</th>
                    </tr>
                    <tr v-for="(tr,trNum) in item.finishDetail">
                      <td>
                          <el-input v-if="item.finishType != '1' && tr.type=='add'" placeholder="可填写" v-model="tr.name" clearable size="mini"></el-input>
                          <span v-else>{{tr.name}}</span>
                      </td>
                      <td>
                        <span v-if="item.finishType == '1'">{{tr.result}}</span>
                        <el-input v-else placeholder="可填写" v-model="tr.result" clearable size="mini"></el-input>
                      </td>
                      <td>
                        <span v-if="item.finishType == '1'">{{tr.scope}}</span>
                        <el-input v-else placeholder="可填写" v-model="tr.scope" clearable size="mini"></el-input>
                      </td>
                      <td>
                          <el-input v-if="item.finishType != '1' && tr.type=='add'" placeholder="可填写" v-model="tr.unit" size="mini"></el-input>
                          <span v-else class="col_999">{{tr.unit}}</span>
                      </td>
                      <td><span :class="tr.result == tr.scope ?'col_green':'col_orange'">{{tr.result == tr.scope ?'正常':'不正常'}}</span></td>
                      <td v-if="item.finishType != '1'" class="col_tran_grey">
                          <i class="el-icon-circle-plus" @click = "addTrList(item,tr,trNum)"></i>
                          <i class="el-icon-remove" @click = "removeTrList(item,tr,trNum)"></i>
                      </td>
                    </tr>
                  </table>
                  <span class="medical-state_btnGroud" v-if="item.finishType == '1'">
                    <el-button type="primary" @click.native="openAlert(item.finishType,'确定要进行重新填写吗？',index ,true)">重新填写</el-button>
                    <el-button type="primary" @click.native="openAlert(item.finishType,'确定要进行再次检查吗？',index ,false)">再次检查</el-button>
                  </span>
                  <span class="medical-state_btnGroud" v-else>
                    <el-button type="primary" @click.native="openAlert(item.finishType,'确定要保存当前信息吗？',index)">确认</el-button>
                  </span>
                </div>
                <!--项目详情查看 end-->
                <!--<span class="medical-putAway" @click="item.stateDeatilVisible = !item.stateDeatilVisible">收起 <i class="el-icon-caret-top"></i></span>-->
              </div>
              <!--病人状态 详情 end-->

            </li>
          </ul>
        </div>
      </div>
      <!--个人检查项目列表 end-->
    </div>
  </div>
</template>

<script>
import slideTab from '../components/slideTab/index.vue'
export default {
  name: 'personList',
  components: {
    slideTab
  },
  data () {
    return {
      warpHeight: 500,
      buttonActive: true,//判断显示病例 还是 项目列表
      isEditDetail: false,//false 显示资料展示  true 显示资料编辑
      sizeForm: {
        name: '',
      },
      tablistData: [
        {img: require("./../assets/logo.png"), personName: '刘奇', personAge: 22, personPhone: '188-1111-2222', personSex: 0, personNumber: '00010220', mesNum: 0, finish: 3, unfinish: 4},
        {img: require("./../assets/logo.png"), personName: '刘1', personAge: 23, personPhone: '188-1111-3333', personSex: 1, personNumber: '00010220', mesNum: 2, finish: 0, unfinish: 2},
        {img: require("./../assets/logo.png"), personName: '刘2', personAge: 24, personPhone: '188-1111-4444', personSex: 0, personNumber: '00010220', mesNum: 0, finish: 1, unfinish: 4},
        {img: require("./../assets/logo.png"), personName: '刘3', personAge: 25, personPhone: '188-1111-5555', personSex: 0, personNumber: '00010220', mesNum: 0, finish: 3, unfinish: 4},
        {img: require("./../assets/logo.png"), personName: '刘4', personAge: 26, personPhone: '188-1111-6666', personSex: 1, personNumber: '00010220', mesNum: 2, finish: 1, unfinish: 4},
        {img: require("./../assets/logo.png"), personName: '刘5', personAge: 27, personPhone: '188-1111-7777', personSex: 0, personNumber: '00010220', mesNum: 0, finish: 2, unfinish: 4},
        {img: require("./../assets/logo.png"), personName: '刘5', personAge: 28, personPhone: '188-1111-8888', personSex: 1, personNumber: '00010220', mesNum: 6, finish: 3, unfinish: 2}
      ],
      personDetail: {
        topTitle: {},//头部信息
        personInfor:[//个人病情资料
          {title: '病人主诉', value: '周身皮疹2天，作瘙痒'},
          {title: '现病史', value: '2天前起发现周身陆续出现丘疹及水泡'},
          {title: '', value: '作瘙痒，尚无发热'},
          {title: '既往史', value: '无药物过敏史'},
          {title: '个人史', value: '无特殊'},
          {title: '家族史', value: '无特殊'},
          {title: '体格检查', value: 'T37.6一般状态尚可，心肺腹未见异常'},
          {title: '专科检查', value: '全身见密集丘疹，水疱，部分破溃，结痂，鄂下淋巴结肿大'},
          {title: '辅助检查', value: '血BC&，WBC7.02/L;LYM%12.84,NEUT:4.18*109'},
          {title: '诊断', value: '(B01.901)水痘'},
          {title: '本次医嘱', value: '血常规'},
          {title: '', value: '病假诊断'},
          {title: '西城药', value: '1.盐酸0.3*7片'},
          {title: '', value: '每次0.3g，每天二次，口服'}
        ]
      },
      tableList: [
        {
          checked: false,
          name: '血常规',
          time: '2018.01.01',
          specimenType: '静脉血清',
          itemsDetailVisible:false,//项目相关信息详情 显示隐藏
          finishType: 1,//完成状态  1、已完成  2、未完成  3、待填写
          stateDeatilVisible:false,//完成状态详细 显示隐藏
          itemsDetail:[//项目相关信息详情
            {title: '序列号', value: '0987654321', isBotton: false},
            {title: '检查名称', value: '血常规', isBotton: false},
            {title: '开具时间', value: '2018.09.09', isBotton: false},
            {title: '检测时间', value: '2018.09.09', isBotton: false},
            {title: '开具医生', value: '王主任', isBotton: false}
          ],
          finishDetail:[//已完成的项目列表详情
            {name: 'y球蛋白', result: 120, scope: 120, unit: 'g/ml'},
            {name: '凝血酶原时间', result: 100, scope: 120, unit: 'g/ml'},
            {name: '国际标准化比值', result: 90, scope: 120, unit: 'g/ml'},
            {name: '凝血酶原活动度', result: 120, scope: 120, unit: 'g/ml'},
            {name: '凝血酶原参考时间', result: 120, scope: 120, unit: 'g/ml'}
          ]
        },
        {
          checked: false,
          name: '血常规',
          time: '2018.01.01',
          specimenType: '静脉血清',
          itemsDetailVisible:false,//项目相关信息详情 显示隐藏
          finishType: 2,//完成状态  1、已完成  2、未完成  3、待填写
          stateDeatilVisible:false,//完成状态详细 显示隐藏
          itemsDetail:[//项目相关信息详情
            {title: '序列号', value: '0987654321', isBotton: false},
            {title: '检查名称', value: '血常规', isBotton: false},
            {title: '开具时间', value: '2018.09.09', isBotton: false},
            {title: '检测时间', value: '2018.09.09', isBotton: false},
            {title: '开具医生', value: '王主任', isBotton: false}
          ],
          finishDetail:[//已完成的项目列表详情
            {name: 'y球蛋白', result: 120, scope: 120, unit: 'g/ml'},
            {name: '凝血酶原时间', result: 100, scope: 120, unit: 'g/ml'},
            {name: '国际标准化比值', result: 90, scope: 120, unit: 'g/ml'},
            {name: '凝血酶原活动度', result: 120, scope: 120, unit: 'g/ml'},
            {name: '凝血酶原参考时间', result: 120, scope: 120, unit: 'g/ml'}
          ]
        }
      ]
    }
  },
  created () {
    this.personDetail.topTitle = this.tablistData[0];
  },
  mounted () {
  },
  methods: {
    //table表格填写编辑时  新增操作
    addTrList (item, tr, index) {// item 项目的总详情  tr 当前操作的tr详情  index 当前操作的tr索引
      let newTr = {name: '', result: '', scope: '', unit: '', type: 'add'};
      item.finishDetail.splice(index + 1, 0, newTr);
    },
    //table表格填写编辑时  删除操作
    removeTrList (item, tr, index) {// item 项目的总详情  tr 当前操作的tr详情  index 当前操作的tr索引
      if (item.finishDetail.length <= 1) {
        this.$alert('检查项不能少于1条', '', {
          confirmButtonText: '确定',
          center: true,
          customClass: 'medical-alert'
        })
        return false;
      }
      item.finishDetail.splice(index, 1);
    },
    //弹窗事件
    openAlert (val, title, index ,type) {// val 当前的状态 title 弹窗显示的信息  index list条数的序号  type 可选 重新填写 true  再次检查 false
      this.$alert(title, '', {
        confirmButtonText: '确定',
        center: true,
        customClass: 'medical-alert',
        callback: action => {
          if(action == 'confirm'){
            if(val == '3') {
              this.tableList[index].finishType = 1
            } else if (val == '2') {
              this.tableList[index].finishType = 3
            } else {
              if (type) {
                this.tableList[index].finishType = 3
              } else {
                this.tableList[index].finishType = 2
              }
            }
          }

        }
      });
    },
    //列表选择事件
    changeList (item) {
      console.log(item,'++++++')
      this.personDetail.topTitle = item;
    },
    handleDeatil (val) {
      if (this.buttonActive == val) {
        return;
      }
      this.buttonActive = val;
      if (val == false) {
          this.$nextTick(function () {
              // console.log(this.$refs.titleHei.offsetHeight,this.$refs.table_title.offsetHeight)
              this.warpHeight = document.documentElement.clientHeight - this.$refs.titleHei.offsetHeight - this.$refs.table_title.offsetHeight -35;
          })
      }
      console.log(this.buttonActive)
    },
    editDetail () {
      this.isEditDetail = true;
    },
    //表单提交
    onSubmit() {
      console.log('submit!');
      this.isEditDetail = false;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  @import '../scss/default.scss';
  .personList-page{
    height:100%;
    display: flex;
    .personList-content{
      flex:1;
      text-align: left;
      height:100%;
      overflow-y: auto;
      .personList-title{
        display: flex;
        justify-items: center;
        align-items: center;
        padding:20px 5px 20px 20px;
        .personList-title_picture{
          width:140px;
          margin:0px 15px;
          text-align: center;
          & > img{
            width:100px;
            height:100px;
            border-radius:100%;
            border:3px solid $medical-borCol_white;
            box-shadow: 0px 0px 10px $medical-shadow_grey;
          }
        }
        .personList-title_personMes{
          color:$medical-col_999;
          & > p{
            line-height:24px;
            i{
              margin-right:8px;
            }
          }
        }
        .personList-title_info{
          flex:1;
          text-align: right;
          & > .personList-title_infoNum{
            display: inline-block;
            position: relative;
            padding:0px 20px;
            text-align: center;
            color:$medical-col_blue;
            &:first-child:after{
              position: absolute;
              right: -1px;
              bottom:0px;
              content: '';
              width:1px;
              height:100%;
              background-color:$medical-bgCol_blue;
            }
            & > p{
              font-size:87px;
              line-height:1;
            }
          }
        }
      }
        .personList-contain_tab{
            padding:0px 35px;
            span{
                padding: 5px 15px;
                vertical-align: bottom;
                display: inline-block;
                border-radius: 10px 10px 0px 0px;
                font-size:16px;
                /*background-color:#ddd;
                color:#666;*/
                margin-right:5px;
                &:nth-child(1){
                    background-color:$medical-bgCol_white;
                    color:$medical-col_blue;
                }
                &:nth-child(2){
                    background-color:$medical-bgCol_cyan;
                    color:$medical-col_white;
                }
                &:nth-child(3){
                    background-color:$medical-bgCol_grey;
                    color:$medical-col_white;
                }
                &.tab-active{
                    /*background-color: #00d6f2;
                    color:#fff;*/
                    padding: 12px 15px;
                }
            }
        }
        .personList-contain{
            background-color: #fff;
        }
      .personList-detail{
        padding:0px 20px 30px;
        box-sizing: border-box;
        position: relative;
        & > ul{
          margin:0px;
          border-radius:10px;
          background-color: #fff;
          padding:20px 20px 30px;
          box-shadow: 0px 0px 10px $medical-shadow_lightGrey;
          & > li{
            padding:5px 5px;
            border-bottom:1px solid $medical-borCol_ddd;
            font-size:$medical-font_16;
            color:$medical-col_blue;
            overflow: hidden;
            & > span{
              font-size:$medical-font_14;
              color:$medical-col_666;
              float: right;
            }
          }
        }
        .personList-detail_btnGroud{
          width:100%;
          position: absolute;
          left: 0px;
          bottom:15px;
          text-align: center;
        }
      }
      .personList-editDetail{
        padding:20px;
        margin:20px 20px 35px;
        border-radius:10px;
        background-color:#fff;
        position: relative;
        .el-form-item__label{
          color:$medical-col_blue;
          text-align: left;
          font-size:$medical-font_16;
        }
        .personList-editDetail_btnGroud{
          position: absolute;
          left: 0px;
          width:100%;
          bottom:-15px;
          text-align: center;
        }
      }
      .personList-items{
          padding:15px 15px 25px;
          margin:0px 20px 20px;
          border-radius: 10px;
          background-color:$medical-bgCol_white;
          box-shadow: 0px 0px 10px $medical-shadow_lightGrey;
        & > .medical-table{
          padding:0px 0px;
        }
      }
    }
  }

</style>
