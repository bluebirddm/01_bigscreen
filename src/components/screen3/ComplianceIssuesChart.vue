<template>
  <div class="compliance-issues-chart">
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

const categories = ['网络安全', '数据安全', '应用安全', '物理安全', '管理安全', '人员安全', '运维安全', '业务安全']
const seriesData = [
  { name: '高风险', data: [32, 28, 24, 15, 18, 12, 16, 10], color: '#ff6b6b' },
  { name: '中风险', data: [58, 52, 48, 35, 42, 28, 36, 24], color: '#ffd700' },
  { name: '低风险', data: [89, 76, 68, 52, 65, 48, 58, 42], color: '#4ecdc4' },
  { name: '已解决', data: [156, 142, 128, 96, 118, 89, 106, 78], color: '#00bfff' }
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
        fontSize: 10,
        rotate: 0,
        interval: 0
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
      max: 400,
      interval: 50,
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
        fontSize: 11,
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
.compliance-issues-chart {
  height: 220px;
  max-height: 220px;
  width: 100%;
  margin: 0 auto;
}

.chart {
  height: 100%;
  width: 100%;
}
</style>