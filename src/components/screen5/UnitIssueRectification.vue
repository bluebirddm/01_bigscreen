<template>
  <div class="unit-issue-rectification">
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
      data: ['已整改', '整改中', '未整改'],
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
        name: '已整改',
        type: 'bar',
        stack: 'rectification',
        data: [186, 165, 142, 124, 107, 91, 78, 67],
        barWidth: '60%',
        itemStyle: {
          color: '#66bb6a'
        }
      },
      {
        name: '整改中',
        type: 'bar',
        stack: 'rectification',
        data: [72, 64, 55, 48, 41, 35, 30, 26],
        itemStyle: {
          color: '#ffa726'
        }
      },
      {
        name: '未整改',
        type: 'bar',
        stack: 'rectification',
        data: [22, 19, 17, 15, 13, 11, 9, 8],
        itemStyle: {
          color: '#ff5252'
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
.unit-issue-rectification {
  height: 263px;
  width: 100%;
  padding: 10px;
}

.chart {
  height: 100%;
  width: 100%;
}
</style>