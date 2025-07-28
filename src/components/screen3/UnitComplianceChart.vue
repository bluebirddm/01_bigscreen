<template>
  <div class="unit-compliance-chart">
    <v-chart class="chart" :option="chartOption" autoresize />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart } from 'echarts/charts'
import { 
  GridComponent,
  TooltipComponent
} from 'echarts/components'
import VChart from 'vue-echarts'

use([
  CanvasRenderer,
  BarChart,
  GridComponent,
  TooltipComponent
])

const chartOption = ref({})

const categories = ['国电集团', '华能集团', '大唐集团', '华电集团', '中电投', '神华集团', '中核集团', '中广核', '三峡集团', '国家电网']
const seriesData = [94.2, 91.8, 89.5, 87.3, 85.6, 83.2, 81.7, 79.4, 76.8, 74.5]

onMounted(() => {
  chartOption.value = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(0, 20, 40, 0.9)',
      borderColor: '#00bfff',
      borderWidth: 1,
      textStyle: {
        color: '#fff'
      },
      formatter: function(params) {
        return `${params[0].name}<br/>${params[0].seriesName}: ${params[0].value}%`
      }
    },
    grid: {
      left: '15%',
      right: '8%',
      bottom: '8%',
      top: '8%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      max: 100,
      axisLabel: {
        color: '#8cc8ff',
        fontSize: 10,
        formatter: '{value}%'
      },
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
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
      data: categories,
      axisLabel: {
        color: '#8cc8ff',
        fontSize: 10
      },
      axisLine: {
        lineStyle: {
          color: '#00bfff'
        }
      },
      axisTick: {
        show: false
      }
    },
    series: [
      {
        name: '合规完成率',
        type: 'bar',
        data: seriesData.map((value, index) => ({
          value: value,
          itemStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 1,
              y2: 0,
              colorStops: [
                { offset: 0, color: '#00bfff' },
                { offset: 0.5, color: '#4ecdc4' },
                { offset: 1, color: '#45b7d1' }
              ]
            }
          }
        })),
        barWidth: '60%',
        label: {
          show: true,
          position: 'right',
          formatter: '{c}%',
          color: '#fff',
          fontSize: 10,
          fontWeight: 'bold'
        },
        animationDelay: function(idx) {
          return idx * 100
        }
      }
    ],
    animationEasing: 'elasticOut'
  }
})
</script>

<style scoped>
.unit-compliance-chart {
  height: 250px;
  max-height: 250px;
  width: 100%;
  margin: 0 auto;
}

.chart {
  height: 100%;
  width: 100%;
}
</style>