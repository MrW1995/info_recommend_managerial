<template>
    <div class="userInfoDetail">
        <div class="userInfomation">
          <span  class="goBack" @click="close" :class="{color:color}" @mouseleave="change(false)" @mouseenter="change(true)">返回</span>
          <img class="userImg" :src="singleUser.personImg" alt="" width="70" height="70">
          <div class="userInfo1">
            <hr class="hrSetting1">
              <div class="userModule1">
                <span class="userSexSetting">性别 {{singleUser.sex}}</span>
                <span class="userNameSetting">姓名 {{singleUser.userName}}</span>
                <span class="userBirthdaySetting">出生日期 {{dateFormat(singleUser.birthday)}}</span>
                <span class="userEstablishSetting">创建日期 {{dateFormat(singleUser.establishDate)}}</span>
              </div>
              <hr class="hrSetting1">
              <div class="userModule2">
                <span class="userDescSetting">描述 </span>
                <div class="desc"><span class="fontFloat">{{singleUser.descript}}</span></div>
              </div>
              <hr class="hrSetting1">
              <div class="userModule3">
                <span class="userDescSetting">地址 </span>
                <div class="addr"><span class="fontFloat">{{singleUser.address}}</span></div>
              </div>
          </div>
          <div class="userInfo2">

          </div>
        </div>
        <div class="userPublish">
          <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="学习文章" name="first">
              <el-table :data="publishList"  height="350" @row-click="showPublishInfo" style="width: 95%" class="userPublishArticle" >
                <el-table-column type="index" label="序号" width="50"></el-table-column>
                <el-table-column width="100" label="发布日期" prop="sourceDateTime" ></el-table-column>
                <el-table-column label="标题" prop="sourceContent" ></el-table-column>
              </el-table>
              <Pagination class="userPublishListPagination" :userId="userId" :flag="true" :currentPage="currentPage" :pageSize="pageSize" :totalPage="totalPage"></Pagination>
            </el-tab-pane>
            <el-tab-pane label="旅游文章" name="second">
              <el-table :data="publishList"  height="350" @row-click="showPublishInfo" style="width: 95%" class="userPublishArticle" >
                <el-table-column type="index" label="序号" width="50"></el-table-column>
                <el-table-column width="100" label="发布日期" prop="sourceDateTime" ></el-table-column>
                <el-table-column label="标题" prop="sourceContent" ></el-table-column>
              </el-table>
              <Pagination class="userPublishListPagination" :userId="userId" :flag="false" :currentPage="currentPage" :pageSize="pageSize" :totalPage="totalPage"></Pagination>
            </el-tab-pane>

          </el-tabs>

        </div>

        <el-dialog class="dialog" title="文章详情" :visible.sync="centerDialogVisible" width="30%" center>
          <ArticleDetail></ArticleDetail>
        </el-dialog>

    </div>
</template>

<script>
  import Pagination from '../Pagination/Pagination'
  import ArticleDetail from '../ArticleDetail/ArticleDetail'
  import {mapState} from 'vuex'
  export default {
    data(){
      return {
        color:false,
        centerDialogVisible:false,
        activeName: 'first'
      }
    },
    computed:{
      ...mapState(['singleUser','publishList','currentPage','pageSize','totalPage','userId'])
    },
    components:{
      Pagination,
      ArticleDetail
    },
    watch:{
      currentPage(value){

      },
    },
    methods:{
      handleClick(tab, event) {
        let value = event.target.innerHTML
        if(value === '学习文章')
          this.publicMethod(true)
        else
          this.publicMethod(false)
      },
      publicMethod(flag){
        let userId = this.userId
        let pageNum = this.currentPage
        let pageSize = this.pageSize
        this.queryContent(userId,pageNum,pageSize,flag)
      },
      dateFormat(value){
        return this.util.splitDate(value)
      },
      change(bool){
        this.color = bool
      },
      receive(){

      },
      close(){
        this.$emit('changeShowState',0)
      },
      showPublishInfo(row){
        this.$store.commit('change_article',row)
        this.centerDialogVisible = true
      },
      queryContent(userId,pageNum,pageSize,flag){
        if(flag) {
          console.log(userId+"11111111111111111111111122")
          this.$store.dispatch('getPublishStudy', {userId, pageNum, pageSize})
        }
        else{
          this.$store.dispatch('getPublishTravel',{userId,pageNum,pageSize})
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .userInfoDetail
     width 80%
     height 450px
     display flex
    .goBack
      display flex
      font-size 0.26rem
      margin 0.3rem 0 0 0.5rem
      &.color
        color blue
    .hrSetting1
      width 16rem
     .userInfomation
        width 28%
        height 450px
        background-color white
        margin 40px 0 0 0
        .icon-fanhui1
          display flex
          font-size 26px
          margin-top 5px
        .userImg
          margin-top 10px
        .userInfo1
          display flex
          flex-flow column
          font-size 16px
          .userModule1
            display flex
            flex-flow column
            margin 0 0 0 2rem
            .userSexSetting
              display flex
              float left
              margin 0 0 1rem 2.1rem
            .userNameSetting
              display flex
              float left
              margin 0 0 1rem 2.1rem
            .userBirthdaySetting
              display flex
              float left
              margin 0 0 1rem 0
            .userEstablishSetting
              display flex
              float left
              margin 0 0 0.5rem 0
          .userModule2
            display flex
            margin 0 0 0 2rem
            .desc
              width 13rem
              height 5rem
              font-size 0.16rem
              margin-left 0.3rem
              background-color white
              .fontFloat
                float left
          .userModule3
            display flex
            margin 0 0 0 2rem
            .addr
              width 13rem
              height 2rem
              font-size 0.16rem
              margin-left 0.3rem
              background-color white
              .fontFloat
                float left
     .userPublish
        width 72%
        height 450px
        margin 40px 0 0 20px
        border-radius 10px
        box-shadow 1px 1px 3px black
        background-color white
        .userPublishArticle
          margin auto
        .userPublishListPagination
          position relative
          margin 1% 0 0 45%


</style>
