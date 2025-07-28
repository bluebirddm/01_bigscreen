<template>
  <div class="test-page">
    <div class="test-header">
      <h1>3D圆柱状图组件测试</h1>
    </div>
    
    <div class="charts-container">
      <!-- 默认数据测试 -->
      <div class="chart-section">
        <h3>默认数据模式</h3>
        <Circle3DBar height="400px" />
      </div>
      
      <!-- 自定义数据测试 -->
      <div class="chart-section">
        <h3>自定义数据模式</h3>
        <Circle3DBar 
          :data="customData"
          height="400px"
        />
      </div>
      
      <!-- 不显示标签测试 -->
      <div class="chart-section">
        <h3>不显示数值标签</h3>
        <Circle3DBar 
          :data="customData"
          :show-labels="false"
          height="400px"
        />
      </div>
      
      <!-- 调整柱子宽度测试 -->
      <div class="chart-section">
        <h3>调整柱子宽度</h3>
        <Circle3DBar 
          :data="customData"
          :bar-width="80"
          height="400px"
        />
      </div>
      
      <!-- 交互控制演示 -->
      <div class="chart-section full-width">
        <h3>交互控制演示</h3>
        <div class="controls-grid">
          <div class="control-group">
            <button @click="updateData" class="control-btn">更新数据</button>
          </div>
          
          <div class="control-group">
            <label class="switch">
              <input type="checkbox" v-model="showLabels">
              <span class="slider"></span>
            </label>
            <span class="control-label">显示数值标签</span>
          </div>
          
          <div class="control-group">
            <label class="range-label">柱子宽度: {{ barWidth }}</label>
            <input 
              type="range" 
              v-model.number="barWidth" 
              min="60" 
              max="160" 
              step="20"
              class="range-slider"
            >
          </div>
          
          <div class="control-group">
            <label class="range-label">椭圆高度: {{ symbolHeight }}</label>
            <input 
              type="range" 
              v-model.number="symbolHeight" 
              min="30" 
              max="60" 
              step="5"
              class="range-slider"
            >
          </div>
        </div>
        
        <div class="demo-chart">
          <Circle3DBar 
            :data="interactiveData"
            :show-labels="showLabels"
            :bar-width="barWidth"
            :symbol-height="symbolHeight"
            height="450px"
          />
        </div>
      </div>
      
      <!-- 多组数据对比 -->
      <div class="chart-section full-width">
        <h3>多组数据对比演示</h3>
        <div class="comparison-grid">
          <div class="comparison-item">
            <h4>第一季度数据</h4>
            <Circle3DBar 
              :data="quarterData.q1"
              height="300px"
            />
          </div>
          <div class="comparison-item">
            <h4>第二季度数据</h4>
            <Circle3DBar 
              :data="quarterData.q2"
              height="300px"
            />
          </div>
          <div class="comparison-item">
            <h4>第三季度数据</h4>
            <Circle3DBar 
              :data="quarterData.q3"
              height="300px"
            />
          </div>
          <div class="comparison-item">
            <h4>第四季度数据</h4>
            <Circle3DBar 
              :data="quarterData.q4"
              height="300px"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import Circle3DBar from '@/components/Circle3DBar.vue'

// 自定义数据
const customData = ref([
  { name: '北京', value: 85, max: 100 },
  { name: '上海', value: 72, max: 100 },
  { name: '广州', value: 68, max: 100 },
  { name: '深圳', value: 91, max: 100 },
  { name: '杭州', value: 56, max: 100 },
  { name: '成都', value: 78, max: 100 }
])

// 交互控制数据
const interactiveData = ref([
  { name: '系统A', value: 73, max: 100 },
  { name: '系统B', value: 18, max: 100 },
  { name: '系统C', value: 43, max: 100 },
  { name: '系统D', value: 28, max: 100 },
  { name: '系统E', value: 56, max: 100 }
])

// 交互控制参数
const showLabels = ref(true)
const barWidth = ref(120)
const symbolHeight = ref(45)

// 季度数据对比
const quarterData = reactive({
  q1: [
    { name: 'A', value: 45, max: 100 },
    { name: 'B', value: 78, max: 100 },
    { name: 'C', value: 32, max: 100 },
    { name: 'D', value: 91, max: 100 }
  ],
  q2: [
    { name: 'A', value: 62, max: 100 },
    { name: 'B', value: 85, max: 100 },
    { name: 'C', value: 48, max: 100 },
    { name: 'D', value: 73, max: 100 }
  ],
  q3: [
    { name: 'A', value: 78, max: 100 },
    { name: 'B', value: 65, max: 100 },
    { name: 'C', value: 89, max: 100 },
    { name: 'D', value: 56, max: 100 }
  ],
  q4: [
    { name: 'A', value: 91, max: 100 },
    { name: 'B', value: 77, max: 100 },
    { name: 'C', value: 68, max: 100 },
    { name: 'D', value: 84, max: 100 }
  ]
})

