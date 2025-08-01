<template>
  <div class="level-counters">
    <div class="counter-item">
      <span class="counter-label">二级</span>
      <span class="counter-number">1915</span>
      <span class="counter-unit">个</span>
    </div>
    
    <div class="counter-item">
      <span class="counter-label">三级</span>
      <span class="counter-number">2349</span>
      <span class="counter-unit">个</span>
    </div>
    
    <div class="counter-item">
      <span class="counter-label">四级</span>
      <span class="counter-number">1915</span>
      <span class="counter-unit">个</span>
    </div>
  </div>
</template>

<script setup>
// 纯静态数据显示，无需动画逻辑
</script>

<style scoped>
.level-counters {
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: flex-end;
}

.counter-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 0 0 20px;
  gap: 20px;
  background-image: url(/src/assets/plate_bg.png);
  background-repeat: no-repeat;
  /* background-position: -1px -8px; */
  background-size: auto 41px;
  height: 41px;
}

.counter-label {
  font-size: 16px;
  color: #E5F2F9;
  font-weight: 500;
  letter-spacing: 1px;
  white-space: nowrap;
}

.counter-number-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
}

.counter-number {
  font-size: 24px;
  font-weight: bold;
  color: #E5F2F9;
  font-family: 'Arial', sans-serif;
}

.counter-unit {
  font-size: 14px;
  color: #E5F2F9;
  font-weight: 500;
  letter-spacing: 1px;
}
</style>