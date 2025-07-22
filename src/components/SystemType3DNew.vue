<template>
  <div class="system-type-3d">
    <Pie3DChartNew 
      :data="chartData"
      :width="'100%'"
      :height="'100%'"
      :backgroundColor="'transparent'"
      :autoRotate="false"
      :internalDiameterRatio="0.4"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Pie3DChartNew from './Pie3DChartNew.vue'

const chartData = ref([
  {
    name: "通用",
    value: 20,
    itemStyle: {
      color: "#FF6B6B",
    },
  },
  {
    name: "移动互联网", 
    value: 20,
    itemStyle: {
      color: "#4ECDC4",
    },
  },
  {
    name: "工业控制",
    value: 20,
    itemStyle: {
      color: "#45B7D1",
    },
  },
  {
    name: "云计算",
    value: 20,
    itemStyle: {
      color: "#FFA726",
    },
  },
  {
    name: "物联网",
    value: 20,
    itemStyle: {
      color: "#AB47BC",
    },
  },
])
</script>

<style scoped>
.system-type-3d {
  height: 100%;
  width: 100%;
}
</style>