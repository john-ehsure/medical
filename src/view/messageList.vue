<template>
  <div class="messageList">
    <div class="medical-search" ref="searchHei">
        <el-form>
            <el-input size="medium" placeholder="请输入内容" prefix-icon="el-icon-search"  v-model="searchInput" @keyup.enter.native="ceshi">
            </el-input>
        </el-form>
    </div>
    <div class="medical-table">
      <div ref="table_row" class="padding_lr_20">
        <el-row>
            <el-col :span="18">
                <el-button type="warning" size="mini" round>未读</el-button>
                <el-button type="info" size="mini" round disabled>检查状态通知</el-button>
                <el-button type="info" size="mini" round disabled>本地新进患者通知</el-button>
                <el-button type="info" size="mini" round disabled>转院申请通知</el-button>
            </el-col>
            <el-col :span="6" class="text-right">
                <el-button :type="allChecked ? 'success' : 'info'" size="mini" round @click="handleChecked">{{allChecked ? '全不选' : '全选'}}</el-button>
                <el-button type="warning" size="mini" round>删除</el-button>
            </el-col>
        </el-row>
      </div>
      <ul class="medical-table_list marginBottom_0 table_title" ref="table_title">
          <li class="marginBottom_0">
              <div class="medical-list_flexTitle message-title">
                  <span class="medical-list_flexTitle_th">医生信息</span>
                  <span class="medical-list_flexTitle_th">消息类型</span>
                  <span class="medical-list_flexTitle_th">时间</span>
                  <span class="medical-list_flexTitle_th">附件</span>
                  <span class="medical-list_flexTitle_th">状态</span>
              </div>
          </li>
      </ul>
      <ul class="medical-table_list marginTop_0 marginBottom_0" :style="{height:warpHeight+'px'}">
        <li v-for="(item,index) in tableList">
          <!--list列表-->
          <div class="medical-list_flex" :class=" item.isRead ? 'medical-list_read' : 'medical-list_unread' ">
            <el-checkbox v-model="item.checked" size="medium"></el-checkbox>
            <div class="medical-list_img" @click="item.stateDeatilVisible = !item.stateDeatilVisible">
              <img :src="item.photo"/>
            </div>
            <div class="medical-list_mes" @click="item.stateDeatilVisible = !item.stateDeatilVisible">
              {{item.name}}<br>{{item.hospitalName}}<br>{{item.departmentName}}
            </div>
            <div class="medical-list_operation" @click="item.stateDeatilVisible = !item.stateDeatilVisible">
              <span v-if="item.mesType == '1'">本地新进患者通知</span>
              <span v-if="item.mesType == '2'">检查结果通知</span>
              <span v-if="item.mesType == '3'">转诊申请通知</span>
              <span v-if="item.mesType == '4'">转诊结果通知</span>
              <i class="el-icon-caret-bottom"></i>
            </div>
            <div class="medical-list_operation col-green" @click="item.stateDeatilVisible = !item.stateDeatilVisible">
              <span>{{item.time}}</span>
            </div>
            <div class="medical-list_operation col-green">
              <i class="hui-icon-ziyuan17"></i>
            </div>
            <div class="medical-list_operation" :class="{'col-green':!item.isRead}" @click="item.stateDeatilVisible = !item.stateDeatilVisible">
              <span>{{item.isRead?'已读':'未读'}}</span>
              <i class="el-icon-caret-bottom"></i>
            </div>
            <div class="medical-list_bg" @click="item.stateDeatilVisible = !item.stateDeatilVisible"></div>
          </div>
          <!--病人状态 详情 start-->
          <div class="medical-state" v-show="item.stateDeatilVisible">
            <!--本地新进患者通知 start-->
            <ul class="medical-stateBoxP stripe" v-if="item.mesType == '1'">
              <li v-for="sick in item.newSickPerson" v-if="!sick.isDetail">{{sick.title}}<span>{{sick.value}}</span></li>
              <span class="medical-state_btnGroud"><el-button type="success" @click.native="openAlert">查看详情</el-button></span>
            </ul>
            <!--本地新进患者通知 end-->
            <!--检查结果通知 start-->
            <ul class="medical-stateBoxP stripe" v-if="item.mesType == '2'">
              <li v-for="sick in item.newSickPerson" v-if="!sick.isDetail">{{sick.title}}<span>{{sick.value}}</span></li>
              <li class="medical-stateBoxP_table" v-for="sick in item.newSickPerson" v-if="sick.isDetail">
                <p>{{sick.title}}</p>
                <table>
                  <thead>
                  <tr>
                    <td>项目</td><td>检查结果</td><td>参考范围</td><td>评定</td>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="td in sick.value">
                    <td>{{td.itemName}}</td>
                    <td>{{td.itemResult}}<span class="col_999">g/ml</span></td>
                    <td>{{td.itemRefer}}<span class="col_999">g/ml</span></td>
                    <td><span :class="td.type ? 'col_green' : 'col_orange'">{{td.type ? '正常' : '不正常'}}</span></td>
                  </tr>
                  </tbody>
                </table>
              </li>
            </ul>
            <!--检查结果通知 end-->
            <!--转诊申请通知 start-->
            <ul class="medical-stateBoxLine" v-if="item.mesType == '3'">
              <li v-for="sick in item.personInfor">{{sick.title}}<span>{{sick.value}}</span></li>
            </ul>
            <ul class="medical-stateBoxP stripe" v-if="item.mesType == '3'">
              <li v-for="sick in item.transferApply">{{sick.title}}<span :class="sick.isBotton ? 'col_green':''">{{sick.value}}</span></li>
              <span class="medical-state_btnGroud">
                <el-button type="success" @click.native="openAlert">接受</el-button>
                <el-button type="info" @click.native="openAlert">拒绝</el-button>
                <el-button type="primary" @click.native="openAlert">进行沟通</el-button>
              </span>
            </ul>
            <!--转诊申请通知 end-->
            <!--转诊结果通知 start-->
            <ul class="medical-stateBoxP stripe" v-if="item.mesType == '4'">
              <li v-for="sick in item.transferResult">{{sick.title}}<span :class="sick.isBotton ? 'col_green':''">{{sick.value}}</span></li>
              <span class="medical-state_btnGroud"><el-button type="primary" @click.native="openAlert">查看详情</el-button></span>
            </ul>
            <!--转诊结果通知 end-->
            <!--<span class="medical-putAway" @click="item.stateDeatilVisible = !item.stateDeatilVisible">收起 <i class="el-icon-caret-top"></i></span>-->
          </div>
          <!--病人状态 详情 end-->

        </li>
      </ul>
    </div>

  </div>
