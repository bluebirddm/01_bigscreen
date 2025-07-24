<template>
  <div class="test-container">
    <h1>3D风险指标组件测试</h1>
    <div class="indicators-grid">
      <Risk3DIndicator 
        :value="124" 
        trend="up" 
        color="#ff6b6b"
      />
      <Risk3DIndicator 
        :value="86" 
        trend="down" 
        color="#4ecdc4"
      />
      <Risk3DIndicator 
        :value="156" 
        trend="up" 
        color="#ffd93d"
      />
    </div>
  </div>
</template>

<script setup>
import Risk3DIndicator from '@/components/Risk3DIndicator.vue'
</script>

<style scoped>
.test-container {
  min-height: 100vh;
  background: #0a0f1b;
  padding: 40px;
  color: #fff;
}

h1 {
  text-align: center;
  margin-bottom: 40px;
  color: #00bfff;
}

.indicators-grid {
  display: flex;
  justify-content: center;
  gap: 40px;
  flex-wrap: wrap;
}
</style>