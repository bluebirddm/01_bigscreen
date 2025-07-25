<template>
  <div class="test-page">
    <div class="header">
      <h1>3D饼图组件测试页面</h1>
      <p>测试 Pie3DChartV1 组件的各种功能和配置</p>
    </div>

    <div class="test-sections">
      <!-- 基础测试 -->
      <div class="test-section">
        <h2>基础测试</h2>
        <div class="chart-wrapper">
          <Pie3DChartV1 
            :data="basicData" 
            width="600px" 
            height="400px"
            :internalDiameterRatio="0.59"
            unit="个"
          />
        </div>
        <div class="controls">
          <h3>数据控制</h3>
          <button @click="updateBasicData">更新数据</button>
          <button @click="resetBasicData">重置数据</button>
        </div>
      </div>

      <!-- 尺寸测试 -->
      <div class="test-section">
        <h2>尺寸测试</h2>
        <div class="size-controls">
          <label>
            宽度: 
            <select v-model="sizeConfig.width">
              <option value="400px">400px</option>
              <option value="600px">600px</option>
              <option value="800px">800px</option>
              <option value="100%">100%</option>
            </select>
          </label>
          <label>
            高度: 
            <select v-model="sizeConfig.height">
              <option value="300px">300px</option>
              <option value="400px">400px</option>
              <option value="500px">500px</option>
              <option value="600px">600px</option>
            </select>
          </label>
        </div>
        <div class="chart-wrapper">
          <Pie3DChartV1 
            :data="sizeTestData" 
            :width="sizeConfig.width" 
            :height="sizeConfig.height"
            :internalDiameterRatio="0.59"
          />
        </div>
      </div>

      <!-- 内径比例测试 -->
      <div class="test-section">
        <h2>内径比例测试</h2>
        <div class="ratio-controls">
          <label>
            内径比例: {{ ratioConfig.toFixed(2) }}
            <input 
              type="range" 
              v-model.number="ratioConfig" 
              min="0" 
              max="0.8" 
              step="0.05"
            />
          </label>
        </div>
        <div class="chart-wrapper">
          <Pie3DChartV1 
            :data="ratioTestData" 
            width="600px" 
            height="400px"
            :internalDiameterRatio="ratioConfig"
          />
        </div>
      </div>

      <!-- 多种数据测试 -->
      <div class="test-section">
        <h2>多种数据测试</h2>
        <div class="data-controls">
          <button 
            v-for="(dataset, index) in testDatasets" 
            :key="index"
            @click="currentDatasetIndex = index"
            :class="{ active: currentDatasetIndex === index }"
          >
            {{ dataset.name }}
          </button>
        </div>
        <div class="chart-wrapper">
          <Pie3DChartV1 
            :data="testDatasets[currentDatasetIndex].data" 
            width="600px" 
            height="400px"
            :internalDiameterRatio="0.59"
          />
        </div>
        <div class="data-info">
          <h4>当前数据集: {{ testDatasets[currentDatasetIndex].name }}</h4>
          <pre>{{ JSON.stringify(testDatasets[currentDatasetIndex].data, null, 2) }}</pre>
        </div>
      </div>

      <!-- 响应式测试 -->
      <div class="test-section">
        <h2>响应式测试</h2>
        <div class="responsive-wrapper">
          <Pie3DChartV1 
            :data="responsiveData" 
            width="100%" 
            height="400px"
            :internalDiameterRatio="0.59"
          />
        </div>
        <p>调整浏览器窗口大小测试响应式效果</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import Pie3DChartV1 from '@/components/Pie3DChartV1.vue'

// 基础数据
const basicData = ref([
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
  },
  {
    name: '产品E',
    value: 16,
    itemStyle: { color: '#018ef1' }
  }
])

// 尺寸配置
const sizeConfig = reactive({
  width: '600px',
  height: '400px'
})

const sizeTestData = ref([
  { name: '类别1', value: 30, itemStyle: { color: '#FF6B6B' } },
  { name: '类别2', value: 25, itemStyle: { color: '#4ECDC4' } },
  { name: '类别3', value: 20, itemStyle: { color: '#45B7D1' } },
  { name: '类别4', value: 25, itemStyle: { color: '#96CEB4' } }
])

// 内径比例配置
const ratioConfig = ref(0.59)
const ratioTestData = ref([
  { name: '数据1', value: 40, itemStyle: { color: '#FF9F43' } },
  { name: '数据2', value: 35, itemStyle: { color: '#10AC84' } },
  { name: '数据3', value: 25, itemStyle: { color: '#5F27CD' } }
])

