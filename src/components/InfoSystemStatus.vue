<template>
  <div class="info-system-status">
    <div class="status-grid">
      <div class="status-card" v-for="(item, index) in statusData" :key="index">
        <div class="status-icon">
          <div class="icon-circle">
            <i class="icon" :class="item.icon"></i>
          </div>
        </div>
        <div class="status-content">
          <div class="status-value">{{ item.value }}</div>
          <div class="status-label">{{ item.label }}</div>
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
    value: '16个',
    icon: 'level-1'
  },
  {
    label: '二级系统',
    value: '1915个',
    icon: 'level-2'
  },
  {
    label: '三级系统',
    value: '1915个',
    icon: 'level-3'
  },
  {
    label: '应用系统',
    value: '1047个',
    icon: 'app-system'
  },
  {
    label: '未定级系统',
    value: '194个',
    icon: 'undefined-level'
  }
])
</script>

<style scoped>
.info-system-status {
  height: 100%;
}

.status-grid {
  display: flex;
  flex-direction: column;
  gap: 12px;
  height: 100%;
}

.status-card {
  display: flex;
  align-items: center;
  padding: 16px;
  background: rgba(0, 191, 255, 0.05);
  border: 1px solid rgba(0, 191, 255, 0.2);
  border-radius: 8px;
  transition: all 0.3s ease;
  cursor: pointer;
}

.status-card:hover {
  background: rgba(0, 191, 255, 0.1);
  border-color: rgba(0, 191, 255, 0.4);
  transform: translateX(3px);
}

.status-icon {
  margin-right: 16px;
}

.icon-circle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #00bfff, #0080ff);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.icon-circle::before {
  content: '✓';
  color: white;
  font-size: 20px;
  font-weight: bold;
}

.status-content {
  flex: 1;
}

.status-value {
  font-size: 20px;
  font-weight: bold;
  color: #00bfff;
  margin-bottom: 4px;
}

.status-label {
  font-size: 14px;
  color: #8cc8ff;
}
</style>