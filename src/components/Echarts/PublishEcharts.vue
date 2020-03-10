<template>
    <div>
      <div ref="publishEChart" class="eChart">

      </div>
    </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default {

    data(){
      return {
        data1:["周一","周二","周三","周四","周五","周六","周日"],
        data2:[1,2,3,4,5,6,7],
        options: {
          title: {
            text: '近7天登录数'
          },
          tooltip: {},
          xAxis: {
            data: ["周一","周二","周三","周四","周五","周六","周日"]
          },
          yAxis: {},
          series: [{
            name: '登录数',
            type: 'line',
            color: '#6495ED',
            data: [1,2,3,4,5,6,7]
          }]
        }
      }
    },
    watch:{
      weekArr(value){
        this.options.xAxis.data = value
      },
      userLoginCount(value){
        this.options.series[0].data = value
        this.initCharts()
      }
    },
    computed:{
      ...mapState(['weekArr','userLoginCount'])
    },
    mounted() {
      this.$store.dispatch('queryUserLogin')
      this.initCharts();
    },
    methods: {
      initCharts() {
        this.chart = this.$echarts.init(this.$refs.publishEChart);
        this.setOptions();
      },
      setOptions() {
        this.chart.setOption(this.options)
      },

    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .eChart
    display flex
    width 1000px
    height 400px
    margin-top 70px
</style>
