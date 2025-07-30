<template>
  <div class="risk-assessment-conclusion">
    <div class="conclusion-grid">
      <div class="conclusion-card" 
           v-for="(item, index) in conclusionData" 
           :key="index">
        <div class="card-icon">
          <div class="icon-circle" :style="{ backgroundColor: item.color }">
            <i :class="item.icon"></i>
          </div>
        </div>
        <div class="card-content">
          <div class="card-label">{{ item.label }}</div>
          <div class="card-value">{{ item.value }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const conclusionData = ref([
  {
    label: '符合',
    value: '1245个',
    icon: 'check-icon',
    color: '#66bb6a'
  },
  {
    label: '基本符合',
    value: '485个',
    icon: 'partial-icon',
    color: '#ffa726'
  },
  {
    label: '不符合',
    value: '42个',
    icon: 'cross-icon',
    color: '#ff5252'
  },
  {
    label: '符合率',
    value: '90%',
    icon: 'percent-icon',
    color: '#00bfff'
  }
])
</script>

<style scoped>
.risk-assessment-conclusion {
  height: 263px;
  padding: 25px;
}

.conclusion-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 20px;
  height: calc(100% - 40px);
  align-content: center;
}

.conclusion-card {
  display: flex;
  align-items: center;
  padding: 20px;
  background: rgba(0, 191, 255, 0.05);
  border: 1px solid rgba(0, 191, 255, 0.2);
  border-radius: 10px;
  transition: all 0.3s ease;
  cursor: pointer;
  backdrop-filter: blur(5px);
}

.conclusion-card:hover {
  background: rgba(0, 191, 255, 0.1);
  border-color: rgba(0, 191, 255, 0.4);
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 191, 255, 0.3);
}

.card-icon {
  margin-right: 15px;
}

.icon-circle {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  flex-shrink: 0;
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
}

.icon-circle::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: inherit;
  opacity: 0.3;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 0.3;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.1;
  }
  100% {
    transform: scale(1);
    opacity: 0.3;
  }
}

.icon-circle i {
  font-size: 24px;
  color: #fff;
}

.card-content {
  flex: 1;
}

.card-value {
  font-size: 24px;
  font-weight: bold;
  color: #E5F2F9;
  margin-bottom: 5px;
  line-height: 1;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
}

.card-label {
  font-size: 13px;
  color: #9EA6C0;
  line-height: 1;
}

/* 为不同的卡片设置不同的发光效果 */
.conclusion-card:nth-child(1):hover {
  box-shadow: 0 5px 15px rgba(102, 187, 106, 0.5);
}

.conclusion-card:nth-child(2):hover {
  box-shadow: 0 5px 15px rgba(255, 167, 38, 0.5);
}

.conclusion-card:nth-child(3):hover {
  box-shadow: 0 5px 15px rgba(255, 82, 82, 0.5);
}

.conclusion-card:nth-child(4):hover {
  box-shadow: 0 5px 15px rgba(0, 191, 255, 0.5);
}
</style>