<template>
  <div class="risk-assessment-counter">
    <div class="counter-wrapper">
      <div class="counter-item">
        <span class="counter-label">风险评估总数(累计)</span>
        <span class="counter-number">
          <span
            v-for="(digit, index) in animatedTotal.toString().split('')"
            :key="'total-' + index"
            class="digit-wrapper"
          >
            <span class="digit-text">{{ digit }}</span>
          </span>
        </span>
        <span class="counter-unit">个</span>
      </div>
      
      <div class="counter-divider"></div>
      
      <div class="counter-item">
        <span class="counter-label">风险评估总数(本年)</span>
        <span class="counter-number">
          <span
            v-for="(digit, index) in animatedYearly.toString().split('')"
            :key="'yearly-' + index"
            class="digit-wrapper"
          >
            <span class="digit-text">{{ digit }}</span>
          </span>
        </span>
        <span class="counter-unit">个</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const totalAssessments = ref(3172)
const yearlyAssessments = ref(3172)
const animatedTotal = ref(0)
const animatedYearly = ref(0)

onMounted(() => {
  // 数字滚动动画
  const duration = 2000
  const stepTime = 50
  const steps = duration / stepTime
  const incrementTotal = totalAssessments.value / steps
  const incrementYearly = yearlyAssessments.value / steps
  
  let currentTotal = 0
  let currentYearly = 0
  const timer = setInterval(() => {
    currentTotal += incrementTotal
    currentYearly += incrementYearly
    
    if (currentTotal >= totalAssessments.value) {
      animatedTotal.value = totalAssessments.value
      animatedYearly.value = yearlyAssessments.value
      clearInterval(timer)
    } else {
      animatedTotal.value = Math.floor(currentTotal)
      animatedYearly.value = Math.floor(currentYearly)
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

.risk-assessment-counter {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 120px;
  background: rgba(0, 20, 40, 0.6);
  border: 1px solid rgba(0, 191, 255, 0.3);
  border-radius: 10px;
  backdrop-filter: blur(10px);
  box-shadow: 0 0 20px rgba(0, 191, 255, 0.2);
}

.counter-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 40px;
}

.counter-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.counter-divider {
  width: 1px;
  height: 80px;
  background: linear-gradient(
    to bottom,
    transparent,
    rgba(0, 191, 255, 0.5),
    transparent
  );
}

.counter-label {
  font-size: 14px;
  color: #8cc8ff;
  font-weight: 500;
  letter-spacing: 1px;
  white-space: nowrap;
}

.counter-number {
  font-size: 42px;
  font-weight: bold;
  font-family: 'DigitalDisplay', 'Courier New', 'Monaco', 'Menlo', 'Consolas', 'Liberation Mono', monospace;
  line-height: 1;
  display: flex;
  align-items: center;
  gap: 3px;
}

.digit-wrapper {
  display: inline-block;
  width: 28px;
  height: 42px;
  background-image: url('src/assets/digit_bg.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.digit-wrapper .digit-text {
  background: linear-gradient(to bottom, #ffffff 0%, #4ecdc4 50%, #00bfff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 0 10px rgba(78, 205, 196, 0.8);
  position: relative;
  z-index: 1;
  font-size: 38px;
}

.counter-unit {
  font-size: 16px;
  color: #E5F2F9;
  font-weight: 500;
  margin-left: 5px;
}

/* 添加悬浮效果 */
.counter-item:hover .counter-number {
  filter: brightness(1.2);
  text-shadow: 0 0 20px rgba(78, 205, 196, 1);
}
</style>