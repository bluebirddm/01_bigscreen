<template>
  <div class="unit-security-average-ranking">
    <Bar3D 
      :data="data"
      :categories="categories"
      :maxData="maxData"
      height="100%"
      :showMaxBars="false"
      :enableTransparency="true"
      :transparencyOffset="0.6"
      :bottomOpacity="0.1"
      :barWidth="20"
      colorScheme="blue"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Bar3D from '../Bar3D.vue'

// 各单位密评平均分数据
const data = ref([92, 88, 85, 83, 81, 78, 76, 73, 71, 68])

// 单位名称
const categories = ref([
  '北京市', 
  '上海市', 
  '深圳市', 
  '广州市', 
  '杭州市', 
  '成都市', 
  '南京市', 
  '武汉市', 
  '西安市',
  '重庆市'
])

// 设置最大值为100（满分）
const maxData = ref([100, 100, 100, 100, 100, 100, 100, 100, 100, 100])
</script>

<style scoped>
.unit-security-average-ranking {
  height: 263px;
  width: 100%;
  padding: 10px;
}
</style>