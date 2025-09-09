<template>
  <div class="unit-risk-status">
    <v-chart class="chart" :option="chartOption" autoresize />
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart } from 'echarts/charts'
import {
  TooltipComponent,
  LegendComponent,
  GridComponent
} from 'echarts/components'
import VChart from 'vue-echarts'
import { commonGridConfig } from '@/config/chartConfig'

use([
  CanvasRenderer,
  BarChart,
  TooltipComponent,
  LegendComponent,
  GridComponent
])

const chartOption = ref({})

onMounted(async () => {
  await nextTick()
  
  // 延迟初始化确保DOM完全渲染
  setTimeout(() => {
  chartOption.value = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      backgroundColor: 'rgba(0, 20, 40, 0.9)',
      borderColor: '#00bfff',
      borderWidth: 1,
      textStyle: {
        color: '#fff',
        fontSize: 10
      }
    },
    legend: {
      data: ['高风险', '中风险', '低风险'],
      top: '5%',
      textStyle: {
        color: '#8cc8ff',
        fontSize: 10
      },
      itemWidth: 10,
      itemHeight: 10
    },
    grid: commonGridConfig,
    xAxis: {
      type: 'category',
      data: ['北京电力', '国华', '国电', '宁夏', '国神', '湖北', '江苏', '山西'],
      axisLine: {
        lineStyle: {
          color: 'rgba(0, 191, 255, 0.3)'
        }
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        color: '#8cc8ff',
        fontSize: 9,
        interval: 0,
        rotate: 30
      }
    },
    yAxis: {
      type: 'value',
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        color: '#8cc8ff',
        fontSize: 10
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
        name: '高风险',
        type: 'bar',
        stack: 'risk',
        data: [86, 76, 65, 57, 49, 42, 36, 31],
        barWidth: '60%',
        itemStyle: {
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: '#06F8CD' },
              { offset: 1, color: '#000000' }
            ]
          }
        }
      },
      {
        name: '中风险',
        type: 'bar',
        stack: 'risk',
        data: [126, 112, 96, 84, 72, 62, 53, 45],
        itemStyle: {
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: '#FAB302' },
              { offset: 1, color: '#000000' }
            ]
          }
        }
      },
      {
        name: '低风险',
        type: 'bar',
        stack: 'risk',
        data: [68, 60, 52, 45, 39, 33, 28, 24],
        itemStyle: {
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: '#F1061F' },
              { offset: 1, color: '#000000' }
            ]
          }
        }
      }
    ],
    animationDuration: 2000,
    animationEasing: 'cubicOut'
  }
  }, 100) // 延迟100ms初始化
})
</script>

<style scoped>
.unit-risk-status {
  height: 263px;
  width: 100%;
  padding: 10px;
}

.chart {
  height: 100%;
  width: 100%;
}
</style>