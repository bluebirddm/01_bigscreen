<template>
  <div class="test-page">
    <h1>Risk 3D Effect Test</h1>
    <div class="effect-container">
      <Risk3DEffect :value="124" trend="up" />
    </div>
  </div>
</template>

<script setup>
import Risk3DEffect from '../components/Risk3DEffect.vue'
</script>

<style scoped>
.test-page {
  min-height: 100vh;
  background: #0a0e27;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

h1 {
  color: #fff;
  margin-bottom: 40px;
  font-size: 28px;
}

.effect-container {
  display: flex;
  justify-content: center;
}
</style>