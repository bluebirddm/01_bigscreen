<template>
  <div class="tech-supervision-nav-buttons">
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

const activeButton = ref('all')

const navButtons = ref([
  { key: 'all', label: '全部' },
  { key: 'equipment', label: '设备监督' },
  { key: 'technology', label: '技术监督' },
  { key: 'quality', label: '质量监督' },
  { key: 'safety', label: '安全监督' }
])

const handleButtonClick = (key) => {
  activeButton.value = key
  // 这里可以添加切换逻辑，比如发送事件给父组件
}
</script>

<style scoped>
.tech-supervision-nav-buttons {
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