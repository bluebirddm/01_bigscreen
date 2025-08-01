<template>
  <div class="improvement-counters">
    <div class="counter-item">
      <span class="counter-label">已整改</span>
      <span class="counter-number">234</span>
      <span class="counter-unit">个</span>
    </div>
    
    <div class="counter-item">
      <span class="counter-label">未整改</span>
      <span class="counter-number">126</span>
      <span class="counter-unit">个</span>
    </div>
    
    <div class="counter-item">
      <span class="counter-label">接受风险</span>
      <span class="counter-number">34</span>
      <span class="counter-unit">个</span>
    </div>
  </div>
</template>

<script setup>
// 纯静态数据显示，无需动画逻辑
</script>

<style scoped>
.improvement-counters {
  display: flex;
  flex-direction: row;
  gap: 30px;
  align-items: center;
  justify-content: center;
}

.counter-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 0 0 20px;
  gap: 20px;
  background-image: url(/src/assets/plate_bg.png);
  background-repeat: no-repeat;
  background-size: auto 41px;
  height: 41px;
  min-width: 160px;
}

.counter-label {
  font-size: 16px;
  color: #E5F2F9;
  font-weight: 500;
  letter-spacing: 1px;
  white-space: nowrap;
}

.counter-number {
  font-size: 24px;
  font-weight: bold;
  color: #00bfff;
  font-family: 'Arial', sans-serif;
}

.counter-unit {
  font-size: 14px;
  color: #E5F2F9;
  font-weight: 500;
  letter-spacing: 1px;
}
</style>