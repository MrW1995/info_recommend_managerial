<template>
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-size = "pageSize"
      layout="total, prev, pager, next, jumper"
      :total="totalPage">
    </el-pagination>

</template>

<script>
  import {mapState} from 'vuex'
  export default {
    props:{
      currentPage:Number,
      totalPage:Number,
      pageSize:Number,
      flag:Boolean,
      userId:Number
    },
    methods: {
      handleCurrentChange(val) {
        this.publicMethod(val)
      },
      publicMethod(val){
        let userId = this.userId
        let pageNum = val
        let pageSize = this.pageSize
        this.queryContent(userId,pageNum,pageSize)
      },
      queryContent(userId,pageNum,pageSize){
        if(this.flag) {
          this.$store.dispatch('getPublishStudy', {userId, pageNum, pageSize})
        }
        else{
          this.$store.dispatch('getPublishTravel',{userId,pageNum,pageSize})
        }
      },
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
