<template>
  <div class="system-type-3d">
    <!-- <Pie3DChartV1 
      :data="chartData"
      :width="'100%'"
      :height="'100%'"
      :backgroundColor="'transparent'"
      :autoRotate="false"
      :internalDiameterRatio="0.4"
    /> -->
    <Pie3DChartV1 
      :data="chartData"
      width="'100%'"
      height="'100%'"
      :internalDiameterRatio="0.4"
      unit="件"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Pie3DChartV1 from './Pie3DChartV1.vue'

const chartData = ref([
  {
    name: "通用",
    value: 20,
    itemStyle: {
      color: "#2A71FF",
    },
  },
  {
    name: "移动互联网",
    value: 20,
    itemStyle: {
      color: "#00EDFE",
    },
  },
  {
    name: "工业控制",
    value: 20,
    itemStyle: {
      color: "#FEDB4B",
    },
  },
  {
    name: "云计算",
    value: 20,
    itemStyle: {
      color: "#FE7C2F",
    },
  },
  {
    name: "物联网",
    value: 20,
    itemStyle: {
      color: "#9C6EFF",
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