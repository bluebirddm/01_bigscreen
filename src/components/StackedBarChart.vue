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
      backgroundColor: 'rgba(0, 20, 40, 0.9)',
      borderColor: '#00bfff',
      borderWidth: 1,
      textStyle: {
        color: '#fff'
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
      top: props.legendPosition === 'top' ? '25%' : '15%', 
      left: '10%', 
      right: '5%', 
      bottom: props.legendPosition === 'top' ? '10%' : '20%'
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