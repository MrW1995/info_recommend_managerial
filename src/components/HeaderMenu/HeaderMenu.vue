<template>
  <el-row class="headerMenu">
    <el-col :span="8">
      <div class="grid-content bg-purple headerOne">
        <img src="../../assets/imgs/logo.png" alt="" class="webSiteLogo">
        <span class="webSiteName">资讯网站管理</span>
      </div>
    </el-col>
    <el-col :span="6">
      <div class="grid-content bg-purple headerTwo">
        <el-input size="small" class="inputSearch"
          placeholder="请输入内容"
          v-model="searchVal">
          <i slot="prefix" class="el-input__iconn el-icon-search"></i>
        </el-input>
      </div>
    </el-col>
    <el-col :span="10">
      <div class="grid-content bg-purple headerThree">
        <table class="selectMenu">
          <tr>
            <td :class="{changeSingleTd:changeColorNum==1}" @click="clickChangeColor(1,'/homePage/userSearch')">用户数量</td>
            <td :class="{changeSingleTd:changeColorNum==2}" @click="clickChangeColor(2,'/homePage/articleCountPage')">已发表数</td>
            <td :class="{changeSingleTd:changeColorNum==3}" @click="clickChangeColor(3,'/homePage/infoEcharts')">信息统计</td>
            <td :class="{changeSingleTd:changeColorNum==4}" @click="clickChangeColor(4,'/homePage/feedBack')">用户反馈</td>
            <td :class="{changeLogOUt:changeColorNum==5}" @click="clickChangeColor(5,'')">退出</td>
          </tr>
        </table>
      </div>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    data(){
      return {
        searchVal:'',
        changeColorNum:0,
        NumBer:6
      }
    },
    methods:{
      clickChangeColor(value,url){
        this.changeColorNum = value
        this.$router.push(url)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .headerMenu
    display flex
    margin 0
    .grid-content
      display flex
      height 60px
    .bg-purple
      background #d3dce6
    .headerOne
      margin 0
      .webSiteLogo
        width 30px
        height 30px
        margin auto 0 auto 20px
      .webSiteName
        font-size 18px
        margin auto 0 auto 5px
    .headerTwo
      margin 0
      .inputSearch
        width 70%
        margin auto 0 auto 0
        .el-input__iconn
          width: 25px;
          text-align: center;
          line-height: 32px
    .headerThree
      margin 0
      display flex
      .selectMenu
        color white
        font-weight bold
        margin auto 0 auto 15%
        td
          width 81px
          &.changeSingleTd
            color aqua
          &.changeLogOUt
            color red
</style>
