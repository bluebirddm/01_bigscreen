<template>
  <div 
    ref="chartContainer" 
    class="pie-rose-chart" 
    :style="{ width, height }"
  ></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { PieChart } from 'echarts/charts'
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
  TitleComponent,
  TooltipComponent,
  LegendComponent
])

// Props定义
const props = defineProps({
  // 外圈饼图数据
  pieData: {
    type: Array,
    default: () => [
      { value: 16.8, name: '高风险' },
      { value: 35.2, name: '中风险' },
      { value: 48.0, name: '低风险' }
    ]
  },
  // 内圈玫瑰图数据
  roseData: {
    type: Array,
    default: () => [
      { value: 15.2, name: '物理环境' },
      { value: 18.7, name: '建设管理' },
      { value: 22.1, name: '计算环境' },
      { value: 13.5, name: '区域边界' },
      { value: 11.8, name: '管理机构' },
      { value: 9.4, name: '管理人员' },
      { value: 9.3, name: '管理制度' }
    ]
  },
  // 图表标题
  title: {
    type: Object,
    default: () => ({
      text: '数据分布图',
      subtext: '饼图+玫瑰图组合',
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

// 初始化图表
const initChart = () => {
  if (!chartContainer.value) return
  
  // 检查容器尺寸，确保DOM完全渲染
  const containerRect = chartContainer.value.getBoundingClientRect()
  if (containerRect.width === 0 || containerRect.height === 0) {
    console.warn('PieRoseChart: 容器尺寸为0，跳过初始化')
    return
  }

  chartInstance = echarts.init(chartContainer.value)

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
      orient: 'vertical',
      right: '5%',
      top: 'middle',
      itemWidth: 12,
      itemHeight: 12,
      itemGap: 15,
      textStyle: {
        color: '#ffffff',
        fontSize: 12
      },
      data: props.pieData.map(item => ({
        name: item.name,
        icon: 'circle'
      }))
    },
    series: [
      // 内圈南丁格尔玫瑰图
      {
        type: 'pie',
        name: '详细分布',
        radius: [0, '45%'],
        center: ['50%', '50%'],
        roseType: 'area',
        zlevel: 1,
        legendHoverLink: false,
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
          color: '#ffffff',
          fontSize: 10,
          position: 'inside',
          formatter: '{b}\n{c}%'
        },
        labelLine: {
          show: false
        },
        itemStyle: {
          borderWidth: 1,
          borderColor: 'rgba(255, 255, 255, 0.2)',
          shadowBlur: 5,
          shadowColor: 'rgba(0, 191, 255, 0.3)'
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 191, 255, 0.5)'
          }
        },
        data: props.roseData.map(item => ({
          ...item,
          itemStyle: {
            color: item.itemStyle?.color || `hsl(${Math.random() * 360}, 70%, 60%)`,
            borderWidth: 1,
            borderColor: 'rgba(255, 255, 255, 0.2)',
            shadowBlur: 5,
            shadowColor: 'rgba(0, 191, 255, 0.3)'
          }
        }))
      },
      // 外圈环状饼图
      {
        type: 'pie',
        name: '主要分类',
        radius: ['50%', '75%'],
        center: ['50%', '50%'],
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
          color: '#ffffff',
          fontSize: 12,
          position: 'outside',
          formatter: '{b}\n{c}%'
        },
        labelLine: {
          show: true,
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.5)'
          }
        },
        itemStyle: {
          borderWidth: 2,
          borderColor: '#000',
          shadowBlur: 8,
          shadowColor: 'rgba(0, 191, 255, 0.2)'
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 15,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 191, 255, 0.5)'
          }
        },
        data: props.pieData.map(item => ({
          ...item,
          itemStyle: {
            color: item.itemStyle?.color || `hsl(${Math.random() * 360}, 70%, 60%)`,
            borderWidth: 2,
            borderColor: '#000',
            shadowBlur: 8,
            shadowColor: 'rgba(0, 191, 255, 0.2)'
          }
        }))
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
watch(() => [props.pieData, props.roseData, props.title], () => {
  if (chartInstance) {
    initChart()
  }
}, { deep: true })

// 组件挂载
onMounted(async () => {
  await nextTick()
  
  // 重试初始化逻辑，确保DOM完全准备就绪
  const tryInitChart = () => {
    if (!chartContainer.value) return false
    
    const containerRect = chartContainer.value.getBoundingClientRect()
    if (containerRect.width > 0 && containerRect.height > 0) {
      initChart()
      return true
    }
    return false
  }
  
  // 立即尝试初始化
  if (!tryInitChart()) {
    // 如果失败，延迟100ms再试
    setTimeout(() => {
      if (!tryInitChart()) {
        console.warn('PieRoseChart: 初始化失败，容器可能尚未准备就绪')
      }
    }, 100)
  }
  
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
.pie-rose-chart {
  background: transparent;
  border-radius: 8px;
}
</style>