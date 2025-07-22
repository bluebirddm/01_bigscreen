<template>
  <div class="province-ranking">
    <v-chart class="chart" :option="chartOption" autoresize />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart } from 'echarts/charts'
import { 
  GridComponent,
  TooltipComponent,
  LegendComponent
} from 'echarts/components'
import VChart from 'vue-echarts'

use([
  CanvasRenderer,
  BarChart,
  GridComponent,
  TooltipComponent,
  LegendComponent
])

const chartOption = ref({})

const data = [
  { name: '深圳市', value: 468 },
  { name: '北京市', value: 384 },
  { name: '上海市', value: 302 },
  { name: '广州市', value: 268 },
  { name: '杭州市', value: 194 },
  { name: '成都市', value: 165 },
  { name: '苏州市', value: 134 },
  { name: '南京市', value: 90 },
  { name: '武汉市', value: 71 },
  { name: '西安市', value: 48 }
]

onMounted(() => {
  chartOption.value = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(0, 20, 40, 0.9)',
      borderColor: '#00bfff',
      borderWidth: 1,
      textStyle: {
        color: '#fff'
      }
    },
    grid: {
      left: '5%',
      right: '5%',
      bottom: '5%',
      top: '5%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      show: false
    },
    yAxis: {
      type: 'category',
      data: data.map(item => item.name),
      axisLabel: {
        color: '#8cc8ff',
        fontSize: 10
      },
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      }
    },
    series: [
      {
        type: 'bar',
        data: data.map(item => item.value),
        barWidth: '60%',
        itemStyle: {
          color: function(params) {
            const colorList = [
              '#ff6b6b', '#4ecdc4', '#45b7d1', 
              '#96ceb4', '#ffeaa7', '#dda0dd',
              '#98d8c8', '#f7dc6f', '#bb8fce', 
              '#85c1e9'
            ]
            return colorList[params.dataIndex % colorList.length]
          },
          borderRadius: [0, 4, 4, 0]
        },
        label: {
          show: true,
          position: 'right',
          color: '#fff',
          fontSize: 10,
          formatter: '{c}'
        },
        animationDelay: function(idx) {
          return idx * 100
        }
      }
    ],
    animationEasing: 'elasticOut',
    animationDelayUpdate: function(idx) {
      return idx * 5
    }
  }
})
</script>

<style scoped>
.province-ranking {
  height: 100%;
  width: 100%;
}

.chart {
  height: 100%;
  width: 100%;
}
</style>