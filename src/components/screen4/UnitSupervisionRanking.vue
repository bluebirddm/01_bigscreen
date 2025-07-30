<template>
  <div class="unit-supervision-ranking">
    <StackedBarChart 
      :data="supervisionData" 
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

// TOP10单位
const units = ['龙源电力', '国华', '国电', '宁夏', '国神', '湖北', '江苏', '广东', '山西', '河北']
const seriesData = [
  { name: '基础', data: [320, 300, 280, 260, 240, 220, 200, 180, 160, 140] },
  { name: '现场管理', data: [280, 260, 240, 220, 200, 180, 160, 140, 120, 100] },
  { name: '未定级', data: [50, 40, 35, 30, 25, 20, 18, 15, 12, 10] }
]

// 转换为StackedBarChart期望的数据格式
const supervisionData = computed(() => ({
  xdata: units,
  result: seriesData.map(item => ({
    name: item.name,
    data: item.data
  }))
}))

// 配色方案
const colors = [
  [
    { offset: 0, color: "#00bfff" },
    { offset: 0.5, color: "#0080ff" },
    { offset: 1, color: "#0060ff" }
  ],
  [
    { offset: 0, color: "#66bb6a" },
    { offset: 0.5, color: "#4caf50" },
    { offset: 1, color: "#388e3c" }
  ],
  [
    { offset: 0, color: "#ffa726" },
    { offset: 0.5, color: "#ff9800" },
    { offset: 1, color: "#f57c00" }
  ]
]
</script>

<style scoped>
.unit-supervision-ranking {
  height: 263px;
  max-height: 263px;
  width: 100%;
  margin: 0 auto;
}
</style>