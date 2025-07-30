<template>
  <div class="tech-supervision-counter">
    <div class="counter-item">
      <div class="counter-icon">
        <!-- 累计图标 -->
      </div>
      <div class="counter-content">
        <div class="counter-label">技术监督总数（累计）</div>
        <div class="counter-number">
          <span
            v-for="(digit, index) in totalCount.toString().split('')"
            :key="'total-' + index"
            class="digit-wrapper"
          >
            <span class="digit-text">{{ digit }}</span>
          </span>
        </div>
      </div>
    </div>
    
    <div class="counter-item">
      <div class="counter-icon">
        <!-- 本年图标 -->
      </div>
      <div class="counter-content">
        <div class="counter-label">技术监督总数（本年）</div>
        <div class="counter-number">
          <span
            v-for="(digit, index) in yearCount.toString().split('')"
            :key="'year-' + index"
            class="digit-wrapper"
          >
            <span class="digit-text">{{ digit }}</span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const totalCount = ref(0)
const yearCount = ref(0)
const targetTotal = 3172
const targetYear = 535

onMounted(() => {
  // 数字滚动动画
  const duration = 2000
  const stepTime = 50
  const steps = duration / stepTime
  
  let currentTotal = 0
  let currentYear = 0
  const incrementTotal = targetTotal / steps
  const incrementYear = targetYear / steps
  
  const timer = setInterval(() => {
    currentTotal += incrementTotal
    currentYear += incrementYear
    
    if (currentTotal >= targetTotal) {
      totalCount.value = targetTotal
      yearCount.value = targetYear
      clearInterval(timer)
    } else {
      totalCount.value = Math.floor(currentTotal)
      yearCount.value = Math.floor(currentYear)
    }
  }, stepTime)
})
</script>

<style scoped>
@font-face {
  font-family: 'DigitalDisplay';
  src: url('src/assets/font/digital display tfb.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}

.tech-supervision-counter {
  display: flex;
  gap: 40px;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.counter-item {
  display: flex;
  align-items: center;
  gap: 15px;
}

.counter-icon {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(circle, rgba(0, 191, 255, 0.2), transparent);
  border: 2px solid rgba(0, 191, 255, 0.5);
  border-radius: 50%;
}

.counter-content {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.counter-label {
  font-size: 14px;
  color: #8cc8ff;
  white-space: nowrap;
}

.counter-number {
  font-size: 36px;
  font-weight: bold;
  font-family: 'DigitalDisplay', 'Courier New', monospace;
  display: flex;
  align-items: center;
  gap: 2px;
}

.digit-wrapper {
  display: inline-block;
  width: 24px;
  height: 36px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.digit-text {
  background: linear-gradient(to bottom, #ffffff 0%, #00bfff 50%, #0080ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 0 10px rgba(0, 191, 255, 0.8);
  position: relative;
  z-index: 1;
}
</style>