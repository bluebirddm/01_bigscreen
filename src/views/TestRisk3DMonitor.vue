<template>
  <div class="test-page">
    <h1>3D报警监控界面测试</h1>
    <div class="monitor-container">
      <Risk3DMonitor />
    </div>
  </div>
</template>

<script setup>
import Risk3DMonitor from '../components/Risk3DMonitor.vue'
</script>

<style scoped>
.test-page {
  min-height: 100vh;
  background: #050a1a;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

h1 {
  color: #fff;
  margin-bottom: 40px;
  font-size: 32px;
  text-shadow: 0 0 20px rgba(0, 191, 255, 0.5);
}

.monitor-container {
  display: flex;
  justify-content: center;
}
</style>