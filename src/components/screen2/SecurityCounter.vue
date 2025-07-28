<template>
  <div class="security-counter-container">
    <div class="counter-item">
      <span class="counter-label">等保测评完成数量(累计)</span>
      <span class="counter-number">
        <span
          v-for="(digit, index) in animatedCumulative.toString().split('')"
          :key="`cum-${index}`"
          class="digit-wrapper"
        >
          <span class="digit-text">{{ digit }}</span>
        </span>
        <span class="counter-unit">个</span>
      </span>
      
    </div>
    
    <div class="counter-item">
      <span class="counter-label">等保测评完成数量(本年)</span>
      <span class="counter-number">
        <span
          v-for="(digit, index) in animatedYearly.toString().split('')"
          :key="`year-${index}`"
          class="digit-wrapper"
        >
          <span class="digit-text">{{ digit }}</span>
        </span>
        <span class="counter-unit">个</span>
      </span>
    </div>
    
    <div class="counter-item">
      <span class="counter-label">等保测评覆盖率</span>
      <span class="counter-number coverage">
        <span
          v-for="(digit, index) in animatedCoverage.toString().split('')"
          :key="`cov-${index}`"
          class="digit-wrapper"
          :class="{ 'percent-symbol': digit === '%' }"
        >
          <span class="digit-text">{{ digit }}</span>
        </span>
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const cumulativeTotal = ref(2415)
const yearlyTotal = ref(627)
const coverageRate = ref('87.3%')

const animatedCumulative = ref(0)
const animatedYearly = ref(0)
const animatedCoverage = ref('0.0%')

onMounted(() => {
  // 累计数量动画
  animateNumber(cumulativeTotal.value, animatedCumulative, 2000)
  
  // 本年数量动画（稍微延迟）
  setTimeout(() => {
    animateNumber(yearlyTotal.value, animatedYearly, 1800)
  }, 300)
  
  // 覆盖率动画（更多延迟）
  setTimeout(() => {
    animatePercentage(87.3, animatedCoverage, 1500)
  }, 600)
})

function animateNumber(target, ref, duration) {
  const stepTime = 50
  const steps = duration / stepTime
  const increment = target / steps
  
  let current = 0
  const timer = setInterval(() => {
    current += increment
    if (current >= target) {
      ref.value = target
      clearInterval(timer)
    } else {
      ref.value = Math.floor(current)
    }
  }, stepTime)
}

function animatePercentage(target, ref, duration) {
  const stepTime = 50
  const steps = duration / stepTime
  const increment = target / steps
  
  let current = 0
  const timer = setInterval(() => {
    current += increment
    if (current >= target) {
      ref.value = target.toFixed(1) + '%'
      clearInterval(timer)
    } else {
      ref.value = current.toFixed(1) + '%'
    }
  }, stepTime)
}
</script>

<style scoped>
@font-face {
  font-family: 'DigitalDisplay';
  src: url('../assets/font/digital display tfb.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}

.security-counter-container {
  display: flex;
  gap: 40px;
  align-items: center;
  justify-content: center;
  /* background: rgba(0, 20, 40, 0.7); */
  padding: 15px 25px;
  /* border-radius: 12px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 191, 255, 0.3);
  box-shadow: 0 4px 20px rgba(0, 191, 255, 0.1); */
}

.counter-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  min-width: 180px;
}

.counter-label {
  font-size: 12px;
  color: #8cc8ff;
  font-weight: 500;
  letter-spacing: 0.5px;
  white-space: nowrap;
  text-align: center;
}

.counter-number {
  font-size: 28px;
  font-weight: bold;
  font-family: 'DigitalDisplay', 'Courier New', 'Monaco', 'Menlo', 'Consolas', 'Liberation Mono', monospace;
  line-height: 1;
  display: flex;
  align-items: center;
  gap: 2px;
}

.counter-number.coverage {
  font-size: 32px;
}

.digit-wrapper {
  display: inline-block;
  width: 20px;
  height: 35px;
  background-image: url('src/assets/digit_bg.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center;
  color: transparent;
  background-clip: padding-box;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.digit-wrapper.percent-symbol {
  width: 15px;
  background: none;
}

.digit-wrapper .digit-text {
  background: linear-gradient(to bottom, #ffffff 0%, #00bfff 50%, #0080ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 0 8px rgba(0, 191, 255, 0.6);
  position: relative;
  z-index: 1;
  font-size: 28px;
}

.counter-number.coverage .digit-text {
  font-size: 32px;
}

.counter-unit {
  font-size: 14px;
  color: #E5F2F9;
  font-weight: 500;
  letter-spacing: 1px;
  white-space: nowrap;
  margin-top: 2px;
}
</style>