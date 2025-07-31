<template>
  <div class="bar-3d-container">
    <v-chart 
      class="chart" 
      :option="chartOption" 
      autoresize
    />
  </div>
</template>

<script setup>
import { ref, onMounted, watchEffect } from 'vue'
import { use } from 'echarts/core'
import { CustomChart } from 'echarts/charts'
import { 
  GridComponent, 
  TooltipComponent,
  LegendComponent 
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import VChart from 'vue-echarts'
import * as echarts from 'echarts'

// 注册ECharts组件
use([
  CanvasRenderer,
  CustomChart,
  GridComponent,
  TooltipComponent,
  LegendComponent
])

// Props定义
const props = defineProps({
  data: {
    type: Array,
    default: () => [210.9, 260.8, 204.2, 504.9, 740.5, 600.3, 119.0]
  },
  maxData: {
    type: Array,
    default: () => [900, 800, 800, 800, 800, 800, 800]
  },
  categories: {
    type: Array,
    default: () => ['1月', '2月', '3月', '4月', '5月', '6月', '7月']
  },
  height: {
    type: String,
    default: '400px'
  },
  showMaxBars: {
    type: Boolean,
    default: false
  },
  // 透明效果相关参数
  enableTransparency: {
    type: Boolean,
    default: true
  },
  transparencyOffset: {
    type: Number,
    default: 0.5,
    validator: (value) => value >= 0 && value <= 1
  },
  bottomOpacity: {
    type: Number,
    default: 0,
    validator: (value) => value >= 0 && value <= 1
  },
  backgroundTransparencyScale: {
    type: Number,
    default: 1,
    validator: (value) => value >= 0 && value <= 1
  },
  // 柱子宽度参数
  barWidth: {
    type: Number,
    default: 30,
    validator: (value) => value > 0 && value <= 100
  },
  // 颜色方案
  colorScheme: {
    type: String,
    default: 'blue',
    validator: (value) => ['blue', 'red', 'green', 'orange', 'purple', 'teal'].includes(value)
  }
})

const chartOption = ref({})

// 颜色方案配置
const colorSchemes = {
  blue: {
    left: ['#00bfff', '#0088cc'],
    right: ['#33ccff', '#0099dd'], 
    top: '#66d9ff'
  },
  red: {
    left: ['#ff6b6b', '#cc5555'],
    right: ['#ff8888', '#dd6666'],
    top: '#ffaaaa'
  },
  green: {
    left: ['#00ff88', '#00cc66'],
    right: ['#33ffaa', '#00dd77'],
    top: '#66ffcc'
  },
  orange: {
    left: ['#ff9933', '#cc7722'],
    right: ['#ffaa55', '#dd8833'],
    top: '#ffcc88'
  },
  purple: {
    left: ['#aa66ff', '#8844cc'],
    right: ['#bb88ff', '#9955dd'],
    top: '#ccaaff'
  },
  teal: {
    left: ['#4ecdc4', '#3db3ab'],
    right: ['#5dd4cc', '#4bc0b8'],
    top: '#6ddbd4'
  }
}

// 3D立体图形定义
const initCustomShapes = (width = 30) => {
  // 基于宽度计算偏移值
  const leftOffset = width * 0.4  // 左侧偏移
  const rightOffset = width * 0.6  // 右侧偏移
  const topOffset = width * 0.73   // 顶部偏移
  const sideOffset = width * 0.3   // 侧面偏移
  const cornerOffset = width * 0.17 // 角落偏移
  // 绘制左侧面
  const CubeLeft = echarts.graphic.extendShape({
    shape: {
      x: 0,
      y: 0
    },
    buildPath: function (ctx, shape) {
      const xAxisPoint = shape.xAxisPoint
      const c0 = [shape.x, shape.y]
      const c1 = [shape.x - leftOffset, shape.y - leftOffset]
      const c2 = [xAxisPoint[0] - leftOffset, xAxisPoint[1] - leftOffset]
      const c3 = [xAxisPoint[0], xAxisPoint[1]]
      ctx.moveTo(c0[0], c0[1]).lineTo(c1[0], c1[1]).lineTo(c2[0], c2[1]).lineTo(c3[0], c3[1]).closePath()
    }
  })

  // 绘制右侧面
  const CubeRight = echarts.graphic.extendShape({
    shape: {
      x: 0,
      y: 0
    },
    buildPath: function (ctx, shape) {
      const xAxisPoint = shape.xAxisPoint
      const c1 = [shape.x, shape.y]
      const c2 = [xAxisPoint[0], xAxisPoint[1]]
      const c3 = [xAxisPoint[0] + rightOffset, xAxisPoint[1] - sideOffset]
      const c4 = [shape.x + rightOffset, shape.y - sideOffset]
      ctx.moveTo(c1[0], c1[1]).lineTo(c2[0], c2[1]).lineTo(c3[0], c3[1]).lineTo(c4[0], c4[1]).closePath()
    }
  })

  // 绘制顶面
  const CubeTop = echarts.graphic.extendShape({
    shape: {
      x: 0,
      y: 0,
    },
    buildPath: function (ctx, shape) {
      const c1 = [shape.x, shape.y]
      const c2 = [shape.x + rightOffset, shape.y - sideOffset]
      const c3 = [shape.x + cornerOffset, shape.y - topOffset]
      const c4 = [shape.x - leftOffset, shape.y - leftOffset]
      ctx.moveTo(c1[0], c1[1]).lineTo(c2[0], c2[1]).lineTo(c3[0], c3[1]).lineTo(c4[0], c4[1]).closePath()
    }
  })

  // 注册三个面图形
  echarts.graphic.registerShape('CubeLeft', CubeLeft)
  echarts.graphic.registerShape('CubeRight', CubeRight)
  echarts.graphic.registerShape('CubeTop', CubeTop)
}

// 辅助函数：设置颜色的透明度
const setColorAlpha = (color, alpha) => {
  // 处理十六进制颜色
  if (color.startsWith('#')) {
    const r = parseInt(color.slice(1, 3), 16)
    const g = parseInt(color.slice(3, 5), 16)
    const b = parseInt(color.slice(5, 7), 16)
    return `rgba(${r}, ${g}, ${b}, ${alpha})`
  }
  // 处理rgba颜色
  if (color.startsWith('rgba')) {
    return color.replace(/[\d.]+\)$/g, `${alpha})`)
  }
  // 处理rgb颜色
  if (color.startsWith('rgb')) {
    return color.replace('rgb', 'rgba').replace(')', `, ${alpha})`)
  }
  return color
}

