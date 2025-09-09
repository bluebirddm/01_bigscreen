<template>
  <div class="unit-problem-ranking">
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
      data: ['高风险', '中风险', '低风险'],
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
      data: ['北京分公司', '上海分公司', '广东分公司', '江苏分公司', '浙江分公司', '山东分公司', '河南分公司', '湖北分公司'],
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
        name: '高风险',
        type: 'bar',
        stack: 'problem',
        data: [45, 42, 38, 35, 32, 28, 25, 22],
        barWidth: '60%',
        itemStyle: {
          color: '#ff4757'
        }
      },
      {
        name: '中风险',
        type: 'bar',
        stack: 'problem',
        data: [125, 118, 106, 98, 87, 76, 68, 60],
        itemStyle: {
          color: '#ffa726'
        }
      },
      {
        name: '低风险',
        type: 'bar',
        stack: 'problem',
        data: [186, 176, 158, 146, 130, 114, 102, 90],
        itemStyle: {
          color: '#66bb6a'
        }
      }
    ],
    animationDuration: 2000,
    animationEasing: 'cubicOut'
  }
})
</script>

<style scoped>
.unit-problem-ranking {
  height: 263px;
  width: 100%;
  padding: 10px;
}

.chart {
  height: 100%;
  width: 100%;
}
</style>