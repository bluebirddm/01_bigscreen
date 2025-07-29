<template>
  <div class="security-level-status">
    <div class="status-grid">
      <div class="status-card" 
           v-for="(item, index) in statusData" 
           :key="index">
        <div class="status-icon">
          <div class="icon-circle">
          </div>
        </div>
        <div class="status-content">
          <div class="status-label">{{ item.label }}</div>
          <div class="status-value">{{ item.value }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const statusData = ref([
  {
    label: '一级系统',
    value: '312个',
    icon: 'level-1'
  },
  {
    label: '二级系统',
    value: '1127个',
    icon: 'level-2'
  },
  {
    label: '三级系统',
    value: '782个',
    icon: 'level-3'
  },
  {
    label: '四级系统',
    value: '194个',
    icon: 'level-4'
  }
])
</script>

<style scoped>
.security-level-status {
  height: 265px;
  padding: 25px;
}

.status-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 15px;
  height: calc(100% - 40px);
  align-content: center;
}

.status-card {
  display: flex;
  align-items: center;
  padding: 12px;
  background: rgba(0, 191, 255, 0.05);
  border: 1px solid rgba(0, 191, 255, 0.2);
  border-radius: 8px;
  transition: all 0.3s ease;
  cursor: pointer;
  width: 195px;
  height: 85px;
  justify-self: center;
}

.status-card:hover {
  background: rgba(0, 191, 255, 0.1);
  border-color: rgba(0, 191, 255, 0.4);
  transform: translateX(3px);
}

.status-icon {
  margin-right: 10px;
}

.icon-circle {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: url('../../assets/sys_icon.png') no-repeat center center;
  background-size: contain;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  flex-shrink: 0;
}

.status-content {
  flex: 1;
}

.status-value {
  font-size: 18px;
  font-weight: bold;
  color: #E5F2F9;
  margin-bottom: 2px;
  line-height: 1;
}

.status-label {
  font-size: 11px;
  color: #9EA6C0;
  line-height: 1;
  margin-bottom: 8px;
}
</style>