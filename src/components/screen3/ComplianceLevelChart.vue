<template>
  <div class="compliance-level-chart">
    <StackedBarChart 
      :data="complianceChartData" 
      legend-position="top"
      :bar-width="20"
      :diamond-height="12"
      :colors="brightColors"
      :auto-fit-container="true"
      legendPosition="top-right"
      grid-top="20%"
      grid-bottom="13%"
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

// 明亮的颜色方案
const brightColors = [
  [
    { offset: 0, color: "#FFD700" },  // 金色
    { offset: 0.5, color: "#FFA500" }, // 橙色
    { offset: 1, color: "#FF8C00" }   // 深橙色
  ],
  [
    { offset: 0, color: "#00FF7F" },  // 春绿色
    { offset: 0.5, color: "#32CD32" }, // 酸橙绿
    { offset: 1, color: "#228B22" }   // 森林绿
  ],
  [
    { offset: 0, color: "#FF69B4" },  // 热粉红
    { offset: 0.5, color: "#FF1493" }, // 深粉红
    { offset: 1, color: "#C71585" }   // 中紫红
  ],
  [
    { offset: 0, color: "#00BFFF" },  // 深天蓝
    { offset: 0.5, color: "#1E90FF" }, // 道奇蓝
    { offset: 1, color: "#4169E1" }   // 皇家蓝
  ],
  [
    { offset: 0, color: "#FFE4B5" },  // 鹿皮色
    { offset: 0.5, color: "#FFDAB9" }, // 桃色
    { offset: 1, color: "#FFB6C1" }   // 浅粉红
  ],
  [
    { offset: 0, color: "#DDA0DD" },  // 梅红色
    { offset: 0.5, color: "#DA70D6" }, // 兰花紫
    { offset: 1, color: "#BA55D3" }   // 中兰花紫
  ]
]


</script>

<style scoped>
.compliance-level-chart {
  height: 263px;
  max-height: 263px;
  width: 100%;
  margin: 0 auto;
}
</style>