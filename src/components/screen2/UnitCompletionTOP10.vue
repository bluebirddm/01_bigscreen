<template>
  <div class="unit-completion-top10">
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
      data: ['深圳市', '北京市', '上海市', '广州市', '杭州市', '成都市', '苏州市', '南京市', '武汉市', '西安市'],
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
    animationDuration: 2000,
    animationEasing: 'cubicOut'
  }
})
</script>

<style scoped>
.unit-completion-top10 {
  height: 100%;
  width: 100%;
  padding: 10px;
}

.chart {
  height: 100%;
  width: 100%;
}
</style>