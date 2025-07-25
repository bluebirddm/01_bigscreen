<template>
  <div class="test-page">
    <div class="test-header">
      <h1>3D柱状图组件测试</h1>
    </div>
    
    <div class="charts-container">
      <!-- 默认数据测试 - 不显示max柱 -->
      <div class="chart-section">
        <h3>默认模式（不显示背景柱）</h3>
        <Bar3D height="350px" />
      </div>
      
      <!-- 显示max柱的对比 -->
      <div class="chart-section">
        <h3>显示背景柱对比模式</h3>
        <Bar3D 
          :show-max-bars="true"
          height="350px"
        />
      </div>
      
      <!-- 自定义数据测试 - 不显示max柱 -->
      <div class="chart-section">
        <h3>自定义年度数据（简洁模式）</h3>
        <Bar3D 
          :data="yearlyData"
          :max-data="yearlyMaxData"
          :categories="yearlyCategories"
          height="350px"
        />
      </div>
      
      <!-- 自定义数据测试 - 显示max柱 -->
      <div class="chart-section">
        <h3>自定义年度数据（对比模式）</h3>
        <Bar3D 
          :data="yearlyData"
          :max-data="yearlyMaxData"
          :categories="yearlyCategories"
          :show-max-bars="true"
          height="350px"
        />
      </div>
      
      <!-- 小尺寸测试 -->
      <div class="chart-section small">
        <h3>紧凑版本（简洁模式）</h3>
        <Bar3D 
          :data="compactData"
          :max-data="compactMaxData"
          :categories="compactCategories"
          height="250px"
        />
      </div>
      
      <!-- 交互开关演示 -->
      <div class="chart-section small">
        <h3>交互开关演示</h3>
        <div class="toggle-control">
          <label class="switch">
            <input type="checkbox" v-model="showMaxBarsToggle">
            <span class="slider"></span>
          </label>
          <span class="toggle-label">显示背景柱</span>
        </div>
        <Bar3D 
          :data="compactData"
          :max-data="compactMaxData"
          :categories="compactCategories"
          :show-max-bars="showMaxBarsToggle"
          height="250px"
        />
      </div>
      
      <!-- 透明参数控制演示 -->
      <div class="chart-section full-width">
        <h3>透明参数控制演示</h3>
        <div class="controls-grid">
          <div class="control-group">
            <label class="switch">
              <input type="checkbox" v-model="transparencyEnabled">
              <span class="slider"></span>
            </label>
            <span class="control-label">启用透明效果</span>
          </div>
          
          <div class="control-group">
            <label class="range-label">透明转折点: {{ transparencyOffset }}</label>
            <input 
              type="range" 
              v-model.number="transparencyOffset" 
              min="0" 
              max="1" 
              step="0.1"
              :disabled="!transparencyEnabled"
              class="range-slider"
            >
          </div>
          
          <div class="control-group">
            <label class="range-label">底部透明度: {{ bottomOpacity }}</label>
            <input 
              type="range" 
              v-model.number="bottomOpacity" 
              min="0" 
              max="1" 
              step="0.1"
              :disabled="!transparencyEnabled"
              class="range-slider"
            >
          </div>
          
          <div class="control-group">
            <label class="range-label">背景柱透明缩放: {{ bgTransparencyScale }}</label>
            <input 
              type="range" 
              v-model.number="bgTransparencyScale" 
              min="0" 
              max="1" 
              step="0.1"
              :disabled="!transparencyEnabled"
              class="range-slider"
            >
          </div>
        </div>
        
        <div class="demo-charts">
          <div class="demo-chart">
            <h4>自定义透明参数效果</h4>
            <Bar3D 
              :data="[450, 380, 620, 320, 510, 410]"
              :max-data="[700, 700, 700, 700, 700, 700]"
              :categories="['A', 'B', 'C', 'D', 'E', 'F']"
              :show-max-bars="true"
              :enable-transparency="transparencyEnabled"
              :transparency-offset="transparencyOffset"
              :bottom-opacity="bottomOpacity"
              :background-transparency-scale="bgTransparencyScale"
              height="300px"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Bar3D from '@/components/Bar3D.vue'

// 年度数据示例
const yearlyData = ref([1200, 980, 1500, 800, 1800, 1200])
const yearlyMaxData = ref([2000, 2000, 2000, 2000, 2000, 2000])
const yearlyCategories = ref(['2019', '2020', '2021', '2022', '2023', '2024'])

// 紧凑数据示例
const compactData = ref([45, 78, 32, 91])
const compactMaxData = ref([100, 100, 100, 100])
const compactCategories = ref(['Q1', 'Q2', 'Q3', 'Q4'])

// 交互开关
const showMaxBarsToggle = ref(false)

// 透明参数控制
const transparencyEnabled = ref(true)
const transparencyOffset = ref(0.5)
const bottomOpacity = ref(0)
const bgTransparencyScale = ref(1)
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

.chart-section.small {
  grid-column: span 2;
  max-width: 600px;
  margin: 0 auto;
}

.chart-section h3 {
  color: #8cc8ff;
  margin: 0 0 20px 0;
  font-size: 1.2rem;
  text-align: center;
  border-bottom: 2px solid rgba(0, 191, 255, 0.3);
  padding-bottom: 10px;
}

/* 开关控制样式 */
.toggle-control {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
  justify-content: center;
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

.toggle-label {
  color: #8cc8ff;
  font-size: 14px;
}

/* 全宽区域 */
.chart-section.full-width {
  grid-column: span 2;
  max-width: none;
}

/* 控制面板样式 */
.controls-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
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

.control-label {
  color: #8cc8ff;
  font-size: 14px;
}

.range-label {
  color: #8cc8ff;
  font-size: 14px;
  min-width: 150px;
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

.range-slider:disabled {
  opacity: 0.3;
  cursor: not-allowed;
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

.demo-charts {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.demo-chart {
  flex: 1;
  max-width: 800px;
}

.demo-chart h4 {
  color: #8cc8ff;
  text-align: center;
  margin-bottom: 20px;
  font-size: 1.1rem;
}

@media (max-width: 1200px) {
  .charts-container {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .chart-section.small {
    grid-column: span 1;
  }
}
</style>