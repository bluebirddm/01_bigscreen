<template>
  <div class="security-nav-buttons">
    <div 
      v-for="(button, index) in navButtons" 
      :key="index"
      class="nav-button"
      :class="{ active: activeButton === button.key }"
      @click="handleButtonClick(button.key)"
    >
      {{ button.label }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeButton = ref('crypto-assessment')

const navButtons = ref([
  { key: 'support', label: '支撑' },
  { key: 'security-assessment', label: '等保测评' },
  { key: 'evaluation', label: '测评' },
  { key: 'tech', label: '技术' },
  { key: 'risk-assessment', label: '风险评估' },
  { key: 'crypto-assessment', label: '密码评估' }
])

const handleButtonClick = (key) => {
  activeButton.value = key
}
</script>

<style scoped>
.security-nav-buttons {
  display: flex;
  gap: 8px;
  background: rgba(0, 20, 40, 0.7);
  padding: 4px;
  border-radius: 8px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 191, 255, 0.2);
}

.nav-button {
  padding: 8px 16px;
  border-radius: 6px;
  color: #8cc8ff;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  user-select: none;
  background: transparent;
  border: 1px solid transparent;
  min-width: 70px;
  text-align: center;
}

.nav-button:hover {
  background: rgba(0, 191, 255, 0.1);
  border-color: rgba(0, 191, 255, 0.3);
  color: #00bfff;
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 191, 255, 0.2);
}

.nav-button.active {
  background: linear-gradient(135deg, rgba(0, 191, 255, 0.3), rgba(0, 191, 255, 0.2));
  border-color: rgba(0, 191, 255, 0.5);
  color: #fff;
  box-shadow: 0 2px 12px rgba(0, 191, 255, 0.3);
}

.nav-button.active:hover {
  background: linear-gradient(135deg, rgba(0, 191, 255, 0.4), rgba(0, 191, 255, 0.3));
  transform: translateY(-1px);
}
</style>