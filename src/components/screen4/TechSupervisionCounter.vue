<template>
  <div class="tech-supervision-counter">
    <div class="counter-item">

      <div class="counter-number-wrapper">
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
      <span class="counter-label">技术监督总数（累计）</span>
    </div>
    
    <div class="counter-item">
      <div class="counter-number-wrapper">
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
      <span class="counter-label">技术监督总数（本年）</span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const totalSupervisions = ref(3172)
const yearlySupervisions = ref(535)
const animatedTotal = ref(0)
const animatedYearly = ref(0)

onMounted(() => {
  // 数字滚动动画
  const duration = 2000
  const stepTime = 50
  const steps = duration / stepTime
  const incrementTotal = totalSupervisions.value / steps
  const incrementYearly = yearlySupervisions.value / steps
  
  let currentTotal = 0
  let currentYearly = 0
  const timer = setInterval(() => {
    currentTotal += incrementTotal
    currentYearly += incrementYearly
    
    if (currentTotal >= totalSupervisions.value) {
      animatedTotal.value = totalSupervisions.value
      animatedYearly.value = yearlySupervisions.value
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
  src: url('../../assets/font/digital display tfb.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}

.tech-supervision-counter {
  display: flex;
  flex-direction: row;
  gap: 450px;
  align-items: center;
  justify-content: center;
}

.counter-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.counter-label {
  font-size: 14px;
  color: #E5F2F9;
  font-weight: 500;
  letter-spacing: 1px;
  white-space: nowrap;
}

.counter-number-wrapper {
  display: flex;
  align-items: center;
  gap: 10px;
}

.counter-number {
  font-size: 32px;
  font-weight: bold;
  font-family: 'DigitalDisplay', 'Courier New', 'Monaco', 'Menlo', 'Consolas', 'Liberation Mono', monospace;
  line-height: 1;
  display: flex;
  align-items: center;
  gap: 3px;
}

.digit-wrapper {
  display: inline-block;
  width: 40px;
  height: 50px;
  background-image: url('../../assets/digit_bg.png');
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

.digit-wrapper .digit-text {
  background: linear-gradient(to bottom, #DEEFFC 0%, #8DBDED 50%, #5DB2F8 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  position: relative;
  z-index: 1;
}

.counter-unit {
  font-size: 14px;
  color: #E5F2F9;
  font-weight: 500;
  letter-spacing: 1px;
}
</style>