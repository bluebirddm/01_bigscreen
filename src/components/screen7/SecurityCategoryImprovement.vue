<template>
  <div class="security-category-improvement">
    <PieRoseChart
      :pie-data="improvementData"
      :rose-data="detailImprovementData"
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

// 主要整改情况数据（外圈饼图）
const improvementData = ref([
  {
    value: 62.5,
    name: '已整改',
    itemStyle: {
      color: '#66bb6a'
    }
  },
  {
    value: 28.8,
    name: '整改中', 
    itemStyle: {
      color: '#ffa726'
    }
  },
  {
    value: 8.7,
    name: '未整改',
    itemStyle: {
      color: '#ff4757'
    }
  }
])

// 详细整改分布数据（内圈玫瑰图）
const detailImprovementData = ref([
  {
    name: '物理环境',
    value: 18.2,
    itemStyle: {
      color: '#4ecdc4'
    }
  },
  {
    name: '网络架构',
    value: 16.7,
    itemStyle: {
      color: '#45b7d1'
    }
  },
  {
    name: '计算环境',
    value: 15.1,
    itemStyle: {
      color: '#96ceb4'
    }
  },
  {
    name: '区域边界',
    value: 13.5,
    itemStyle: {
      color: '#feca57'
    }
  },
  {
    name: '管理机构',
    value: 12.8,
    itemStyle: {
      color: '#a0a0a0'
    }
  },
  {
    name: '管理人员',
    value: 11.4,
    itemStyle: {
      color: '#ab47bc'
    }
  },
  {
    name: '管理制度',
    value: 12.3,
    itemStyle: {
      color: '#ff6b6b'
    }
  }
])
</script>

<style scoped>
.security-category-improvement {
  height: 263px;
  width: 100%;
  padding: 10px;
}
</style>