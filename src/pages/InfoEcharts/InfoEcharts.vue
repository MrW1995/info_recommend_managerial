<template>
    <div class="InfoEcharts">
    <!--  <UserEcharts></UserEcharts>-->
      <div class="setting">
        <PublishEcharts></PublishEcharts>
      </div>
    </div>
</template>

<script>
  import UserEcharts from '../../components/Echarts/UserEcharts'
  import PublishEcharts from '../../components/Echarts/PublishEcharts'
  export default {
    components:{
      UserEcharts,
      PublishEcharts
    }

  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .InfoEcharts
    display flex
    .setting
      display flex
      margin auto
</style>