// 更新数据方法
const updateData = () => {
  interactiveData.value = interactiveData.value.map(item => ({
    ...item,
    value: Math.floor(Math.random() * 100)
  }))
}
</script>

<style scoped>
.test-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #0a1a2e 0%, #16213e 50%, #0a1a2e 100%);
  padding: 20px;
  color: #fff;
}

.test-header {
  text-align: center;
  margin-bottom: 40px;
}

.test-header h1 {
  font-size: 2.5rem;
  color: #00bfff;
  text-shadow: 0 0 20px rgba(0, 191, 255, 0.5);
  margin: 0;
}

.charts-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  max-width: 1400px;
  margin: 0 auto;
}

.chart-section {
  background: rgba(0, 191, 255, 0.05);
  border: 1px solid rgba(0, 191, 255, 0.3);
  border-radius: 12px;
  padding: 20px;
  backdrop-filter: blur(10px);
}

.chart-section.full-width {
  grid-column: span 2;
}

.chart-section h3 {
  color: #8cc8ff;
  margin: 0 0 20px 0;
  font-size: 1.2rem;
  text-align: center;
  border-bottom: 2px solid rgba(0, 191, 255, 0.3);
  padding-bottom: 10px;
}

/* 控制面板样式 */
.controls-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
  padding: 20px;
  background: rgba(0, 191, 255, 0.05);
  border-radius: 8px;
}

.control-group {
  display: flex;
  align-items: center;
  gap: 10px;
}

.control-btn {
  background: rgba(0, 191, 255, 0.2);
  border: 1px solid #00bfff;
  color: #00bfff;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;
}

.control-btn:hover {
  background: rgba(0, 191, 255, 0.4);
  box-shadow: 0 0 10px rgba(0, 191, 255, 0.3);
}

.switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.2);
  transition: .4s;
  border-radius: 24px;
  border: 1px solid rgba(0, 191, 255, 0.3);
}

.slider:before {
  position: absolute;
  content: "";
  height: 18px;
  width: 18px;
  left: 2px;
  bottom: 2px;
  background-color: #8cc8ff;
  transition: .4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: rgba(0, 191, 255, 0.5);
  border-color: #00bfff;
}

input:checked + .slider:before {
  transform: translateX(26px);
  background-color: #00bfff;
  box-shadow: 0 0 10px rgba(0, 191, 255, 0.5);
}

.control-label {
  color: #8cc8ff;
  font-size: 14px;
}

.range-label {
  color: #8cc8ff;
  font-size: 14px;
  min-width: 120px;
}

.range-slider {
  flex: 1;
  height: 4px;
  -webkit-appearance: none;
  appearance: none;
  background: rgba(0, 191, 255, 0.2);
  border-radius: 2px;
  outline: none;
  transition: opacity 0.3s;
}

.range-slider:hover {
  opacity: 1;
}

.range-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 16px;
  height: 16px;
  background: #00bfff;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 0 10px rgba(0, 191, 255, 0.5);
}

.range-slider::-moz-range-thumb {
  width: 16px;
  height: 16px;
  background: #00bfff;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 0 10px rgba(0, 191, 255, 0.5);
}

.demo-chart {
  max-width: 800px;
  margin: 0 auto;
}

/* 对比网格样式 */
.comparison-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.comparison-item {
  background: rgba(0, 191, 255, 0.03);
  border: 1px solid rgba(0, 191, 255, 0.2);
  border-radius: 8px;
  padding: 15px;
}

.comparison-item h4 {
  color: #8cc8ff;
  text-align: center;
  margin: 0 0 15px 0;
  font-size: 1rem;
  border-bottom: 1px solid rgba(0, 191, 255, 0.2);
  padding-bottom: 8px;
}

@media (max-width: 1200px) {
  .charts-container {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .chart-section.full-width {
    grid-column: span 1;
  }
  
  .comparison-grid {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
}

@media (max-width: 768px) {
  .controls-grid {
    grid-template-columns: 1fr;
  }
  
  .comparison-grid {
    grid-template-columns: 1fr;
  }
}
</style>