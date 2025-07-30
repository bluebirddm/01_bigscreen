<template>
  <div class="security-category-issues-radar">
    <PieRoseChart
      :pie-data="categoryData"
      :rose-data="detailData"
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
}
</style>