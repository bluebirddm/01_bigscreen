<template>
  <div class="compliance-radar-chart">
    <v-chart class="chart" :option="chartOption" autoresize />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { RadarChart } from 'echarts/charts'
import { 
  RadarComponent,
  TooltipComponent,
  LegendComponent
} from 'echarts/components'
import VChart from 'vue-echarts'

use([
  CanvasRenderer,
  RadarChart,
  RadarComponent,
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
        color: '#fff'
      }
    },
    legend: {
      data: ['当前合规水平', '目标合规水平'],
      textStyle: {
        color: '#8cc8ff',
        fontSize: 10
      },
      top: 10,
      left: 'center',
      itemGap: 20
    },
    radar: {
      indicator: [
        { name: '网络安全', max: 100 },
        { name: '数据安全', max: 100 },
        { name: '应用安全', max: 100 },
        { name: '物理安全', max: 100 },
        { name: '管理安全', max: 100 },
        { name: '技术监督', max: 100 }
      ],
      center: ['50%', '55%'],
      radius: '60%',
      axisName: {
        color: '#8cc8ff',
        fontSize: 11
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(0, 191, 255, 0.2)',
          width: 1
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
      },
      axisLine: {
        lineStyle: {
          color: 'rgba(0, 191, 255, 0.3)'
        }
      }
    },
    series: [
      {
        name: '合规评估',
        type: 'radar',
        data: [
          {
            value: [78, 82, 74, 68, 85, 79],
            name: '当前合规水平',
            itemStyle: {
              color: '#00bfff'
            },
            areaStyle: {
              color: 'rgba(0, 191, 255, 0.2)'
            },
            lineStyle: {
              color: '#00bfff',
              width: 2
            }
          },
          {
            value: [90, 95, 88, 85, 92, 89],
            name: '目标合规水平',
            itemStyle: {
              color: '#4ecdc4'
            },
            areaStyle: {
              color: 'rgba(78, 205, 196, 0.1)'
            },
            lineStyle: {
              color: '#4ecdc4',
              width: 2,
              type: 'dashed'
            }
          }
        ],
        emphasis: {
          areaStyle: {
            color: 'rgba(0, 191, 255, 0.4)'
          }
        }
      }
    ],
    animationEasing: 'elasticOut',
    animationDelay: function(idx) {
      return idx * 100
    }
  }
})
</script>

<style scoped>
.compliance-radar-chart {
  height: 263px;
  max-height: 263px;
  width: 100%;
  margin: 0 auto;
}

.chart {
  height: 100%;
  width: 100%;
}
</style>