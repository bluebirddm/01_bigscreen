<template>
  <div class="evaluation-count-ranking">
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

// 密码评估机构测评数量数据
const data = ref([756, 125, 98, 83, 63, 37, 31, 30, 27, 20])

// 机构名称
const categories = ref([
  '北京', 
  '上海', 
  '山东', 
  '广东', 
  '浙江', 
  '江苏', 
  '山西', 
  '湖北', 
  '湖南'
])

// 设置最大值为1000
const maxData = ref([1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000])
</script>

<style scoped>
.evaluation-count-ranking {
  height: 263px;
  width: 100%;
  padding: 10px;
}
</style>