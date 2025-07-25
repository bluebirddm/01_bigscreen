<template>
  <div class="compliance-distribution-chart">
    <v-chart class="chart" :option="chartOption" autoresize />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { PieChart } from 'echarts/charts'
import { 
  TooltipComponent,
  LegendComponent
} from 'echarts/components'
import VChart from 'vue-echarts'

use([
  CanvasRenderer,
  PieChart,
  TooltipComponent,
  LegendComponent
])

const chartOption = ref({})

const pieData = [
  { value: 342, name: '网络安全问题', itemStyle: { color: '#00bfff' } },
  { value: 289, name: '数据安全问题', itemStyle: { color: '#4ecdc4' } },
  { value: 256, name: '应用安全问题', itemStyle: { color: '#45b7d1' } },
  { value: 198, name: '物理安全问题', itemStyle: { color: '#ffd700' } },
  { value: 167, name: '管理安全问题', itemStyle: { color: '#ff6b6b' } },
  { value: 128, name: '其他安全问题', itemStyle: { color: '#9370db' } }
]

onMounted(() => {
  chartOption.value = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(0, 20, 40, 0.9)',
      borderColor: '#00bfff',
      borderWidth: 1,
      textStyle: {
        color: '#fff'
      },
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      left: '65%',
      top: 'center',
      data: pieData.map(item => item.name),
      textStyle: {
        color: '#8cc8ff',
        fontSize: 10
      },
      itemGap: 8,
      itemWidth: 10,
      itemHeight: 10
    },
    series: [
      {
        name: '安全问题分布',
        type: 'pie',
        radius: ['35%', '65%'],
        center: ['35%', '50%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '14',
            fontWeight: 'bold',
            color: '#fff'
          },
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 191, 255, 0.5)'
          }
        },
        labelLine: {
          show: false
        },
        data: pieData,
        animationType: 'expansion',
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
.compliance-distribution-chart {
  height: 100%;
  width: 100%;
}

.chart {
  height: 100%;
  width: 100%;
}
</style>