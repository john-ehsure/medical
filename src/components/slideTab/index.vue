<template>
  <div class="slideTab-content">
    <div class="slideTab-search" ref="slideSearchHei">
      <el-input size="medium" placeholder="请输入内容" prefix-icon="el-icon-search"  v-model="searchInput">
      </el-input>
    </div>
    <ul class="slideTab-list" :style="{height:slideListHeight+'px'}">
      <li @click="handleSlideLi(item,index)" v-for="(item,index) in listData" :class="{'active': index == activeIndex}">
        <div class="slideTab-list_img">
          <span class="slideTab-list_mesNum" v-if="item.mesNum">{{item.mesNum}}</span>
          <img :src="item.img"/>
        </div>
        <div class="slideTab-list_content">
          <p>{{item.personName}} {{item.personSex===0 ? '男' : '女'}}</p>
          <p>编号 {{item.personNumber}}</p>
        </div>
      </li>
    </ul>
    <div class="slideTab-add" v-if="hasAdd" ref="slideTabAdd">
        <el-button type="text" icon="el-icon-plus">新增患者</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'slideTab',
  data () {
    return {
      activeIndex: 0,
      slideListHeight: 500,
      searchInput: ''
    }
  },
  props: {
    // searchValue: {
    //   type: String,
    //   default: ''
    // },
    hasAdd: {
      type: Boolean,
      default: true
    },
    listData: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  mounted () {
    let slideTabAddHei = 0
    if (this.hasAdd) {
      slideTabAddHei = this.$refs.slideTabAdd.offsetHeight;
    }
    this.slideListHeight = document.documentElement.clientHeight - this.$refs.slideSearchHei.offsetHeight - slideTabAddHei;
  },
  methods: {
    handleSlideLi (item, index) {
      if (this.activeIndex == index) {
        return;
      }
      this.activeIndex = index;
      this.$emit('changeTabList', item);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  @import '../../scss/default.scss';
  .slideTab-content{
    width:215px;
    height:100%;
    position: relative;
    box-sizing: border-box;
    background-color:$medical-bgCol_white;
    box-shadow: 0px 0px 15px $medical-shadow_grey;
    .slideTab-search{
      padding:20px 15px;
      & .el-input .el-input__inner{
        box-shadow: 0px 0px 10px $medical-shadow_lightGrey;
        background-color:$medical-bgCol_grey;
        border-radius: 4px;
      }
    }
    .slideTab-list{
      box-sizing: border-box;
      margin:0px;
      padding: 10px 0px;
      overflow-y: auto;
      & > li{
        display: flex;
        justify-items: center;
        align-items: center;
        padding:15px 15px;
        border-bottom:1px solid $medical-borCol_ddd;
        color:$medical-col_666;
        background-color:$medical-bgCol_white;
        .slideTab-list_img{
          width:60px;
          height:60px;
          border-radius: 100%;
          font-size:0px;
          margin-right:20px;
          border:2px solid $medical-borCol_white;
          box-shadow: 0px 0px 10px $medical-shadow_grey;
          position: relative;
          .slideTab-list_mesNum{
            position: absolute;
            right:0px;
            top:0px;
            font-size:$medical-font_12;
            line-height:14px;
            min-width:14px;
            border-radius:7px;
            color:$medical-col_white;
            background-color:$medical-bgCol_orange;
          }
          & > img{
            width:100%;
            height:100%;
            border-radius: 100%;
          }
        }
        .slideTab-list_content{
          font-size:$medical-font_13;
          text-align: left;
          flex: 1;
        }
      }
      & > li.active{
        color:$medical-col_white;
        background-color:rgba(141,155,181,1);
      }
      & > li:first-child{
        border-top:1px solid $medical-borCol_ddd;
      }
    }
      .slideTab-add{
          .el-button--text{
              width:100%;
              color:$medical-col_666;
              text-align: left;
          }
      }
  }
</style>
