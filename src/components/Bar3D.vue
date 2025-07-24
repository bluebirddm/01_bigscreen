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
import { ref, onMounted } from 'vue'
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
  }
})

const chartOption = ref({})

// 3D立体图形定义
const initCustomShapes = () => {
  // 绘制左侧面
  const CubeLeft = echarts.graphic.extendShape({
    shape: {
      x: 0,
      y: 0
    },
    buildPath: function (ctx, shape) {
      const xAxisPoint = shape.xAxisPoint
      const c0 = [shape.x, shape.y]
      const c1 = [shape.x - 13, shape.y - 13]
      const c2 = [xAxisPoint[0] - 13, xAxisPoint[1] - 13]
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
      const c3 = [xAxisPoint[0] + 18, xAxisPoint[1] - 9]
      const c4 = [shape.x + 18, shape.y - 9]
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
      const c2 = [shape.x + 18, shape.y - 9]
      const c3 = [shape.x + 5, shape.y - 22]
      const c4 = [shape.x - 13, shape.y - 13]
      ctx.moveTo(c1[0], c1[1]).lineTo(c2[0], c2[1]).lineTo(c3[0], c3[1]).lineTo(c4[0], c4[1]).closePath()
    }
  })

  // 注册三个面图形
  echarts.graphic.registerShape('CubeLeft', CubeLeft)
  echarts.graphic.registerShape('CubeRight', CubeRight)
  echarts.graphic.registerShape('CubeTop', CubeTop)
}

// 初始化图表配置
const initChartOption = () => {
  const maxValue = Math.max(...props.maxData)
  
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
      offset: 25,
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
        color: '#8cc8ff'
      },
    },
    yAxis: {
      min: 0,
      max: Math.ceil(maxValue / 200) * 200,
      interval: Math.ceil(maxValue / 1000) * 200,
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
            
            const backgroundLeftGradient = new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: 'rgba(0, 191, 255, 0.15)'
            }, {
              offset: 0.5,
              color: 'rgba(0, 191, 255, 0.08)'
            }, {
              offset: 1,
              color: 'rgba(0, 191, 255, 0)'
            }])
            
            const backgroundRightGradient = new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: 'rgba(0, 191, 255, 0.12)'
            }, {
              offset: 0.5,
              color: 'rgba(0, 191, 255, 0.06)'
            }, {
              offset: 1,
              color: 'rgba(0, 191, 255, 0)'
            }])
            
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
          const isHighlight = api.value(1) > maxValue * 0.8
          
          const leftGradient = new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: isHighlight ? '#ff6b6b' : '#00bfff'
          }, {
            offset: 0.5,
            color: isHighlight ? '#cc5555' : '#0088cc'
          }, {
            offset: 1,
            color: isHighlight ? 'rgba(255, 107, 107, 0)' : 'rgba(0, 191, 255, 0)'
          }])
          
          const rightGradient = new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: isHighlight ? '#ff8888' : '#33ccff'
          }, {
            offset: 0.5,
            color: isHighlight ? '#dd6666' : '#0099dd'
          }, {
            offset: 1,
            color: isHighlight ? 'rgba(255, 136, 136, 0)' : 'rgba(51, 204, 255, 0)'
          }])
          
          const topGradient = new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: isHighlight ? '#ffaaaa' : '#66d9ff'
          }, {
            offset: 1,
            color: isHighlight ? '#ffaaaa' : '#66d9ff'
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
  initCustomShapes()
  initChartOption()
})
</script>

<style scoped>
.bar-3d-container {
  width: 100%;
  height: v-bind(height);
  background: linear-gradient(180deg, rgba(0, 191, 255, 0.05) 0%, rgba(0, 0, 0, 0.1) 100%);
  border: 1px solid rgba(0, 191, 255, 0.3);
  border-radius: 8px;
  padding: 10px;
  backdrop-filter: blur(10px);
}

.chart {
  width: 100%;
  height: 100%;
}
</style>