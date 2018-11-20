<template>
    <div class="personList-page">
        <slideTab class="personList-slide" @addTab="addTabPerson" :isfirst="firstEnter" :listData="tablistData">
            <li slot="slideLi" @click="changeList(item,index)" v-for="(item,index) in tablistData" :class="{'active': index == tabNum}">
                <div class="slideTab-list_img">
                    <!--<span class="slideTab-list_mesNum" v-if="item.mesNum">{{item.mesNum}}</span>-->
                    <img :src="item.img"/>
                </div>
                <div class="slideTab-list_content">
                    <p>{{item.name}} {{item.gender==='M' ? '男' : '女'}}</p>
                    <p>编号 {{item.id}}</p>
                </div>
            </li>
        </slideTab>
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
                <el-form ref="newAddPersonForm" :rules="newAddPersonFormRules" class="personList-formBox" :model="newAddPersonForm" label-width="95px" size="mini">
                    <el-row :gutter="40">
                        <el-col :span="12">
                            <el-form-item label="姓名" prop="name">
                                <el-input v-model="newAddPersonForm.name" placeholder="请填写"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="性别">
                                <el-radio-group v-model="newAddPersonForm.gender">
                                    <el-radio label="M">男</el-radio>
                                    <el-radio label="F">女</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="职业">
                                <el-input v-model="newAddPersonForm.occupation" placeholder="请填写"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="电话号码">
                                <el-input v-model="newAddPersonForm.telecom" type="number" placeholder="请填写"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="国籍">
                                <el-input v-model="newAddPersonForm.nation" placeholder="请填写"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="民族">
                                <el-input v-model="newAddPersonForm.ethic" placeholder="请填写"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="学历">
                                <el-input v-model="newAddPersonForm.education" placeholder="请填写"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="婚姻状况">
                                <el-input v-model="newAddPersonForm.marriage" placeholder="请填写"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="12">
                            <el-form-item label="证件类型">
                                <el-select v-model="newAddPersonForm.id_type" placeholder="请选择">
                                    <el-option
                                        v-for="item in patientsIdType"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="13">
                            <el-form-item label="证件号码">
                                <el-input v-model="newAddPersonForm.id_no" placeholder="请填写"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="13">
                            <el-form-item label="身份证地址">
                                <el-input v-model="newAddPersonForm.id_address" placeholder="请填写"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="13">
                            <el-form-item label="通讯地址">
                                <el-input v-model="newAddPersonForm.address" placeholder="请填写"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="13">
                            <el-form-item label="出生年月">
                                <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="选择日期" :editable="false" v-model="newAddPersonForm.birth_date" style="width:100%"></el-date-picker>
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
                                <el-input v-model="newAddPersonForm.contact_telecom" type="number" placeholder="请填写"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <span class="personList-editDetail_btnGroud">
                  <el-button type="primary" @click="onSubmit('newAddPersonForm')">确定</el-button>
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
                    <p><span class="col_blue fontSize_26 fontFamily-BigHYQiHei">{{personDetail.topTitle.name}}</span> <i class="marginLeft_15" :class="personDetail.topTitle.gender != 'M'?'hui-icon-ziyuan18 col_orange':'hui-icon-ziyuan19 col_green'"></i></p>
                    <P class="fontSize_12">
                        <i class="hui-icon-ziyuan33 fontSize_14 col_blue"></i>
                        <span>{{personDetail.topTitle.contact_name ? personDetail.topTitle.contact_name : '暂无信息'}}</span>
                    </P>
                    <P class="fontSize_12"><i class="hui-icon-ziyuan49 fontSize_14 col_blue"></i> {{personDetail.topTitle.telecom ? personDetail.topTitle.telecom : '暂无信息'}}</P>
                    <P class="fontSize_12"><i class="hui-icon-ziyuan61 fontSize_14 col_blue"></i> {{personDetail.topTitle.id_no ? personDetail.topTitle.id_no : '暂无信息'}}</P>
                    <!--<P class="col_orange fontSize_12"><i class="hui-icon-ziyuan2 fontSize_14"></i> 向上转诊</P>-->
                </div>
                <div class="personList-title_info" v-if="isDouble">
                    <div class="personList-title_infoNum" @click="changeSexType('M')">
                        <p>
                            <i class="hui-icon-ziyuan65 col_cyan"></i>
                        </p>
                        <el-button :type="sexType != 'M'? 'tranBlue' : 'lineBlue'" size="mini" round>男性</el-button>
                    </div>
                    <div class="personList-title_infoNum" @click="changeSexType('F')">
                        <p>
                            <i class="hui-icon-ziyuan67 col_orange"></i>
                        </p>
                        <el-button :type="sexType == 'M'? 'tranBlue' : 'lineBlue'" size="mini" round>女性</el-button>
                    </div>
                </div>
                <div class="personList-title_info" v-else>
                    <div class="personList-title_infoNum" v-if="sexType == 'M'">
                        <p>
                            <i class="hui-icon-ziyuan65 col_cyan"></i>
                        </p>
                        <el-button :type="sexType != 'M'? 'tranBlue' : 'lineBlue'" size="mini" round>男性</el-button>
                    </div>
                    <div class="personList-title_infoNum" v-else>
                        <p>
                            <i class="hui-icon-ziyuan67 col_orange"></i>
                        </p>
                        <el-button :type="sexType == 'M'? 'tranBlue' : 'lineBlue'" size="mini" round>女性</el-button>
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
                    <li v-for="item in personDetail.personInfor">{{item.title}}<span>{{item.value ? item.value : '暂无信息'}}</span></li>
                </ul>
                <!--信息展示 end-->
                <!--<span class="personList-detail_btnGroud"><el-button type="primary" @click="editDetail">修改</el-button></span>-->
            </div>

            <!--个人基本信息部分 end-->
            <!--男性基本病要部分 start-->
            <div class="personList-basicCheck" :style="{width:(contentWidth-255)+'px'}" v-if="buttonActive == 2 && sexType=='M'">
                <!--<div class="personList-swiper">-->
                    <swiper :options="swiperOption">
                        <swiper-slide v-for="(items,itemNum) in menbasicCheckData">
                            <div class="personList-formBox" v-for="(fBox, fBoxNum) in items">
                                <p class="personList-formBox_title">{{fBox.titleName}}</p>
                                <el-form label-position="left" :ref="fBox.formName" size="mini">
                                    <el-row :gutter="10">
                                        <el-col :span="box.type == 7 ? 24 : 12" v-for="box in fBox.detailList">
                                            <el-form-item :label="box.type == 7 ? '' : box.name" :label-width="box.type == 7 ? '0px':fBox.labelWidth">
                                                <p v-if="box.type == 0" class="form-tran"></p>
                                                <el-input-number v-if="box.type == 1" v-model="box.value" :min="0" :max="100"></el-input-number>
                                                <i-switch v-if="box.type == 2" v-model="box.value">
                                                    <span slot="open">有</span>
                                                    <span slot="close">无</span>
                                                </i-switch>
                                                <el-radio-group v-if="box.type == 3" v-model="box.value">
                                                    <el-radio :label="rad.value" v-for="rad in yinOrYangOptions">{{rad.label}}</el-radio>
                                                </el-radio-group>
                                                <!--周期结果 下拉框-->
                                                <el-select v-if="box.type == 4 && box.selectNum==0" v-model="box.value" placeholder="请选择">
                                                    <el-option
                                                        v-for="bl in cycleResultsOptions"
                                                        :key="bl.value"
                                                        :label="bl.label"
                                                        :value="bl.value">
                                                    </el-option>
                                                </el-select>
                                                <!--妊娠结果 下拉框-->
                                                <el-select v-if="box.type == 4 && box.selectNum==1" v-model="box.value" placeholder="请选择">
                                                    <el-option
                                                        v-for="bl in gravidityResultsOptions"
                                                        :key="bl.value"
                                                        :label="bl.label"
                                                        :value="bl.value">
                                                    </el-option>
                                                </el-select>
                                                <!--血型 下拉框-->
                                                <el-select v-if="box.type == 4 && box.selectNum==2" v-model="box.value" placeholder="请选择">
                                                    <el-option
                                                        v-for="bl in bloodOptions"
                                                        :key="bl.value"
                                                        :label="bl.label"
                                                        :value="bl.value">
                                                    </el-option>
                                                </el-select>
                                                <!--男性精子粘稠度 下拉框-->
                                                <el-select v-if="box.type == 4 && box.selectNum==3" v-model="box.value" placeholder="请选择">
                                                    <el-option
                                                        v-for="bl in spermOptions"
                                                        :key="bl.value"
                                                        :label="bl.label"
                                                        :value="bl.value">
                                                    </el-option>
                                                </el-select>
                                                <el-input v-if="box.type == 5" v-model="box.value" placeholder="请填写"></el-input>
                                                <el-date-picker v-if="box.type == 6" :editable="false" :clearable="false" v-model="box.value" type="date" placeholder="选择日期"></el-date-picker>
                                                <el-input v-if="box.type == 7" type="textarea" v-model="box.value"></el-input>
                                                <span class="el-form_unit">{{box.unit}}</span>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="24">
                                            <div class="personList-formBox_btn">
                                                <el-button type="primary" size="mini" icon="el-icon-check" @click="submitBasicCheck('menbasicCheckData', fBox, itemNum, fBoxNum)"></el-button>
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
            <!--男性生殖检查部分 start-->
            <div class="personList-reproductiveCheck" :style="{width:(contentWidth-255)+'px'}" v-if="buttonActive == 3 && sexType=='M'">
                <swiper :options="swiperOption">
                    <swiper-slide v-for="(items,itemNum) in menReproductiveCheckData">
                        <div class="personList-formBox" v-for="(fBox,fBoxNum) in items">
                            <p class="personList-formBox_title">{{fBox.titleName}}</p>
                            <el-form label-position="left" :model="swiperForm" size="mini">
                                <el-row :gutter="10">
                                    <el-col :span="box.type == 7 ? 24 : 12" v-for="box in fBox.detailList">
                                        <el-form-item :label="box.type == 7 ?'':box.name"  :label-width="box.type == 7 ? '0px':fBox.labelWidth">
                                            <p v-if="box.type == 0" class="form-tran"></p>
                                            <el-input-number v-if="box.type == 1" v-model="box.value" :min="0" :max="100"></el-input-number>
                                            <i-switch v-if="box.type == 2 && box.switchNum == 1" size ="large" v-model="box.value">
                                                <span slot="open">异常</span>
                                                <span slot="close">正常</span>
                                            </i-switch>
                                            <i-switch v-if="box.type == 2 && box.switchNum == 0" v-model="box.value">
                                                <span slot="open">是</span>
                                                <span slot="close">否</span>
                                            </i-switch>
                                            <i-switch v-if="box.type == 2 && box.switchNum == 2" size ="large" v-model="box.value">
                                                <span slot="open">阳性</span>
                                                <span slot="close">阴性</span>
                                            </i-switch>
                                            <el-radio-group v-if="box.type == 3" v-model="box.value">
                                                <el-radio :label="rad.value" v-for="rad in yinOrYangOptions">{{rad.label}}</el-radio>
                                            </el-radio-group>
                                            <!--周期结果 下拉框-->
                                            <el-select v-if="box.type == 4 && box.selectNum==0" v-model="box.value" placeholder="请选择">
                                                <el-option
                                                    v-for="bl in cycleResultsOptions"
                                                    :key="bl.value"
                                                    :label="bl.label"
                                                    :value="bl.value">
                                                </el-option>
                                            </el-select>
                                            <!--妊娠结果 下拉框-->
                                            <el-select v-if="box.type == 4 && box.selectNum==1" v-model="box.value" placeholder="请选择">
                                                <el-option
                                                    v-for="bl in gravidityResultsOptions"
                                                    :key="bl.value"
                                                    :label="bl.label"
                                                    :value="bl.value">
                                                </el-option>
                                            </el-select>
                                            <!--血型 下拉框-->
                                            <el-select v-if="box.type == 4 && box.selectNum==2" v-model="box.value" placeholder="请选择">
                                                <el-option
                                                    v-for="bl in bloodOptions"
                                                    :key="bl.value"
                                                    :label="bl.label"
                                                    :value="bl.value">
                                                </el-option>
                                            </el-select>
                                            <!--男性精子粘稠度 下拉框-->
                                            <el-select v-if="box.type == 4 && box.selectNum==3" v-model="box.value" placeholder="请选择">
                                                <el-option
                                                    v-for="bl in spermOptions"
                                                    :key="bl.value"
                                                    :label="bl.label"
                                                    :value="bl.value">
                                                </el-option>
                                            </el-select>
                                            <el-input v-if="box.type == 5" v-model="box.value" placeholder="请填写"></el-input>
                                            <el-date-picker v-if="box.type == 6" :editable="false" :clearable="false" v-model="box.value" type="date" placeholder="选择日期"></el-date-picker>
                                            <el-input v-if="box.type == 7" type="textarea" v-model="box.value"></el-input>
                                            <span class="el-form_unit">{{box.unit}}</span>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="24">
                                        <div class="personList-formBox_btn">
                                            <el-button type="primary" size="mini" icon="el-icon-check" @click="submitBasicCheck('menReproductiveCheckData', fBox, itemNum, fBoxNum)"></el-button>
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
            <!--女性性基本病要部分 start-->
            <div class="personList-basicCheck" :style="{width:(contentWidth-255)+'px'}" v-if="buttonActive == 2 && sexType=='F'">
                <!--<div class="personList-swiper">-->
                <swiper :options="swiperOption">
                    <swiper-slide v-for="(items,itemNum) in womenbasicCheckData">
                        <div class="personList-formBox" v-for="(fBox, fBoxNum) in items">
                            <p class="personList-formBox_title">{{fBox.titleName}}</p>
                            <el-form label-position="left" :ref="fBox.formName" size="mini">
                                <el-row :gutter="10">
                                    <el-col :span="box.type == 7 ? 24 : 12" v-for="box in fBox.detailList">
                                        <el-form-item :label="box.type == 7 ? '' : box.name" :label-width="box.type == 7 ? '0px':fBox.labelWidth">
                                            <p v-if="box.type == 0" class="form-tran"></p>
                                            <el-input-number v-if="box.type == 1" v-model="box.value" :min="0" :max="100"></el-input-number>
                                            <i-switch v-if="box.type == 2" v-model="box.value">
                                                <span slot="open">有</span>
                                                <span slot="close">无</span>
                                            </i-switch>
                                            <el-radio-group v-if="box.type == 3" v-model="box.value">
                                                <el-radio :label="rad.value" v-for="rad in yinOrYangOptions">{{rad.label}}</el-radio>
                                            </el-radio-group>
                                            <!--周期结果 下拉框-->
                                            <el-select v-if="box.type == 4 && box.selectNum==0" v-model="box.value" placeholder="请选择">
                                                <el-option
                                                    v-for="bl in cycleResultsOptions"
                                                    :key="bl.value"
                                                    :label="bl.label"
                                                    :value="bl.value">
                                                </el-option>
                                            </el-select>
                                            <!--妊娠结果 下拉框-->
                                            <el-select v-if="box.type == 4 && box.selectNum==1" v-model="box.value" placeholder="请选择">
                                                <el-option
                                                    v-for="bl in gravidityResultsOptions"
                                                    :key="bl.value"
                                                    :label="bl.label"
                                                    :value="bl.value">
                                                </el-option>
                                            </el-select>
                                            <!--血型 下拉框-->
                                            <el-select v-if="box.type == 4 && box.selectNum==2" v-model="box.value" placeholder="请选择">
                                                <el-option
                                                    v-for="bl in bloodOptions"
                                                    :key="bl.value"
                                                    :label="bl.label"
                                                    :value="bl.value">
                                                </el-option>
                                            </el-select>
                                            <!--男性精子粘稠度 下拉框-->
                                            <el-select v-if="box.type == 4 && box.selectNum==3" v-model="box.value" placeholder="请选择">
                                                <el-option
                                                    v-for="bl in spermOptions"
                                                    :key="bl.value"
                                                    :label="bl.label"
                                                    :value="bl.value">
                                                </el-option>
                                            </el-select>
                                            <el-input v-if="box.type == 5" v-model="box.value" placeholder="请填写"></el-input>
                                            <el-date-picker v-if="box.type == 6" :editable="false" :clearable="false" v-model="box.value" type="date" placeholder="选择日期"></el-date-picker>
                                            <el-input v-if="box.type == 7" type="textarea" v-model="box.value"></el-input>
                                            <span class="el-form_unit">{{box.unit}}</span>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="24">
                                        <div class="personList-formBox_btn">
                                            <el-button type="primary" size="mini" icon="el-icon-check" @click="submitBasicCheck('womenbasicCheckData', fBox, itemNum, fBoxNum)"></el-button>
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
            <!--女性性生殖检查部分 start-->
            <div class="personList-reproductiveCheck" :style="{width:(contentWidth-255)+'px'}" v-if="buttonActive == 3 && sexType=='F'">
                <swiper :options="swiperOption">
                    <swiper-slide v-for="(items,itemNum) in womenReproductiveCheckData">
                        <div class="personList-formBox" v-for="(fBox,fBoxNum) in items">
                            <p class="personList-formBox_title">{{fBox.titleName}}</p>
                            <el-form label-position="left" :model="swiperForm" size="mini">
                                <el-row :gutter="10">
                                    <el-col :span="box.type == 7 ? 24 : 12" v-for="box in fBox.detailList">
                                        <el-form-item :label="box.type == 7 ?'':box.name"  :label-width="box.type == 7 ? '0px':fBox.labelWidth">
                                            <p v-if="box.type == 0" class="form-tran"></p>
                                            <el-input-number v-if="box.type == 1" v-model="box.value" :min="0" :max="100"></el-input-number>
                                            <i-switch v-if="box.type == 2 && box.switchNum == 1" size ="large" v-model="box.value">
                                                <span slot="open">异常</span>
                                                <span slot="close">正常</span>
                                            </i-switch>
                                            <i-switch v-if="box.type == 2 && box.switchNum == 0" v-model="box.value">
                                                <span slot="open">是</span>
                                                <span slot="close">否</span>
                                            </i-switch>
                                            <i-switch v-if="box.type == 2 && box.switchNum == 2" size ="large" v-model="box.value">
                                                <span slot="open">阳性</span>
                                                <span slot="close">阴性</span>
                                            </i-switch>
                                            <el-radio-group v-if="box.type == 3" v-model="box.value">
                                                <el-radio :label="rad.value" v-for="rad in yinOrYangOptions">{{rad.label}}</el-radio>
                                            </el-radio-group>
                                            <!--周期结果 下拉框-->
                                            <el-select v-if="box.type == 4 && box.selectNum==0" v-model="box.value" placeholder="请选择">
                                                <el-option
                                                    v-for="bl in cycleResultsOptions"
                                                    :key="bl.value"
                                                    :label="bl.label"
                                                    :value="bl.value">
                                                </el-option>
                                            </el-select>
                                            <!--妊娠结果 下拉框-->
                                            <el-select v-if="box.type == 4 && box.selectNum==1" v-model="box.value" placeholder="请选择">
                                                <el-option
                                                    v-for="bl in gravidityResultsOptions"
                                                    :key="bl.value"
                                                    :label="bl.label"
                                                    :value="bl.value">
                                                </el-option>
                                            </el-select>
                                            <!--血型 下拉框-->
                                            <el-select v-if="box.type == 4 && box.selectNum==2" v-model="box.value" placeholder="请选择">
                                                <el-option
                                                    v-for="bl in bloodOptions"
                                                    :key="bl.value"
                                                    :label="bl.label"
                                                    :value="bl.value">
                                                </el-option>
                                            </el-select>
                                            <!--男性精子粘稠度 下拉框-->
                                            <el-select v-if="box.type == 4 && box.selectNum==3" v-model="box.value" placeholder="请选择">
                                                <el-option
                                                    v-for="bl in spermOptions"
                                                    :key="bl.value"
                                                    :label="bl.label"
                                                    :value="bl.value">
                                                </el-option>
                                            </el-select>
                                            <el-input v-if="box.type == 5" v-model="box.value" placeholder="请填写"></el-input>
                                            <el-date-picker v-if="box.type == 6" :editable="false" :clearable="false" v-model="box.value" type="date" placeholder="选择日期"></el-date-picker>
                                            <el-input v-if="box.type == 7" type="textarea" v-model="box.value"></el-input>
                                            <span class="el-form_unit">{{box.unit}}</span>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="24">
                                        <div class="personList-formBox_btn">
                                            <el-button type="primary" size="mini" icon="el-icon-check" @click="submitBasicCheck('womenReproductiveCheckData', fBox, itemNum, fBoxNum)"></el-button>
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
      //  是否为首次进入当亲患者列表页
      firstEnter: true,
      //  病例主键
      caseId: null,
      //  患者主键
      patientId: null,
      //  男性基本病要 data数据
      menbasicCheckData: [ // name 指小项目的名称  unit项目的单位 type项目类型 1num计数器 2 开关 3单选按钮 4下拉框  5 输入框 6 日期 7 textarea多行文本
        [
            {
                titleName: '诊疗计划',
                serial_no: '001',
                labelWidth: '90px',
                formName: 'formName01',
                createdId: null, // 通过id判断是否为第一次创建
                detailList: [
                    {name: '方案', unit: '', type: 7, value: ''}
                ]
            },
            {
                titleName: '诊断',
                serial_no: '002',
                labelWidth: '90px',
                formName: 'formName02',
                createdId: null, // 通过id判断是否为第一次创建
                detailList: [
                    {name: '方案', unit: '', type: 7, value: ''}
                ]
            },
            {
                titleName: '最终结果',
                serial_no: '003',
                labelWidth: '90px',
                formName: 'formName03',
                createdId: null, // 通过id判断是否为第一次创建
                detailList: [
                    {name: '周期结果', unit: '', type: 4, selectNum: 0, value: ''},//selectNum 是在type为4 下拉框的时候  进行selectNum判断  0 为周期结果  1为妊娠结果 2为血型 3为男性精子粘稠度
                    {name: '妊娠结果', unit: '', type: 4, selectNum: 1, value: ''}
                ]
            }
        ],
        [
            {
                titleName: '既往病史',
                serial_no: '004',
                labelWidth: '110px',
                formName: 'formName04',
                createdId: null, // 通过id判断是否为第一次创建
                detailList: [
                    {name: '肝炎', unit: '', type: 2, value: false},
                    {name: '泌尿系统感染', unit: '', type: 2, value: false},
                    {name: '心血管疾病', unit: '', type: 2, value: false},
                    {name: '手术史', unit: '', type: 2, value: false},
                    {name: '性传播疾病', unit: '', type: 2, value: false},
                    {name: '结核', unit: '', type: 2, value: false}
                ]
            },
            {
                titleName: '个人史',
                serial_no: '005',
                labelWidth: '110px',
                formName: 'formName05',
                createdId: null, // 通过id判断是否为第一次创建
                detailList: [
                    {name: '吸烟', unit: '', type: 2, value: false},
                    {name: '酗酒', unit: '', type: 2, value: false},
                    {name: '吸毒', unit: '', type: 2, value: false},
                    {name: '习惯用药', unit: '', type: 2, value: false},
                    {name: '药物过敏', unit: '', type: 2, value: false},
                    {name: '重大精神刺激', unit: '', type: 2, value: false},
                    {name: '近六个月发热史', unit: '', type: 2, value: false},
                    {name: '出生缺陷', unit: '', type: 2, value: false}
                ]
            },
            {
                titleName: '婚育史',
                serial_no: '006',
                labelWidth: '110px',
                formName: 'formName06',
                createdId: null, // 通过id判断是否为第一次创建
                detailList: [
                    {name: '近亲结婚', unit: '', type: 2, value: false},
                    {name: '再婚', unit: '', type: 2, value: false},
                    {name: '备注', unit: '', type: 2, value: false}
                ]
            },
            {
                titleName: '家庭史',
                serial_no: '007',
                labelWidth: '100px',
                formName: 'formName07',
                createdId: null, // 通过id判断是否为第一次创建
                detailList: [
                    {name: '遗传病史', unit: '', type: 2, value: false},
                    {name: '不孕不育史', unit: '', type: 2, value: false}
                ]
            }
        ]
      ],
      //  女性基本病要 data数据
      womenbasicCheckData: [ // name 指小项目的名称  unit项目的单位 type项目类型 1num计数器 2 开关 3单选按钮 4下拉框  5 输入框 6 日期 7 textarea多行文本
            [
                {
                    titleName: '诊疗计划',
                    serial_no: '001',
                    labelWidth: '90px',
                    formName: 'formName01',
                    createdId: null, // 通过id判断是否为第一次创建
                    detailList: [
                        {name: '方案', unit: '', type: 7, value: ''}
                    ]
                },
                {
                    titleName: '诊断',
                    serial_no: '002',
                    labelWidth: '90px',
                    formName: 'formName02',
                    createdId: null, // 通过id判断是否为第一次创建
                    detailList: [
                        {name: '方案', unit: '', type: 7, value: ''}
                    ]
                },
                {
                    titleName: '最终结果',
                    serial_no: '003',
                    labelWidth: '90px',
                    formName: 'formName03',
                    createdId: null, // 通过id判断是否为第一次创建
                    detailList: [
                        {name: '周期结果', unit: '', type: 4, selectNum: 0, value: ''},//selectNum 是在type为4 下拉框的时候  进行selectNum判断  0 为周期结果  1为妊娠结果 2为血型 3为男性精子粘稠度
                        {name: '妊娠结果', unit: '', type: 4, selectNum: 1, value: ''}
                    ]
                }
            ],
            [
                {
                    titleName: '既往病史',
                    serial_no: '004',
                    labelWidth: '110px',
                    formName: 'formName04',
                    createdId: null, // 通过id判断是否为第一次创建
                    detailList: [
                        {name: '肝炎', unit: '', type: 2, value: false},
                        {name: '泌尿系统感染', unit: '', type: 2, value: false},
                        {name: '心血管疾病', unit: '', type: 2, value: false},
                        {name: '手术史', unit: '', type: 2, value: false},
                        {name: '性传播疾病', unit: '', type: 2, value: false},
                        {name: '结核', unit: '', type: 2, value: false}
                    ]
                },
                {
                    titleName: '个人史',
                    serial_no: '005',
                    labelWidth: '110px',
                    formName: 'formName05',
                    createdId: null, // 通过id判断是否为第一次创建
                    detailList: [
                        {name: '吸烟', unit: '', type: 2, value: false},
                        {name: '酗酒', unit: '', type: 2, value: false},
                        {name: '吸毒', unit: '', type: 2, value: false},
                        {name: '习惯用药', unit: '', type: 2, value: false},
                        {name: '药物过敏', unit: '', type: 2, value: false},
                        {name: '重大精神刺激', unit: '', type: 2, value: false},
                        {name: '近六个月发热史', unit: '', type: 2, value: false},
                        {name: '出生缺陷', unit: '', type: 2, value: false}
                    ]
                },
                {
                    titleName: '婚育史',
                    serial_no: '006',
                    labelWidth: '110px',
                    formName: 'formName06',
                    createdId: null, // 通过id判断是否为第一次创建
                    detailList: [
                        {name: '近亲结婚', unit: '', type: 2, value: false},
                        {name: '再婚', unit: '', type: 2, value: false},
                        {name: '备注', unit: '', type: 2, value: false}
                    ]
                },
                {
                    titleName: '家庭史',
                    serial_no: '007',
                    labelWidth: '100px',
                    formName: 'formName07',
                    createdId: null, // 通过id判断是否为第一次创建
                    detailList: [
                        {name: '遗传病史', unit: '', type: 2, value: false},
                        {name: '不孕不育史', unit: '', type: 2, value: false}
                    ]
                }
            ]
        ],
      // 男性生殖检查  data   // name 指小项目的名称  unit项目的单位 type项目类型 1num计数器 2 开关 3单选按钮 4下拉框 5 输入框 6 日期
      menReproductiveCheckData: [
            [
                {
                    titleName: '精液常规分析',
                    serial_no: '101',//第一个1 代表男 2代表女 0代表基本病要  后俩位代表模块序号
                    labelWidth: '103px',
                    formName: 'formName101',
                    createdId: null, // 通过id判断是否为第一次创建
                    detailList: [
                        {name: '检查日期', unit: '', type: 6, value: ''},
                        {name: '禁欲天数', unit: '天', type: 1, value: 0},
                        {name: '液化时间', unit: 'min', type: 6, value: ''},
                        {name: '颜色', unit: '', type: 5, value: ''},
                        {name: '量', unit: 'ml', type: 1, value: ''},
                        {name: '粘稠度', unit: '', type: 4, selectNum: 3, value: null},
                        {name: 'PH', unit: '', type: 2, switchNum: 1, value: false}, // switchNum 开关的时候 0 显示是否 1 显示正常 异常
                        {name: '圆细胞', unit: '/HP', type: 5, value: ''},
                        {name: '精子总数', unit: 'X10^6', type: 5, value: ''},
                        {name: '活动率', unit: '%', type: 5, value: ''},
                        {name: '正常形态率', unit: '%', type: 5, value: ''},
                        {name: 'PR', unit: '%', type: 5, value: ''},
                        {name: 'NR', unit: '%', type: 5, value: ''},
                        {name: 'IM', unit: '%', type: 5, value: ''},
                        {name: '取精难易度', unit: '%', type: 5, value: ''},
                        {name: '建议提前冻精', unit: '', type: 2, switchNum: 0, value: false},
                        {name: '凝集', unit: '', type: 2, switchNum: 0, value: false},
                        {name: '精浆', unit: '', type: 3, value: 0},
                        {name: '血清', unit: '', type: 2, switchNum: 0, value: false},
                        {name: '精子DNA碎片率', unit: '%', type: 5, value: ''},
                        {name: '精浆锌', unit: '/umol', type: 5, value: ''},
                        {name: '果糖', unit: '/umol', type: 5, value: ''},
                        {name: '中性糖苷酶', unit: '/mU', type: 5, value: ''},
                        {name: '顶体酶', unit: '/uIU', type: 5, value: ''},
                    ]
                },

            ],
          [
              {
                  titleName: '第二特征',
                  labelWidth: '90px',
                  serial_no: '102',//第一个1 代表男 0代表女  后俩位代表模块序号
                  formName: 'formName102',
                  createdId: null, // 通过id判断是否为第一次创建
                  detailList: [
                      {name: '胡须', unit: '', type: 2, switchNum: 1, value: false},
                      {name: '阴毛', unit: '', type: 2, switchNum: 1, value: false},
                      {name: '喉结', unit: '', type: 2, switchNum: 1, value: false},
                      {name: '乳房', unit: '', type: 2, switchNum: 1, value: false}
                  ]
              },
              {
                  titleName: '生殖系统检查',
                  labelWidth: '90px',
                  serial_no: '103',//第一个1 代表男 0代表女  后俩位代表模块序号
                  formName: 'formName103',
                  createdId: null, // 通过id判断是否为第一次创建
                  detailList: [
                      {name: '阴茎长度', unit: '', type: 1, value: ''},
                      {name: '前列腺', unit: '', type: 1, value: ''},
                      // {name: '', unit: '', type: 0, value: ''},
                      {name: '左睾丸体积', unit: '', type: 1, value: ''},
                      {name: '质地', unit: '', type: 1, value: ''},
                      {name: '右睾丸体积', unit: '', type: 1, value: ''},
                      {name: '质地', unit: '', type: 1, value: ''},
                      {name: '左附睾', unit: '', type: 1, value: ''},
                      {name: '左输精管', unit: '', type: 1, value: ''},
                      {name: '右附睾', unit: '', type: 1, value: ''},
                      {name: '右输精管', unit: '', type: 1, value: ''},
                      {name: '左精索静脉', unit: '', type: 1, value: ''},
                      {name: '右精索静脉', unit: '', type: 1, value: ''},
                  ]
              }
          ]
      ],
      // 女性生殖检查  data   // name 指小项目的名称  unit项目的单位 type项目类型 1num计数器 2 开关 3单选按钮 4下拉框 5 输入框 6 日期
      womenReproductiveCheckData: [
        [
            {
                titleName: '体格检查',
                serial_no: '201',//第一个1 代表男 2代表女 0代表基本病要  后俩位代表模块序号
                labelWidth: '90px',
                formName: 'formName201',
                createdId: null, // 通过id判断是否为第一次创建
                detailList: [
                    {name: 'T', unit: 'C', type: 1, value: 0},
                    {name: 'P', unit: '次/分', type: 1, value: 0},
                    {name: 'R', unit: '次/分', type: 1, value: 0},
                    {name: 'BP', unit: 'mmHg', type: 1, value: 0},
                    {name: '身高', unit: 'cm', type: 1, value: 0},
                    {name: '体重', unit: 'kg', type: 1, value: 0},
                    {name: '体重指数', unit: 'kg/m^2', type: 1, value: 0}, // switchNum 开关的时候 0 显示是否 1 显示正常 异常
                    {name: '营养', unit: '', type: 2, switchNum: 1, value: false},
                    {name: '发育', unit: '', type: 2, switchNum: 1, value: false},
                    {name: '淋巴结', unit: '', type: 2, switchNum: 1, value: false},
                    {name: '精神', unit: '', type: 2, switchNum: 1, value: false},
                    {name: '心', unit: '', type: 2, switchNum: 1, value: false},
                    {name: '毛发', unit: '', type: 2, switchNum: 1, value: false},
                    {name: '肺', unit: '', type: 2, switchNum: 1, value: false},
                    {name: '皮肤粘膜', unit: '', type: 2, switchNum: 1, value: false},
                    {name: '肝', unit: '', type: 2, switchNum: 1, value: false},
                    {name: '脾', unit: '', type: 2, switchNum: 1, value: false},
                    {name: '肾', unit: '', type: 2, switchNum: 1, value: false},
                    {name: '脊柱四肢', unit: '', type: 2, switchNum: 1, value: false},
                    {name: '其他', unit: '', type: 5, value: ''}
                ]
            },
            {
                titleName: '妇科检查',
                labelWidth: '100px',
                serial_no: '202',//第一个1 代表男 0代表女  后俩位代表模块序号
                formName: 'formName202',
                createdId: null, // 通过id判断是否为第一次创建
                detailList: [
                    {name: '外阴', unit: '', type: 5, value: ''},
                    {name: '阴道', unit: '', type: 1, value: 0},
                    {name: '宫颈', unit: '', type: 2, switchNum: 1, value: false},
                    {name: '钠氏囊肿', unit: 'mm', type: 1, value: 0},
                    {name: '肥大', unit: 'mm', type: 1, value: 0},
                    {name: '大小', unit: '', type: 2, switchNum: 1, value: false},
                    {name: '盆腔', unit: '', type: 1, value: 0},
                    {name: '质地', unit: '', type: 3, value: ''},
                    {name: '活动度', unit: '', type: 5, value: ''},
                    {name: '压痛', unit: '', type: 2, switchNum: 1, value: false},
                    {name: '右侧卵巢大小', unit: 'mm', type: 1, value: 0},
                    {name: '卵泡', unit: '', type: 1, value: 0},
                    {name: '附件：左侧', unit: '', type: 2, switchNum: 1, value: false},
                    {name: '附件：右侧', unit: '', type: 2, switchNum: 1, value: false},
                    {name: '其他异常', unit: '', type: 5, value: ''}
                ]
            }
        ],
        [
            {
                titleName: '肝功',
                labelWidth: '110px',
                serial_no: '203',//第一个1 代表男 0代表女  后俩位代表模块序号
                formName: 'formName203',
                createdId: null, // 通过id判断是否为第一次创建
                detailList: [
                    {name: 'ALT', unit: 'u/l', type: 1, value: 0},
                    {name: 'AST', unit: 'u/l', type: 1, value: 0}
                ]
            },
            {
                titleName: '肾功',
                labelWidth: '110px',
                serial_no: '204',//第一个1 代表男 0代表女  后俩位代表模块序号
                formName: 'formName204',
                createdId: null, // 通过id判断是否为第一次创建
                detailList: [
                    {name: 'Bun', unit: 'mlU/L', type: 1, value: 0},
                    {name: 'Cr', unit: 'μmol/L', type: 1, value: 0},
                    {name: '染色体', unit: '', type: 5, value: ''},
                    {name: '宫腔镜', unit: '', type: 5, value: ''},
                    {name: '宫颈防癌检查', unit: '', type: 5, value: ''},
                    {name: '腹腔镜', unit: '', type: 5, value: ''},
                    {name: '子宫内膜活检', unit: '', type: 5, value: ''},
                    {name: '子宫输卵管检查', unit: '', type: 5, value: ''},
                    {name: '心电图', unit: '', type: 5, value: ''},
                    {name: '其他化验检查', unit: '', type: 5, value: ''}
                ]
            },
            {
                titleName: '妇科B超',
                labelWidth: '110px',
                serial_no: '205',//第一个1 代表男 0代表女  后俩位代表模块序号
                formName: 'formName205',
                createdId: null, // 通过id判断是否为第一次创建
                detailList: [
                    {name: '检查日期', unit: '', type: 6, value: ''},
                    {name: '月经周期', unit: '', type: 4, selectNum: 2, value: ''},
                    {name: '卵巢功能评估', unit: '', type: 2, switchNum: 1, value: false},
                    {name: '子宫大小', unit: 'mm', type: 1, value: 0},
                    {name: '子宫内膜厚度', unit: '', type: 5, value: ''},
                    {name: '形态', unit: '', type: 5, value: ''},
                    {name: '右侧卵巢大小', unit: 'mm', type: 1, value: 0},
                    {name: '卵泡', unit: '个', type: 5, value: ''},
                    {name: '备注', unit: '', type: 5, value: ''},
                    {name: '左侧卵巢大小', unit: 'mm', type: 1, value: 0},
                    {name: '卵泡', unit: '个', type: 1, value: ''},
                    {name: '备注', unit: '', type: 5, value: ''},
                    {name: '其他异常', unit: '', type: 5, value: ''}
                ]
            },
        ],
        [
          {
              titleName: '血常规',
              labelWidth: '100px',
              serial_no: '206',//第一个1 代表男 0代表女  后俩位代表模块序号
              formName: 'formName206',
              createdId: null, // 通过id判断是否为第一次创建
              detailList: [
                  {name: '血红蛋白', unit: '', type: 1, value: 0},
                  {name: '红细胞计数', unit: '×10^12/L', type: 1, value: 0},
                  {name: '白细胞计数', unit: '×10^12/L', type: 1, value: 0},
                  {name: '红细胞体积', unit: '%', type: 1, value: 0},
                  {name: '血小板', unit: '×10^9/L', type: 1, value: 0},
                  {name: '血沉', unit: 'mm/H', type: 1, value: 0},
                  {name: '尿常规', unit: '', type: 2, switchNum: 1, value: false},
                  {name: '血型', unit: '', type: 4, selectNum: 0, value: ''},
                  {name: 'Rh因子', unit: '', type: 2, switchNum: 2, value: false},
                  {name: '血凝功能PT', unit: '', type: 1, value: 0},
                  {name: 'APTT', unit: '秒', type: 1, value: 0}
              ]
          },
          {
            titleName: '基础内分泌',
            labelWidth: '90px',
            serial_no: '207',//第一个1 代表男 0代表女  后俩位代表模块序号
            formName: 'formName207',
            createdId: null, // 通过id判断是否为第一次创建
            detailList: [
                {name: 'FSH', unit: 'IU/L', type: 1, value: 0},
                {name: 'LH', unit: 'IU/L', type: 1, value: 0},
                {name: 'PRL', unit: 'mIU/L', type: 1, value: 0},
                {name: 'T', unit: 'nmol/L', type: 1, value: 0},
                {name: 'TSH', unit: 'mIU/L', type: 1, value: 0},
                {name: 'AMH', unit: 'pmol/L', type: 1, value: 0},
                {name: 'E2', unit: 'pmol/L', type: 1, value: 0},
                {name: 'P', unit: 'nmol/L', type: 1, value: 0}
            ]
          },
        ],
        [
          {
              titleName: 'TORCH',
              labelWidth: '100px',
              serial_no: '208',//第一个1 代表男 0代表女  后俩位代表模块序号
              formName: 'formName208',
              createdId: null, // 通过id判断是否为第一次创建
              detailList: [
                  {name: '弓形虫', unit: '', type: 2, switchNum: 2, value: false},
                  {name: '巨细胞病毒', unit: '', type: 2, switchNum: 2, value: false},
                  {name: '风疹病毒', unit: '', type: 2, switchNum: 2, value: false},
                  {name: '单纯孢疹病毒', unit: '', type: 2, switchNum: 2, value: false}
              ]
          },
            {
                titleName: '乙肝六项',
                labelWidth: '100px',
                serial_no: '209',//第一个1 代表男 0代表女  后俩位代表模块序号
                formName: 'formName209',
                createdId: null, // 通过id判断是否为第一次创建
                detailList: [
                    {name: 'HBsAg', unit: '', type: 2, switchNum: 2, value: false},
                    {name: 'HBsAb', unit: '', type: 2, switchNum: 2, value: false},
                    {name: 'HBeAg', unit: '', type: 2, switchNum: 2, value: false},
                    {name: 'HBeAb', unit: '', type: 2, switchNum: 2, value: false},
                    {name: 'HBcAb', unit: '', type: 2, switchNum: 2, value: false},
                    {name: 'HBVpreSIAg', unit: '', type: 2, switchNum: 2, value: false}
                ]
            },
            {
                titleName: '梅毒抗体',
                labelWidth: '110px',
                serial_no: '210',//第一个1 代表男 0代表女  后俩位代表模块序号
                formName: 'formName210',
                createdId: null, // 通过id判断是否为第一次创建
                detailList: [
                    {name: '梅毒抗体', unit: '', type: 2, switchNum: 2, value: false},
                    {name: 'HIVAb', unit: '', type: 2, switchNum: 2, value: false},
                    {name: '衣原体', unit: '', type: 2, switchNum: 2, value: false},
                    {name: '血清精子抗体', unit: '', type: 2, switchNum: 2, value: false},
                    {name: '淋球菌', unit: '', type: 2, switchNum: 2, value: false}
                ]
            },
        ]
      ],
      //  血型下拉框
      bloodOptions: [
        {value: 0, label: 'A型'},
        {value: 1, label: 'B型'},
        {value: 2, label: 'AB型'},
        {value: 3, label: 'O型'}
      ],
      //  阴性阳性 单选按钮
      yinOrYangOptions: [
        {value: '0', label: '阴性'},
        {value: '1', label: '阳性'}
      ],
      // 粘稠度
      spermOptions: [
        {value: '粘稠', label: '粘稠'},
        {value: '适中', label: '适中'}
      ],
      //  周期结果 下拉框
      cycleResultsOptions: [
        {value: '未妊娠', label: '未妊娠'},
        {value: '生化妊娠', label: '生化妊娠'},
        {value: '临床妊娠', label: '临床妊娠'},
        {value: '着床胚胎数', label: '着床胚胎数'},
        {value: '异位妊娠', label: '异位妊娠'},
        {value: '流产', label: '流产'},
        {value: '取消取卵', label: '取消取卵'},
        {value: '取消移植', label: '取消移植'}
      ],
      //  妊娠结果 下拉框
      gravidityResultsOptions: [
        {value: '早产', label: '早产'},
        {value: '足月产', label: '足月产'},
        {value: '单胎', label: '单胎'},
        {value: '双胎', label: '双胎'},
        {value: '三胎', label: '三胎'}
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
      pkDetailData: [], //  用来存放患者的详细信息
      sexType: 'M', //   男性 女性进行切换  M为男性  F 为女性
      isDouble: true, // 是否为2人  默认为2人  false为1人
      newAddPerson: false, //   是否为新增患者
      warpHeight: 500,
      buttonActive: 1, //    tab判断显示信息  1 个人基本信息 2基本病要 3 生殖检查  4 常规检查
      isEditDetail: false, //   false 显示资料展示  true 显示资料编辑
      newForm: {
        name: '',
        birthday: '',
        sex: '',
        number: '',
        phone: ''
      },
      newAddPersonFormRules: { // 新增患者表单验证
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 2, max: 4, message: '长度在 2 到 4 个字符', trigger: 'blur' }
        ]
      },
      isFirstAddType: true, // 是否为单独的患者和配偶中的第一人
      newAddPersonForm: { // 新增患者列表 form表单信息
        name: '',
          education: '',
          id_type: '',
          id_no: '',
          telecom: '',
          gender: 'M',
          spouse: '',
          birth_date: '',
          id_address: '',
          address: '',
          nation: '',
          ethic: '',
          marriage: '',
          occupation: '',
          photo: '',
          contact_relationship: '',
          contact_name: '',
          contact_telecom: ''
      },
      //  患者证件类型
      patientsIdType: [
        {label: '身份证', value: 0},
        {label: '军官证', value: 1},
        {label: '护照', value: 2},
        {label: '港澳通行证', value: 3},
        {label: '台胞证', value: 4}
      ],
      tablistData: [
        {img: require("./../assets/logo.png"), name: '刘2', personAge: 24, personPhone: '188-1111-4444', personSex: 0, personNumber: '00010220', mesNum: 0, finish: 1, unfinish: 4},
        {img: require("./../assets/logo.png"), name: '刘3', personAge: 25, personPhone: '188-1111-5555', personSex: 0, personNumber: '00010220', mesNum: 0, finish: 3, unfinish: 4},
        {img: require("./../assets/logo.png"), name: '刘4', personAge: 26, personPhone: '188-1111-6666', personSex: 1, personNumber: '00010220', mesNum: 2, finish: 1, unfinish: 4},
        {img: require("./../assets/logo.png"), name: '刘5', personAge: 27, personPhone: '188-1111-7777', personSex: 0, personNumber: '00010220', mesNum: 0, finish: 2, unfinish: 4},
        {img: require("./../assets/logo.png"), name: '刘5', personAge: 28, personPhone: '188-1111-8888', personSex: 1, personNumber: '00010220', mesNum: 6, finish: 3, unfinish: 2}
      ],
      personDetail: {
        topTitle: {}, //    头部信息
        personInfor: { //    个人病情资料
          occupation: {title: '职业', value: '学生'},
          education: {title: '学历', value: '本科'},
          marriage: {title: '婚姻状况', value: '未婚'},
          nation: {title: '国籍', value: '中国'},
          id_no: {title: '身份证号', value: '211222199011112233'},
          telecom: {title: '电话', value: '19922221111'},
          address: {title: '通讯地址', value: '北京市西直门'}
        }
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
    },
    practitionerId: {//  主治医生用户的id
      type: Number,
      default: null
    }
  },
  computed: {
      tabNum: function () {
          let number = null
          this.tablistData.forEach((v,i)=>{
              if(v.id == this.patientId){
                  number = i
              }
          })
          // this.patientId
        return number
    }
  },
  created () {
    this.patientsList() //  获取患者列表
  },
  mounted () {
  },
  methods: {
    //  添加新患者
    addTabPerson () {
      this.newAddPerson = true
      this.isFirstAddType = true
      this.clearNewPerson()
      this.newAddPersonForm.spouse = ''
    },
    //  获取患者列表
    patientsList () {
      APIDATE.patients().then((res) => {
        this.tablistData = res
        if(res.length > 0){
          res.forEach((v,i)=>{
            v.img =  require("./../assets/logo.png")
          })
          this.personDetail.topTitle = this.tablistData[0]
          this.sexType = this.personDetail.topTitle.gender
        }
        // console.log(this.tablistData )
        if (this.firstEnter) { //  判断是否是第一次进入患者列表
          this.changeList(this.personDetail.topTitle, 0) // 获取患者列表相关信息
        } else {
          this.changeList(this.tablistData[this.tabNum], this.tabNum)
        }
        // this.firstEnter = false
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
    //  弹窗 加载中... 修改成功
    showloadingTitle (title) {
      let loadingInstance = this.$loading({
        text: title,
        background: 'rgba(255,255,255,0.1)',
        customClass: 'newHint'
      })
      setTimeout(function () {
        loadingInstance.close()
      }, 2000);
    },
    //  弹窗事件
    openAlert (val, title, index, type) { // val 当前的状态 title 弹窗显示的信息  index list条数的序号  type 可选 重新填写 true  再次检查 false
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
    },
    //  切换男女角色
    changeSexType (type) {
      if (this.sexType == type) {
        return
      }
      this.pkDetailData.forEach((pk)=>{
          if(pk.patientinfo.gender == type){
              this.patientId = pk.patient
          }
      })
      this.sexType = type
      this.changeList(this.tablistData[this.tabNum] ,null)
    },
    //  列表选择事件
    changeList (item ,index) {
      if (this.tabNum == index) {
        return;
      }
      console.log(item, '++++++',index)
      this.patientId = item.id
      //  获取患者相应的电子病历
      APIDATE.medicalRecord({pk: this.patientId}).then((res) => {
            // console.log(res)
          this.pkDetailData = res
          if (this.pkDetailData.length > 1) { // 判断是否有配偶相关信息
              this.isDouble = true
              this.pkDetailData.forEach((v)=>{
                  if(v.patient == this.patientId){
                      this.caseId = v.id
                  }
              })
          } else {
              this.isDouble = false
              this.caseId = this.pkDetailData[0].id
          }
          this.clearCheckData(this.menbasicCheckData) //   男性基本病要 data数据初始化
          this.clearCheckData(this.menReproductiveCheckData) //    男性生殖检查 data数据初始化
          this.clearCheckData(this.womenbasicCheckData) // 女性基本病要 data数据初始化
          this.clearCheckData(this.womenReproductiveCheckData) //  女性生殖检查 data数据初始化
          this.isCreatedCase(this.pkDetailData) // 判断是否代配偶 是否含有已经填写过电子病例
      })
      this.buttonActive = 1
      this.newAddPerson = false
      // 头部信息
      this.personDetail.topTitle = item
      this.sexType = item.gender
      //    个人基本信息
      this.personDetail.personInfor.occupation.value = item.occupation
      this.personDetail.personInfor.education.value = item.education
      this.personDetail.personInfor.marriage.value = item.marriage
      this.personDetail.personInfor.nation.value = item.nation
      this.personDetail.personInfor.id_no.value = item.id_no
      this.personDetail.personInfor.telecom.value = item.telecom
      this.personDetail.personInfor.address.value = item.address
    },
    //  判断是否有已经填写过的电子病例 进行取值
    isCreatedCase (data) {
      if(data.length <= 0){
        return
      }
      data.forEach((v,i) => {
        if (v.patient == this.patientId) {
            let menOrwomenBasic = 'menbasicCheckData'
            if(this.sexType == 'M'){
                menOrwomenBasic = 'menbasicCheckData'
            }else{
                menOrwomenBasic = 'womenbasicCheckData'
            }
          // this.caseId = v.id //  患者相应的电子病历
          //    判断是否已经含有电子病例  男性基本并要部分
          if(v.medicalplan_set.length > 0) { //  判断创建诊疗计划
            this[menOrwomenBasic][0][0].createdId = v.medicalplan_set[0].id
            v.medicalplan_set[0].planitem_set.forEach((set,j)=>{
              this[menOrwomenBasic][0][0].detailList[j].name = set.name
              this[menOrwomenBasic][0][0].detailList[j].value = set.result
            })
          }
          //    判断是否已经含有电子病例
          if(v.comment_set.length > 0) { //  判断创建诊断
            this[menOrwomenBasic][0][1].createdId = v.comment_set[0].id
            v.comment_set[0].commentitem_set.forEach((set,j)=>{
              this[menOrwomenBasic][0][1].detailList[j].name = set.name
              this[menOrwomenBasic][0][1].detailList[j].value = set.result
            })
          }
          //    判断是否已经含有电子病例
          if(v.diagresult_set.length > 0) { //  判断最终结果
            this[menOrwomenBasic][0][2].createdId = v.diagresult_set[0].id
            v.diagresult_set[0].resultitem_set.forEach((set,j)=>{
              this[menOrwomenBasic][0][2].detailList[j].name = set.name
              this[menOrwomenBasic][0][2].detailList[j].value = set.result
            })
          }
          //    判断是否已经含有电子病例
          if(v.history_set.length > 0) { //  判断既往病史 个人史 婚育史 男女生殖检查
            this[menOrwomenBasic][1].forEach((basic,b)=>{ // 往病史 个人史 婚育史 取默认值
              this.filterList(basic, v.history_set)
            })
            this.menReproductiveCheckData.forEach((menRep,b)=> { // 男性生殖检查 取默认值
              menRep.forEach((req,r) =>{
                this.filterList(req, v.history_set)
              })
            })
            this.womenReproductiveCheckData.forEach((womenRep,b)=> { // 女性生殖检查 取默认值
              womenRep.forEach((req,r) =>{
                this.filterList(req, v.history_set)
              })
            })
          }
        }
      })
      // console.log(this.basicCheckData)
    },
    //  筛选默认值
    filterList (formData, getData) { // formData 指页面form表单  getData 通过接口取得默认值
      getData.filter(set => {
        if(set.name == formData.titleName){
          formData.createdId = set.id
          formData.detailList.forEach((detail,deNum) =>{
            detail.name = set.historyitem_set[deNum].name
            detail.value = set.historyitem_set[deNum].result
          })
        }
      })
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
    },
    editDetail () {
      this.isEditDetail = true
    },
    //  清空基本病要 男性生殖检查  女性生殖检查
    clearCheckData (data) {
      data.forEach((page,i)=>{
        page.forEach((form,j)=>{
          form.detailList.forEach((list,q)=>{
            if (list.type == 1) {
              list.value = 0
            } else if (list.type == 2) {
              list.value = false
            } else if (list.type == 4) {
              list.value = ''
            } else {
              list.value = ''
            }
          })
        })
      })
    },
    // 清空新增患者表单
    clearNewPerson () {
      this.newAddPersonForm.name = ''
      this.newAddPersonForm.education = ''
      this.newAddPersonForm.id_type = ''
      this.newAddPersonForm.id_no = ''
      this.newAddPersonForm.telecom = ''
      this.newAddPersonForm.gender = 'M'
      this.newAddPersonForm.birth_date = ''
      this.newAddPersonForm.id_address = ''
      this.newAddPersonForm.address = ''
      this.newAddPersonForm.nation = ''
      this.newAddPersonForm.ethic = ''
      this.newAddPersonForm.marriage = ''
      this.newAddPersonForm.occupation = ''
      this.newAddPersonForm.photo = ''
      this.newAddPersonForm.contact_relationship = ''
      this.newAddPersonForm.contact_name = ''
      this.newAddPersonForm.contact_telecom = ''
    },
    //  新建患者表单提交
    onSubmit (formName) {
      let self = this
      self.$refs[formName].validate((valid) => {
        if (valid) {
          APIDATE.createPatients(this.newAddPersonForm).then((res) => {
                // console.log(res)
            if (self.isFirstAddType) {
              self.$confirm('是否添加配偶信息', '', {
                confirmButtonText: '添加',
                cancelButtonText: '不添加',
                cancelButtonClass: 'el-button--info',
                center: true,
                closeOnClickModal: false,
                closeOnPressEscape: false,
                customClass: 'medical-alert'
              }).then(() => {
                self.newAddPersonForm.spouse = res.id
                self.newAddPerson = true
                self.isFirstAddType = false
              }).catch(() => {
                self.newAddPersonForm.spouse = ''
                self.newAddPerson = false
                self.isFirstAddType = true
              });
            } else {
              self.newAddPersonForm.spouse = ''
              self.newAddPerson = false
              self.isFirstAddType = true
            }
            self.clearNewPerson()
            self.$refs.newAddPersonForm.resetFields()
            self.patientId = res.id
            self.firstEnter = false
            self.createMedicalRecordId() // 新增患者生成电子病例id
            self.patientsList() //  获取患者列表信息
          })
        }
      })
    },

    //  新增患者生成电子病例id
    createMedicalRecordId() {
      let recordId = {
        patient: this.patientId,
        prescribe_practitioner: this.practitionerId
      }
      APIDATE.medicalRecordId(recordId).then((res) => {
        // this.caseId = res.id
        console.log(res,'生成电子病历id')
      })
    },
    //    基础病要表单提交
    submitBasicCheck (dataPageName, fBox, itemNum,fBoxNum) { // dataPageName 栏目的字段名称 fBox  单个表单集合  itemNum 页码  fBoxNum 单页的form序号
      let formName = fBox.formName
      let self = this
      let planitem = []
      for (let i = 0; i < self[dataPageName][itemNum][fBoxNum].detailList.length; i++) {
        let newJsonPlanitem = {
          name: self[dataPageName][itemNum][fBoxNum].detailList[i].name,
          result: self[dataPageName][itemNum][fBoxNum].detailList[i].value
        }
        planitem.push(newJsonPlanitem)
      }
      let checkParams = {
        serial_no: self[dataPageName][itemNum][fBoxNum].serial_no, // #序列列号
        name: self[dataPageName][itemNum][fBoxNum].titleName, // #项⽬目名称
        medical_record: self.caseId, // #电⼦子病历主键
        patient: self.patientId, // #患者主键
        planitem: planitem
      }
      console.log(checkParams)
        // return
      //  创建诊疗计划
      if (formName == 'formName01') {
        if(fBox.createdId == null) { // 创建
          APIDATE.medicalplan(checkParams).then((res) => {
            fBox.createdId = res.id
            console.log(res,'创建诊疗计划')
            self.showloadingTitle('创建成功')
          })
        }else{ // 修改
          APIDATE.medicalplanPatch(fBox.createdId, checkParams).then((res) => {
            console.log(res,'修改诊疗计划')
            self.showloadingTitle('修改成功')
          })
        }
      }
      //  创建诊断 comment
      else if (formName == 'formName02') {
        if(fBox.createdId == null) {  //  创建
          APIDATE.comment(checkParams).then((res) => {
            fBox.createdId = res.id
            console.log(res,'创建诊断')
            self.showloadingTitle('创建成功')
          })
        }else{ // 修改
          APIDATE.commentPatch(fBox.createdId, checkParams).then((res) => {
            console.log(res,'修改诊断')
            self.showloadingTitle('修改成功')
          })
        }
      }
      //  最终结果
      else if (formName == 'formName03') {
        if(fBox.createdId == null) {  // 创建
          APIDATE.diagresult(checkParams).then((res) => {
            fBox.createdId = res.id
            console.log(res,'创建最终结果')
            self.showloadingTitle('创建成功')
          })
        }else{ // 修改
          APIDATE.diagresultPatch(fBox.createdId, checkParams).then((res) => {
            console.log(res,'修改最终结果')
            self.showloadingTitle('修改成功')
          })
        }
      }
      //  既往病史  个人史 婚育史 生殖检查的表单 提交 接口是一个  根据name名称不同进行区分
      else{
        if(fBox.createdId == null) {  // 创建
          APIDATE.history(checkParams).then((res) => {
            fBox.createdId = res.id
            console.log(res,'创建 既往病史  个人史 婚育史')
            self.showloadingTitle('创建成功')
          })
        }else{ // 修改
          APIDATE.historyPatch(fBox.createdId, checkParams).then((res) => {
            console.log(res,'修改 既往病史  个人史 婚育史')
            self.showloadingTitle('修改成功')
          })
        }
      }
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
              padding-right:0px;
          }
          .el-form_unit{
              font-size: $medical-font_12;
              color:$medical-col_999;
              letter-spacing: -1px;
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
          .el-input--mini.el-textarea{
              width:100%;
              padding:0px 30px;
              box-sizing: border-box;
              .el-textarea__inner{
                  height:80px;
              }
          }
          .el-input--mini.el-date-editor{
              .el-input__inner{
                  padding-right:5px;
              }
          }
      }
  }
</style>
