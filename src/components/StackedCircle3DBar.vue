<template>
  <div class="stacked-circle-3d-bar">
    <v-chart class="chart" :option="chartOption" autoresize />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
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
    type: Object,
    default: () => ({
      xdata: ['01-01', '01-02', '01-03', '01-04', '01-05', '01-06', '01-07'],
      result: [
        { name: '天河', data: [320, 435, 490, 340, 320, 270, 360] },
        { name: '海珠', data: [150, 220, 210, 310, 140, 180, 288] },
        { name: '荔湾', data: [250, 120, 240, 280, 240, 180, 288] },
        { name: '黄埔', data: [180, 420, 370, 250, 210, 180, 288] },
        { name: '越秀', data: [130, 210, 340, 240, 220, 180, 288] },
        { name: '白云', data: [210, 260, 230, 220, 260, 180, 288] },
      ]
    })
  },
  title: {
    type: String,
    default: ''
  },
  legendPosition: {
    type: String,
    default: 'bottom',
    validator: (value) => ['top', 'bottom', 'top-right', 'top-left', 'bottom-right', 'bottom-left'].includes(value)
  },
  barWidth: {
    type: Number,
    default: 20
  },
  circleWidth: {
    type: Number,
    default: null // 如果不设置，使用barWidth
  },
  circleHeight: {
    type: Number,
    default: 15
  },
  autoFitContainer: {
    type: Boolean,
    default: true
  },
  gridTop: {
    type: String,
    default: null
  },
  gridBottom: {
    type: String,
    default: null
  },
  gridLeft: {
    type: String,
    default: '10%'
  },
  gridRight: {
    type: String,
    default: '5%'
  },
  colors: {
    type: Array,
    default: null,
    validator: (value) => {
      if (!value) return true
      // 验证颜色格式
      return value.every(colorSet => 
        Array.isArray(colorSet) && 
        colorSet.length === 3 &&
        colorSet.every(item => 
          typeof item === 'object' && 
          item.offset !== undefined && 
          item.color
        )
      )
    }
  }
})

const chartOption = ref({})

// 默认主题色彩方案（cyber-blue风格）- 适配3D效果
const defaultColors = [
  [
    { offset: 0, color: "#00bfff" }, 
    { offset: 0.5, color: "#0080cc" }, 
    { offset: 1, color: "#004d80" }
  ],
  [
    { offset: 0, color: "#4ecdc4" }, 
    { offset: 0.5, color: "#3ba199" }, 
    { offset: 1, color: "#2a7a72" }
  ],
  [
    { offset: 0, color: "#45b7d1" }, 
    { offset: 0.5, color: "#3691a8" }, 
    { offset: 1, color: "#2a6b7f" }
  ],
  [
    { offset: 0, color: "#8cc8ff" }, 
    { offset: 0.5, color: "#6bb3ff" }, 
    { offset: 1, color: "#4a9eff" }
  ],
  [
    { offset: 0, color: "#5dade2" }, 
    { offset: 0.5, color: "#4896d1" }, 
    { offset: 1, color: "#337fc0" }
  ],
  [
    { offset: 0, color: "#74c7ec" }, 
    { offset: 0.5, color: "#5fb8e0" }, 
    { offset: 1, color: "#4aa9d4" }
  ]
]

// 计算使用的颜色方案
const color = computed(() => props.colors || defaultColors)

// 计算堆叠数据
const stackedData = computed(() => {
  if (!props.data.result || props.data.result.length === 0) {
    return []
  }
  
  return props.data.result.reduce((pre, cur, index) => {
    if (!cur.data || !Array.isArray(cur.data)) {
      pre[index] = []
      return pre
    }
    
    pre[index] = cur.data.map((el, id) => {
      const currentValue = typeof el === 'number' ? el : 0
      const previousValue = pre[index - 1] && pre[index - 1][id] ? pre[index - 1][id] : 0
      return currentValue + previousValue
    })
    return pre
  }, [])
})

// 计算配置值
const BAR_WIDTH = computed(() => props.barWidth)
const CIRCLE_SIZE = computed(() => [
  props.circleWidth || props.barWidth, 
  props.circleHeight
])

