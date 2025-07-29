<template>
  <div class="compliance-level-chart">
    <StackedBarChart 
      :data="complianceChartData" 
      legend-position="top"
      :bar-width="20"
      :diamond-height="12"
      :auto-fit-container="true"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import StackedBarChart from '../StackedBarChart.vue'

// 系统类型原始数据
const categories = ['党政系统', '金融系统', '电力系统', '交通系统', '医疗系统', '教育系统', '通信系统', '能源系统']
const seriesData = [
  { name: '一级', data: [45, 32, 28, 15, 12, 8, 6, 5] },
  { name: '二级', data: [89, 78, 65, 42, 38, 25, 22, 18] },
  { name: '三级', data: [156, 142, 128, 89, 76, 54, 48, 38] },
  { name: '四级', data: [78, 65, 52, 34, 28, 18, 15, 12] },
  { name: '未定级', data: [12, 8, 6, 4, 3, 2, 2, 1] }
]

// 转换为StackedBarChart期望的数据格式
const complianceChartData = computed(() => ({
  xdata: categories,
  result: seriesData.map(item => ({
    name: item.name,
    data: item.data
  }))
}))
</script>

<style scoped>
.compliance-level-chart {
  height: 263px;
  max-height: 263px;
  width: 100%;
  margin: 0 auto;
}
</style>