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
  { key: 'security-compliance', label: '安全合规' },
  { key: 'tech-supervision', label: '技术监督' },
  { key: 'risk-assessment', label: '风险评估' },
  { key: 'crypto-assessment', label: '密码评估' }
])

// 路由映射关系
const routeMapping = {
  'security-assessment': '/screen2',
  'security-compliance': '/screen3',
  'tech-supervision': '/screen4',
  'risk-assessment': '/screen5',
  'crypto-assessment': '/screen6'
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
        activeButton.value = 'security-compliance'
        break
      case '/screen4':
        activeButton.value = 'tech-supervision'
        break
      case '/screen5':
        activeButton.value = 'risk-assessment'
        break
      case '/screen6':
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
  gap: 30px;
  padding: 4px;
}

.nav-button {
  padding: 8px 24px;
  border-radius: 6px;
  color: #8cc8ff;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  user-select: none;
  background-image: url('@/assets/nav_button.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;
  min-width: 100px;
  text-align: center;
  border: none;
}

.nav-button:hover {
  color: #00e6ff;
  transform: translateY(-1px);
  filter: brightness(1.2);
  /* box-shadow: 0 4px 12px rgba(0, 191, 255, 0.4); */
}

.nav-button.active {
  background-image: url('@/assets/nav_button_sel.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;
  color: #ffffff;
  /* box-shadow: 0 4px 16px rgba(0, 191, 255, 0.5); */
}

.nav-button.active:hover {
  transform: translateY(-1px);
  filter: brightness(1.1);
  /* box-shadow: 0 6px 20px rgba(0, 191, 255, 0.6); */
}
</style>