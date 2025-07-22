<template>
  <div class="dashboard">
    <header class="dashboard-header">
      <h1 class="title">信息系统智慧可视化大屏</h1>
    </header>
    
    <main class="dashboard-main">
      <div class="left-panel">
        <div class="panel-section">
          <h3 class="section-title">信息系统实况情况</h3>
          <InfoSystemStatus />
        </div>
        
        <div class="panel-section">
          <h3 class="section-title">各省位数据排行TOP10</h3>
          <ProvinceRanking />
        </div>
        
        <div class="panel-section">
          <h3 class="section-title">各省位数据排行TOP10</h3>
          <SystemRanking />
        </div>
      </div>
      
      <div class="center-panel">
        <div class="info-bar">
          <div class="info-counter">
            <span class="counter-number">{{ animatedTotal.toLocaleString() }}</span>
            <span class="counter-label">信息系统总数</span>
          </div>
        </div>
        <ChinaMap />
      </div>
      
      <div class="right-panel">
        <div class="panel-section">
          <h3 class="section-title">各级体系布局情况</h3>
          <SystemLayout />
        </div>
        
        <div class="panel-section">
          <h3 class="section-title">各系统架构分布情况</h3>
          <ArchitectureDistribution />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import InfoSystemStatus from './components/InfoSystemStatus.vue'
import ProvinceRanking from './components/ProvinceRanking.vue'
import SystemRanking from './components/SystemRanking.vue'
import ChinaMap from './components/ChinaMap.vue'
import SystemLayout from './components/SystemLayout.vue'
import ArchitectureDistribution from './components/ArchitectureDistribution.vue'

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
.dashboard {
  width: 1920px;
  height: 1080px;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #0c1622 0%, #1a2337 50%, #0c1622 100%);
  position: relative;
}

.dashboard-header {
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.title {
  font-size: 42px;
  font-weight: bold;
  color: #00bfff;
  text-shadow: 0 0 30px rgba(0, 191, 255, 0.8);
  letter-spacing: 3px;
}

.dashboard-main {
  flex: 1;
  display: grid;
  grid-template-columns: 380px 1fr 380px;
  gap: 30px;
  padding: 0 30px 30px;
  overflow: hidden;
}

.left-panel,
.right-panel {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.center-panel {
  display: flex;
  flex-direction: column;
  position: relative;
}

.info-bar {
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
}

.info-counter {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px 50px;
  background: rgba(0, 191, 255, 0.1);
  border: 1px solid rgba(0, 191, 255, 0.3);
  border-radius: 12px;
  backdrop-filter: blur(10px);
}

.counter-number {
  font-size: 36px;
  font-weight: bold;
  color: #00bfff;
  line-height: 1;
}

.counter-label {
  font-size: 16px;
  color: #8cc8ff;
  margin-top: 6px;
}

.panel-section {
  background: rgba(0, 20, 40, 0.6);
  border: 1px solid rgba(0, 191, 255, 0.2);
  border-radius: 12px;
  padding: 20px;
  backdrop-filter: blur(10px);
  flex: 1;
  min-height: 0;
}

.section-title {
  font-size: 18px;
  color: #00bfff;
  margin-bottom: 20px;
  text-align: center;
  position: relative;
}

.section-title:before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  width: 6px;
  height: 6px;
  background: #00bfff;
  border-radius: 50%;
  transform: translateY(-50%);
}

.section-title:after {
  content: '';
  position: absolute;
  right: 0;
  top: 50%;
  width: 6px;
  height: 6px;
  background: #00bfff;
  border-radius: 50%;
  transform: translateY(-50%);
}
</style>