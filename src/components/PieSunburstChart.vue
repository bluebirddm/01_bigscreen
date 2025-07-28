<template>
  <div 
    ref="chartContainer" 
    class="pie-sunburst-chart" 
    :style="{ width, height }"
  ></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { PieChart, SunburstChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent
} from 'echarts/components'
import * as echarts from 'echarts/core'

// 注册必要的组件
use([
  CanvasRenderer,
  PieChart,
  SunburstChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent
])

// Props定义
const props = defineProps({
  // 饼图数据
  pieData: {
    type: Array,
    default: () => [
      { value: 14.7, name: 'Apple' },
      { value: 10.4, name: 'Huawei' },
      { value: 6.3, name: 'Xiaomi' },
      { value: 21.6, name: 'Samsung' },
      { value: 7.6, name: 'Oppo' },
      { value: 39.4, name: 'Others' }
    ]
  },
  // 旭日图数据
  sunburstData: {
    type: Array,
    default: () => []
  },
  // 图表标题
  title: {
    type: Object,
    default: () => ({
      text: '数据分布图',
      subtext: '饼图+旭日图组合',
      left: 'center'
    })
  },
  // 组件宽度
  width: {
    type: String,
    default: '100%'
  },
  // 组件高度
  height: {
    type: String,
    default: '400px'
  },
  // 是否显示图例
  showLegend: {
    type: Boolean,
    default: true
  },
  // 是否启用工具提示
  enableTooltip: {
    type: Boolean,
    default: true
  }
})

const chartContainer = ref(null)
let chartInstance = null

// 生成默认的旭日图数据
const generateDefaultSunburstData = () => {
  const brands = ['Apple', 'Huawei', 'Xiaomi', 'Samsung', 'Oppo', 'Others']
  const subBrands = [
    ['iPhone 14', 'iPhone 13'],
    ['Mate 50', 'P50'],
    ['小米13', '小米12'],
    ['Galaxy S23', 'Galaxy A54'],
    ['Find X5', 'Reno 8'],
    ['其他品牌1', '其他品牌2']
  ]
  const colors = [
    ['#FF6B6B', '#FF8E8E'],
    ['#4ECDC4', '#6EDDD8'],
    ['#45B7D1', '#6BC5D8'],
    ['#96CEB4', '#A8D5C0'],
    ['#FECA57', '#FED670'],
    ['#A0A0A0', '#B8B8B8']
  ]

  return brands.map((brand, index) => ({
    name: brand,
    value: props.pieData[index]?.value || 10,
    itemStyle: {
      color: colors[index][0]
    },
    children: subBrands[index].map((subBrand, subIndex) => ({
      name: subBrand,
      value: (props.pieData[index]?.value || 10) / 2,
      itemStyle: {
        color: colors[index][subIndex]
      }
    }))
  }))
}

// 初始化图表
const initChart = () => {
  if (!chartContainer.value) return

  chartInstance = echarts.init(chartContainer.value)
  
  const sunburstData = props.sunburstData.length > 0 
    ? props.sunburstData 
    : generateDefaultSunburstData()

  const option = {
    title: {
      ...props.title,
      textStyle: {
        color: '#ffffff',
        fontSize: 18
      },
      subtextStyle: {
        color: '#cccccc',
        fontSize: 12
      }
    },
    tooltip: {
      show: props.enableTooltip,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      borderColor: '#00bfff',
      borderWidth: 1,
      textStyle: {
        color: '#ffffff'
      }
    },
    legend: {
      show: props.showLegend,
      bottom: 20,
      left: 'center',
      textStyle: {
        color: '#ffffff'
      },
      data: props.pieData.map(item => item.name)
    },
    series: [
      {
        type: 'pie',
        radius: ['6%', '20%'],
        roseType: 'area',
        zlevel: 2,
        tooltip: {
          show: props.enableTooltip,
          formatter: '{b}: {c}%',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          borderColor: '#00bfff',
          textStyle: {
            color: '#ffffff'
          }
        },
        label: {
          show: true,
          formatter: '{b}\n{c}%',
          color: '#ffffff'
        },
        itemStyle: {
          shadowBlur: 10,
          shadowColor: 'rgba(0, 191, 255, 0.3)'
        },
        data: props.pieData.map(item => ({
          ...item,
          itemStyle: {
            color: item.itemStyle?.color || `hsl(${Math.random() * 360}, 70%, 60%)`,
            shadowBlur: 10,
            shadowColor: 'rgba(0, 191, 255, 0.3)'
          }
        }))
      },
      {
        type: 'sunburst',
        nodeClick: false,
        levels: [
          {},
          {
            r0: '48%',
            r: '60%',
            label: {
              color: '#ffffff',
              fontSize: 12
            },
            itemStyle: {
              borderWidth: 3,
              borderColor: '#00bfff',
              opacity: 0.8,
              shadowBlur: 5,
              shadowColor: 'rgba(0, 191, 255, 0.3)'
            }
          },
          {
            r0: '60%',
            r: '70%',
            label: {
              color: '#ffffff',
              fontSize: 10,
              position: 'inside',  // 修复原来的 'intside' 错误
              rotate: 'tangential'
            },
            itemStyle: {
              borderWidth: 2,
              borderColor: '#8cc8ff',
              opacity: 0.6,
              shadowBlur: 3,
              shadowColor: 'rgba(140, 200, 255, 0.3)'
            }
          }
        ],
        data: sunburstData,
        tooltip: {
          show: props.enableTooltip,
          formatter: function(params) {
            return `${params.name}: ${params.value}`
          },
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          borderColor: '#00bfff',
          textStyle: {
            color: '#ffffff'
          }
        }
      }
    ]
  }

  chartInstance.setOption(option)
}

// 调整图表大小
const resizeChart = () => {
  if (chartInstance) {
    chartInstance.resize()
  }
}

// 监听数据变化
watch(() => [props.pieData, props.sunburstData, props.title], () => {
  if (chartInstance) {
    initChart()
  }
}, { deep: true })

// 组件挂载
onMounted(async () => {
  await nextTick()
  initChart()
  window.addEventListener('resize', resizeChart)
})

// 组件卸载
onUnmounted(() => {
  if (chartInstance) {
    chartInstance.dispose()
    chartInstance = null
  }
  window.removeEventListener('resize', resizeChart)
})

// 暴露方法给父组件
defineExpose({
  resizeChart,
  getChartInstance: () => chartInstance
})
</script>

<style scoped>
.pie-sunburst-chart {
  background: transparent;
  border-radius: 8px;
}
</style>