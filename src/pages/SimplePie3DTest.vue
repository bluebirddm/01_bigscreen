<template>
  <div class="simple-test">
    <h1>Pie3DChartV1 简单测试</h1>
    
    <div class="test-container">
      <h2>基础3D饼图</h2>
      <div class="chart-wrapper">
        <Pie3DChartV1 
          :data="testData" 
          width="600px" 
          height="400px"
          :internalDiameterRatio="0.59"
        />
      </div>
      
      <div class="controls">
        <button @click="updateData">随机更新数据</button>
        <button @click="resetData">重置数据</button>
      </div>
      
      <div class="data-display">
        <h3>当前数据：</h3>
        <pre>{{ JSON.stringify(testData, null, 2) }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Pie3DChartV1 from '../components/Pie3DChartV1.vue'

// 测试数据
const testData = ref([
  {
    name: '产品A',
    value: 36,
    itemStyle: { color: '#F6B357' }
  },
  {
    name: '产品B',
    value: 52,
    itemStyle: { color: '#f77b66' }
  },
  {
    name: '产品C',
    value: 44,
    itemStyle: { color: '#3edce0' }
  },
  {
    name: '产品D',
    value: 32,
    itemStyle: { color: '#f94e76' }
  }
])

// 原始数据备份
const originalData = [
  {
    name: '产品A',
    value: 36,
    itemStyle: { color: '#F6B357' }
  },
  {
    name: '产品B',
    value: 52,
    itemStyle: { color: '#f77b66' }
  },
  {
    name: '产品C',
    value: 44,
    itemStyle: { color: '#3edce0' }
  },
  {
    name: '产品D',
    value: 32,
    itemStyle: { color: '#f94e76' }
  }
]

// 更新数据
function updateData() {
  testData.value = testData.value.map(item => ({
    ...item,
    value: Math.floor(Math.random() * 50) + 10
  }))
}

// 重置数据
function resetData() {
  testData.value = [...originalData]
}
</script>

<style scoped>
.simple-test {
  padding: 20px;
  max-width: 1000px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 30px;
}

.test-container {
  background: white;
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h2 {
  color: #2c3e50;
  margin-bottom: 20px;
}

.chart-wrapper {
  border: 2px dashed #bdc3c7;
  border-radius: 8px;
  padding: 20px;
  background: #f8f9fa;
  margin-bottom: 20px;
}

.controls {
  margin: 20px 0;
  text-align: center;
}

.controls button {
  margin: 0 10px;
  padding: 10px 20px;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
}

.controls button:hover {
  background: #2980b9;
}

.data-display {
  margin-top: 20px;
  padding: 15px;
  background: #f4f4f4;
  border-radius: 8px;
}

.data-display h3 {
  margin: 0 0 10px 0;
  color: #2c3e50;
}

.data-display pre {
  background: #2c3e50;
  color: #ecf0f1;
  padding: 15px;
  border-radius: 5px;
  overflow-x: auto;
  font-size: 12px;
  line-height: 1.4;
  margin: 0;
}
</style>