// 计算圆形装饰所需的额外空间
const circlePadding = computed(() => {
  return Math.ceil(props.circleHeight / 2)
})

// 智能布局配置
const layoutConfig = computed(() => {
  if (!props.autoFitContainer) {
    return {
      gridTop: props.legendPosition === 'top' ? '25%' : '15%',
      gridBottom: props.legendPosition === 'top' ? '10%' : '20%'
    }
  }
  
  const padding = circlePadding.value
  
  if (props.legendPosition === 'top') {
    return {
      gridTop: `calc(25% + ${padding + 8}px)`,
      gridBottom: `${25 + padding}px`
    }
  } else {
    return {
      gridTop: `${25 + padding}px`, 
      gridBottom: `calc(25% + ${padding + 5}px)`
    }
  }
})

// 生成系列数据
const series = computed(() => {
  let seriesArray = []
  
  // 数据验证
  if (!props.data.result || props.data.result.length === 0) {
    return seriesArray
  }
  
  // 确保 xdata 存在且有数据
  if (!props.data.xdata || props.data.xdata.length === 0) {
    return seriesArray
  }
  
  props.data.result.forEach((item, i) => {
    // 验证每个系列的数据
    if (!item.data || !Array.isArray(item.data) || item.data.length === 0) {
      return
    }
    // 堆叠柱状图
    seriesArray.push({
      z: i + 1,
      stack: '总量',
      type: 'bar',
      name: item.name,
      ...(i === 0 ? { barWidth: BAR_WIDTH.value } : {}),
      data: item.data,
      itemStyle: { 
        color: new echarts.graphic.LinearGradient(
          0, 0, 0, 1,
          color.value[i % color.value.length],
          false
        ),
        borderRadius: [0, 0, 0, 0],
        shadowColor: 'rgba(0, 191, 255, 0.2)',
        shadowBlur: 6,
        shadowOffsetY: 2
      },
      emphasis: {
        itemStyle: {
          shadowColor: 'rgba(0, 191, 255, 0.4)',
          shadowBlur: 12,
          shadowOffsetY: 4,
          brightness: 1.2
        }
      },
      animationDelay: function(dataIndex) {
        return dataIndex * 100 + i * 50
      }
    })
    
    // 顶部圆形装饰
    seriesArray.push({
      z: i + 20,
      type: 'pictorialBar',
      symbolPosition: 'end',
      symbol: 'circle',
      symbolOffset: [0, '-50%'],
      symbolSize: CIRCLE_SIZE.value,
      data: stackedData.value[i],
      itemStyle: { 
        color: new echarts.graphic.LinearGradient(
          0, 0, 0, 1,
          [
            { offset: 0, color: color.value[i % color.value.length][0].color },
            { offset: 0.3, color: color.value[i % color.value.length][1].color },
            { offset: 1, color: color.value[i % color.value.length][2].color }
          ],
          false
        ),
        shadowColor: 'rgba(0, 191, 255, 0.4)',
        shadowBlur: 12,
        shadowOffsetY: 4,
        opacity: 0.95
      },
      emphasis: {
        itemStyle: {
          shadowColor: 'rgba(0, 191, 255, 0.7)',
          shadowBlur: 20,
          shadowOffsetY: 6,
          opacity: 1,
          scale: 1.1
        }
      },
      tooltip: { show: false },
      animationDelay: function(dataIndex) {
        return dataIndex * 120 + i * 60 + 500
      },
      animationEasing: 'elasticOut'
    })
  })
  
  // 底部圆形装饰
  if (props.data.result.length > 0) {
    seriesArray.push({
      z: props.data.result.length * 3,
      type: "pictorialBar",
      symbolPosition: "start",
      data: props.data.result[0].data,
      symbol: "circle",
      symbolOffset: ["0%", "50%"],
      symbolSize: CIRCLE_SIZE.value,
      itemStyle: { 
        color: new echarts.graphic.LinearGradient(
          0, 0, 0, 1,
          [
            { offset: 0, color: color.value[0][2].color },
            { offset: 0.4, color: color.value[0][1].color },
            { offset: 1, color: color.value[0][0].color }
          ],
          false
        ),
        shadowColor: 'rgba(0, 0, 0, 0.5)',
        shadowBlur: 15,
        shadowOffsetY: 8,
        opacity: 0.9
      },
      emphasis: {
        itemStyle: {
          shadowColor: 'rgba(0, 191, 255, 0.6)',
          shadowBlur: 25,
          shadowOffsetY: 10,
          opacity: 1,
          scale: 1.05
        }
      },
      tooltip: { show: false },
      animationDelay: function(dataIndex) {
        return dataIndex * 80 + 200
      },
      animationEasing: 'bounceOut'
    })
  }
  
  return seriesArray
})

