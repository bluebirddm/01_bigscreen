<template>
  <div class="security-problem-type-stats">
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
}
</style>