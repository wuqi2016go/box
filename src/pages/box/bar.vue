<template>
  <div class="container">
    <button @click="initChart">初始化</button>
    <div class="wrap">
      <mpvue-echarts lazyLoad :echarts="echarts" :onInit="handleInit" ref="echarts" />
    </div>
  </div>
</template>

<script>
  import * as echarts from 'echarts'
  import mpvueEcharts from 'mpvue-echarts'
  let chart = null
  export default {
    data () {
      return {
        option: null,
        echarts
      }
    },
    components: {
      mpvueEcharts
    },
    methods: {
      initChart () {
        let _this = this
        _this.$api.get('/activity/min', {'dmac': 110088809087070}, null, r => {
          var rxpkt = []
          var date = []
          r.data.map(function (item) {
            // let date = _this.$api.formatDate('hh:mm', new Date(item.time * 1000))
            // let obj = [date, item.rxpkt]
            rxpkt.push(item.rxpkt)
            date.push(_this.$api.formatDate('hh:mm', new Date(item.time * 1000)))
          })
          console.log(rxpkt)
          console.log(date)
          _this.option = {
            color: ['#15bbbc', '#ff9920'],
            xAxis: {
              // min: -100,
              // max: 80,
              // type: 'value',
              axisLine: {onZero: false},
              data: date
            },
            yAxis: {
              // min: -30,
              // max: 60,
              // type: 'value',
              axisLine: {onZero: false}
            },
            dataZoom: [
              {
                type: 'slider',
                xAxisIndex: 0,
                filterMode: 'empty'
              },
              {
                type: 'inside',
                xAxisIndex: 0,
                filterMode: 'empty'
              }
            ],
            series: [
              {
                id: 'a',
                type: 'line',
                smooth: true,
                symbolSize: 10,
                data: rxpkt
              }
            ]
          }
          _this.$refs.echarts.init()
        })
      },
      handleInit (canvas, width, height) {
        chart = echarts.init(canvas, null, {
          width: width,
          height: height
        })
        canvas.setChart(chart)
        chart.setOption(this.option)
        return chart
      }
    }
  }
</script>

<style scoped>
  .wrap {
    width: 100%;
    height: 300px;
  }
</style>
