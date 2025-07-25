<template>
  <div class="compliance-work-status">
    <v-chart class="chart" :option="chartOption" autoresize />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { PictorialBarChart } from 'echarts/charts'
import { 
  GridComponent,
  TooltipComponent,
  LegendComponent
} from 'echarts/components'
import VChart from 'vue-echarts'

use([
  CanvasRenderer,
  PictorialBarChart,
  GridComponent,
  TooltipComponent,
  LegendComponent
])

const chartOption = ref({})

// 合规工作类型图标路径
const pathSymbols = {
  security: 'path://M8,2 L16,8 L8,14 L8,2 Z M6,2 L6,14 L2,10 L6,6 L6,2 Z',
  audit: 'path://M12,2 C6.48,2 2,6.48 2,12 C2,17.52 6.48,22 12,22 C17.52,22 22,17.52 22,12 C22,6.48 17.52,2 12,2 Z M10,17 L5,12 L6.41,10.59 L10,14.17 L17.59,6.58 L19,8 L10,17 Z',
  assessment: 'path://M12,2 A10,10 0 0,0 2,12 A10,10 0 0,0 12,22 A10,10 0 0,0 22,12 A10,10 0 0,0 12,2 Z M11,17 H13 V19 H11 V17 Z M13,13 V15 H11 C11,13.31 11,12.74 11.29,12.18 C11.6,11.57 12.12,11.07 12.84,10.28 C14.1,9.04 14.5,8.43 14.5,7.5 C14.5,6.4 13.6,5.5 12.5,5.5 A3,3 0 0,0 9.5,8.5 H7.5 C7.5,6.19 9.69,4 12.5,4 C15.31,4 17.5,6.19 17.5,8.5 C17.5,10.38 16.44,11.19 15.56,12.06 L14.5,13 H13 Z',
  crypto: 'path://M6,2 L18,2 C19.1,2 20,2.9 20,4 L20,20 C20,21.1 19.1,22 18,22 L6,22 C4.9,22 4,21.1 4,20 L4,4 C4,2.9 4.9,2 6,2 Z M12,4 A4,4 0 0,0 8,8 C8,10.1 9.9,12 12,12 A4,4 0 0,0 16,8 A4,4 0 0,0 12,4 Z M12,14 C9.33,14 4,15.33 4,18 L4,20 L20,20 L20,18 C20,15.33 14.67,14 12,14 Z',
  monitor: 'path://M12,2 A2,2 0 0,1 14,4 A2,2 0 0,1 12,6 A2,2 0 0,1 10,4 A2,2 0 0,1 12,2 M21,9 V7 L18.5,5.5 C18.5,5.19 18.5,4.81 18.5,4.5 L21,3 V1 L18.5,2.5 C18.1,2.15 17.64,1.88 17.14,1.73 L16.5,1.5 L15.5,0.5 L14.5,1.5 L13.86,1.73 C13.36,1.88 12.9,2.15 12.5,2.5 L10,1 V3 L12.5,4.5 C12.5,4.81 12.5,5.19 12.5,5.5 L10,7 V9 L12.5,7.5 C12.9,7.85 13.36,8.12 13.86,8.27 L14.5,8.5 L15.5,9.5 L16.5,8.5 L17.14,8.27 C17.64,8.12 18.1,7.85 18.5,7.5 L21,9 M7,10 L17,10 L17,12 L7,12 L7,10 M7,14 L17,14 L17,16 L7,16 L7,14 M7,18 L17,18 L17,20 L7,20 L7,18 Z'
}

onMounted(() => {
  chartOption.value = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'none'
      },
      backgroundColor: 'rgba(0, 20, 40, 0.9)',
      borderColor: '#00bfff',
      borderWidth: 1,
      textStyle: {
        color: '#fff'
      },
      formatter: function (params) {
        return `${params[0].name}: ${params[0].value}项`
      }
    },
    xAxis: {
      type: 'category',
      data: ['等保测评', '技术监督', '风险评估', '密码评估', '合规监测'],
      axisTick: { show: false },
      axisLine: { show: false },
      axisLabel: {
        color: '#8cc8ff',
        fontSize: 11,
        interval: 0,
        rotate: 0
      }
    },
    yAxis: {
      type: 'value',
      splitLine: { show: false },
      axisTick: { show: false },
      axisLine: { show: false },
      axisLabel: { show: false }
    },
    color: ['#00bfff'],
    series: [
      {
        name: 'background',
        type: 'pictorialBar',
        barCategoryGap: '-130%',
        symbol: 'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z',
        itemStyle: {
          color: 'rgba(0, 191, 255, 0.1)'
        },
        emphasis: {
          itemStyle: {
            color: 'rgba(0, 191, 255, 0.2)'
          }
        },
        data: [200, 150, 120, 80, 100],
        z: 5
      },
      {
        name: 'work-icons',
        type: 'pictorialBar',
        barGap: '-100%',
        symbolPosition: 'end',
        symbolSize: 30,
        symbolOffset: [0, '-150%'],
        data: [
          {
            value: 156,
            symbol: pathSymbols.security,
            symbolSize: [35, 35],
            itemStyle: { color: '#00bfff' }
          },
          {
            value: 128,
            symbol: pathSymbols.audit,
            symbolSize: [32, 32],
            itemStyle: { color: '#4ecdc4' }
          },
          {
            value: 98,
            symbol: pathSymbols.assessment,
            symbolSize: [30, 30],
            itemStyle: { color: '#45b7d1' }
          },
          {
            value: 64,
            symbol: pathSymbols.crypto,
            symbolSize: [28, 28],
            itemStyle: { color: '#ffd700' }
          },
          {
            value: 89,
            symbol: pathSymbols.monitor,
            symbolSize: [30, 30],
            itemStyle: { color: '#ff6b6b' }
          }
        ],
        z: 10
      }
    ],
    animationEasing: 'elasticOut',
    animationDelay: function(idx) {
      return idx * 200
    }
  }
})
</script>

<style scoped>
.compliance-work-status {
  height: 100%;
  width: 100%;
}

.chart {
  height: 100%;
  width: 100%;
}
</style>