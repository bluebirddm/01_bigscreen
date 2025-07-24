<template>
  <div class="security-issues-distribution">
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

onMounted(() => {
  chartOption.value = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(0, 20, 40, 0.9)',
      borderColor: '#00bfff',
      borderWidth: 1,
      textStyle: {
        color: '#fff',
        fontSize: 10
      },
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      left: '5%',
      top: 'center',
      textStyle: {
        color: '#8cc8ff',
        fontSize: 9
      },
      itemWidth: 8,
      itemHeight: 8,
      data: [
        '高危漏洞',
        '中危漏洞', 
        '低危漏洞',
        '配置风险',
        '合规问题'
      ]
    },
    series: [
      {
        name: '安全问题分布',
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['65%', '50%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 2,
          borderColor: '#000',
          borderWidth: 1
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 12,
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
        data: [
          {
            value: 342,
            name: '高危漏洞',
            itemStyle: {
              color: '#ff4757'
            }
          },
          {
            value: 587,
            name: '中危漏洞',
            itemStyle: {
              color: '#ffa726'
            }
          },
          {
            value: 823,
            name: '低危漏洞',
            itemStyle: {
              color: '#66bb6a'
            }
          },
          {
            value: 456,
            name: '配置风险',
            itemStyle: {
              color: '#42a5f5'
            }
          },
          {
            value: 278,
            name: '合规问题',
            itemStyle: {
              color: '#ab47bc'
            }
          }
        ]
      }
    ],
    animationDuration: 2000,
    animationEasing: 'cubicOut'
  }
})
</script>

<style scoped>
.security-issues-distribution {
  height: 100%;
  width: 100%;
  padding: 10px;
}

.chart {
  height: 100%;
  width: 100%;
}
</style>