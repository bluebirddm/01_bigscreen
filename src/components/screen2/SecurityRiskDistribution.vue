<template>
  <div class="security-risk-distribution">
    <PieRoseChart
      :pie-data="riskData"
      :rose-data="detailRiskData"
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

// 图表标题配置
const chartTitle = ref({
  text: '',
  subtext: '',
  left: 'center'
})

// 主要风险分布数据（内圈饼图）
const riskData = ref([
  {
    value: 16.8,
    name: '高风险',
    itemStyle: {
      color: '#ff4757'
    }
  },
  {
    value: 35.2,
    name: '中风险', 
    itemStyle: {
      color: '#ffa726'
    }
  },
  {
    value: 48.0,
    name: '低风险',
    itemStyle: {
      color: '#66bb6a'
    }
  }
])

// 详细风险分布数据（内圈玫瑰图）
const detailRiskData = ref([
  {
    name: '物理环境',
    value: 15.2,
    itemStyle: {
      color: '#ff6b6b'
    }
  },
  {
    name: '建设管理',
    value: 18.7,
    itemStyle: {
      color: '#4ecdc4'
    }
  },
  {
    name: '计算环境',
    value: 22.1,
    itemStyle: {
      color: '#45b7d1'
    }
  },
  {
    name: '区域边界',
    value: 13.5,
    itemStyle: {
      color: '#96ceb4'
    }
  },
  {
    name: '管理机构',
    value: 11.8,
    itemStyle: {
      color: '#feca57'
    }
  },
  {
    name: '管理人员',
    value: 9.4,
    itemStyle: {
      color: '#a0a0a0'
    }
  },
  {
    name: '管理制度',
    value: 9.3,
    itemStyle: {
      color: '#ab47bc'
    }
  }
])
</script>

<style scoped>
.security-risk-distribution {
  height: 263px;
  width: 100%;
  padding: 10px;
}
</style>