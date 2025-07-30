<template>
  <div class="unit-management-rectification">
    <StackedBarChart 
      :data="rectificationData" 
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

// 单位列表
const units = ['龙源电力', '国华', '国电', '宁夏', '国神', '湖北', '江苏', '广东', '山西']
const seriesData = [
  { name: '已整改', data: [180, 160, 140, 120, 100, 80, 60, 50, 40] },
  { name: '整改中', data: [80, 70, 60, 50, 40, 35, 30, 25, 20] },
  { name: '未整改', data: [15, 12, 10, 8, 6, 5, 4, 3, 2] }
]

// 转换为StackedBarChart期望的数据格式
const rectificationData = computed(() => ({
  xdata: units,
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
    { offset: 0, color: "#ffb300" },
    { offset: 0.5, color: "#ffa000" },
    { offset: 1, color: "#ff8f00" }
  ],
  [
    { offset: 0, color: "#e74c3c" },
    { offset: 0.5, color: "#d62c1a" },
    { offset: 1, color: "#c0392b" }
  ]
]
</script>

<style scoped>
.unit-management-rectification {
  height: 263px;
  max-height: 263px;
  width: 100%;
  margin: 0 auto;
}
</style>