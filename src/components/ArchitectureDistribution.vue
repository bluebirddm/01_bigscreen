<template>
  <div class="architecture-distribution">
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

const data = [
  { value: 35, name: '微服务架构', color: '#ff6b6b' },
  { value: 25, name: '单体架构', color: '#4ecdc4' },
  { value: 20, name: '分布式架构', color: '#45b7d1' },
  { value: 15, name: '云原生架构', color: '#96ceb4' },
  { value: 5, name: '其他架构', color: '#ffeaa7' }
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
      orient: 'horizontal',
      bottom: 0,
      textStyle: {
        color: '#8cc8ff',
        fontSize: 10
      },
      data: data.map(item => item.name)
    },
    series: [
      {
        name: '系统架构',
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['50%', '45%'],
        avoidLabelOverlap: false,
        label: {
          show: true,
          position: 'outside',
          color: '#fff',
          fontSize: 10,
          formatter: '{b}\n{d}%'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 12,
            fontWeight: 'bold'
          },
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        },
        labelLine: {
          show: true,
          lineStyle: {
            color: '#8cc8ff'
          }
        },
        data: data.map((item, index) => ({
          value: item.value,
          name: item.name,
          itemStyle: {
            color: item.color,
            borderWidth: 2,
            borderColor: 'rgba(0, 191, 255, 0.3)'
          }
        })),
        animationType: 'scale',
        animationEasing: 'elasticOut',
        animationDelay: function(idx) {
          return Math.random() * 200
        }
      }
    ]
  }
})
</script>

<style scoped>
.architecture-distribution {
  height: 100%;
  width: 100%;
}

.chart {
  height: 100%;
  width: 100%;
}
</style>