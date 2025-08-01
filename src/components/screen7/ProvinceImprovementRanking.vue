<template>
  <div class="province-improvement-ranking">
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
      data: ['北京', '上海', '广东', '江苏', '浙江', '山东', '河南', '四川', '湖北', '河北'],
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
        name: '已整改',
        type: 'bar',
        stack: 'completion',
        data: [245, 218, 195, 172, 158, 142, 125, 108, 92, 78],
        barWidth: '60%',
        itemStyle: {
          color: '#66bb6a'
        }
      },
      {
        name: '整改中',
        type: 'bar',
        stack: 'completion',
        data: [38, 32, 28, 25, 22, 19, 16, 14, 12, 10],
        itemStyle: {
          color: '#ffa726'
        }
      },
      {
        name: '未整改',
        type: 'bar',
        stack: 'completion',
        data: [18, 15, 13, 11, 9, 8, 7, 6, 5, 4],
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
.province-improvement-ranking {
  height: 177px;
  width: 100%;
  padding: 10px;
}

.chart {
  height: 100%;
  width: 100%;
}
</style>