// 辅助函数：创建渐变配置
const createGradient = (topColor, middleColor, isBackground = false) => {
  if (!props.enableTransparency) {
    // 不启用透明时返回纯色渐变
    return new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
      offset: 0,
      color: topColor
    }, {
      offset: 0.8,
      color: middleColor
    }])
  }
  
  // 启用透明时的渐变
  const bottomAlpha = isBackground 
    ? props.bottomOpacity * props.backgroundTransparencyScale
    : props.bottomOpacity
    
  return new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
    offset: 0,
    color: topColor
  }, {
    offset: props.transparencyOffset,
    color: middleColor
  }, {
    offset: 1,
    color: setColorAlpha(middleColor, bottomAlpha)
  }])
}

// 辅助函数：智能计算Y轴配置（自动5段分割）
const calculateAxisConfig = (maxValue) => {
  if (maxValue <= 0) {
    return { max: 100, interval: 20 }
  }
  
  // 计算数量级
  const magnitude = Math.pow(10, Math.floor(Math.log10(maxValue)))
  const normalized = maxValue / magnitude
  
  // 选择合适的上限值
  let niceMax
  if (normalized <= 1) niceMax = 1
  else if (normalized <= 2) niceMax = 2
  else if (normalized <= 5) niceMax = 5
  else niceMax = 10
  
  const actualMax = niceMax * magnitude
  const interval = actualMax / 5
  
  return { max: actualMax, interval }
}

