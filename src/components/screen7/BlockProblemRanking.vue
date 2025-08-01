<template>
  <div class="block-problem-ranking">
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

const categories = ['发电板块', '电网板块', '煤炭板块', '金融板块', '科技板块', '产业板块', '国际板块', '其他板块']
const seriesData = [
  { name: '已整改', data: [189, 167, 145, 132, 118, 105, 92, 78], color: '#66bb6a' },
  { name: '整改中', data: [45, 42, 38, 35, 31, 28, 24, 21], color: '#ffa726' },
  { name: '未整改', data: [18, 16, 14, 12, 11, 9, 8, 6], color: '#ff5252' }
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
        color: '#fff',
        fontSize: 11
      },
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: seriesData.map(item => item.name),
      textStyle: {
        color: '#8cc8ff',
        fontSize: 11
      },
      top: 10,
      right: 20,
      itemGap: 15,
      itemWidth: 12,
      itemHeight: 12
    },
    grid: {
      left: '10%',
      right: '5%',
      bottom: '12%',
      top: '20%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: categories,
      axisLabel: {
        color: '#8cc8ff',
        fontSize: 10,
        rotate: 30,
        interval: 0
      },
      axisLine: {
        lineStyle: {
          color: 'rgba(0, 191, 255, 0.3)'
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
        fontSize: 10
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
      },
      animationDelay: function(idx) {
        return idx * 50 + index * 100
      }
    })),
    animationEasing: 'elasticOut',
    animationDuration: 1500
  }
})
</script>

<style scoped>
.block-problem-ranking {
  height: 263px;
  width: 100%;
  padding: 10px;
}

.chart {
  height: 100%;
  width: 100%;
}
</style>