<template>
  <div class="stacked-bar-chart">
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
    default: 'bottom', // 'top' | 'bottom'
    validator: (value) => ['top', 'bottom'].includes(value)
  },
  barWidth: {
    type: Number,
    default: 20
  },
  diamondWidth: {
    type: Number,
    default: null // 如果不设置，使用barWidth
  },
  diamondHeight: {
    type: Number,
    default: 12
  },
  autoFitContainer: {
    type: Boolean,
    default: true
  },
  gridTop: {
    type: String,
    default: null // 如果不设置，使用legendPosition决定
  },
  gridBottom: {
    type: String,
    default: null // 如果不设置，使用legendPosition决定
  },
  gridLeft: {
    type: String,
    default: '10%'
  },
  gridRight: {
    type: String,
    default: '5%'
  }
})

const chartOption = ref({})

// 项目主题色彩方案（cyber-blue风格）
const color = [
  [{ offset: 0, color: "#00bfff" }, { offset: 0.5, color: "#00bfff" }, { offset: 0.5, color: "#0080cc" }, { offset: 1, color: "#0080cc" }],
  [{ offset: 0, color: "#4ecdc4" }, { offset: 0.5, color: "#4ecdc4" }, { offset: 0.5, color: "#3ba199" }, { offset: 1, color: "#3ba199" }],
  [{ offset: 0, color: "#45b7d1" }, { offset: 0.5, color: "#45b7d1" }, { offset: 0.5, color: "#3691a8" }, { offset: 1, color: "#3691a8" }],
  [{ offset: 0, color: "#8cc8ff" }, { offset: 0.5, color: "#8cc8ff" }, { offset: 0.5, color: "#6bb3ff" }, { offset: 1, color: "#6bb3ff" }],
  [{ offset: 0, color: "#5dade2" }, { offset: 0.5, color: "#5dade2" }, { offset: 0.5, color: "#4896d1" }, { offset: 1, color: "#4896d1" }],
  [{ offset: 0, color: "#74c7ec" }, { offset: 0.5, color: "#74c7ec" }, { offset: 0.5, color: "#5fb8e0" }, { offset: 1, color: "#5fb8e0" }],
]

// 计算堆叠数据
const diamondData = computed(() => {
  return props.data.result.reduce((pre, cur, index) => {
    pre[index] = cur.data.map((el, id) => el + (pre[index - 1] ? pre[index - 1][id] : 0))
    return pre
  }, [])
})

// 计算配置值
const BAR_WIDTH = computed(() => props.barWidth)
const DIAMOND_SIZE = computed(() => [
  props.diamondWidth || props.barWidth, 
  props.diamondHeight
])

// 计算菱形装饰所需的额外空间
const diamondPadding = computed(() => {
  // 菱形的symbolOffset为±50%，所以需要预留菱形高度的一半
  return Math.ceil(props.diamondHeight / 2)
})

