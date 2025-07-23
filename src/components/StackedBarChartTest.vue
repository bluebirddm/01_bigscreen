<template>
  <div class="test-container">
    <h1 class="page-title">StackedBarChart 组件测试页面</h1>
    
    <!-- 控制面板 -->
    <div class="controls">
      <div class="control-group">
        <label>图例位置:</label>
        <select v-model="legendPosition">
          <option value="top">顶部</option>
          <option value="bottom">底部</option>
        </select>
      </div>
      
      <div class="control-group">
        <label>柱子宽度:</label>
        <input type="range" v-model.number="barWidth" min="10" max="50" />
        <span>{{ barWidth }}px</span>
      </div>
      
      <div class="control-group">
        <label>菱形高度:</label>
        <input type="range" v-model.number="diamondHeight" min="8" max="20" />
        <span>{{ diamondHeight }}px</span>
      </div>
      
      <div class="control-group">
        <label>数据集:</label>
        <select v-model="currentDataSet">
          <option value="guangzhou">广州各区数据</option>
          <option value="province">省份数据</option>
          <option value="simple">简单测试数据</option>
          <option value="many">多系列数据</option>
        </select>
      </div>
      
      <div class="control-group">
        <label>
          <input type="checkbox" v-model="autoFitContainer" />
          自动适配容器
        </label>
      </div>
    </div>
    
    <!-- 图表展示区域 -->
    <div class="chart-sections">
      <!-- 大图表 -->
      <div class="chart-container large">
        <h3>大尺寸图表 (800x400)</h3>
        <StackedBarChart 
          :data="currentData" 
          :legend-position="legendPosition"
          :bar-width="barWidth"
          :diamond-height="diamondHeight"
          :auto-fit-container="autoFitContainer"
        />
      </div>
      
      <!-- 中等图表 -->
      <div class="chart-container medium">
        <h3>中等尺寸图表 (500x300)</h3>
        <StackedBarChart 
          :data="currentData" 
          :legend-position="legendPosition"
          :bar-width="barWidth"
          :diamond-height="diamondHeight"
          :auto-fit-container="autoFitContainer"
        />
      </div>
      
      <!-- 小图表 -->
      <div class="chart-container small">
        <h3>小尺寸图表 (320x240)</h3>
        <StackedBarChart 
          :data="currentData" 
          :legend-position="legendPosition"
          :bar-width="barWidth"
          :diamond-height="diamondHeight"
          :auto-fit-container="autoFitContainer"
        />
      </div>
      
      <!-- 极窄图表 -->
      <div class="chart-container narrow">
        <h3>极窄图表 (250x350)</h3>
        <StackedBarChart 
          :data="currentData" 
          :legend-position="legendPosition"
          :bar-width="barWidth"
          :diamond-height="diamondHeight"
          :auto-fit-container="autoFitContainer"
        />
      </div>
    </div>
    
    <!-- 数据预览 -->
    <div class="data-preview">
      <h3>当前数据预览</h3>
      <pre>{{ JSON.stringify(currentData, null, 2) }}</pre>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import StackedBarChart from './StackedBarChart.vue'

// 控制参数
const legendPosition = ref('bottom')
const barWidth = ref(20)
const diamondHeight = ref(12)
const autoFitContainer = ref(true)
const currentDataSet = ref('guangzhou')

