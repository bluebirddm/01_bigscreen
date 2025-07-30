<template>
  <div class="unit-inspection-conclusion">
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
  TooltipComponent,
  LegendComponent
} from 'echarts/components'
import VChart from 'vue-echarts'

use([
  CanvasRenderer,
  BarChart,
  GridComponent,
  TooltipComponent,
  LegendComponent
])

const chartOption = ref({})

const categories = ['龙源电力', '国华', '国电', '宁夏', '国神', '湖北', '江苏', '广东', '山西']
const seriesData = [
  { name: '符合', data: [320, 300, 280, 260, 240, 220, 200, 180, 160], color: '#66bb6a' },
  { name: '部分符合', data: [120, 110, 100, 90, 80, 70, 60, 50, 40], color: '#ffa726' },
  { name: '不符合', data: [30, 25, 20, 15, 12, 10, 8, 6, 5], color: '#ff5252' }
]

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
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: seriesData.map(item => item.name),
      textStyle: {
        color: '#8cc8ff',
        fontSize: 12
      },
      top: 10,
      right: 20,
      itemGap: 15
    },
    grid: {
      left: '10%',
      right: '5%',
      bottom: '15%',
      top: '20%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: categories,
      axisLabel: {
        color: '#8cc8ff',
        fontSize: 11,
        rotate: 0
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
    yAxis: {
      type: 'value',
      axisLabel: {
        color: '#8cc8ff',
        fontSize: 11
      },
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(0, 191, 255, 0.1)'
        }
      }
    },
    series: seriesData.map((item, index) => ({
      name: item.name,
      type: 'bar',
      barWidth: '20%',
      barGap: '20%',
      data: item.data,
      itemStyle: {
        color: item.color,
        borderRadius: [4, 4, 0, 0]
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowColor: 'rgba(0, 191, 255, 0.5)'
        }
      }
    }))
  }
})
</script>

<style scoped>
.unit-inspection-conclusion {
  height: 263px;
  width: 100%;
}

.chart {
  height: 100%;
  width: 100%;
}
</style>