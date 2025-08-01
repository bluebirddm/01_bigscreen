<template>
  <div class="security-category-issues-radar">
    <!-- 风险等级统计栏 -->
    <div class="risk-stats-bar">
      <div class="stat-item total">
        <span class="label">总计:</span>
        <span class="value">{{ riskStats.total }}</span>
      </div>
      <div class="stat-item high-risk">
        <span class="label">高危:</span>
        <span class="value">{{ riskStats.high }}个</span>
      </div>
      <div class="stat-item medium-risk">
        <span class="label">中危:</span>
        <span class="value">{{ riskStats.medium }}个</span>
      </div>
      <div class="stat-item low-risk">
        <span class="label">低危:</span>
        <span class="value">{{ riskStats.low }}个</span>
      </div>
    </div>
    
    <!-- 原有的饼图组件 -->
    <PieRoseChart
      :pie-data="categoryData"
      :rose-data="detailData"
      :title="chartTitle"
      :show-legend="true"
      :enable-tooltip="true"
      width="100%"
      height="160px"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import PieRoseChart from '../PieRoseChart.vue'

// 风险等级统计数据
const riskStats = ref({
  total: 566,
  high: 213,
  medium: 165,
  low: 132
})

// 图表标题配置
const chartTitle = ref({
  text: '',
  subtext: '',
  left: 'center'
})

// 主要分类数据（内圈饼图）
const categoryData = ref([
  {
    value: 213,
    name: '高危',
    itemStyle: {
      color: '#ff5252'
    }
  },
  {
    value: 165,
    name: '中危', 
    itemStyle: {
      color: '#ffa726'
    }
  },
  {
    value: 132,
    name: '低危',
    itemStyle: {
      color: '#ffd54f'
    }
  },
  {
    value: 56,
    name: '合规',
    itemStyle: {
      color: '#66bb6a'
    }
  }
])

// 详细分类数据（外圈玫瑰图）
const detailData = ref([
  {
    name: '物理安全',
    value: 143,
    itemStyle: {
      color: '#ff6b6b'
    }
  },
  {
    name: '网络安全',
    value: 125,
    itemStyle: {
      color: '#4ecdc4'
    }
  },
  {
    name: '数据安全',
    value: 98,
    itemStyle: {
      color: '#45b7d1'
    }
  },
  {
    name: '应用安全',
    value: 81,
    itemStyle: {
      color: '#96ceb4'
    }
  },
  {
    name: '管理制度',
    value: 63,
    itemStyle: {
      color: '#feca57'
    }
  },
  {
    name: '访问控制',
    value: 37,
    itemStyle: {
      color: '#dfe6e9'
    }
  },
  {
    name: '应急管理',
    value: 19,
    itemStyle: {
      color: '#a29bfe'
    }
  }
])
</script>

<style scoped>
.security-category-issues-radar {
  height: 263px;
  width: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.risk-stats-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 20px;
  height: 32px;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  font-weight: 500;
}

.stat-item .label {
  color: #E5F2F9;
  letter-spacing: 0.5px;
}

.stat-item .value {
  font-weight: bold;
  letter-spacing: 0.5px;
}

.stat-item.total .value {
  color: #ffffff;
  font-size: 16px;
}

.stat-item.high-risk .value {
  color: #ff4757;
}

.stat-item.medium-risk .value {
  color: #ffa726;
}

.stat-item.low-risk .value {
  color: #66bb6a;
}
</style>