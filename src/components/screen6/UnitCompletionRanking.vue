<template>
  <div class="unit-completion-ranking">
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
import { commonGridConfig } from '@/config/chartConfig'

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
    grid: commonGridConfig,
    xAxis: {
      type: 'category',
      data: ['北京', '上海', '广东', '浙江', '江苏', '山东', '河南', '湖北', '四川', '河北'],
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
        data: [200, 180, 165, 155, 142, 128, 118, 106, 98, 85],
        barWidth: '60%',
        itemStyle: {
          color: '#00bfff'
        }
      },
      {
        name: '进行中',
        type: 'bar',
        stack: 'completion',
        data: [30, 28, 25, 22, 20, 18, 16, 14, 12, 10],
        itemStyle: {
          color: '#feca57'
        }
      },
      {
        name: '未开始',
        type: 'bar',
        stack: 'completion',
        data: [20, 18, 15, 13, 11, 9, 8, 7, 6, 5],
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
.unit-completion-ranking {
  height: 263px;
  width: 100%;
  padding: 10px;
}

.chart {
  height: 100%;
  width: 100%;
}
</style>