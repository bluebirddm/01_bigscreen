<template>
  <div class="risk-nav-buttons">
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
import { useRouter } from 'vue-router'

const router = useRouter()
const activeButton = ref('risk-assessment')

const navButtons = ref([
  { key: 'all', label: '安全合规', route: '/screen1' },
  { key: 'security-assessment', label: '等保测评', route: '/screen2' },
  { key: 'tech-supervision', label: '技术监督', route: '/screen4' },
  { key: 'risk-assessment', label: '风险评估', route: '/screen5' },
  { key: 'crypto-assessment', label: '密码评估', route: '/screen3' }
])

const handleButtonClick = (key) => {
  activeButton.value = key
  // 查找对应的路由
  const button = navButtons.value.find(btn => btn.key === key)
  if (button && button.route) {
    router.push(button.route)
  }
}
</script>

<style scoped>
.risk-nav-buttons {
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
  background: rgba(78, 205, 196, 0.1);
  border-color: rgba(78, 205, 196, 0.3);
  color: #4ecdc4;
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(78, 205, 196, 0.2);
}

.nav-button.active {
  background: linear-gradient(135deg, rgba(78, 205, 196, 0.3), rgba(78, 205, 196, 0.2));
  border-color: rgba(78, 205, 196, 0.5);
  color: #fff;
  box-shadow: 0 2px 12px rgba(78, 205, 196, 0.3);
}

.nav-button.active:hover {
  background: linear-gradient(135deg, rgba(78, 205, 196, 0.4), rgba(78, 205, 196, 0.3));
  transform: translateY(-1px);
}
</style>