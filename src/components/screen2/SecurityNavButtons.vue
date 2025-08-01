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
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const activeButton = ref('all')

const navButtons = ref([
  { key: 'all', label: '全部' },
  { key: 'security-assessment', label: '等保测评' },
  { key: 'tech-supervision', label: '技术监督' },
  { key: 'risk-assessment', label: '风险评估' },
  { key: 'crypto-assessment', label: '密码评估' }
])

// 路由映射关系
const routeMapping = {
  'security-assessment': '/screen2',
  'tech-supervision': '/screen3',
  'risk-assessment': '/screen4',
  'crypto-assessment': '/screen5'
}

// 根据当前路由设置初始高亮状态
const initActiveButton = () => {
  const currentPath = route.path
  const tabQuery = route.query.tab
  
  if (tabQuery && routeMapping[tabQuery] === currentPath) {
    activeButton.value = tabQuery
  } else {
    // 根据当前路径推断高亮状态
    switch (currentPath) {
      case '/screen2':
        activeButton.value = 'security-assessment'
        break
      case '/screen3':
        activeButton.value = 'tech-supervision'
        break
      case '/screen4':
        activeButton.value = 'risk-assessment'
        break
      case '/screen5':
        activeButton.value = 'crypto-assessment'
        break
      default:
        activeButton.value = 'all'
    }
  }
}

const handleButtonClick = (key) => {
  activeButton.value = key
  
  if (key === 'all') {
    // 点击"全部"按钮，保持当前页面，移除query参数
    router.push({ path: route.path })
  } else if (routeMapping[key]) {
    // 跳转到对应页面并设置tab参数
    router.push({ 
      path: routeMapping[key],
      query: { tab: key }
    })
  }
}

onMounted(() => {
  initActiveButton()
})
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