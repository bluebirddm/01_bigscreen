<template>
  <div class="system-ranking">
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

const categories = ['深圳市', '北京市', '上海市', '广州市', '杭州市', '成都市', '苏州市', '南京市', '武汉市', '西安市']
const seriesData = [
  { name: '一级', data: [261, 258, 177, 177, 172, 135, 127, 93, 84, 80] },
  { name: '二级', data: [159, 172, 127, 106, 135, 162, 127, 93, 84, 71] },
  { name: '三级', data: [174, 140, 102, 81, 123, 142, 108, 66, 55, 48] },
  { name: '四级', data: [185, 190, 157, 129, 98, 87, 98, 71, 66, 40] }
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
      }
    },
    legend: {
      data: seriesData.map(item => item.name),
      textStyle: {
        color: '#8cc8ff',
        fontSize: 10
      },
      top: 0,
      left: 'center'
    },
    grid: {
      left: '5%',
      right: '5%',
      bottom: '10%',
      top: '20%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: categories,
      axisLabel: {
        color: '#8cc8ff',
        fontSize: 9,
        rotate: 45
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
          color: 'rgba(0, 191, 255, 0.1)'
        }
      }
    },
    series: seriesData.map((item, index) => ({
      name: item.name,
      type: 'bar',
      data: item.data,
      barWidth: '15%',
      itemStyle: {
        color: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4'][index],
        borderRadius: [2, 2, 0, 0]
      },
      animationDelay: function(idx) {
        return idx * 50 + index * 100
      }
    })),
    animationEasing: 'elasticOut'
  }
})
</script>

<style scoped>
.system-ranking {
  height: 100%;
  width: 100%;
}

.chart {
  height: 100%;
  width: 100%;
}
</style>