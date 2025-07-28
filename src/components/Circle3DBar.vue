<template>
  <div class="circle-3d-bar-container">
    <v-chart 
      class="chart" 
      :option="chartOption" 
      autoresize
    />
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart, PictorialBarChart } from 'echarts/charts'
import { 
  GridComponent, 
  TooltipComponent,
  LegendComponent 
} from 'echarts/components'
import VChart from 'vue-echarts'
import * as echarts from 'echarts'

// 注册ECharts组件
use([
  CanvasRenderer,
  BarChart,
  PictorialBarChart,
  GridComponent,
  TooltipComponent,
  LegendComponent
])

// Props定义
const props = defineProps({
  data: {
    type: Array,
    default: () => [
      { name: '系列一', value: 73, max: 100 },
      { name: '系列二', value: 18, max: 100 },
      { name: '系列三', value: 43, max: 100 },
      { name: '系列四', value: 28, max: 100 },
      { name: '系列五', value: 56, max: 100 }
    ]
  },
  title: {
    type: String,
    default: ''
  },
  barWidth: {
    type: Number,
    default: 120
  },
  symbolHeight: {
    type: Number,
    default: 45
  },
  showLabels: {
    type: Boolean,
    default: true
  },
  height: {
    type: String,
    default: '400px'
  }
})

const chartOption = ref({})

// 计算各个系列的数据
const chartData = computed(() => {
  // 头部数据
  const topData = props.data.map((item) => {
    return { name: '', value: item.max, symbolPosition: 'end' }
  })
  
  // 底部立体柱子
  const bottomBar = props.data.map((item) => {
    return { value: item.value }
  })
  
  // 底下圆片
  const bottomCircle = props.data.map((item) => {
    return { name: '', value: item.max }
  })
  
  // 中间圆片
  const middleCircle = props.data.map((item) => {
    return { name: '', value: item.value, symbolPosition: 'end' }
  })
  
  // 上边的柱子
  const upBar = props.data.map((item) => {
    return { name: item.name, value: item.max - item.value }
  })
  
  return {
    topData,
    bottomBar,
    bottomCircle,
    middleCircle,
    upBar
  }
})

// 获取类别数据
const categories = computed(() => {
  return props.data.map(item => item.name)
})

// 初始化图表配置
const initChartOption = () => {
  const data = chartData.value
  
  chartOption.value = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(0, 20, 40, 0.9)',
      borderColor: '#00bfff',
      borderWidth: 2,
      padding: 5,
      textStyle: {
        color: '#00bfff',
        fontSize: 18,
        width: 300,
        height: 40
      },
      formatter: '{c}' + '%',
      extraCssText: 'box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);'
    },
    grid: {
      bottom: '10%',
      top: '35%',
      right: '0%',
      left: '0%'
    },
    xAxis: {
      data: categories.value,
      axisTick: {
        show: false
      },
      axisLine: {
        show: false
      },
      axisLabel: {
        show: true,
        textStyle: {
          color: '#8cc8ff'
        },
        margin: 30
      }
    },
    yAxis: {
      splitLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLine: {
        show: false
      },
      axisLabel: {
        show: false
      }
    },
    series: [
      // 头部椭圆
      {
        name: '',
        type: 'pictorialBar',
        symbolSize: [props.barWidth, props.symbolHeight],
        symbolOffset: [0, -20],
        z: 12,
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: '#00bfff'
                },
                {
                  offset: 1,
                  color: '#0088cc'
                }
              ],
              false
            )
          }
        },
        data: data.topData
      },
      // 底部立体柱
      {
        stack: '1',
        type: 'bar',
        silent: true,
        barWidth: props.barWidth,
        data: data.bottomBar,
        itemStyle: {
          normal: {
            color: {
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              type: 'linear',
              global: false,
              colorStops: [
                {
                  offset: 0,
                  color: 'rgba(0, 191, 255, 0.8)'
                },
                {
                  offset: 1,
                  color: '#00bfff'
                }
              ]
            }
          }
        }
      },
      // 最底下的圆片
      {
        name: '',
        type: 'pictorialBar',
        symbolSize: [props.barWidth, 30],
        symbolOffset: [0, 16],
        z: 12,
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: '#00bfff'
              },
              {
                offset: 1,
                color: '#4ecdc4'
              }
            ])
          }
        },
        data: data.bottomCircle
      },
      // 中间圆片
      {
        name: '',
        type: 'pictorialBar',
        symbolSize: [props.barWidth, 42],
        symbolOffset: [0, -20],
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: '#00bfff'
                },
                {
                  offset: 1,
                  color: '#4ecdc4'
                }
              ],
              false
            )
          }
        },
        z: 12,
        data: data.middleCircle
      },
      // 上部立体柱
      {
        stack: '1',
        type: 'bar',
        itemStyle: {
          normal: {
            color: 'rgba(0, 191, 255, 0.3)',
            opacity: 0.7
          }
        },
        label: props.showLabels ? {
          show: true,
          position: 'top',
          distance: 20,
          color: '#00bfff',
          fontSize: 16,
          formatter: function (item) {
            const originalData = props.data[item.dataIndex]
            return originalData ? originalData.value + '%' : ''
          }
        } : { show: false },
        silent: true,
        barWidth: props.barWidth,
        data: data.upBar
      }
    ]
  }
}

onMounted(() => {
  initChartOption()
})

// 监听props变化，重新初始化图表
watch(() => [props.data, props.barWidth, props.symbolHeight, props.showLabels], () => {
  initChartOption()
}, { deep: true })
</script>

<style scoped>
.circle-3d-bar-container {
  width: 100%;
  height: v-bind(height);
}

.chart {
  width: 100%;
  height: 100%;
}
</style>