// 测试数据集
const dataSets = {
  guangzhou: {
    xdata: ['天河', '海珠', '荔湾', '黄埔', '越秀', '白云', '番禺'],
    result: [
      { name: '一级系统', data: [320, 435, 490, 340, 320, 270, 360] },
      { name: '二级系统', data: [150, 220, 210, 310, 140, 180, 288] },
      { name: '三级系统', data: [250, 120, 240, 280, 240, 180, 288] },
      { name: '四级系统', data: [180, 420, 370, 250, 210, 180, 288] },
      { name: '未定级', data: [130, 210, 340, 240, 220, 180, 288] }
    ]
  },
  
  province: {
    xdata: ['深圳市', '北京市', '上海市', '广州市', '杭州市', '成都市', '苏州市', '南京市', '武汉市', '西安市'],
    result: [
      { name: '一级', data: [120, 98, 80, 70, 50, 42, 35, 25, 20, 15] },
      { name: '二级', data: [200, 180, 150, 120, 90, 80, 65, 45, 35, 25] },
      { name: '三级', data: [100, 80, 60, 60, 40, 35, 25, 15, 12, 6] },
      { name: '四级', data: [30, 20, 10, 15, 12, 6, 7, 4, 3, 2] },
      { name: '未定级', data: [18, 6, 2, 3, 2, 2, 2, 1, 1, 0] }
    ]
  },
  
  simple: {
    xdata: ['A', 'B', 'C', 'D', 'E'],
    result: [
      { name: '系列1', data: [100, 150, 120, 180, 90] },
      { name: '系列2', data: [80, 90, 110, 70, 120] },
      { name: '系列3', data: [60, 70, 80, 90, 100] }
    ]
  },
  
  many: {
    xdata: ['1月', '2月', '3月', '4月', '5月', '6月'],
    result: [
      { name: '网络安全', data: [45, 52, 48, 61, 55, 67] },
      { name: '数据安全', data: [35, 41, 38, 47, 42, 53] },
      { name: '应用安全', data: [28, 33, 31, 39, 35, 42] },
      { name: '物理安全', data: [22, 26, 24, 31, 28, 34] },
      { name: '管理安全', data: [18, 21, 19, 25, 22, 28] },
      { name: '业务安全', data: [15, 18, 16, 21, 19, 24] }
    ]
  }
}

// 当前数据
const currentData = computed(() => dataSets[currentDataSet.value])
</script>

<style scoped>
.test-container {
  padding: 20px;
  background: linear-gradient(135deg, #0c1426 0%, #1a2332 100%);
  min-height: 100vh;
  color: #fff;
  font-family: 'Microsoft YaHei', sans-serif;
}

.page-title {
  text-align: center;
  color: #00bfff;
  margin-bottom: 30px;
  font-size: 28px;
  text-shadow: 0 0 10px rgba(0, 191, 255, 0.5);
}

.controls {
  background: rgba(0, 20, 40, 0.8);
  border: 1px solid rgba(0, 191, 255, 0.3);
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 30px;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  backdrop-filter: blur(10px);
}

.control-group {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 200px;
}

.control-group label {
  color: #8cc8ff;
  white-space: nowrap;
  font-weight: 500;
}

.control-group select,
.control-group input[type="range"] {
  background: rgba(0, 40, 80, 0.8);
  border: 1px solid rgba(0, 191, 255, 0.5);
  border-radius: 6px;
  color: #fff;
  padding: 5px 10px;
}

.control-group select {
  min-width: 100px;
}

.control-group input[type="range"] {
  width: 100px;
}

.control-group span {
  color: #4ecdc4;
  font-weight: bold;
  min-width: 40px;
}

.control-group input[type="checkbox"] {
  accent-color: #00bfff;
}

.chart-sections {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 30px;
}

.chart-container {
  background: rgba(0, 20, 40, 0.8);
  border: 1px solid rgba(0, 191, 255, 0.3);
  border-radius: 12px;
  padding: 20px;
  backdrop-filter: blur(10px);
}

.chart-container h3 {
  color: #00bfff;
  margin: 0 0 15px 0;
  text-align: center;
  font-size: 16px;
}

.chart-container.large {
  grid-column: 1 / -1;
  height: 400px;
}

.chart-container.medium {
  height: 300px;
}

.chart-container.small {
  height: 240px;
}

.chart-container.narrow {
  height: 350px;
  max-width: 250px;
  margin: 0 auto;
}

.data-preview {
  background: rgba(0, 20, 40, 0.8);
  border: 1px solid rgba(0, 191, 255, 0.3);
  border-radius: 12px;
  padding: 20px;
  backdrop-filter: blur(10px);
}

.data-preview h3 {
  color: #00bfff;
  margin: 0 0 15px 0;
}

.data-preview pre {
  color: #8cc8ff;
  font-size: 12px;
  max-height: 300px;
  overflow-y: auto;
  background: rgba(0, 10, 20, 0.5);
  padding: 15px;
  border-radius: 8px;
  border: 1px solid rgba(0, 191, 255, 0.2);
}

/* 滚动条样式 */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: rgba(0, 20, 40, 0.5);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: rgba(0, 191, 255, 0.5);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 191, 255, 0.8);
}
</style>