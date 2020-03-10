<template>
    <div class="SortSetting">
      <el-tabs type="border-card"  @tab-click="handleClick">
        <el-tab-pane label="旅游分类">
          <table class="Sorttable">
            <tr v-for="(arr,index) in arrs" :key="index">
              <td v-for="(item,index) in arr" :key="index" ><el-tag @click="removeSingleSort">{{item}}</el-tag></td>
            </tr>
          </table>
          <hr class="splitHr">
          <div class="addSort">
            <span class="inputSortExist" v-if="sortFlag">{{sortTitle}}</span>
            <div>
              添加分类：<input type="text" class="inputSortVal" v-model="inputSortVal" placeholder="请输入旅游分类">
            </div>
            <div>
              <button class="addButton" @click="add">添 加</button>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="学习分类">
          <table class="Sorttable">
            <tr v-for="(arr,index) in arrs" :key="index">
              <td v-for="(item,index) in arr" :key="index" ><el-tag @click="removeSingleSort">{{item}}</el-tag></td>
            </tr>
          </table>
          <hr class="splitHr">
          <div class="addSort">
            <span class="inputSortExist" v-if="sortFlag">{{sortTitle}}</span>
            <div>
              添加分类：<input type="text" class="inputSortVal" v-model="inputSortVal" placeholder="请输入学习分类">
            </div>
            <div>
              <button class="addButton" @click="add">添 加</button>
            </div>
          </div>

        </el-tab-pane>
      </el-tabs>
    </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    data(){
      return {
        queryUrl:'/query/sort/by/travel',
        delUrl:'/del/sort/by/travel/name',
        addUrl:'/add/sort/by/travel',
        inputSortVal:'',
        sortTitle:'你的添加分类已存在,请重新添加'
      }
    },
    computed:{
      ...mapState(['resultSort','removeFlag','sortFlag','addFlag']),
      arrs(){
        return this.util.splitArr(this.resultSort,8)
      },
    },
    watch:{
      removeFlag(value){
        if(value){
          this.$store.dispatch('queryStudySort',this.queryUrl)
        }
      },
      sortFlag(value){
        if(value){
          setTimeout(()=>{
            this.inputSortVal = ''
            this.sortTitle = '你的添加分类已存在,请重新添加'
            this.$store.commit('sort_flag',false)
          },2000)
        }
      },
      addFlag(value){
        if(value){
          this.open1()
          this.inputSortVal = ''
          this.$store.dispatch('queryStudySort',this.queryUrl)
        }
      }
    },
    mounted(){
      this.$store.dispatch('queryStudySort',this.queryUrl)
    },
    methods:{
      add(){
        this.$store.commit('sort_flag',false)
        this.$store.commit('add_flag',false)
        let sort = {"sort":this.inputSortVal}
        let url = this.addUrl
        if(this.inputSortVal === ''){
          this.sortTitle = '你还没有输入，请输入后在提交'
          this.$store.commit('sort_flag',true)
          return
        }
        this.$store.dispatch('addSort',{sort,url})
      },
      handleClick(tab, event) {
       if(event.target.innerHTML === '学习分类'){
         this.queryUrl = '/query/sort/by/study'
         this.delUrl = '/del/sort/by/study/name'
         this.addUrl = '/add/sort/by/study'
         this.$store.dispatch('queryStudySort',this.queryUrl)
       }else{
         this.queryUrl = '/query/sort/by/travel'
         this.delUrl = '/del/sort/by/travel/name'
         this.addUrl = '/add/sort/by/travel'
         this.$store.dispatch('queryStudySort',this.queryUrl)
       }
      },
      removeSingleSort(){
        let val = event.target.innerHTML
        this.open(val)
      },
      open1() {
        this.$message({
          message: '恭喜你，操作成功',
          type: 'success'
        });
      },
      open(val) {
        this.$store.commit('remove_flag',false)
        this.$confirm('是否将该分类进行移除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let sortName = val
          let url = this.delUrl
          this.$store.dispatch('delSortByName',{sortName,url})

          this.$message({
            type: 'success',
            message: '删除成功!'
          });

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
    },

  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
.SortSetting
  width 60%
  margin 1% 0 0 20%
  box-shadow 1px 1px 3px black
  border-radius 5px
  .Sorttable
    font-size 21px
    margin 0 auto 2% auto
  .splitHr
    width 60%
    color grey
    margin 0 auto 2% auto
  .addSort
    width 60%
    height 5%
    margin 0 auto 2% auto
    .inputSortExist
      color red
      margin 0 auto 2% auto
    .inputSortVal
      width 50%
      height 20px
      font-size 20px
    .addButton
      margin 3% 0 0 53%
      width 15%
      border none
      color white
      font-size 21px
      border-radius 3%
      background-color #3366FF
</style>
