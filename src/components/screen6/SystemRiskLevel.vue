<template>
  <div class="system-risk-level">
    <Risk3DEffect
      :value="213"
      trend="down"
      label="不符合"
      unit="个"
      colorTheme="red"
    />
    <Risk3DEffect
      :value="3485"
      trend="up"
      label="符合"
      unit="个"
      colorTheme="blue"
    />
    <Risk3DEffect
      :value="234"
      trend="up"
      label="基本符合"
      unit="个"
      colorTheme="yellow"
    />
  </div>
</template>

<script setup>
import Risk3DEffect from '../Risk3DEffect.vue'
</script>

<style scoped>
.system-risk-level {
  display: flex;
  gap: 30px;
  justify-content: center;
  align-items: center;
  width: 100%;
  transform: scale(0.8);
}
</style>