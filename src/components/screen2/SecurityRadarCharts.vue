<template>
  <div class="security-radar-charts">
    <div class="radar-container">
      <div class="radar-chart-wrapper">
        <h4 class="radar-title">各板块完成情况</h4>
        <v-chart class="radar-chart" :option="sectorRadarOption" autoresize />
      </div>
      <div class="radar-chart-wrapper">
        <h4 class="radar-title">系统类型完成情况</h4>
        <v-chart class="radar-chart" :option="systemRadarOption" autoresize />
      </div>
    </div>
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

const sectorRadarOption = ref({})
const systemRadarOption = ref({})

onMounted(() => {
  // 各板块完成情况雷达图
  sectorRadarOption.value = {
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
      show: false
    },
    radar: {
      indicator: [
        { name: '煤炭', max: 100 },
        { name: '化工', max: 100 },
        { name: '火电', max: 100 },
        { name: '新能源', max: 100 },
        { name: '运输', max: 100 },
        { name: '金融', max: 100 }
      ],
      shape: 'polygon',
      radius: '45%',
      center: ['50%', '50%'],
      name: {
        textStyle: {
          color: '#8cc8ff',
          fontSize: 8
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
            value: [85, 92, 78, 88, 82, 90],
            name: '完成率',
            itemStyle: {
              color: '#00bfff'
            },
            areaStyle: {
              color: 'rgba(0, 191, 255, 0.2)'
            },
            lineStyle: {
              color: '#00bfff',
              width: 2
            },
            symbol: 'circle',
            symbolSize: 4
          }
        ],
        animationDuration: 2000,
        animationEasing: 'elasticOut'
      }
    ]
  }

  // 系统类型完成情况雷达图
  systemRadarOption.value = {
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
      show: false
    },
    radar: {
      indicator: [
        { name: '门户网站', max: 100 },
        { name: '业务系统', max: 100 },
        { name: '数据库', max: 100 },
        { name: '网络设备', max: 100 },
        { name: '安全设备', max: 100 }
      ],
      shape: 'polygon',
      radius: '45%',
      center: ['50%', '50%'],
      name: {
        textStyle: {
          color: '#8cc8ff',
          fontSize: 8
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
            value: [95, 87, 83, 91, 89],
            name: '完成率',
            itemStyle: {
              color: '#4ecdc4'
            },
            areaStyle: {
              color: 'rgba(78, 205, 196, 0.2)'
            },
            lineStyle: {
              color: '#4ecdc4',
              width: 2
            },
            symbol: 'circle',
            symbolSize: 4
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
.security-radar-charts {
  height: 263px;
  width: 100%;
  padding: 8px;
}

.radar-container {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 15px;
}

.radar-chart-wrapper {
  flex: 1;
  position: relative;
  height: 100%;
}

.radar-title {
  position: absolute;
  top: -5px;
  left: 50%;
  width: 115px;
  transform: translateX(-50%);
  color: #8cc8ff;
  font-size: 12px;
  font-weight: normal;
  z-index: 10;
  background: rgba(0, 20, 40, 0.8);
  padding: 2px 8px;
  border-radius: 4px;
}

.radar-chart {
  height: 100%;
  width: 100%;
}
</style>