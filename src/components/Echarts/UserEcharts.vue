<template>
  <div>
    <div ref="eChart" class="eChart">

    </div>
  </div>
</template>

<script>

  export default {
    data(){
      return {
        options:{
          title: {
            text: '周发表量'
          },
          tooltip: {},
          series: [{
            name: '发表',
            type: 'pie',
            data: [
              {value: 15, name: '周一'},
              {value: 20, name: '周二'},
              {value: 36, name: '周三'},
              {value: 30, name: '周四'},
              {value: 2000, name: '周五'},
              {value: 10, name: '周六'}
            ]
          }]
        }
      }
    },
    mounted() {
      this.initCharts();
    },
    methods: {
      initCharts() {
        this.chart = this.$echarts.init(this.$refs.eChart)
        this.setOptions();
      },
      setOptions() {
        this.chart.setOption(this.options)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .eChart
    width 400px
    height 400px
    margin 70px 0 0 81px
</style>
