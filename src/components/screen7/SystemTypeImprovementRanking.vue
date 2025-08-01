<template>
  <div class="system-type-improvement-ranking">
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
        fontSize: 10
      }
    },
    legend: {
      data: ['已整改', '整改中', '未整改'],
      top: '5%',
      textStyle: {
        color: '#8cc8ff',
        fontSize: 9
      },
      itemWidth: 8,
      itemHeight: 8
    },
    grid: {
      left: '15%',
      right: '10%',
      top: '20%',
      bottom: '15%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: ['基础设施', '应用系统', '数据库', '网络设备', '工业控制'],
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
        fontSize: 8,
        interval: 0,
        rotate: 0
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
        fontSize: 9
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
        stack: 'completion',
        data: [156, 143, 124, 108, 95],
        barWidth: '60%',
        itemStyle: {
          color: '#66bb6a'
        }
      },
      {
        name: '整改中',
        type: 'bar',
        stack: 'completion',
        data: [32, 28, 24, 20, 18],
        itemStyle: {
          color: '#ffa726'
        }
      },
      {
        name: '未整改',
        type: 'bar',
        stack: 'completion',
        data: [12, 10, 8, 7, 6],
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
.system-type-improvement-ranking {
  height: 263px;
  width: 100%;
  padding: 10px;
}

.chart {
  height: 100%;
  width: 100%;
}
</style>