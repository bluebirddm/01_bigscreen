<template>
  <div class="info-system-status">
    <div class="status-grid">
      <div class="status-card" 
           v-for="(item, index) in statusData" 
           :key="index">
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
  },
  {
    label: '核心系统',
    value: '82个',
    icon: 'core-system'
  }
])
</script>

<style scoped>
.info-system-status {
  height: 100%;
}

.status-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
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
  width: 173px;
  height: 77px;
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
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: linear-gradient(135deg, #00bfff, #0080ff);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  flex-shrink: 0;
}

.icon-circle::before {
  content: '✓';
  color: white;
  font-size: 16px;
  font-weight: bold;
}

.status-content {
  flex: 1;
}

.status-value {
  font-size: 16px;
  font-weight: bold;
  color: #00bfff;
  margin-bottom: 2px;
  line-height: 1;
}

.status-label {
  font-size: 11px;
  color: #8cc8ff;
  line-height: 1;
}

</style>