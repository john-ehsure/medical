<template>
    <div class="personList-page">
        <slideTab class="personList-slide" @changeTabList="changeList" @addTab="addTabPerson" :listData="tablistData"></slideTab>
        <!--新建患者页面 start-->
        <div class="personList-content"  v-if="newAddPerson">
            <div class="personList-editDetail">
                <!--信息编辑 start-->
                <!--上传图片-->
                <div class="personList-title_picture">
                    <el-upload
                        action=""
                        :on-preview="handlePictureCardPreview">
                        <span>上传图片</span>
                    </el-upload>
                </div>
                <el-form ref="newAddPersonForm" :model="newAddPersonForm" label-width="80px" size="mini">
                    <el-row :gutter="40">
                        <el-col :span="12">
                            <el-form-item label="姓名">
                                <el-input v-model="newAddPersonForm.name" placeholder="请填写"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="职业">
                                <el-input v-model="newAddPersonForm.occupation" placeholder="请填写"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="证件类型">
                                <el-input v-model="newAddPersonForm.id_type" placeholder="请填写"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="证件号码">
                                <el-input v-model="newAddPersonForm.id_no" placeholder="请填写"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="电话号码">
                                <el-input v-model="newAddPersonForm.telecom" placeholder="请填写"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="性别">
                                <el-input v-model="newAddPersonForm.gender" placeholder="请填写"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="身份证地址">
                                <el-input v-model="newAddPersonForm.id_address" placeholder="请填写"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="通讯地址">
                                <el-input v-model="newAddPersonForm.address" placeholder="请填写"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="国籍">
                                <el-input v-model="newAddPersonForm.nation" placeholder="请填写"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="13">
                            <el-form-item label="民族">
                                <el-input v-model="newAddPersonForm.ethic" placeholder="请填写"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="13">
                            <el-form-item label="婚姻状况">
                                <el-input v-model="newAddPersonForm.marriage" placeholder="请填写"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="13">
                            <el-form-item label="出生年月">
                                <el-date-picker type="date" placeholder="选择日期" :editable="false" v-model="newAddPersonForm.birth_date" style="width:100%"></el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="13">
                            <el-form-item label="教育状况">
                                <el-input v-model="newAddPersonForm.education" placeholder="请填写"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="13">
                            <el-form-item label="职业">
                                <el-input v-model="newAddPersonForm.occupation" placeholder="请填写"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="13">
                            <el-form-item label="联系人关系">
                                <el-input v-model="newAddPersonForm.contact_relationship" placeholder="请填写"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="13">
                            <el-form-item label="联系人姓名">
                                <el-input v-model="newAddPersonForm.contact_name" placeholder="请填写"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="13">
                            <el-form-item label="联系人电话">
                                <el-input v-model="newAddPersonForm.contact_telecom" placeholder="请填写"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                </el-form>
                <span class="personList-editDetail_btnGroud">
                  <el-button type="primary" @click="onSubmit">确定</el-button>
                </span>
                <!--信息编辑 end-->
            </div>
        </div>
        <!--新建患者页面 end-->
        <div class="personList-content"  v-if="!newAddPerson">
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
                    <!--<P class="col_orange fontSize_12"><i class="hui-icon-ziyuan2 fontSize_14"></i> 向上转诊</P>-->
                </div>
                <div class="personList-title_info">
                    <div class="personList-title_infoNum" @click="sexType = true">
                        <p class="fontFamily-regular" :class= "[ newAddPerson ?'col_d3':'col_orange']">{{newAddPerson?0:personDetail.topTitle.finish}}</p>
                        <el-button :type="!sexType? 'tranBlue' : 'lineBlue'" size="mini" round>男性</el-button>
                    </div>
                    <div class="personList-title_infoNum" @click="sexType = false">
                        <p class="fontFamily-regular" :class ="[newAddPerson?'col_d3':'col_cyan']">{{newAddPerson?0:personDetail.topTitle.unfinish}}</p>
                        <el-button :type="sexType? 'tranBlue' : 'lineBlue'" size="mini" round>女性</el-button>
                    </div>
                </div>
            </div>

            <div class="personList-contain_tab">
                <span :class="{'tab-active':buttonActive == 1}" @click="handleDeatil(1)">个人基本信息</span>
                <span :class="{'tab-active':buttonActive == 2}" @click="handleDeatil(2)">基本病要</span>
                <span :class="{'tab-active':buttonActive == 3}" @click="handleDeatil(3)">生殖检查</span>
                <span :class="{'tab-active':buttonActive == 4}" @click="handleDeatil(4)">常规检查</span>
            </div>
            <!--个人基本信息部分 start-->
            <div class="personList-detail" v-if="buttonActive == 1 && !isEditDetail">
                <!--信息展示 start-->
                <ul>
                    <li v-for="item in personDetail.personInfor">{{item.title}}<span>{{item.value}}</span></li>
                </ul>
                <!--信息展示 end-->
                <!--<span class="personList-detail_btnGroud"><el-button type="primary" @click="editDetail">修改</el-button></span>-->
            </div>

            <!--个人基本信息部分 end-->
            <!--基本病要部分 start-->
            <div class="personList-basicCheck" :style="{width:(contentWidth-255)+'px'}" v-if="buttonActive == 2">
                <!--<div class="personList-swiper">-->
                    <swiper :options="swiperOption">
                        <swiper-slide v-for="items in basicCheckData">
                            <div class="personList-formBox" v-for="fBox in items">
                                <p class="personList-formBox_title">{{fBox.titleName}}</p>
                                <el-form label-position="left" label-width="90px" :model="swiperForm" size="mini">
                                    <el-row :gutter="10">
                                        <el-col :span="12" v-for="box in fBox.detailList">
                                            <el-form-item :label="box.name">
                                                <p v-if="box.type == 0" class="form-tran"></p>
                                                <el-input-number v-if="box.type == 1" v-model="swiperForm.number1" :min="0" :max="10"></el-input-number>
                                                <i-switch v-if="box.type == 2" size ="large" v-model="swiperForm.anomaly1">
                                                    <span slot="open">异常</span>
                                                    <span slot="close">正常</span>
                                                </i-switch>
                                                <el-radio-group v-if="box.type == 3" v-model="swiperForm.type1">
                                                    <el-radio :label="0">阴性</el-radio>
                                                    <el-radio :label="1">阳性</el-radio>
                                                </el-radio-group>
                                                <el-select v-if="box.type == 4" v-model="swiperForm.blood1" placeholder="请选择">
                                                    <el-option
                                                        v-for="bl in bloodOptions"
                                                        :key="bl.value"
                                                        :label="bl.label"
                                                        :value="bl.value">
                                                    </el-option>
                                                </el-select>
                                                <el-input v-if="box.type == 5" v-model="swiperForm.text" placeholder="请填写"></el-input>
                                                <el-date-picker v-if="box.type == 6" :editable="false" :clearable="false" v-model="swiperForm.date" type="date" placeholder="选择日期"></el-date-picker>
                                                <span class="el-form_unit">{{box.unit}}</span>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="24">
                                            <div class="personList-formBox_btn">
                                                <el-button type="primary" size="mini" icon="el-icon-check"></el-button>
                                                <el-button size="mini" icon="el-icon-view"></el-button>
                                            </div>
                                        </el-col>
                                    </el-row>
                                </el-form>
                            </div>
                        </swiper-slide>
                        <div class="swiper-pagination" slot="pagination"></div>
                    </swiper>
               <!-- </div>-->
            </div>
            <!--基本病要部分 end-->
            <!--生殖检查部分 start-->
            <div class="personList-reproductiveCheck" :style="{width:(contentWidth-255)+'px'}" v-if="buttonActive == 3">
                <swiper :options="swiperOption">
                    <swiper-slide v-for="items in reproductiveCheckData">
                        <div class="personList-formBox" v-for="fBox in items">
                            <p class="personList-formBox_title">{{fBox.titleName}}</p>
                            <el-form label-position="left" label-width="90px" :model="swiperForm" size="mini">
                                <el-row :gutter="10">
                                    <el-col :span="12" v-for="box in fBox.detailList">
                                        <el-form-item :label="box.name">
                                            <p v-if="box.type == 0" class="form-tran"></p>
                                            <el-input-number v-if="box.type == 1" v-model="swiperForm.number1" :min="0" :max="10"></el-input-number>
                                            <i-switch v-if="box.type == 2" size ="large" v-model="swiperForm.anomaly1">
                                                <span slot="open">异常</span>
                                                <span slot="close">正常</span>
                                            </i-switch>
                                            <el-radio-group v-if="box.type == 3" v-model="swiperForm.type1">
                                                <el-radio :label="0">阴性</el-radio>
                                                <el-radio :label="1">阳性</el-radio>
                                            </el-radio-group>
                                            <el-select v-if="box.type == 4" v-model="swiperForm.blood1" placeholder="请选择">
                                                <el-option
                                                    v-for="bl in bloodOptions"
                                                    :key="bl.value"
                                                    :label="bl.label"
                                                    :value="bl.value">
                                                </el-option>
                                            </el-select>
                                            <el-input v-if="box.type == 5" v-model="swiperForm.text" placeholder="请填写"></el-input>
                                            <el-date-picker v-if="box.type == 6" :editable="false" :clearable="false" v-model="swiperForm.date" type="date" placeholder="选择日期"></el-date-picker>
                                            <span class="el-form_unit">{{box.unit}}</span>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="24">
                                        <div class="personList-formBox_btn">
                                            <el-button type="primary" size="mini" icon="el-icon-check"></el-button>
                                            <el-button size="mini" icon="el-icon-view"></el-button>
                                        </div>
                                    </el-col>
                                </el-row>
                            </el-form>
                        </div>
                    </swiper-slide>
                    <div class="swiper-pagination" slot="pagination"></div>
                </swiper>
            </div>
            <!--生殖检查部分 end-->
            <!--个人检查项目列表 start-->
            <div class="personList-items" v-if="buttonActive == 4">
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
                    <ul class="medical-table_list marginTop_0 marginBottom_0" :style="{'max-height':warpHeight+'px'}">
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
                                        <el-button  type="primary" size="mini" icon="el-icon-check" @click.native="openAlert(item.finishType,'修改成功',index)"></el-button>
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
import iSwitch from '../components/switch/index.vue'
import APIDATE from '@/api/api_data.js'
export default {
  name: 'personList',
  components: {
    iSwitch,
    slideTab
  },
  data () {
    return {
      swiperOption: { //  swiper相关配置
        pagination: {
          el: '.swiper-pagination'
        },
        paginationClickable: true,
        autoplay: 1500,
        cancelable: false,
        autoplayDisableOnInteraction: false,
        loop: false,
        autoHeight: true,
        coverflow: {
          rotate: 30,
          stretch: 10,
          depth: 60,
          modifier: 2,
          slideShadows : true
        }
      },
      //  基本病要 data数据
      basicCheckData: [ // name 指小项目的名称  unit项目的单位 type项目类型 1num计数器 2 开关 3单选按钮 4下拉框
        [
            {
                titleName: '血常规',
                detailList: [
                    {name: '血红蛋白', unit: '', type: 1, value: ''},
                    {name: '红细胞计数', unit: 'X10^12/L', type: 1, value: ''},
                    {name: '白细胞计数', unit: 'X10^12/L', type: 1, value: ''},
                    {name: '红细胞体积', unit: '%', type: 1, value: ''},
                    {name: '血小板', unit: 'X10^9/L', type: 1, value: ''},
                    {name: '血沉', unit: 'mm/H', type: 1, value: ''},
                    {name: '尿常规', unit: '', type: 2, value: ''},
                    {name: '血型', unit: '', type: 4, value: ''},
                    {name: 'Rh因子', unit: '', type: 3, value: ''}
                ]
            },
            {
                titleName: '血常规',
                detailList: [
                    {name: '血红蛋白', unit: '', type: 1, value: ''},
                    {name: '红细胞计数', unit: 'X10^12/L', type: 1, value: ''},
                    {name: '白细胞计数', unit: 'X10^12/L', type: 1, value: ''},
                    {name: '红细胞体积', unit: '%', type: 1, value: ''},
                    {name: '血小板', unit: 'X10^9/L', type: 1, value: ''},
                    {name: '血沉', unit: 'mm/H', type: 1, value: ''},
                    {name: '尿常规', unit: '', type: 2, value: ''},
                    {name: '血型', unit: '', type: 4, value: ''},
                    {name: 'Rh因子', unit: '', type: 3, value: ''}
                ]
            }
        ],
        [
            {
                titleName: '血常规',
                detailList: [
                    {name: '血红蛋白', unit: '', type: 1, value: ''},
                    {name: '红细胞计数', unit: 'X10^12/L', type: 1, value: ''},
                    {name: '白细胞计数', unit: 'X10^12/L', type: 1, value: ''},
                    {name: '红细胞体积', unit: '%', type: 1, value: ''},
                    {name: '血小板', unit: 'X10^9/L', type: 1, value: ''},
                    {name: '血沉', unit: 'mm/H', type: 1, value: ''},
                    {name: '尿常规', unit: '', type: 2, value: ''},
                    {name: '血型', unit: '', type: 4, value: ''},
                    {name: 'Rh因子', unit: '', type: 3, value: ''}
                ]
            },
            {
                titleName: '血常规',
                detailList: [
                    {name: '血红蛋白', unit: '', type: 1, value: ''},
                    {name: '红细胞计数', unit: 'X10^12/L', type: 1, value: ''},
                    {name: '白细胞计数', unit: 'X10^12/L', type: 1, value: ''},
                    {name: '红细胞体积', unit: '%', type: 1, value: ''},
                    {name: '血小板', unit: 'X10^9/L', type: 1, value: ''},
                    {name: '血沉', unit: 'mm/H', type: 1, value: ''},
                    {name: '尿常规', unit: '', type: 2, value: ''},
                    {name: '血型', unit: '', type: 4, value: ''},
                    {name: 'Rh因子', unit: '', type: 3, value: ''}
                ]
            }
        ]
      ],
      // 男性生殖检查  data   // name 指小项目的名称  unit项目的单位 type项目类型 1num计数器 2 开关 3单选按钮 4下拉框 5 输入框 6 日期
      reproductiveCheckData: [
            [
                {
                    titleName: '精液常规分析',
                    detailList: [
                        {name: '检查日期', unit: '', type: 6, value: ''},
                        {name: '待确定', unit: 'X10^12/L', type: 1, value: ''},
                        {name: '液化时间', unit: '', type: 6, value: ''},
                        {name: '待确定', unit: '%', type: 5, value: ''},
                        {name: '量', unit: 'X10^9/L', type: 1, value: ''},
                        {name: '待确定', unit: 'mm/H', type: 4, value: ''},
                        {name: 'PH', unit: '', type: 2, value: ''},
                        {name: '待确定', unit: '/HP', type: 5, value: ''},
                        {name: '精子总数', unit: 'X10^6', type: 5, value: ''},
                        {name: '活动率', unit: '%', type: 5, value: ''},
                        {name: '正常形态率', unit: '%', type: 5, value: ''},
                        {name: 'PR', unit: '%', type: 5, value: ''},
                        {name: 'NR', unit: '%', type: 5, value: ''},
                        {name: 'IM', unit: '%', type: 5, value: ''},
                        {name: '取精难易度', unit: '%', type: 5, value: ''},
                        {name: '建议提前冻精', unit: '', type: 3, value: ''},
                        {name: '凝集', unit: '', type: 3, value: ''},
                        {name: '精浆', unit: '', type: 3, value: ''},
                        {name: '血清', unit: '', type: 3, value: ''},
                        {name: '精子DNA碎片率', unit: '%', type: 5, value: ''},
                        {name: '精浆锌', unit: '/umol', type: 5, value: ''},
                        {name: '果糖', unit: '/umol', type: 5, value: ''},
                        {name: '中性糖苷酶', unit: '/mU', type: 5, value: ''},
                        {name: '精子DNA碎片率', unit: '/uIU', type: 5, value: ''},
                    ]
                },

            ],
          [
              {
                  titleName: '第二特征',
                  detailList: [
                      {name: '胡须', unit: '', type: 2, value: ''},
                      {name: '阴毛', unit: '', type: 2, value: ''},
                      {name: '喉结', unit: '', type: 2, value: ''},
                      {name: '乳房', unit: '', type: 2, value: ''}
                  ]
              },
              {
                  titleName: '生殖系统检查',
                  detailList: [
                      {name: '阴茎长度', unit: '', type: 1, value: ''},
                      {name: '', unit: '', type: 0, value: ''},
                      {name: '左睾丸体积', unit: '', type: 1, value: ''},
                      {name: '质地', unit: '', type: 1, value: ''},
                      {name: '右睾丸体积', unit: '', type: 1, value: ''},
                      {name: '质地', unit: '', type: 1, value: ''},
                      {name: '左附睾', unit: '', type: 1, value: ''},
                      {name: '左输精管', unit: '', type: 1, value: ''},
                      {name: '右附睾', unit: '', type: 1, value: ''},
                      {name: '右输精管', unit: '', type: 1, value: ''},
                      {name: '左精索静脉', unit: '', type: 1, value: ''},
                      {name: '前列腺', unit: '', type: 1, value: ''},
                      {name: '右精索静脉', unit: '', type: 1, value: ''},
                  ]
              }
          ]
      ],
      //  血型下拉框
      bloodOptions: [
        {value: 0, label: 'A型'},
        {value: 1, label: 'B型'},
        {value: 2, label: 'AB型'},
        {value: 3, label: 'O型'}
      ],
      //  血常规 form
      swiperForm: {
        number1: 0,
        anomaly1: false,
        type1: 1, // 0阴性 1阳性
        blood1: 0, //  0 A型  1 B型 2 AB型 3 O型
        text: '',
        date: ''
      },
      sexType: true, //   男性 女性进行切换  true为男性  false 为女性
      newAddPerson: false, //   是否为新增患者
      warpHeight: 500,
      buttonActive: 1, //    判断显示信息  1 个人基本信息 2基本病要 3 生殖检查  4 常规检查
      isEditDetail: false, //   false 显示资料展示  true 显示资料编辑
      newForm: {
        name: '',
        birthday: '',
        sex: '',
        number: '',
        phone: ''
      },
      newAddPersonForm: {
        name: '',
          education: '',
          id_type: '',
          id_no: '',
          telecom: '',
          gender: '',
          spouse: '',
          birth_date: '',
          id_address: '',
          address: '',
          nation: '',
          ethic: '',
          marriage: '',
          eduction: '',
          occupation: '',
          photo: '',
          contact_relationship: '',
          contact_name: '',
          contact_telecom: ''
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
        topTitle: {}, //    头部信息
        personInfor: [ //    个人病情资料
          {title: '身份证', value: '无特殊'},
          {title: '职业', value: '学生'},
          {title: '学历', value: '本科'},
          {title: '婚姻状况', value: '未婚'},
          {title: '国籍', value: '中国'},
          {title: '身份证', value: '211222199011112233'},
          {title: '电话', value: '19922221111'},
          {title: '通讯地址', value: '北京市西直门'}
        ]
      },
      tableList: [
        {
          checked: false,
          name: '血常规',
          time: '2018.01.01',
          specimenType: '静脉血清',
          itemsDetailVisible: false, // 项目相关信息详情 显示隐藏
          finishType: 1, // 完成状态  1、已完成  2、未完成  3、待填写
          stateDeatilVisible: false, // 完成状态详细 显示隐藏
          itemsDetail: [ // 项目相关信息详情
            {title: '序列号', value: '0987654321', isBotton: false},
            {title: '检查名称', value: '血常规', isBotton: false},
            {title: '开具时间', value: '2018.09.09', isBotton: false},
            {title: '检测时间', value: '2018.09.09', isBotton: false},
            {title: '开具医生', value: '王主任', isBotton: false}
          ],
          finishDetail: [ // 已完成的项目列表详情
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
          itemsDetailVisible: false, //   项目相关信息详情 显示隐藏
          finishType: 2, //  完成状态  1、已完成  2、未完成  3、待填写
          stateDeatilVisible: false, // 完成状态详细 显示隐藏
          itemsDetail: [ //  项目相关信息详情
            {title: '序列号', value: '0987654321', isBotton: false},
            {title: '检查名称', value: '血常规', isBotton: false},
            {title: '开具时间', value: '2018.09.09', isBotton: false},
            {title: '检测时间', value: '2018.09.09', isBotton: false},
            {title: '开具医生', value: '王主任', isBotton: false}
          ],
          finishDetail: [ //    已完成的项目列表详情
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
  props: {
    contentWidth: {//  swiper容器的宽带
      type: Number,
      default: 500
    }
  },
  created () {
    this.personDetail.topTitle = this.tablistData[0]
    this.patientsList() //  获取患者列表
  },
  mounted () {
  },
  methods: {
    //  添加新患者
    addTabPerson () {
      this.newAddPerson = true
    },
    //  获取患者列表
    patientsList () {
      APIDATE.patients().then((res) => {
            console.log(res)

      })
    },
    //  上传头像
    handlePictureCardPreview (file) {
      this.imageUrl = file.url
    },
    //  table表格填写编辑时  新增操作
    addTrList (item, tr, index) { //  item 项目的总详情  tr 当前操作的tr详情  index 当前操作的tr索引
      let newTr = {name: '', result: '', scope: '', unit: '', type: 'add'}
      item.finishDetail.splice(index + 1, 0, newTr)
    },
    //  table表格填写编辑时  删除操作
    removeTrList (item, tr, index) { // item 项目的总详情  tr 当前操作的tr详情  index 当前操作的tr索引
      if (item.finishDetail.length <= 1) {
        this.$alert('检查项不能少于1条', '', {
          confirmButtonText: '确定',
          center: true,
          customClass: 'medical-alert'
        })
        return false
      }
      item.finishDetail.splice(index, 1)
    },
    //  弹窗事件
    openAlert (val, title, index, type) { // val 当前的状态 title 弹窗显示的信息  index list条数的序号  type 可选 重新填写 true  再次检查 false
      // this.$alert(title, '', {
      //   confirmButtonText: '确定',
      //   center: true,
      //   customClass: 'medical-alert',
      //   callback: action => {
      //     if (action == 'confirm') {
      //       if (val == '3') {
      //         this.tableList[index].finishType = 1
      //       } else if (val == '2') {
      //         this.tableList[index].finishType = 3
      //       } else {
      //         if (type) {
      //           this.tableList[index].finishType = 3
      //         } else {
      //           this.tableList[index].finishType = 2
      //         }
      //       }
      //     }
      //   }
      // })
      let self = this
      if (val == '3') {
        //  调用接口 提交信息
        let loadingInstance = this.$loading({
          text: title,
          background: 'rgba(255,255,255,0.1)',
          customClass: 'newHint'
        })
        setTimeout(function () {
          loadingInstance.close()
          self.tableList[index].finishType = 1
        }, 2000);
      } else if (val == '2') {
        this.tableList[index].finishType = 3
      } else {
        if (type) {
          this.tableList[index].finishType = 3
        } else {
          this.tableList[index].finishType = 2
        }
      }
        // this.$loading({
        //     text:title,
        //     background: 'rgba(255,255,255,0.1)',
        //     customClass: 'newHint'
        // })
    },
    //  列表选择事件
    changeList (item) {
      console.log(item, '++++++')
      this.newAddPerson = false
      this.personDetail.topTitle = item;
    },
    //  选项卡切换  个人基本信息 基本病要  生殖检查  常规检查
    handleDeatil (val) {
      if (this.buttonActive == val) {
        return
      }
      this.buttonActive = val
      if (val == 4) {
        this.$nextTick(function () {
          this.warpHeight = document.documentElement.clientHeight - this.$refs.titleHei.offsetHeight - this.$refs.table_title.offsetHeight -35 -50 - 10;
        })
      }
      console.log(this.buttonActive)
    },
    editDetail () {
      this.isEditDetail = true
    },
    //  表单提交
    onSubmit () {
      console.log('submit!')
        APIDATE.createPatients(this.newAddPersonForm).then((res) => {
            console.log(res)
            this.newAddPerson = false
        })

    },

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  @import '../scss/default.scss';
  @import '../scss/person.scss';
  .personList-page {
      height: 100%;
      display: flex;
      .swiper-container-horizontal > .swiper-pagination-bullets{
          bottom: 0px;
          .swiper-pagination-bullet{
              background-color:$medical-bgCol_tran;
              border:1px solid $medical-borCol_blue;
              opacity: 0.8;
          }
          .swiper-pagination-bullet-active{
              background:$medical-bgCol_blue;
          }
      }
      .personList-formBox{
          &+.personList-formBox{
              border-top:1px dashed $medical-borCol_ce;
          }
          .personList-formBox_title{
              color:$medical-col_blue;
              font-size:$medical-font_16;
              padding:10px 0px;
          }
          .el-form-item__label{
              color:$medical-col_999;
          }
          .el-form_unit{
              font-size: $medical-font_12;
              color:$medical-col_999;
          }
          .personList-formBox_btn{
              padding:0px 0px 10px;
              text-align: center;
              .el-button--mini{
                  padding:3px 20px !important;
              }
              .el-button+.el-button{
                  margin-left:40px;
              }
          }
          .el-form-item__content .form-tran{
              min-height:29px;
          }
          /*计数器 样式修改*/
          .el-input-number--mini{
              width:110px;
              .el-input-number__increase{
                  right: auto;
                  left: 1px;
                  color: $medical-col_cyan;
                  border-radius: 4px 0 0 4px;
                  border-left-width:0px;
                  border-right: 1px solid $medical-borCol_blue;
              }
              .el-input-number__decrease{
                  right: 1px;
                  left:auto;
                  color: $medical-col_cyan;
                  border-radius: 0 4px 4px 0;
                  border-right-width:0px;
                  border-left: 1px solid $medical-borCol_blue;
              }
              .el-input__inner{
                  border-color:$medical-borCol_blue;
              }
          }
          /*下拉框 样式修改*/
          .el-select--mini{
              width:110px;
          }
          /*单选框 样式修改*/
          .el-radio-group{
              .el-radio__label{
                  padding-left:5px;
              }
              .el-radio+.el-radio{
                  margin-left:15px;
              }
              .el-radio__input.is-checked .el-radio__inner{
                  border-color: $medical-borCol_cyan;
                  background:$medical-bgCol_cyan;
              }
              .el-radio__input.is-checked+.el-radio__label{
                  color:$medical-col_999;
              }
          }
          /*开关 样式修改*/
          .el-switch.is-checked .el-switch__core{
              border-color: $medical-borCol_orange;
              background-color: $medical-bgCol_orange;
          }
          /*输入框*/
          .el-input--mini{
              width:110px;
          }
          .el-input--mini.el-date-editor{
              .el-input__inner{
                  padding-right:5px;
              }
          }
      }
  }
</style>
