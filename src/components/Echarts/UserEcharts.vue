<template>
  <div>
    <div ref="eChart" class="eChart">

    </div>
  </div>
</template>

<script>

  export default {
    mounted() {
      this.initCharts();
    },
    methods: {
      initCharts() {
        this.chart = this.$echarts.init(this.$refs.eChart)
        this.setOptions();
      },
      setOptions() {
        this.chart.setOption({

          title: {
            text: 'ECharts 入门示例'
          },
          tooltip: {},
          // xAxis: {
          //   data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
          // },
          // yAxis: {
          //
          // },
          series: [{
            name: '销量',
            type: 'pie',
            data: [
              {value: 15, name: '衬衫'},
              {value: 20, name: '羊毛衫'},
              {value: 36, name: '雪纺衫'},
              {value: 10, name: '高跟鞋'},
              {value: 10, name: '裤子'},
              {value: 10, name: '袜子'}
            ]
          }]
        })
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .eChart
    width 500px
    height 500px
    margin 0 0 0 50px
</style>
