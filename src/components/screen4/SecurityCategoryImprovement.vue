<template>
  <div class="security-category-improvement">
    <StackedBarChart 
      :data="improvementData" 
      legend-position="top"
      :bar-width="20"
      :diamond-height="12"
      :colors="colors"
      :auto-fit-container="true"
      grid-top="20%"
      grid-bottom="13%"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import StackedBarChart from '../StackedBarChart.vue'

// 安全类别列表
const categories = ['物理环境', '网络安全', '主机安全', '应用安全', '数据安全', '安全管理']
const seriesData = [
  { name: '已解决', data: [120, 110, 100, 90, 80, 70] },
  { name: '整改中', data: [60, 55, 50, 45, 40, 35] },
  { name: '待处理', data: [20, 18, 15, 12, 10, 8] }
]

// 转换为StackedBarChart期望的数据格式
const improvementData = computed(() => ({
  xdata: categories,
  result: seriesData.map(item => ({
    name: item.name,
    data: item.data
  }))
}))

// 配色方案
const colors = [
  [
    { offset: 0, color: "#66bb6a" },
    { offset: 0.5, color: "#4caf50" },
    { offset: 1, color: "#388e3c" }
  ],
  [
    { offset: 0, color: "#ffd700" },
    { offset: 0.5, color: "#ffc107" },
    { offset: 1, color: "#ffb300" }
  ],
  [
    { offset: 0, color: "#ff6b6b" },
    { offset: 0.5, color: "#ff5252" },
    { offset: 1, color: "#ff1744" }
  ]
]
</script>

<style scoped>
.security-category-improvement {
  height: 263px;
  max-height: 263px;
  width: 100%;
  margin: 0 auto;
}
</style>