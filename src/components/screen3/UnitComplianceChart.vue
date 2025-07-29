<template>
  <div class="unit-compliance-chart">
    <v-chart class="chart" :option="chartOption" autoresize />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart } from 'echarts/charts'
import { 
  GridComponent,
  TooltipComponent,
  LegendComponent
} from 'echarts/components'
import VChart from 'vue-echarts'

use([
  CanvasRenderer,
  BarChart,
  GridComponent,
  TooltipComponent,
  LegendComponent
])

const chartOption = ref({})

const categories = ['国电集团', '华能集团', '大唐集团', '华电集团', '中电投', '神华集团', '中核集团', '中广核', '三峡集团', '国家电网']
const originalData = [94.2, 91.8, 89.5, 87.3, 85.6, 83.2, 81.7, 79.4, 76.8, 74.5]

// 将单一合规率拆分为多个堆叠类别
const seriesData = [
  { 
    name: '核心合规', 
    data: originalData.map(val => Math.round(val * 0.4)), // 40%的核心合规
    color: '#00bfff' 
  },
  { 
    name: '基础合规', 
    data: originalData.map(val => Math.round(val * 0.35)), // 35%的基础合规
    color: '#4ecdc4' 
  },
  { 
    name: '优化合规', 
    data: originalData.map(val => Math.round(val * 0.25)), // 25%的优化合规
    color: '#45b7d1' 
  }
]

onMounted(() => {
  chartOption.value = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(0, 20, 40, 0.9)',
      borderColor: '#00bfff',
      borderWidth: 1,
      textStyle: {
        color: '#fff'
      },
      formatter: function(params) {
        let result = `${params[0].name}<br/>`
        let total = 0
        params.forEach(param => {
          result += `${param.seriesName}: ${param.value}%<br/>`
          total += param.value
        })
        result += `<strong>总计: ${total}%</strong>`
        return result
      }
    },
    legend: {
      data: seriesData.map(item => item.name),
      textStyle: {
        color: '#8cc8ff',
        fontSize: 10
      },
      top: 5,
      left: 'center',
      itemGap: 15,
      selectedMode: false
    },
    grid: {
      left: '8%',
      right: '5%',
      bottom: '15%',
      top: '25%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: categories,
      axisLabel: {
        color: '#8cc8ff',
        fontSize: 10,
        rotate: 45,
        interval: 0
      },
      axisLine: {
        lineStyle: {
          color: '#00bfff'
        }
      },
      axisTick: {
        show: false
      }
    },
    yAxis: {
      type: 'value',
      max: 100,
      axisLabel: {
        color: '#8cc8ff',
        fontSize: 10,
        formatter: '{value}%'
      },
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(0, 191, 255, 0.1)',
          type: 'dashed'
        }
      }
    },
    series: seriesData.map((item, index) => ({
      name: item.name,
      type: 'bar',
      stack: 'total',
      data: item.data,
      barWidth: '60%',
      itemStyle: {
        color: item.color
      },
      label: {
        show: index === seriesData.length - 1,
        position: 'top',
        formatter: function(params) {
          // 计算总和
          let total = 0;
          seriesData.forEach(series => {
            total += series.data[params.dataIndex] || 0;
          });
          return `${total}%`;
        },
        color: '#fff',
        fontSize: 10,
        fontWeight: 'bold'
      },
      animationDelay: function(idx) {
        return idx * 100 + index * 50
      }
    })),
    animationEasing: 'elasticOut'
  }
})
</script>

<style scoped>
.unit-compliance-chart {
  height: 263px;
  max-height: 263px;
  width: 100%;
  margin: 0 auto;
}

.chart {
  height: 100%;
  width: 100%;
}
</style>