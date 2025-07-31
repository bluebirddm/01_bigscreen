<template>
  <div class="block-completion-stats">
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
      data: ['已完成', '进行中', '未开始'],
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
      data: ['信息系统', '电力系统', '金融系统', '政务系统', '医疗系统', '交通系统', '教育系统', '大数据系统'],
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
        rotate: 45
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
        name: '已完成',
        type: 'bar',
        stack: 'completion',
        data: [320, 302, 301, 334, 390, 330, 320, 280],
        barWidth: '60%',
        itemStyle: {
          color: '#4ecdc4'
        }
      },
      {
        name: '进行中',
        type: 'bar',
        stack: 'completion',
        data: [50, 48, 45, 42, 40, 38, 35, 32],
        itemStyle: {
          color: '#feca57'
        }
      },
      {
        name: '未开始',
        type: 'bar',
        stack: 'completion',
        data: [30, 28, 25, 22, 20, 18, 15, 12],
        itemStyle: {
          color: '#ff6b6b'
        }
      }
    ],
    animationDuration: 2000,
    animationEasing: 'cubicOut'
  }
})
</script>

<style scoped>
.block-completion-stats {
  height: 263px;
  width: 100%;
  padding: 10px;
}

.chart {
  height: 100%;
  width: 100%;
}
</style>