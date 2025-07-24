<template>
  <div class="institution-quality-ranking">
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
      },
      formatter: function(params) {
        return `${params[0].name}<br/>质量评分: ${params[0].value}分`
      }
    },
    grid: {
      left: '20%',
      right: '10%',
      top: '10%',
      bottom: '15%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      min: 0,
      max: 100,
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
    yAxis: {
      type: 'category',
      data: [
        '中安网信', '奇安信', '绿盟科技', '启明星辰', 
        '深信服', '安恒信息', '山石网科', '天融信', 
        '亚信安全', '卫达安全'
      ].reverse(),
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
        interval: 0
      }
    },
    series: [
      {
        type: 'bar',
        data: [96.5, 94.2, 92.8, 91.3, 89.7, 88.4, 86.9, 85.2, 83.6, 81.9].reverse(),
        barWidth: '60%',
        itemStyle: {
          color: function(params) {
            // 根据分数设置颜色
            const score = params.value
            if (score >= 95) return '#4caf50'
            if (score >= 90) return '#8bc34a'
            if (score >= 85) return '#ffeb3b'
            if (score >= 80) return '#ff9800'
            return '#f44336'
          }
        },
        label: {
          show: true,
          position: 'right',
          color: '#fff',
          fontSize: 9,
          formatter: '{c}'
        }
      }
    ],
    animationDuration: 2000,
    animationEasing: 'cubicOut'
  }
})
</script>

<style scoped>
.institution-quality-ranking {
  height: 100%;
  width: 100%;
  padding: 10px;
}

.chart {
  height: 100%;
  width: 100%;
}
</style>