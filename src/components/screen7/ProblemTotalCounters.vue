<template>
  <div class="problem-total-counters">
    <div class="counter-item">
      <span class="counter-label">发现问题总数（累计）</span>
      <div class="counter-number-wrapper">
        <span class="counter-number">
          <span
            v-for="(digit, index) in animatedTotal1.toString().split('')"
            :key="index"
            class="digit-wrapper"
          >
            <span class="digit-text">{{ digit }}</span>
          </span>
        </span>
        <span class="counter-unit">个</span>
      </div>
    </div>
    
    <div class="counter-item">
      <span class="counter-label">发现问题总数（本年）</span>
      <div class="counter-number-wrapper">
        <span class="counter-number">
          <span
            v-for="(digit, index) in animatedTotal2.toString().split('')"
            :key="index"
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

const totalSystems1 = ref(8852)
const totalSystems2 = ref(8852)
const animatedTotal1 = ref(0)
const animatedTotal2 = ref(0)

onMounted(() => {
  // 第一个计数器动画
  const duration1 = 2000
  const stepTime1 = 50
  const steps1 = duration1 / stepTime1
  const increment1 = totalSystems1.value / steps1
  
  let current1 = 0
  const timer1 = setInterval(() => {
    current1 += increment1
    if (current1 >= totalSystems1.value) {
      animatedTotal1.value = totalSystems1.value
      clearInterval(timer1)
    } else {
      animatedTotal1.value = Math.floor(current1)
    }
  }, stepTime1)

  // 第二个计数器动画 - 延迟500ms开始
  setTimeout(() => {
    const duration2 = 2000
    const stepTime2 = 50
    const steps2 = duration2 / stepTime2
    const increment2 = totalSystems2.value / steps2
    
    let current2 = 0
    const timer2 = setInterval(() => {
      current2 += increment2
      if (current2 >= totalSystems2.value) {
        animatedTotal2.value = totalSystems2.value
        clearInterval(timer2)
      } else {
        animatedTotal2.value = Math.floor(current2)
      }
    }, stepTime2)
  }, 500)
})
</script>

<style scoped>
@font-face {
  font-family: 'DigitalDisplay';
  src: url('../../assets/font/digital display tfb.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}

.problem-total-counters {
  display: flex;
  flex-direction: row;
  gap: 60px;
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
  background: linear-gradient(to bottom, #ffffff 0%, #00bfff 50%, #0080ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 0 10px rgba(0, 191, 255, 0.8);
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