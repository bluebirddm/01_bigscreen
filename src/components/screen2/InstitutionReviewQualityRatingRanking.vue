<template>
  <div class="institution-quality-ranking">
    <Bar3D 
      :data="data"
      :categories="categories"
      :maxData="maxData"
      height="100%"
      :showMaxBars="false"
      :enableTransparency="true"
      :transparencyOffset="0.6"
      :bottomOpacity="0.1"
      colorScheme="green"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Bar3D from '../Bar3D.vue'

// 质量评分数据（0-100范围）
const data = ref([96.5, 94.2, 92.8, 91.3, 89.7, 88.4, 86.9, 85.2, 83.6])

// 机构名称（与设计图保持一致）
const categories = ref([
  '中能电力', 
  '内蒙古信托', 
  '慧聚网安', 
  '思沃科技', 
  '济南时代', 
  '江苏金盾', 
  '新疆信息', 
  '武汉安域', 
  '长春嘉诚'
])

// 设置最大值为100（质量评分满分）
const maxData = ref([100, 100, 100, 100, 100, 100, 100, 100, 100])
</script>

<style scoped>
.institution-quality-ranking {
  height: 100%;
  width: 100%;
  padding: 10px;
}
</style>