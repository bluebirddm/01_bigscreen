<template>
  <div class="security-category-improvement">
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
        fontSize: 11
      }
    },
    legend: {
      data: ['已整改', '整改中', '未整改'],
      top: '5%',
      textStyle: {
        color: '#8cc8ff',
        fontSize: 10
      },
      itemWidth: 10,
      itemHeight: 10
    },
    grid: {
      left: '10%',
      right: '5%',
      top: '20%',
      bottom: '15%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: ['物理安全', '网络安全', '应用安全', '数据安全', '设备安全', '计算安全', '管理安全', '应急安全'],
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
        name: '已整改',
        type: 'bar',
        stack: 'improvement',
        data: [143, 125, 98, 61, 53, 37, 31, 30],
        barWidth: '50%',
        itemStyle: {
          color: '#66bb6a'
        }
      },
      {
        name: '整改中',
        type: 'bar',
        stack: 'improvement',
        data: [36, 32, 28, 24, 20, 16, 12, 8],
        itemStyle: {
          color: '#ffa726'
        }
      },
      {
        name: '未整改',
        type: 'bar',
        stack: 'improvement',
        data: [8, 7, 6, 5, 4, 3, 2, 1],
        itemStyle: {
          color: '#ff5252'
        }
      }
    ],
    animationDuration: 2000,
    animationEasing: 'cubicOut'
  }
})
</script>

<style scoped>
.security-category-improvement {
  height: 100%;
  width: 100%;
  padding: 10px;
}

.chart {
  height: 100%;
  width: 100%;
}
</style>