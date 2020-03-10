<template>
    <div>
      <textarea class="textarea" style="resize: none" rows="9" cols="48">{{singleArticle.sourceContent}}</textarea>
      <div class="showImg">
        <el-carousel height="150px" indicator-position="none">
          <el-carousel-item v-for="(item,index) in singleArticle.sourceImg" :key="index" >
            <img :src="item" alt="" class="PublishImg">
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="publishUrl" v-if="singleArticle.sourceUrls !== ''">
        URL连接：<a class="urlSource" :href="singleArticle.sourceUrls" target="_blank">{{singleArticle.sourceUrls}}</a>
        提取码：{{singleArticle.sourceUrlsPwd}}
      </div>
      <div class="isFree" v-if="singleArticle.sourceTicket !== ''">
        <div class="free">
          免费:
        </div>
        <div>{{publishImgSortArrs(singleArticle.sourceTicket)}}</div>
      </div>
      <div class="sortAndTag">
        <div class="sort">
          类别:
        </div>
        <div>{{publishImgSortArrs(singleArticle.sourceSorts)}}</div>
      </div>
      <div class="address" v-if="singleArticle.sourceAddress !== '' ">
        <div class="addr">
          地址:
        </div>
        <div>{{publishImgSortArrs(singleArticle.sourceAddress)}}</div>
      </div>
    </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default {

    computed:{
      ...mapState(['singleArticle']),
      publishImgSortArrs(){
        return function(value){
          let result = '';
          for(let i = 0 ; i < value.length; i++){
            result = result + " " + value[i]
          }
          console.log(result)
          return result
        }
      }
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .showImg
    margin-top 10px
    .PublishImg
      width 100%
      height 150px
  .publishUrl
    width 100%
    height 60px
    border 1px solid gray
    margin-top 10px
    .urlSource
      margin-left 4%
  .isFree
    display flex
    width 100%
    margin-top 10px
    border 1px solid gray
    .free
      height 20px
  .sortAndTag
    display flex
    width 100%
    margin-top 10px
    border 1px solid gray
    .sort
      height 20px
  .address
    display flex
    width 100%
    margin-top 10px
    border 1px solid gray
    .addr
      height 20px

</style>
