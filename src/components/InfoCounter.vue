<template>
  <div class="info-bar">
    <div class="info-counter">
      <span class="counter-label">信息系统总数</span>
      <span class="counter-number">
        <span
          v-for="(digit, index) in animatedTotal.toString().split('')"
          :key="index"
          class="digit-wrapper"
        >
          <span class="digit-text">{{ digit }}</span>
        </span>
      </span>
      <span class="counter-label">个</span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const totalSystems = ref(115552)
const animatedTotal = ref(0)

onMounted(() => {
  // 数字滚动动画
  const duration = 2000
  const stepTime = 50
  const steps = duration / stepTime
  const increment = totalSystems.value / steps
  
  let current = 0
  const timer = setInterval(() => {
    current += increment
    if (current >= totalSystems.value) {
      animatedTotal.value = totalSystems.value
      clearInterval(timer)
    } else {
      animatedTotal.value = Math.floor(current)
    }
  }, stepTime)
})
</script>

<style scoped>
@font-face {
  font-family: 'DigitalDisplay';
  src: url('../assets/font/digital display tfb.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}

.info-counter {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 25px 40px;
  /* background-image: url('../assets/totoal_counter.png');
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 100% 100%; */
  width: 350px;
  height: 100px;
  gap: 20px;
}

.counter-number {
  font-size: 50px;
  font-weight: bold;
  font-family: 'DigitalDisplay', 'Courier New', 'Monaco', 'Menlo', 'Consolas', 'Liberation Mono', monospace;
  line-height: 1;
  display: flex;
  align-items: center;
  gap: 5px;
}

.digit-wrapper {
  display: inline-block;
  width: 60px;
  height: 70px;
  background-image: url('../assets/digit_bg.png');
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

.counter-label {
  font-size: 16px;
  color: #E5F2F9;
  font-weight: 500;
  letter-spacing: 1px;
  white-space: nowrap;
}

.info-bar {
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
}
</style>