</template>

<script>
export default {
  name: 'messageList',
  data () {
    return {
      warpHeight:500,//主内容的高度
      searchInput: '',
      tableList: [
        {
          checked: false,
          photo: require('../assets/logo.png'),
          name: '刘大夫',
          hospitalName: '北医三院',
          departmentName: '骨科',
          time: '2018.01.01',
          isRead: false,
          mesType: 1,//通知列表详情  1、本地新进患者通知 2、检查结果通知 3、转诊申请通知 4、转诊结果通知
          stateDeatilVisible:false,//本地新进患者通知 显示隐藏
          newSickPerson: [//本地新进患者通知
            {title: '医院', value: '北医三院', isDetail: false},
            {title: '科室', value: '骨科', isDetail: false},
            {title: '医生', value: '王医生', isDetail: false},
            {title: '医生姓名', value: '王医生', isDetail: false},
            {title: '医生执业证号码', value: '987654321', isDetail: false},
            {title: '姓名', value: '王文', isDetail: false},
            {title: '出生日期', value: '1988.01.02', isDetail: false},
            {title: '地址', value: '清华大学', isDetail: false},
            {title: '证件类型', value: '身份证', isDetail: false},
            {title: '证件号码', value: 222111222211113333, isDetail: false},
            {title: '手机号码', value: '138-8888-1111', isDetail: false},
            {title: '性别', value: '男', isDetail: false},
            {title: '配偶姓名', value: '刘树华', isDetail: false},
            {title: '配偶证件类型', value: '身份证', isDetail: false},
            {title: '配偶证件号码', value: 22211100001111, isDetail: false},
            {title: '联系人姓名', value: '小刘', isDetail: false},
            {title: '联系人与患者关系', value: '朋友', isDetail: false},
            {title: '联系人手机号', value: '138-1111-2222', isDetail: false}
          ]
        },
        {
          checked: false,
          photo: require('../assets/logo.png'),
          name: '刘大夫',
          hospitalName: '北医三院',
          departmentName: '骨科',
          time: '2018.01.01',
          isRead: false,
          mesType: 2,//通知列表详情  1、本地新进患者通知 2、检查结果通知 3、转诊申请通知 4、转诊结果通知
          stateDeatilVisible:false,//本地新进患者通知 显示隐藏
          newSickPerson: [//本地新进患者通知
            {title: '序列号', value: '098789876', isDetail: false},
            {title: '检测名称', value: '尿检', isDetail: false},
            {title: '开具时间', value: '2018.08.08', isDetail: false},
            {title: '检测时间', value: '2018.08.08', isDetail: false},
            {title: '患者姓名', value: '刘叔叔', isDetail: false},
            {title: '主治医师', value: '王主任', isDetail: false},
            {
              title: '内容',
              value: [
                {itemName: '血常规', itemResult: 120, itemRefer: 120, type: true},
                {itemName: '红血球', itemResult: 120, itemRefer: 120, type: true},
                {itemName: '白血球', itemResult: 100, itemRefer: 120, type: false}
              ],
              isDetail: true
            }
          ]
        },
        {
          checked: true,
          photo: require('../assets/logo.png'),
          name: '刘大夫',
          hospitalName: '北医三院',
          departmentName: '骨科',
          time: '2018.01.01',
          isRead: true,
          mesType: 3, // 通知列表详情  1、本地新进患者通知 2、检查结果通知 3、转诊申请通知 4、转诊结果通知
          stateDeatilVisible:false,//患者状态详情 显示隐藏
          transferApply:[//转诊申请通知
            {title: '主治医师', value: '王主任', isBotton: false},
            {title: '来源医生', value: '同意', isBotton: true},
            {title: '完成时间', value: '2018.08.09', isBotton: false},
            {title: '去向医生', value: '刘先生', isBotton: false},
            {title: '主治医师', value: '李主任', isBotton: false},
            {title: '结果', value: '同意', isBotton: true}
          ],
          personInfor:[
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
        {
          checked: true,
          photo: require('../assets/logo.png'),
          name: '刘大夫',
          hospitalName: '北医三院',
          departmentName: '骨科',
          time: '2018.01.01',
          isRead: true,
          mesType: 4,//通知列表详情  1、本地新进患者通知 2、检查结果通知 3、转诊申请通知 4、转诊结果通知
          stateDeatilVisible:false,//患者状态详情 显示隐藏
          transferResult:[//转院结果通知
            {title: '申请时间', value: '2018.08.08', isBotton: false},
            {title: '来源医院', value: '北京三院', isBotton: false},
            {title: '去向医院', value: '北京五院', isBotton: false},
            {title: '来源医生', value: '王医生', isBotton: false},
            {title: '去向医生', value: '刘叔叔', isBotton: false},
            {title: '主治医师', value: '王主任', isBotton: false},
            {title: '结果', value: '同意', isBotton: true},
            {title: '完成时间', value: '2018.09.09', isBotton: false}
          ]
        }
      ]
    }
  },
  computed: {
    allChecked: function () {
      let checkArr = 0
      this.tableList.forEach(function (value, index) {
        // console.log(index+":"+value);
        if (value.checked === true) {
          checkArr++
        }
      });
      return checkArr == this.tableList.length
    }
  },
  mounted () {
    // console.log(this.$refs.table_title.offsetHeight,this.$refs.table_row.offsetHeight)
    this.warpHeight = document.documentElement.clientHeight - this.$refs.searchHei.offsetHeight - this.$refs.table_title.offsetHeight - this.$refs.table_row.offsetHeight -55;
  },
  methods: {
      ceshi () {
          alert('测试成功')
      },
      liClick(){
          alert('1')
      },
    //弹窗事件
    openAlert () {
      this.$alert('这是一段提示信息', '', {
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
    //全选和取消全选事件
    handleChecked () {
      if (this.allChecked) {
        this.tableList.forEach(function (value, index) {
          value.checked = false
        })
      } else {
        this.tableList.forEach(function (value, index) {
          value.checked = true
        })
      }
    }
  }
}
</script>

<style lang="scss">

</style>
