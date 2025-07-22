<template>
  <div class="system-layout">
    <v-chart class="chart" :option="chartOption" autoresize />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { RadarChart } from 'echarts/charts'
import { 
  TooltipComponent,
  LegendComponent,
  RadarComponent
} from 'echarts/components'
import VChart from 'vue-echarts'

use([
  CanvasRenderer,
  RadarChart,
  TooltipComponent,
  LegendComponent,
  RadarComponent
])

const chartOption = ref({})

onMounted(() => {
  chartOption.value = {
    backgroundColor: 'transparent',
    tooltip: {
      backgroundColor: 'rgba(0, 20, 40, 0.9)',
      borderColor: '#00bfff',
      borderWidth: 1,
      textStyle: {
        color: '#fff'
      }
    },
    legend: {
      data: ['大数据', '云平台', '物联网', '人工智能', '区块链'],
      textStyle: {
        color: '#8cc8ff',
        fontSize: 10
      },
      bottom: 0
    },
    radar: {
      indicator: [
        { name: '大数据', max: 100 },
        { name: '云平台', max: 100 },
        { name: '物联网', max: 100 },
        { name: '人工智能', max: 100 },
        { name: '区块链', max: 100 }
      ],
      shape: 'polygon',
      radius: '65%',
      center: ['50%', '45%'],
      name: {
        textStyle: {
          color: '#8cc8ff',
          fontSize: 11
        }
      },
      axisLine: {
        lineStyle: {
          color: 'rgba(0, 191, 255, 0.3)'
        }
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(0, 191, 255, 0.2)'
        }
      },
      splitArea: {
        show: true,
        areaStyle: {
          color: [
            'rgba(0, 191, 255, 0.05)',
            'rgba(0, 191, 255, 0.1)'
          ]
        }
      }
    },
    series: [
      {
        type: 'radar',
        data: [
          {
            value: [90, 80, 70, 60, 50],
            name: '大数据',
            itemStyle: {
              color: '#ff6b6b'
            },
            areaStyle: {
              color: 'rgba(255, 107, 107, 0.2)'
            }
          },
          {
            value: [85, 75, 65, 55, 45],
            name: '云平台',
            itemStyle: {
              color: '#4ecdc4'
            },
            areaStyle: {
              color: 'rgba(78, 205, 196, 0.2)'
            }
          },
          {
            value: [80, 70, 60, 50, 40],
            name: '物联网',
            itemStyle: {
              color: '#45b7d1'
            },
            areaStyle: {
              color: 'rgba(69, 183, 209, 0.2)'
            }
          },
          {
            value: [75, 65, 55, 45, 35],
            name: '人工智能',
            itemStyle: {
              color: '#96ceb4'
            },
            areaStyle: {
              color: 'rgba(150, 206, 180, 0.2)'
            }
          },
          {
            value: [70, 60, 50, 40, 30],
            name: '区块链',
            itemStyle: {
              color: '#ffeaa7'
            },
            areaStyle: {
              color: 'rgba(255, 234, 167, 0.2)'
            }
          }
        ],
        animationDuration: 2000,
        animationEasing: 'elasticOut'
      }
    ]
  }
})
</script>

<style scoped>
.system-layout {
  height: 100%;
  width: 100%;
}

.chart {
  height: 100%;
  width: 100%;
}
</style>