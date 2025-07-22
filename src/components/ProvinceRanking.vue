<template>
  <div class="province-ranking">
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
  { name: '一级', data: [120, 98, 80, 70, 50, 42, 35, 25, 20, 15], color: '#00bfff' },
  { name: '二级', data: [200, 180, 150, 120, 90, 80, 65, 45, 35, 25], color: '#4ecdc4' },
  { name: '三级', data: [100, 80, 60, 60, 40, 35, 25, 15, 12, 6], color: '#45b7d1' },
  { name: '四级', data: [30, 20, 10, 15, 12, 6, 7, 4, 3, 2], color: '#ffd700' },
  { name: '未定级', data: [18, 6, 2, 3, 2, 2, 2, 1, 1, 0], color: '#ff6b6b' }
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
      top: 5,
      left: 'center',
      itemGap: 15
    },
    grid: {
      left: '8%',
      right: '5%',
      bottom: '15%',
      top: '25%',
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
      max: 500,
      interval: 50,
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
          color: 'rgba(0, 191, 255, 0.1)',
          type: 'dashed'
        }
      }
    },
    series: seriesData.map((item, index) => ({
      name: item.name,
      type: 'bar',
      stack: 'total',
      data: item.data,
      barWidth: '50%',
      itemStyle: {
        color: item.color
      },
      label: {
        show: index === seriesData.length - 1,
        position: 'top',
        formatter: function(params) {
          // 计算总和
          let total = 0;
          seriesData.forEach(series => {
            total += series.data[params.dataIndex] || 0;
          });
          return total;
        },
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold'
      },
      animationDelay: function(idx) {
        return idx * 100 + index * 50
      }
    })),
    animationEasing: 'elasticOut'
  }
})
</script>

<style scoped>
.province-ranking {
  height: 100%;
  width: 100%;
}

.chart {
  height: 100%;
  width: 100%;
}
</style>