// 多种测试数据集
const currentDatasetIndex = ref(0)
const testDatasets = ref([
  {
    name: '默认数据',
    data: [
      { name: 'A', value: 36, itemStyle: { color: '#F6B357' } },
      { name: 'B', value: 52, itemStyle: { color: '#f77b66' } },
      { name: 'C', value: 44, itemStyle: { color: '#3edce0' } }
    ]
  },
  {
    name: '单个数据',
    data: [
      { name: '唯一', value: 100, itemStyle: { color: '#FF6B6B' } }
    ]
  },
  {
    name: '两个数据',
    data: [
      { name: '第一', value: 60, itemStyle: { color: '#4ECDC4' } },
      { name: '第二', value: 40, itemStyle: { color: '#45B7D1' } }
    ]
  },
  {
    name: '多个数据',
    data: [
      { name: '项目1', value: 15, itemStyle: { color: '#FF6B6B' } },
      { name: '项目2', value: 25, itemStyle: { color: '#4ECDC4' } },
      { name: '项目3', value: 20, itemStyle: { color: '#45B7D1' } },
      { name: '项目4', value: 18, itemStyle: { color: '#96CEB4' } },
      { name: '项目5', value: 12, itemStyle: { color: '#FECA57' } },
      { name: '项目6', value: 10, itemStyle: { color: '#FF9FF3' } }
    ]
  }
])

// 响应式数据
const responsiveData = ref([
  { name: '移动端', value: 45, itemStyle: { color: '#FF6B6B' } },
  { name: '桌面端', value: 35, itemStyle: { color: '#4ECDC4' } },
  { name: '平板端', value: 20, itemStyle: { color: '#45B7D1' } }
])

// 更新基础数据
function updateBasicData() {
  basicData.value = basicData.value.map(item => ({
    ...item,
    value: Math.floor(Math.random() * 50) + 10
  }))
}

// 重置基础数据
function resetBasicData() {
  basicData.value = [
    { name: '产品A', value: 36, itemStyle: { color: '#F6B357' } },
    { name: '产品B', value: 52, itemStyle: { color: '#f77b66' } },
    { name: '产品C', value: 44, itemStyle: { color: '#3edce0' } },
    { name: '产品D', value: 32, itemStyle: { color: '#f94e76' } },
    { name: '产品E', value: 16, itemStyle: { color: '#018ef1' } }
  ]
}
</script>

<style scoped>
.test-page {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  font-family: 'Arial', sans-serif;
  background: #1a1a1a;
  min-height: 100vh;
  color: #ffffff;
}

.header {
  text-align: center;
  margin-bottom: 40px;
  padding: 20px;
  background: linear-gradient(135deg, #4a6cf7 0%, #6366f1 100%);
  color: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
}

.header h1 {
  margin: 0 0 10px 0;
  font-size: 2.5em;
}

.header p {
  margin: 0;
  font-size: 1.2em;
  opacity: 0.9;
}

.test-sections {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.test-section {
  background: #2d2d2d;
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  border: 1px solid #4a4a4a;
}

.test-section h2 {
  margin: 0 0 20px 0;
  color: #ffffff;
  font-size: 1.8em;
  border-bottom: 2px solid #5b9bd5;
  padding-bottom: 10px;
}

.chart-wrapper {
  margin: 20px 0;
  border: 2px dashed #6a6a6a;
  border-radius: 8px;
  padding: 20px;
  background: #3a3a3a;
}

.controls, .size-controls, .ratio-controls, .data-controls {
  margin: 20px 0;
  padding: 15px;
  background: #3a3a3a;
  border-radius: 8px;
  border: 1px solid #4a4a4a;
}

.controls h3 {
  margin: 0 0 15px 0;
  color: #e0e0e0;
}

.controls button, .data-controls button {
  margin: 5px;
  padding: 10px 20px;
  background: #5b9bd5;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.3s;
}

.controls button:hover, .data-controls button:hover {
  background: #4a8bc2;
}

.data-controls button.active {
  background: #e74c3c;
}

.size-controls label, .ratio-controls label {
  display: block;
  margin: 10px 0;
  font-weight: bold;
  color: #e0e0e0;
}

.size-controls select, .ratio-controls input {
  margin-left: 10px;
  padding: 5px;
  border: 1px solid #6a6a6a;
  border-radius: 4px;
  background: #4a4a4a;
  color: #ffffff;
}

.size-controls select:focus, .ratio-controls input:focus {
  outline: none;
  border-color: #5b9bd5;
}

.ratio-controls input[type="range"] {
  width: 200px;
}

.data-info {
  margin-top: 20px;
  padding: 15px;
  background: #3a3a3a;
  border-radius: 8px;
  border-left: 4px solid #5b9bd5;
}

.data-info h4 {
  margin: 0 0 10px 0;
  color: #ffffff;
}

.data-info pre {
  background: #2c3e50;
  color: #ecf0f1;
  padding: 15px;
  border-radius: 5px;
  overflow-x: auto;
  font-size: 12px;
  line-height: 1.4;
}

.responsive-wrapper {
  width: 100%;
  min-height: 400px;
  border: 2px dashed #6a6a6a;
  border-radius: 8px;
  padding: 20px;
  background: #3a3a3a;
}

@media (max-width: 768px) {
  .test-page {
    padding: 10px;
  }
  
  .header h1 {
    font-size: 2em;
  }
  
  .test-section {
    padding: 20px;
  }
  
  .chart-wrapper {
    padding: 10px;
  }
}
</style>
