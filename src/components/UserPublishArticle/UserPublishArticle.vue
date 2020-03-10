<template>
    <div class="publishArticle">

      <div class="setting">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="已发表的学习文章" name="first">
            <el-table :data="publishList"  height="450" class="userPublishArticle" style="width: 80%" @row-click="showPublishInfo">
              <el-table-column type="expand">
                <template slot-scope="props">
                  <el-form label-position="left" inline class="demo-table-expand">
                    <el-form-item label="文章标题">
                      <span>{{ props.row.sourceContent }}</span>
                    </el-form-item>
                  </el-form>
                </template>
              </el-table-column>
              <el-table-column label="发布日期" prop="sourceDateTime" width="90"></el-table-column>
              <el-table-column label="文章标题" prop="sourceContent" width="500"></el-table-column>
            </el-table>
            <Pagination class="userPublishListPagination" :userId="0" :flag="true" :currentPage="currentPage" :pageSize="pageSize" :totalPage="totalPage"></Pagination>
          </el-tab-pane>

          <el-tab-pane label="已发表的旅游文章" name="second">
            <el-table :data="publishList"  height="450" class="userPublishArticle" style="width: 80%" @row-click="showPublishInfo">
              <el-table-column type="expand">
                <template slot-scope="props">
                  <el-form label-position="left" inline class="demo-table-expand">
                    <el-form-item label="文章标题">
                      <span>{{ props.row.sourceContent }}</span>
                    </el-form-item>
                  </el-form>
                </template>
              </el-table-column>
              <el-table-column label="发布日期" prop="sourceDateTime" width="90"></el-table-column>
              <el-table-column label="文章标题" prop="sourceContent" width="500"></el-table-column>
            </el-table>
            <Pagination class="userPublishListPagination" :userId="0" :flag="false" :currentPage="currentPage" :pageSize="pageSize" :totalPage="totalPage"></Pagination>
          </el-tab-pane>
        </el-tabs>

        <el-dialog class="dialog" title="文章详情"  :visible.sync="centerDialogVisible" width="30%" center>
          <ArticleDetail></ArticleDetail>
        </el-dialog>

      </div>
      </div>
</template>

<script>
  import ArticleDetail from '../../components/ArticleDetail/ArticleDetail'
  import Pagination from '../Pagination/Pagination'
  import {mapState} from 'vuex'
  export default {
    data() {
      return {
        centerDialogVisible:false,
        activeName: 'first'
      }
    },
    computed:{
      ...mapState(['publishList','currentPage','pageSize','totalPage'])
    },
    mounted(){
      this.publicMethod(true)
    },
    watch:{

      publishList(value){

      }
    },
    components:{
      ArticleDetail,
      Pagination
    },
    methods:{
      handleClick(tab, event) {
        let value = event.target.innerHTML
        if(value === '已发表的学习文章')
          this.publicMethod(true)
        else
          this.publicMethod(false)
      },
      publicMethod(flag){
        let userId = 0
        let pageNum = this.currentPage
        let pageSize = this.pageSize
        this.queryContent(userId,pageNum,pageSize,flag)
      },
      queryContent(userId,pageNum,pageSize,flag){
        if(flag) {
          this.$store.dispatch('getPublishStudy', {userId, pageNum, pageSize})
        }
        else{
          this.$store.dispatch('getPublishTravel',{userId,pageNum,pageSize})
        }
      },
      showPublishInfo(row){
        this.$store.commit('change_article',row)
        this.centerDialogVisible = true
      },
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .publishArticle
    display flex
    flex-flow column
    .setting
      width 60%
      height 540px
      border-radius 5px
      display flex
      flex-flow column
      box-shadow 1px 1px 3px black
      margin 0.3% auto 0 auto
      .userPublishArticle
        margin 0 auto 0 auto
  .userPublishListPagination
    position relative
    margin 0.2% 0 0 45%
</style>
