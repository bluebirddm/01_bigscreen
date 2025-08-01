<template>
  <div class="system-type-improvement-stats">
    <PieRoseChart
      :pie-data="systemTypeData"
      :rose-data="detailSystemTypeData"
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

// 主要系统类型整改情况数据（外圈饼图）
const systemTypeData = ref([
  {
    value: 72.8,
    name: '已整改',
    itemStyle: {
      color: '#66bb6a'
    }
  },
  {
    value: 21.6,
    name: '整改中', 
    itemStyle: {
      color: '#ffa726'
    }
  },
  {
    value: 5.6,
    name: '未整改',
    itemStyle: {
      color: '#ff4757'
    }
  }
])

// 详细系统类型分布数据（内圈玫瑰图）
const detailSystemTypeData = ref([
  {
    name: '基础设施',
    value: 28.5,
    itemStyle: {
      color: '#4ecdc4'
    }
  },
  {
    name: '应用系统',
    value: 25.2,
    itemStyle: {
      color: '#45b7d1'
    }
  },
  {
    name: '数据库',
    value: 18.8,
    itemStyle: {
      color: '#96ceb4'
    }
  },
  {
    name: '网络设备',
    value: 16.4,
    itemStyle: {
      color: '#feca57'
    }
  },
  {
    name: '工业控制',
    value: 11.1,
    itemStyle: {
      color: '#ab47bc'
    }
  }
])
</script>

<style scoped>
.system-type-improvement-stats {
  height: 263px;
  width: 100%;
  padding: 10px;
}
</style>