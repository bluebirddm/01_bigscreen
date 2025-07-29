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

const categories = ['龙源电力', '国华', '国电', '宁夏', '国神', '湖北', '江苏', '广东', '山西']
const seriesData = [
  { name: '一级', data: [98, 46, 51, 12, 13, 14, 20, 21, 8], color: '#00bfff' },
  { name: '二级', data: [500, 300, 200, 60, 50, 40, 35, 30, 25], color: '#4ecdc4' },
  { name: '三级', data: [100, 100, 100, 30, 30, 30, 25, 20, 15], color: '#45b7d1' },
  { name: '四级', data: [0, 0, 30, 0, 0, 0, 0, 0, 0], color: '#ffd700' },
  { name: '未定级', data: [0, 0, 0, 0, 0, 0, 0, 0, 0], color: '#ff6b6b' }
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
      itemGap: 15,
      selectedMode: false
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
      max: 800,
      interval: 100,
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
.system-ranking {
  height: 263px;
  width: 100%;
}

.chart {
  height: 100%;
  width: 100%;
}
</style>