// 初始化图表配置
const initChartOption = () => {
  const maxValue = Math.max(...props.maxData)
  const { max, interval } = calculateAxisConfig(maxValue)
  
  chartOption.value = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      formatter: function (params, ticket, callback) {
        const item = props.showMaxBars ? params[1] : params[0]
        return item.name + ' : ' + item.value
      },
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      borderColor: '#00bfff',
      borderWidth: 1,
      textStyle: {
        color: '#fff'
      }
    },
    grid: {
      left: 40,
      right: 40,
      bottom: 60,
      top: 40,
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: props.categories,
      axisLine: {
        show: true,
        lineStyle: {
          color: '#00bfff'
        }
      },
      offset: 0,
      axisTick: {
        show: false,
        length: 9,
        alignWithLabel: true,
        lineStyle: {
          color: '#00bfff'
        }
      },
      axisLabel: {
        show: true,
        fontSize: 12,
        color: '#8cc8ff',
        formatter: function(value) {
          if (value.length > 2) {
            return value.substring(0, 2) + '\n' + value.substring(2);
          }
          return value;
        }
      },
    },
    yAxis: {
      min: 0,
      max: max,
      interval: interval,
      type: 'value',
      axisLine: {
        show: false,
        lineStyle: {
          color: '#00bfff'
        }
      },
      splitLine: {
        show: true,
        lineStyle: {
          type: "dashed",
          color: "rgba(0, 191, 255, 0.2)"
        },
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        show: true,
        fontSize: 12,
        color: '#8cc8ff'
      },
      boundaryGap: ['20%', '20%']
    },
    series: (() => {
      const series = []
      
      // 背景立体柱 - 只在showMaxBars为true时添加
      if (props.showMaxBars) {
        series.push({
          type: 'custom',
          renderItem: function (params, api) {
            const location = api.coord([api.value(0), api.value(1)])
            
            const backgroundLeftGradient = createGradient(
              'rgba(0, 191, 255, 0.15)',
              'rgba(0, 191, 255, 0.08)',
              true
            )
            
            const backgroundRightGradient = createGradient(
              'rgba(0, 191, 255, 0.12)',
              'rgba(0, 191, 255, 0.06)',
              true
            )
            
            return {
              type: 'group',
              children: [{
                type: 'CubeLeft',
                shape: {
                  api,
                  x: location[0],
                  y: location[1],
                  xAxisPoint: api.coord([api.value(0), 0])
                },
                style: {
                  fill: backgroundLeftGradient
                }
              }, {
                type: 'CubeRight',
                shape: {
                  api,
                  x: location[0],
                  y: location[1],
                  xAxisPoint: api.coord([api.value(0), 0])
                },
                style: {
                  fill: backgroundRightGradient
                }
              }, {
                type: 'CubeTop',
                shape: {
                  api,
                  x: location[0],
                  y: location[1],
                  xAxisPoint: api.coord([api.value(0), 0])
                },
                style: {
                  fill: 'rgba(0, 191, 255, 0.12)'
                }
              }]
            }
          },
          data: props.maxData
        })
      }
      
      // 实际数据立体柱 - 总是添加
      series.push({
        type: 'custom',
        renderItem: (params, api) => {
          const location = api.coord([api.value(0), api.value(1)])
          const colors = colorSchemes[props.colorScheme]
          
          const leftGradient = createGradient(
            colors.left[0],
            colors.left[1],
            false
          )
          
          const rightGradient = createGradient(
            colors.right[0],
            colors.right[1],
            false
          )
          
          const topGradient = new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: colors.top
          }, {
            offset: 1,
            color: colors.top
          }])

          return {
            type: 'group',
            children: [{
              type: 'CubeLeft',
              shape: {
                api,
                xValue: api.value(0),
                yValue: api.value(1),
                x: location[0],
                y: location[1],
                xAxisPoint: api.coord([api.value(0), 0])
              },
              style: {
                fill: leftGradient
              }
            }, {
              type: 'CubeRight',
              shape: {
                api,
                xValue: api.value(0),
                yValue: api.value(1),
                x: location[0],
                y: location[1],
                xAxisPoint: api.coord([api.value(0), 0])
              },
              style: {
                fill: rightGradient
              }
            }, {
              type: 'CubeTop',
              shape: {
                api,
                xValue: api.value(0),
                yValue: api.value(1),
                x: location[0],
                y: location[1],
                xAxisPoint: api.coord([api.value(0), 0])
              },
              style: {
                fill: topGradient
              }
            }]
          }
        },
        data: props.data
      })
      
      return series
    })()
  }
}

onMounted(() => {
  initCustomShapes(props.barWidth)
  initChartOption()
})

// 监听透明相关props变化，重新初始化图表
watchEffect(() => {
  // 依赖收集这些props
  props.enableTransparency
  props.transparencyOffset
  props.bottomOpacity
  props.backgroundTransparencyScale
  props.showMaxBars
  props.barWidth
  
  // 如果图表已初始化，重新配置
  if (chartOption.value.series) {
    initCustomShapes(props.barWidth)
    initChartOption()
  }
})
</script>

<style scoped>
.bar-3d-container {
  width: 100%;
  height: v-bind(height);
  /* background: linear-gradient(180deg, rgba(0, 191, 255, 0.05) 0%, rgba(0, 0, 0, 0.1) 100%);
  border: 1px solid rgba(0, 191, 255, 0.3);
  border-radius: 8px;
  padding: 10px;
  backdrop-filter: blur(10px); */
}

.chart {
  width: 100%;
  height: 100%;
}
</style>