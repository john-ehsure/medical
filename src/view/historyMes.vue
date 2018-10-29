<template>
  <div class="historyMes">
      <div v-if="historyVisit">
          <div class="medical-search" ref="searchHei">
              <el-input size="medium" placeholder="请输入内容" prefix-icon="el-icon-search"  v-model="searchInput">
              </el-input>
          </div>
          <div class="medical-table">
              <div ref="table_row" class="padding_lr_20">
                  <el-row class="historyMes-number">
                      <el-col :span="8">
                          <p>本月已处理</p>
                          <p><span class="historyMes-number_large col_cyan fontFamily-regular">33</span>(人)</p>
                      </el-col>
                      <el-col :span="8">
                          <p>本月已转诊</p>
                          <p><span class="historyMes-number_large col_lightblue fontFamily-regular">33</span>(人)</p>
                      </el-col>
                      <el-col :span="8">
                          <p>处理中</p>
                          <p><span class="historyMes-number_large col_orange fontFamily-regular">33</span>(人)</p>
                      </el-col>
                  </el-row>
                  <el-row>
                      <el-col :span="19">
                          <el-button type="danger" size="mini" round>最近处理</el-button>
                          <el-button type="info" size="mini" round disabled>过去处理</el-button>
                          <el-button type="info" size="mini" round disabled>只显示已经转诊病人</el-button>
                          <el-button type="info" size="mini" round disabled>只显示男性病人</el-button>
                          <el-button type="info" size="mini" round disabled>只显示女性病人</el-button>
                      </el-col>
                      <el-col :span="5" class="text-right">
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
                          <span class="message-title_icon">状态</span>
                      </div>
                  </li>
              </ul>
              <ul class="medical-table_list marginTop_0 marginBottom_0" :style="{'max-height':warpHeight+'px'}">
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
                          <div class="medical-list_operation" v-if="item.mesType == '1'" @click="item.stateDeatilVisible = !item.stateDeatilVisible">
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
                          <div class="medical-list_icon" @click="item.stateDeatilVisible = !item.stateDeatilVisible">
                              <i class="el-icon-caret-bottom"></i>
                          </div>
                          <div class="medical-list_bg" @click="item.stateDeatilVisible = !item.stateDeatilVisible"></div>
                      </div>
                      <!--病人状态 详情 start-->
                      <div class="medical-state" v-show="item.stateDeatilVisible">
                          <!--本地新进患者通知 start-->
                          <ul class="medical-stateBoxP stripe" v-if="item.mesType == '1'">
                              <li v-for="sick in item.newSickPerson" v-if="!sick.isDetail">{{sick.title}}<span>{{sick.value}}</span></li>
                              <span class="medical-state_btnGroud"><el-button type="primary" @click.native="historyVisit = !historyVisit">查看详情</el-button></span>
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
                          <!--转院结果通知 start-->
                          <ul class="medical-stateBoxP stripe" v-if="item.mesType == '4'">
                              <li v-for="sick in item.transferResult">{{sick.title}}<span :class="sick.isBotton ? 'col_green':''">{{sick.value}}</span></li>
                              <span class="medical-state_btnGroud"><el-button type="primary" @click.native="openAlert">查看详情</el-button></span>
                          </ul>
                          <!--转院结果通知 end-->
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
                          <!--<span class="medical-putAway" @click="item.stateDeatilVisible = !item.stateDeatilVisible">收起 <i class="el-icon-caret-top"></i></span>-->
                      </div>
                      <!--病人状态 详情 end-->

                  </li>
              </ul>
          </div>
      </div>
     <div class="personList-content" v-else>
          <div class="personList-title" ref="titleHei">
              <div class="personList-title_picture">
                  <img src="./../assets/logo.png"/>
              </div>
              <div class="personList-title_personMes">
                  <p><span class="col_blue fontSize_26 fontFamily-BigHYQiHei">{{personDetail.topTitle.personName}}</span> <i class="marginLeft_15" :class="personDetail.topTitle.personSex?'hui-icon-ziyuan18 col_orange':'hui-icon-ziyuan19 col_green'"></i></p>
                  <P class="fontSize_12">
                      <i class="hui-icon-ziyuan6 fontSize_14 col_d3"></i>
                      <span>{{personDetail.topTitle.personAge}} 岁</span>
                  </P>
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
          <!--个人病例部分 start-->
          <div class="personList-detail" v-if="buttonActive && !isEditDetail">
              <!--信息展示 start-->
              <ul>
                  <li v-for="item in personDetail.personInfor">{{item.title}}<span>{{item.value}}</span></li>
              </ul>
              <!--信息展示 end-->
              <span class="personList-detail_btnGroud">
                  <el-button type="primary" @click="editDetail">修改</el-button>
                  <el-button type="info" v-if="!isEditDetail" @click="historyVisit = !historyVisit">返回</el-button>
              </span>
          </div>
          <div class="personList-editDetail" v-else-if="buttonActive && isEditDetail">
              <!--信息编辑 start-->
              <el-form ref="form" :model="sizeForm" label-width="80px" size="mini">
                  <el-form-item label="病人主诉">
                      <el-input v-model="sizeForm.name" placeholder="请输入"></el-input>
                  </el-form-item>
                  <el-form-item label="现病史">
                      <el-input v-model="sizeForm.name"  placeholder="请输入"></el-input>
                  </el-form-item>
                  <el-form-item label="既往史">
                      <el-input v-model="sizeForm.name" placeholder="请输入"></el-input>
                  </el-form-item>
                  <el-form-item label="个人史">
                      <el-input v-model="sizeForm.name" placeholder="请输入"></el-input>
                  </el-form-item>
                  <el-form-item label="家族史">
                      <el-input v-model="sizeForm.name" placeholder="请输入"></el-input>
                  </el-form-item>
                  <el-form-item label="体格检查">
                      <el-input v-model="sizeForm.name" placeholder="请输入"></el-input>
                  </el-form-item>
                  <el-form-item label="专科检查">
                      <el-input v-model="sizeForm.name" placeholder="请输入"></el-input>
                  </el-form-item>
                  <el-form-item label="辅助检查">
                      <el-input v-model="sizeForm.name" placeholder="请输入"></el-input>
                  </el-form-item>
                  <el-form-item label="诊断">
                      <el-input v-model="sizeForm.name" placeholder="请输入"></el-input>
                  </el-form-item>
                  <el-form-item label="本次医嘱">
                      <el-input v-model="sizeForm.name" placeholder="请输入"></el-input>
                  </el-form-item>
                  <el-form-item label="西城药">
                      <el-input v-model="sizeForm.name" placeholder="请输入"></el-input>
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
                  <ul class="medical-table_list marginTop_0 marginBottom_0" :style="{'max-height':warpDetailHeight+'px'}">
                      <li v-for="(item,index) in tableListHistory">
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
export default {
  name: 'historyMes',
  data () {
    return {
      historyVisit: true,//是否显示每全部历史信息列表
      warpDetailHeight: 500,
      buttonActive: true,//判断显示病例 还是 项目列表
      isEditDetail: false,//false 显示资料展示  true 显示资料编辑
      sizeForm: {
        name: ''
      },
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
          isRead: true,
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
          checked: true,
          photo: require('../assets/logo.png'),
          name: '刘大夫',
          hospitalName: '北医三院',
          departmentName: '骨科',
          time: '2018.01.01',
          isRead: true,
          mesType: 1,//通知列表详情  1、本地新进患者通知 2、检查结果通知 3、转诊申请通知 4、转诊结果通知
          stateDeatilVisible:false,//患者状态详情 显示隐藏
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
          checked: true,
          photo: require('../assets/logo.png'),
          name: '刘大夫',
          hospitalName: '北医三院',
          departmentName: '骨科',
          time: '2018.01.01',
          isRead: true,
          mesType: 1,//通知列表详情  1、本地新进患者通知 2、检查结果通知 3、转诊申请通知 4、转诊结果通知
          stateDeatilVisible:false,//患者状态详情 显示隐藏
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
        }
      ],
      // 患者详情病例部分
      personDetail: {
            topTitle: {//头部信息
                img: require("./../assets/logo.png"),
                personName: '刘奇', personAge: 22,
                personPhone: '188-1111-2222',
                personSex: 0,
                personNumber: '00010220',
                mesNum: 0,
                finish: 3,
                unfinish: 4
            },
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
        // 患者详情 项目部分
        tableListHistory: [
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
    console.log(this.$refs.table_row.offsetHeight,this.$refs.table_title.offsetHeight)
    this.warpHeight = document.documentElement.clientHeight - this.$refs.searchHei.offsetHeight - this.$refs.table_row.offsetHeight - this.$refs.table_title.offsetHeight -55;
  },
  methods: {
    //弹窗事件
    openAlert (val, title, index ,type) {// val 当前的状态 title 弹窗显示的信息  index list条数的序号  type 可选 重新填写 true  再次检查 false
      this.$alert(title, '', {
          confirmButtonText: '确定',
          center: true,
          customClass: 'medical-alert',
          callback: action => {
              if(action == 'confirm'){
                  console.log(val)
                  if(val == '3') {
                      this.tableListHistory[index].finishType = 1
                  } else if (val == '2') {
                      this.tableListHistory[index].finishType = 3
                  } else {
                      if (type) {
                          this.tableListHistory[index].finishType = 3
                      } else {
                          this.tableListHistory[index].finishType = 2
                      }
                  }
              }
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
    },
      handleDeatil (val) {
          if (this.buttonActive == val) {
              return;
          }
          this.buttonActive = val;
          if (val == false) {
              this.$nextTick(function () {
                  // console.log(this.$refs.titleHei.offsetHeight,this.$refs.table_title.offsetHeight)
                  this.warpDetailHeight = document.documentElement.clientHeight - this.$refs.titleHei.offsetHeight - this.$refs.table_title.offsetHeight -35 -50 -10;
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
      },
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

  }
}
</script>

<style lang="scss">
  @import '../scss/default.scss';
  @import '../scss/person.scss';
  /*@import '../scss/default.scss';*/
  .historyMes{
      height:100%;
  }
 .historyMes-number{
   padding-bottom: 40px;
   text-align: center;
   color:$medical-col_666;
   font-size:$medical-font_16;
   .el-col{
     position: relative;
     &:after{
       position: absolute;
       content: '';
       height:100%;
       width:1px;
       right: 0px;
       top:0px;
       background-color:$medical-bgCol_ddd;
     }
   }
   .historyMes-number_large{
     font-size: 87px;
     /*font-family: 'DINCond-Regular';*/
     line-height:1.2;
   }
   span{
     /*position: absolute;
     bottom:0px;
     right:20px;*/
     /*color:$medical-col_999;
     font-size:$medical-font_16;*/
   }
 }
</style>
