<template>
  <div class="security-category-distribution">
    <PieRoseChart
      :pie-data="categoryData"
      :rose-data="detailCategoryData"
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

// 主要安全类别分布数据（内圈饼图）
const categoryData = ref([
  {
    value: 25.8,
    name: '高风险',
    itemStyle: {
      color: '#ff4757'
    }
  },
  {
    value: 42.3,
    name: '中风险', 
    itemStyle: {
      color: '#ffa726'
    }
  },
  {
    value: 31.9,
    name: '低风险',
    itemStyle: {
      color: '#66bb6a'
    }
  }
])

// 详细安全类别分布数据（外圈玫瑰图）
const detailCategoryData = ref([
  {
    name: '物理环境',
    value: 18.2,
    itemStyle: {
      color: '#ff6b6b'
    }
  },
  {
    name: '网络安全',
    value: 21.5,
    itemStyle: {
      color: '#4ecdc4'
    }
  },
  {
    name: '主机安全',
    value: 19.8,
    itemStyle: {
      color: '#45b7d1'
    }
  },
  {
    name: '应用安全',
    value: 16.3,
    itemStyle: {
      color: '#96ceb4'
    }
  },
  {
    name: '数据安全',
    value: 12.7,
    itemStyle: {
      color: '#feca57'
    }
  },
  {
    name: '安全管理',
    value: 11.5,
    itemStyle: {
      color: '#dfe6e9'
    }
  }
])
</script>

<style scoped>
.security-category-distribution {
  height: 263px;
  width: 100%;
  padding: 10px;
}
</style>