<template>
  <div class="risk-agency-count-ranking">
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
      colorScheme="teal"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Bar3D from '../Bar3D.vue'

// 根据设计图配置测评数量数据
const data = ref([736, 143, 126, 98, 68, 61, 53, 37, 31, 30])

// 机构名称
const categories = ref([
  '中能电力', 
  '内蒙古信托', 
  '慧聚网安', 
  '思沃科技', 
  '齐鲁银行',
  '江苏金盾',
  '济南时代', 
  '新疆信息', 
  '武汉安域', 
  '长春嘉诚'
])

// 设置最大值为1000（匹配设计图Y轴范围）
const maxData = ref([1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000])
</script>

<style scoped>
.risk-agency-count-ranking {
  height: 100%;
  width: 100%;
  padding: 10px;
}
</style>