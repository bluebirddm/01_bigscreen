<template>
  <div class="yearly-inspection-chart">
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

const years = ['2020', '2021', '2022', '2023', '2024', '2025']
const seriesData = [
  { name: '规划数', data: [220, 250, 280, 310, 350, 380], color: '#00bfff' },
  { name: '检查数', data: [180, 210, 240, 265, 290, 315], color: '#66bb6a' }
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
      data: years,
      axisLabel: {
        color: '#8cc8ff',
        fontSize: 12
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
        fontSize: 12
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
    series: seriesData.map(item => ({
      name: item.name,
      type: 'bar',
      barWidth: '30%',
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
.yearly-inspection-chart {
  height: 263px;
  width: 100%;
}

.chart {
  height: 100%;
  width: 100%;
}
</style>