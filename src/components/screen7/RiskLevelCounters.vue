<template>
  <div class="risk-level-counters">
    <Risk3DEffect
      :value="234"
      trend="down"
      label="高危"
      unit="个"
      colorTheme="red"
    />
    <Risk3DEffect
      :value="234"
      trend="stable"
      label="中危"
      unit="个"
      colorTheme="yellow"
    />
    <Risk3DEffect
      :value="237"
      trend="up"
      label="低危"
      unit="个"
      colorTheme="blue"
    />
  </div>
</template>

<script setup>
import Risk3DEffect from '../Risk3DEffect.vue'
</script>

<style scoped>
.risk-level-counters {
  display: flex;
  gap: 30px;
  justify-content: center;
  align-items: center;
  width: 100%;
  transform: scale(0.8);
}
</style>