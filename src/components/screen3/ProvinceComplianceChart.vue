<template>
  <div class="province-compliance-chart">
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
  TooltipComponent
} from 'echarts/components'
import VChart from 'vue-echarts'

use([
  CanvasRenderer,
  BarChart,
  GridComponent,
  TooltipComponent
])

const chartOption = ref({})

const categories = ['北京', '上海', '广东', '江苏', '浙江', '山东', '四川', '湖北', '河南', '安徽']
const seriesData = [96.8, 95.2, 93.6, 91.4, 89.7, 87.3, 85.8, 83.5, 81.2, 78.9]

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
      },
      formatter: function(params) {
        return `${params[0].name}<br/>${params[0].seriesName}: ${params[0].value}%`
      }
    },
    grid: {
      left: '8%',
      right: '5%',
      bottom: '15%',
      top: '8%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: categories,
      axisLabel: {
        color: '#8cc8ff',
        fontSize: 10,
        rotate: 0,
        interval: 0
      },
      axisLine: {
        lineStyle: {
          color: '#00bfff'
        }
      },
      axisTick: {
        show: false
      }
    },
    yAxis: {
      type: 'value',
      max: 100,
      axisLabel: {
        color: '#8cc8ff',
        fontSize: 10,
        formatter: '{value}%'
      },
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(0, 191, 255, 0.1)',
          type: 'dashed'
        }
      }
    },
    series: [
      {
        name: '省份合规率',
        type: 'bar',
        data: seriesData.map((value, index) => ({
          value: value,
          itemStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 1,
              x2: 0,
              y2: 0,
              colorStops: [
                { offset: 0, color: '#00bfff' },
                { offset: 0.5, color: '#4ecdc4' },
                { offset: 1, color: '#45b7d1' }
              ]
            }
          }
        })),
        barWidth: '60%',
        label: {
          show: true,
          position: 'top',
          formatter: '{c}%',
          color: '#fff',
          fontSize: 10,
          fontWeight: 'bold'
        },
        animationDelay: function(idx) {
          return idx * 100
        }
      }
    ],
    animationEasing: 'elasticOut'
  }
})
</script>

<style scoped>
.province-compliance-chart {
  height: 100%;
  width: 100%;
}

.chart {
  height: 100%;
  width: 100%;
}
</style>