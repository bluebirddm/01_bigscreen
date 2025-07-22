<template>
  <div class="china-3d-map">
    <v-chart class="chart" :option="option" autoresize />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { use, registerMap } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { VisualMapComponent } from 'echarts/components'
import VChart from 'vue-echarts'
import * as echarts from 'echarts'
import 'echarts-gl'

// 注册必要的组件
use([CanvasRenderer, VisualMapComponent])

// 模拟数据点
const dataPoints = [
  { name: '北京', value: [116.4074, 39.9042, 20] },
  { name: '天津', value: [117.3616, 39.3434, 12] },
  { name: '上海', value: [121.4737, 31.2304, 16] },
  { name: '重庆', value: [106.5478, 29.5647, 12] },
  { name: '黑龙江', value: [127.9688, 45.368, 18] },
  { name: '广东', value: [113.2644, 23.1291, 8] },
  { name: '新疆', value: [87.6177, 43.7928, 14] },
  { name: '西藏', value: [91.1178, 29.6469, 19] },
  { name: '台湾', value: [121.5654, 25.0330, 10] },
  { name: '山东', value: [117.0208, 36.6688, 13] }
]

const option = ref({})

// 动态加载中国地图数据
onMounted(async () => {
  try {
    const response = await fetch('https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json')
    const chinaJson = await response.json()
    echarts.registerMap('china', chinaJson)
    
    // 地图加载成功后设置option
    option.value = {
      backgroundColor: 'transparent',
      tooltip: {
        show: true,
        formatter: params => {
          return `${params.name}: ${params.value[2]}`
        }
      },
      visualMap: {
        show: false,
        min: 0,
        max: 30,
        inRange: {
          color: ['#00E5FF', '#00ACC1', '#0097A7']
        }
      },
      geo3D: {
        map: 'china',
        roam: false,
        itemStyle: {
          color: '#0B1C3C',
          opacity: 0.8,
          borderWidth: 1,
          borderColor: '#00E5FF'
        },
        emphasis: {
          itemStyle: {
            color: '#00ACC1',
            opacity: 1
          },
          label: {
            show: true,
            textStyle: {
              color: '#fff',
              fontSize: 14,
              backgroundColor: 'rgba(0,0,0,0.5)',
              padding: [5, 10],
              borderRadius: 4
            }
          }
        },
        light: {
          main: {
            color: '#fff',
            intensity: 1.2,
            shadow: true,
            shadowQuality: 'high',
            alpha: 30,
            beta: 10
          },
          ambient: {
            color: '#fff',
            intensity: 0.3
          }
        },
        viewControl: {
          distance: 80,
          alpha: 60,
          beta: 0,
          center: [0, 0, 0],
          autoRotate: false,
          // 禁用所有手势操作
          rotateSensitivity: 0, // 禁用旋转
          zoomSensitivity: 0,   // 禁用缩放
          panSensitivity: 0     // 禁用平移
        },
        postEffect: {
          enable: true,
          bloom: {
            enable: true,
            intensity: 0.3
          },
          depthOfField: {
            enable: false
          },
          SSAO: {
            enable: true,
            quality: 'medium',
            radius: 10,
            intensity: 0.2
          }
        },
        temporalSuperSampling: {
          enable: true
        },
        shading: 'realistic',
        realisticMaterial: {
          detailTexture: '#fff',
          roughness: 0.8
        }
      },
      series: [
        {
          type: 'scatter3D',
          coordinateSystem: 'geo3D',
          data: dataPoints,
          symbol: 'pin',
          symbolSize: 30,
          itemStyle: {
            color: '#00E5FF',
            opacity: 0.9
          },
          emphasis: {
            itemStyle: {
              color: '#FFF',
              opacity: 1
            },
            label: {
              show: true,
              formatter: '{b}',
              position: 'top',
              textStyle: {
                color: '#FFF',
                fontSize: 12,
                backgroundColor: 'rgba(0,229,255,0.8)',
                padding: [5, 10],
                borderRadius: 4
              }
            }
          },
          animation: true,
          animationDurationUpdate: 1000,
          animationEasingUpdate: 'cubicInOut'
        }
      ]
    }
  } catch (error) {
    console.error('加载地图数据失败:', error)
  }
})
</script>

<style scoped>
.china-3d-map {
  width: 100%;
  height: 100%;
  position: relative;
}

.chart {
  width: 100%;
  height: 100%;
}
</style>