// 智能布局配置
const layoutConfig = computed(() => {
  if (!props.autoFitContainer) {
    // 如果不启用自动适配，使用原始配置
    return {
      gridTop: props.legendPosition === 'top' ? '25%' : '15%',
      gridBottom: props.legendPosition === 'top' ? '10%' : '20%'
    }
  }
  
  const padding = diamondPadding.value
  
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
  
  props.data.result.forEach((item, i) => {
    // 堆叠柱状图 - 只在第一个系列设置barWidth
    seriesArray.push({
      z: i + 1,
      stack: '总量',
      type: 'bar',
      name: item.name,
      ...(i === 0 ? { barWidth: BAR_WIDTH.value } : {}), // 只在第一个系列设置宽度
      data: item.data,
      itemStyle: { 
        color: { 
          type: 'linear', 
          x: 0, 
          x2: 1, 
          y: 0, 
          y2: 0, 
          colorStops: color[i % color.length] 
        } 
      },
    })
    
    // 顶部菱形装饰
    seriesArray.push({
      z: i + 10,
      type: 'pictorialBar',
      symbolPosition: 'end',
      symbol: 'diamond',
      symbolOffset: [0, '-50%'],
      symbolSize: DIAMOND_SIZE.value,
      data: diamondData.value[i],
      itemStyle: { 
        color: { 
          type: 'linear', 
          x: 0, 
          x2: 1, 
          y: 0, 
          y2: 0, 
          colorStops: color[i % color.length] 
        } 
      },
      tooltip: { show: false },
    })
  })
  
  // 底部菱形装饰
  if (props.data.result.length > 0) {
    seriesArray.push({
      z: props.data.result.length * 2,
      type: "pictorialBar",
      symbolPosition: "start",
      data: props.data.result[0].data,
      symbol: "diamond",
      symbolOffset: ["0%", "50%"],
      symbolSize: DIAMOND_SIZE.value,
      itemStyle: { 
        color: { 
          type: 'linear', 
          x: 0, 
          x2: 1, 
          y: 0, 
          y2: 0, 
          colorStops: color[0]
        } 
      },
      tooltip: { show: false },
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
        type: 'shadow'
      },
      backgroundColor: 'rgba(0, 20, 40, 0.9)',
      borderColor: '#00bfff',
      borderWidth: 1,
      textStyle: {
        color: '#fff',
        fontSize: 12
      },
      padding: [8, 12],
      confine: true,
      formatter: function(params) {
        let result = `<div style="margin-bottom: 5px; font-weight: bold; color: #00bfff;">${params[0].axisValue}</div>`
        let total = 0
        
        // 只处理柱状图数据，过滤掉装饰元素
        const barData = params.filter(item => item.seriesType === 'bar')
        
        // 计算总计
        barData.forEach(item => {
          total += item.value
        })
        
        // 显示各系列数据
        barData.forEach((item, index) => {
          const percent = total > 0 ? ((item.value / total) * 100).toFixed(1) : 0
          result += `<div style="margin: 3px 0; display: flex; align-items: center;">
            <span style="display: inline-block; width: 10px; height: 10px; background: ${item.color}; border-radius: 2px; margin-right: 6px;"></span>
            <span style="color: #8cc8ff; margin-right: 8px;">${item.seriesName}:</span>
            <span style="color: #fff; font-weight: bold; margin-right: 8px;">${item.value}</span>
            <span style="color: #4ecdc4; font-size: 11px;">(${percent}%)</span>
          </div>`
        })
        
        // 显示总计
        if (total > 0) {
          result += `<div style="margin-top: 6px; padding-top: 6px; border-top: 1px solid rgba(0, 191, 255, 0.3); color: #00bfff; font-weight: bold;">
            总计: ${total}
          </div>`
        }
        
        return result
      }
    },
    legend: {
      data: props.data.result.map(item => item.name),
      textStyle: { 
        fontSize: 12, 
        color: '#8cc8ff'
      },
      itemWidth: 25,
      itemHeight: 15,
      itemGap: 15,
      ...(props.legendPosition === 'top' 
        ? { top: '5%', left: 'center' } 
        : { bottom: '5%' }
      ),
      selectedMode: false,
    },
    grid: { 
      top: props.gridTop || (props.legendPosition === 'top' ? '30%' : '15%'),
      left: props.gridLeft, 
      right: props.gridRight, 
      bottom: props.gridBottom || (props.legendPosition === 'top' ? '15%' : '25%'),
      containLabel: true // 确保标签不会溢出
    },
    xAxis: { 
      type: 'category',
      axisTick: { show: true },
      axisLine: { 
        lineStyle: { 
          color: 'rgba(0, 191, 255, 0.3)' 
        } 
      },
      axisLabel: { 
        color: '#8cc8ff',
        fontSize: 11
      },
      data: props.data.xdata
    },
    yAxis: [{ 
      type: 'value',
      splitLine: { 
        lineStyle: { 
          color: 'rgba(0, 191, 255, 0.1)',
          type: 'dashed'
        } 
      },
      axisLine: { 
        show: false 
      },
      axisLabel: { 
        color: '#8cc8ff',
        fontSize: 11
      }
    }],
    series: series.value,
    animationEasing: 'elasticOut',
    animationDelay: function(idx) {
      return idx * 50
    }
  }
})
</script>

<style scoped>
.stacked-bar-chart {
  height: 100%;
  width: 100%;
  overflow: hidden;
  box-sizing: border-box;
}

.chart {
  height: 100%;
  width: 100%;
  overflow: hidden;
}
</style>