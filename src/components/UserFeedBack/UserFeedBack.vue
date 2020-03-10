<template>
    <div class="FeedBack">
      <div class="setting">
        <el-table :data="adviceList" style="width: 80%" max-height="450" class="userFeedBack">
          <el-table-column fixed prop="submitDate" label="日期" width="100">
          </el-table-column>
          <el-table-column prop="adviceContent" label="内容" width="300">
          </el-table-column>
          <el-table-column prop="adviceContent" label="状态" width="100">
          </el-table-column>
          <el-table-column label="操作" >
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
        <Pagination class="userPagination" :currentPage="currentPage"  :totalPage="totalPage"></Pagination>
      </div>
    </div>
</template>

<script>
  import {mapState} from 'vuex'
  import Pagination from '../Pagination/Pagination'
  export default {

    computed:{
      ...mapState(['adviceList','currentPage','totalPage'])
    },
    mounted () {
      this.queryAdvice()
    },
    watch:{
      currentPage(){
        this.queryAdvice()
      }
    },
    components:{
      Pagination
    },
    methods: {
      handleEdit(index, rows) {

      },
      queryAdvice(){
        let pageSize = 8
        let pageNum = this.currentPage
        this.$store.dispatch('getUserAdvice',{pageNum,pageSize})
      }
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .FeedBack
    display flex
    flex-flow column
    .setting
      width 60%
      height 540px
      box-shadow 1px 1px 3px black
      background-color white
      border-radius 5px
      display flex
      flex-flow column
      margin 0.3% auto 0 auto
      .userFeedBack
        margin 0 auto 0 auto
      .userPagination
        position relative
        margin 5% 0 0 45%
</style>
