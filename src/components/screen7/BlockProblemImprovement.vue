<template>
  <div class="block-problem-improvement">
    <PieRoseChart
      :pie-data="blockImprovementData"
      :rose-data="detailBlockData"
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
const blockImprovementData = ref([
  {
    value: 68.2,
    name: '已整改',
    itemStyle: {
      color: '#66bb6a'
    }
  },
  {
    value: 24.5,
    name: '整改中', 
    itemStyle: {
      color: '#ffa726'
    }
  },
  {
    value: 7.3,
    name: '未整改',
    itemStyle: {
      color: '#ff4757'
    }
  }
])

// 详细板块分布数据（内圈玫瑰图）
const detailBlockData = ref([
  {
    name: '发电板块',
    value: 22.5,
    itemStyle: {
      color: '#4ecdc4'
    }
  },
  {
    name: '电网板块',
    value: 18.3,
    itemStyle: {
      color: '#45b7d1'
    }
  },
  {
    name: '煤炭板块',
    value: 15.7,
    itemStyle: {
      color: '#96ceb4'
    }
  },
  {
    name: '金融板块',
    value: 14.2,
    itemStyle: {
      color: '#feca57'
    }
  },
  {
    name: '科技板块',
    value: 12.8,
    itemStyle: {
      color: '#a0a0a0'
    }
  },
  {
    name: '产业板块',
    value: 10.4,
    itemStyle: {
      color: '#ab47bc'
    }
  },
  {
    name: '国际板块',
    value: 6.1,
    itemStyle: {
      color: '#ff6b6b'
    }
  }
])
</script>

<style scoped>
.block-problem-improvement {
  height: 177px;
  width: 100%;
  padding: 10px;
}
</style>