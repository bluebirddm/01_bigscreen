<template>
  <div class="province-ranking-enhanced">
    <StackedBarChart 
      :data="provinceChartData" 
      legend-position="top"
      :bar-width="20"
      :diamond-height="12"
      grid-top="15%"
      grid-bottom="10%"
      :auto-fit-container="true"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import StackedBarChart from '@/components/StackedBarChart.vue'

// 省份原始数据
const categories = ['深圳市', '北京市', '上海市', '广州市', '杭州市', '成都市', '苏州市', '南京市', '武汉市', '西安市']
const seriesData = [
  { name: '一级', data: [120, 98, 80, 70, 50, 42, 35, 25, 20, 15] },
  { name: '二级', data: [200, 180, 150, 120, 90, 80, 65, 45, 35, 25] },
  { name: '三级', data: [100, 80, 60, 60, 40, 35, 25, 15, 12, 6] },
  { name: '四级', data: [30, 20, 10, 15, 12, 6, 7, 4, 3, 2] },
  { name: '未定级', data: [18, 6, 2, 3, 2, 2, 2, 1, 1, 0] }
]

// 转换为StackedBarChart期望的数据格式
const provinceChartData = computed(() => ({
  xdata: categories,
  result: seriesData.map(item => ({
    name: item.name,
    data: item.data
  }))
}))
</script>

<style scoped>
.province-ranking-enhanced {
  height: 100%;
  width: 100%;
  /* max-height: 260px; */
  /* 323px容器高度 - 80px顶部间距 = 243px 确保完全包含 */
  overflow: hidden;
  box-sizing: border-box;
}
</style>