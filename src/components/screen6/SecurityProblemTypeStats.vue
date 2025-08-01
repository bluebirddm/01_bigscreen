<template>
  <div class="security-problem-type-stats">
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
      :pie-data="problemData"
      :rose-data="detailProblemData"
      :title="chartTitle"
      :show-legend="true"
      :enable-tooltip="true"
      width="100%"
      height="100%"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import PieRoseChart from '../PieRoseChart.vue'

// 风险等级统计数据
const riskStats = ref({
  total: 213,
  high: 12,
  medium: 56,
  low: 132
})

// 图表标题配置
const chartTitle = ref({
  text: '',
  subtext: '',
  left: 'center'
})

// 主要问题分布数据（内圈饼图）
const problemData = ref([
  {
    value: 25.2,
    name: '已整改',
    itemStyle: {
      color: '#66bb6a'
    }
  },
  {
    value: 45.8,
    name: '整改中', 
    itemStyle: {
      color: '#ffa726'
    }
  },
  {
    value: 29.0,
    name: '未整改',
    itemStyle: {
      color: '#ff4757'
    }
  }
])

// 详细问题分布数据（外圈玫瑰图）
const detailProblemData = ref([
  {
    name: '密钥管理',
    value: 18.5,
    itemStyle: {
      color: '#ff6b6b'
    }
  },
  {
    name: '算法合规',
    value: 15.3,
    itemStyle: {
      color: '#4ecdc4'
    }
  },
  {
    name: '产品认证',
    value: 22.7,
    itemStyle: {
      color: '#45b7d1'
    }
  },
  {
    name: '密码应用',
    value: 13.2,
    itemStyle: {
      color: '#96ceb4'
    }
  },
  {
    name: '管理制度',
    value: 11.6,
    itemStyle: {
      color: '#feca57'
    }
  },
  {
    name: '人员管理',
    value: 9.8,
    itemStyle: {
      color: '#a0a0a0'
    }
  },
  {
    name: '应急响应',
    value: 8.9,
    itemStyle: {
      color: '#ab47bc'
    }
  }
])
</script>

<style scoped>
.security-problem-type-stats {
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
  /* background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%); */
  padding: 8px 20px;
  /* border-radius: 4px; */
  height: 32px;
  /* box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3); */
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