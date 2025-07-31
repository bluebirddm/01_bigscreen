<template>
  <div class="evaluation-quality-ranking">
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
      colorScheme="orange"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Bar3D from '../Bar3D.vue'

// 密码评估机构质量评分数据
const data = ref([736, 143, 126, 98, 61, 53, 37, 31, 30])

// 机构名称
const categories = ref([
  '密码测评', 
  '商密认证', 
  '密评联盟', 
  '中密院', 
  '北京密码', 
  '上海密码', 
  '广东密码', 
  '江苏密码', 
  '浙江密码'
])

// 设置最大值为1000
const maxData = ref([1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000])
</script>

<style scoped>
.evaluation-quality-ranking {
  height: 263px;
  width: 100%;
  padding: 10px;
}
</style>