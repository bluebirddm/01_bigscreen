<template>
  <div class="chart-container">
    <v-chart class="chart" :option="chartOption" autoresize />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart } from 'echarts/charts'
import {
  TooltipComponent,
  LegendComponent,
  GridComponent
} from 'echarts/components'
import VChart from 'vue-echarts'
import { commonGridConfig, commonTooltipConfig, commonLegendConfig, commonXAxisConfig, commonYAxisConfig, commonAnimationConfig } from '@/config/chartConfig'

use([
  CanvasRenderer,
  BarChart,
  TooltipComponent,
  LegendComponent,
  GridComponent
])

const chartOption = ref({})

onMounted(() => {
  chartOption.value = {
    backgroundColor: 'transparent',
    tooltip: commonTooltipConfig,
    legend: {
      ...commonLegendConfig,
      data: ['已完成', '进行中', '未开始']
    },
    grid: commonGridConfig,
    xAxis: {
      ...commonXAxisConfig,
      data: ['深圳市', '北京市', '上海市', '广州市', '杭州市', '成都市', '苏州市', '南京市', '武汉市', '西安市']
    },
    yAxis: commonYAxisConfig,
    series: [
      {
        name: '已完成',
        type: 'bar',
        stack: 'completion',
        data: [156, 143, 124, 108, 95, 87, 76, 68, 61, 55],
        barWidth: '60%',
        itemStyle: {
          color: '#00bfff'
        }
      },
      {
        name: '进行中',
        type: 'bar',
        stack: 'completion',
        data: [24, 22, 18, 16, 14, 12, 10, 9, 8, 7],
        itemStyle: {
          color: '#4ecdc4'
        }
      },
      {
        name: '未开始',
        type: 'bar',
        stack: 'completion',
        data: [12, 10, 8, 7, 6, 5, 4, 3, 3, 2],
        itemStyle: {
          color: '#ff6b6b'
        }
      }
    ],
    ...commonAnimationConfig
  }
})
</script>

<style scoped>
/* 使用通用的 chart-container 类，无需额外样式 */
</style>