onMounted(() => {
  chartOption.value = {
    backgroundColor: 'transparent',
    tooltip: { 
      trigger: "axis",
      axisPointer: {
        type: 'shadow',
        shadowStyle: {
          color: 'rgba(0, 191, 255, 0.1)',
          shadowBlur: 10
        }
      },
      backgroundColor: 'rgba(0, 20, 40, 0.95)',
      borderColor: '#00bfff',
      borderWidth: 2,
      borderRadius: 8,
      textStyle: {
        color: '#fff',
        fontSize: 13,
        fontWeight: 'normal'
      },
      padding: [12, 16],
      confine: true,
      extraCssText: 'box-shadow: 0 8px 32px rgba(0, 191, 255, 0.2); backdrop-filter: blur(10px);',
      formatter: function(params) {
        // 数据验证
        if (!params || !Array.isArray(params) || params.length === 0) {
          return '<div style="color: #8cc8ff;">暂无数据</div>'
        }
        
        const axisValue = params[0] && params[0].axisValue ? params[0].axisValue : '未知'
        let result = `<div style="margin-bottom: 8px; font-weight: bold; color: #00bfff; font-size: 14px; text-align: center; padding-bottom: 6px; border-bottom: 1px solid rgba(0, 191, 255, 0.3);">${axisValue}</div>`
        let total = 0
        
        const barData = params.filter(item => item && item.seriesType === 'bar')
        
        // 计算总计，增加数值验证
        barData.forEach(item => {
          const value = typeof item.value === 'number' ? item.value : 0
          total += value
        })
        
        // 显示各系列数据
        barData.forEach((item, index) => {
          const value = typeof item.value === 'number' ? item.value : 0
          const seriesName = item.seriesName || `系列${index + 1}`
          const color = item.color || '#8cc8ff'
          const percent = total > 0 ? ((value / total) * 100).toFixed(1) : '0.0'
          
          result += `<div style="margin: 6px 0; display: flex; align-items: center; transition: all 0.3s ease;">
            <span style="display: inline-block; width: 12px; height: 12px; background: ${color}; border-radius: 50%; margin-right: 8px; box-shadow: 0 0 6px rgba(0, 191, 255, 0.6); animation: pulse 2s infinite;"></span>
            <span style="color: #8cc8ff; margin-right: 10px; font-weight: 500;">${seriesName}:</span>
            <span style="color: #fff; font-weight: bold; margin-right: 10px; font-size: 14px;">${value}</span>
            <span style="color: #4ecdc4; font-size: 12px; font-weight: 500;">(${percent}%)</span>
          </div>`
        })
        
        // 显示总计
        if (total > 0) {
          result += `<div style="margin-top: 10px; padding-top: 8px; border-top: 2px solid rgba(0, 191, 255, 0.4); color: #00bfff; font-weight: bold; font-size: 15px; text-align: center;">
            总计: <span style="color: #fff;">${total}</span>
          </div>`
        } else if (barData.length > 0) {
          result += `<div style="margin-top: 10px; padding-top: 8px; border-top: 2px solid rgba(0, 191, 255, 0.4); color: #8cc8ff; font-size: 13px; text-align: center;">
            当前无有效数值
          </div>`
        }
        
        return result
      }
    },
    legend: {
      data: props.data.result && Array.isArray(props.data.result) 
        ? props.data.result.map(item => item.name || '未命名系列') 
        : [],
      textStyle: { 
        fontSize: 13, 
        color: '#8cc8ff',
        fontWeight: '500'
      },
      itemWidth: 28,
      itemHeight: 16,
      itemGap: 20,
      ...(props.legendPosition === 'top' 
        ? { top: '5%', left: 'center' }
        : props.legendPosition === 'top-right'
        ? { top: '5%', right: '5%' }
        : props.legendPosition === 'top-left'
        ? { top: '5%', left: '5%' }
        : props.legendPosition === 'bottom-right'
        ? { bottom: '5%', right: '5%' }
        : props.legendPosition === 'bottom-left'
        ? { bottom: '5%', left: '5%' }
        : { bottom: '5%' }
      ),
      selectedMode: false,
      formatter: function(name) {
        return name
      }
    },
    grid: { 
      top: props.gridTop || layoutConfig.value.gridTop,
      left: props.gridLeft, 
      right: props.gridRight, 
      bottom: props.gridBottom || layoutConfig.value.gridBottom,
      containLabel: true
    },
    xAxis: { 
      type: 'category',
      axisTick: { 
        show: true,
        lineStyle: {
          color: 'rgba(0, 191, 255, 0.4)'
        }
      },
      axisLine: { 
        lineStyle: { 
          color: 'rgba(0, 191, 255, 0.4)',
          width: 1
        } 
      },
      axisLabel: { 
        color: '#8cc8ff',
        fontSize: 12,
        fontWeight: '500',
        margin: 12
      },
      data: props.data.xdata
    },
    yAxis: [{ 
      type: 'value',
      splitLine: { 
        lineStyle: { 
          color: 'rgba(0, 191, 255, 0.15)',
          type: 'dashed',
          width: 1
        } 
      },
      axisLine: { 
        show: false 
      },
      axisTick: {
        show: false
      },
      axisLabel: { 
        color: '#8cc8ff',
        fontSize: 11,
        fontWeight: '500',
        margin: 8
      }
    }],
    series: series.value,
    // 优化动画配置
    animation: true,
    animationThreshold: 2000,
    animationDuration: function(idx) {
      return 1000 + idx * 100
    },
    animationEasing: 'cubicOut', 
    animationDelay: function(idx) {
      return idx * 80
    },
    animationDurationUpdate: 800,
    animationEasingUpdate: 'cubicInOut',
    animationDelayUpdate: function(idx) {
      return idx * 30
    }
  }
})
</script>

