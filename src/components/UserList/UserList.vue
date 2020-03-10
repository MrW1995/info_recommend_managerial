<template>
  <div class="userClass">
    <div class="userInfo" v-if="showDetailOrUserInfo==0">
      <el-table :data="userList" style="width: 80%" class="userTable" >
          <el-table-column type="index" width="50"></el-table-column>
          <el-table-column label="注册日期" width="150" prop="establishDate"></el-table-column>
          <el-table-column label="用户名" width="150" prop="userName"></el-table-column>
          <el-table-column label="性别" width="70" prop="sex"></el-table-column>
          <el-table-column label="生日" width="150" prop="birthday"></el-table-column>
        <el-table-column align="right" width="70">
          <template slot-scope="scope">
            <el-button size="mini" @click.native="handleEdit(scope.$index, scope.row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <Pagination class="userPagination" :currentPage="currentPage"  :totalPage="totalPage"></Pagination>
    </div>
    <UserInfoDetail v-on:changeShowState="changeShowState" ref="userinfo" class="userInfoDetail" v-if="showDetailOrUserInfo==1" ></UserInfoDetail>
  </div>
</template>

<script>
  import Pagination from '../Pagination/Pagination'
  import UserInfoDetail from '../UserInfoDetail/UserInfoDetail'
  import {mapState} from 'vuex'
  export default {
    data() {
      return {
        showDetailOrUserInfo:0,
      }
    },
    computed:{
      ...mapState(['userList','currentPage','pageSize','totalPage']),
    },
    mounted(){
      this.queryUserList()
    },
    watch:{
      currentPage(){
        this.queryUserList()
      },
    },

    methods: {
      queryUserList(){
        let pageNum = this.currentPage
        let pageSize = 8
        this.$store.dispatch('getUser',{pageNum,pageSize})
      },
      handleEdit(index, row) {
        this.changeShowState(1)
        this.$store.commit('change_pageNum',1)
        let userId = row.userId
        let pageNum = this.currentPage
        let pageSize = this.pageSize
        this.$store.commit('copy_user',row)
        this.$store.commit('change_userid',userId)
        this.queryContent(userId,pageNum,pageSize,true)
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
      changeShowState(value){
        this.showDetailOrUserInfo = value
        if(value===1){
          setTimeout(()=>{
            this.$refs.userinfo.receive()},10)
        }
      },
      queryContent(userId,pageNum,pageSize,flag){
        if(flag) {
          this.$store.dispatch('getPublishStudy', {userId, pageNum, pageSize})
        }
        else{
          this.$store.dispatch('getPublishTravel',{userId,pageNum,pageSize})
        }
      }
    },
    components:{
      Pagination,
      UserInfoDetail
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .userClass
    margin 0
    .userInfo
      width 60%
      height 544px
      box-shadow 1px 1px 3px black
      background-color white
      border-radius 5px
      display flex
      flex-flow column
      margin 0.3% auto 0 auto
      .userTable
        margin auto
      .userPagination
        position relative
        margin 5% 0 0 45%
    .userInfoDetail
      margin auto
</style>
