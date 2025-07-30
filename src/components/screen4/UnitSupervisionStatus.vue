<template>
  <div class="unit-supervision-status">
    <StackedBarChart 
      :data="statusData" 
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
const units = ['龙源电力', '国华', '国电', '宁夏', '国神', '湖北', '江苏']
const seriesData = [
  { name: '按规范', data: [420, 380, 350, 320, 280, 250, 220] },
  { name: '执行管理要求', data: [180, 160, 140, 120, 100, 80, 60] },
  { name: '未完成', data: [30, 25, 20, 15, 12, 10, 8] }
]

// 转换为StackedBarChart期望的数据格式
const statusData = computed(() => ({
  xdata: units,
  result: seriesData.map(item => ({
    name: item.name,
    data: item.data
  }))
}))

// 配色方案
const colors = [
  [
    { offset: 0, color: "#4ecdc4" },
    { offset: 0.5, color: "#45b7d1" },
    { offset: 1, color: "#3fa9c4" }
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
.unit-supervision-status {
  height: 263px;
  max-height: 263px;
  width: 100%;
  margin: 0 auto;
}
</style>