<style scoped>
.stacked-circle-3d-bar {
  height: 100%;
  width: 100%;
  overflow: hidden;
  box-sizing: border-box;
  position: relative;
}

.chart {
  height: 100%;
  width: 100%;
  overflow: hidden;
  transition: all 0.3s ease;
}

.chart:hover {
  filter: brightness(1.05);
}

/* 添加全局动画样式 */
:global(.stacked-circle-3d-bar .chart canvas) {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

:global(.stacked-circle-3d-bar .chart canvas:hover) {
  transform: scale(1.01);
}

/* 添加脉冲动画样式用于tooltip */
@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.8;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

/* 添加光效动画 */
@keyframes glow {
  0% {
    box-shadow: 0 0 5px rgba(0, 191, 255, 0.3);
  }
  50% {
    box-shadow: 0 0 20px rgba(0, 191, 255, 0.6);
  }
  100% {
    box-shadow: 0 0 5px rgba(0, 191, 255, 0.3);
  }
}

/* 添加渐入动画 */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.stacked-circle-3d-bar {
  animation: fadeInUp 0.8s ease-out;
}

/* 响应式优化 */
@media (max-width: 768px) {
  .chart {
    font-size: 12px;
  }
}

@media (max-width: 480px) {
  .chart {
    font-size: 10px;
  }
}

/* 高对比度模式支持 */
@media (prefers-contrast: high) {
  .chart {
    filter: contrast(1.2);
  }
}

/* 减少动画模式支持 */
@media (prefers-reduced-motion: reduce) {
  .chart,
  :global(.stacked-circle-3d-bar .chart canvas) {
    transition: none;
    animation: none;
  }
  
  .stacked-circle-3d-bar {
    animation: none;
  }
}
</style>