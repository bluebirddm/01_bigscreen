<template>
  <div class="test-page">
    <div class="test-header">
      <h1>圆形3D堆叠柱状图组件测试</h1>
    </div>
    
    <div class="charts-container">
      <!-- 默认数据测试 -->
      <div class="chart-section">
        <h3>默认数据模式</h3>
        <div class="chart-container">
          <StackedCircle3DBar height="100%" />
        </div>
      </div>
      
      <!-- 自定义数据测试 -->
      <div class="chart-section">
        <h3>自定义数据模式</h3>
        <div class="chart-container">
          <StackedCircle3DBar 
            :data="customData"
            height="100%"
          />
        </div>
      </div>
      
      <!-- 图例顶部模式 -->
      <div class="chart-section">
        <h3>图例顶部模式</h3>
        <div class="chart-container">
          <StackedCircle3DBar 
            :data="customData"
            legend-position="top"
            height="100%"
          />
        </div>
      </div>
      
      <!-- 调整柱子和圆形尺寸 -->
      <div class="chart-section">
        <h3>调整柱子和圆形尺寸</h3>
        <div class="chart-container">
          <StackedCircle3DBar 
            :data="customData"
            :bar-width="30"
            :circle-width="35"
            :circle-height="20"
            height="100%"
          />
        </div>
      </div>
      
      <!-- 交互控制演示 -->
      <div class="chart-section full-width">
        <h3>交互控制演示</h3>
        <div class="controls-grid">
          <div class="control-group">
            <button @click="updateData" class="control-btn">随机更新数据</button>
            <button @click="addSeries" class="control-btn">添加系列</button>
            <button @click="removeSeries" class="control-btn">删除系列</button>
          </div>
          
          <div class="control-group">
            <label class="switch">
              <input type="checkbox" v-model="legendTop">
              <span class="slider"></span>
            </label>
            <span class="control-label">图例置顶</span>
          </div>
          
          <div class="control-group">
            <label class="range-label">柱子宽度: {{ barWidth }}</label>
            <input 
              type="range" 
              v-model.number="barWidth" 
              min="15" 
              max="40" 
              step="5"
              class="range-slider"
            >
          </div>
          
          <div class="control-group">
            <label class="range-label">圆形高度: {{ circleHeight }}</label>
            <input 
              type="range" 
              v-model.number="circleHeight" 
              min="10" 
              max="25" 
              step="2"
              class="range-slider"
            >
          </div>
        </div>
        
        <div class="demo-chart">
          <div class="demo-chart-container">
            <StackedCircle3DBar 
              :data="interactiveData"
              :legend-position="legendTop ? 'top' : 'bottom'"
              :bar-width="barWidth"
              :circle-height="circleHeight"
              height="100%"
            />
          </div>
        </div>
      </div>
      
      <!-- 多场景对比 -->
      <div class="chart-section full-width">
        <h3>多场景数据对比演示</h3>
        <div class="comparison-grid">
          <div class="comparison-item">
            <h4>系统使用统计</h4>
            <div class="comparison-chart-container">
              <StackedCircle3DBar 
                :data="scenarioData.system"
                height="100%"
              />
            </div>
          </div>
          <div class="comparison-item">
            <h4>区域分布统计</h4>
            <div class="comparison-chart-container">
              <StackedCircle3DBar 
                :data="scenarioData.region"
                height="100%"
              />
            </div>
          </div>
          <div class="comparison-item">
            <h4>月度趋势统计</h4>
            <div class="comparison-chart-container">
              <StackedCircle3DBar 
                :data="scenarioData.monthly"
                height="100%"
              />
            </div>
          </div>
          <div class="comparison-item">
            <h4>部门业绩统计</h4>
            <div class="comparison-chart-container">
              <StackedCircle3DBar 
                :data="scenarioData.department"
                height="100%"
              />
            </div>
          </div>
        </div>
      </div>
      
      <!-- 样式配置对比 -->
      <div class="chart-section full-width">
        <h3>不同样式配置对比</h3>
        <div class="style-comparison">
          <div class="style-item">
            <h4>紧凑模式</h4>
            <div class="style-chart-container">
              <StackedCircle3DBar 
                :data="compactData"
                :bar-width="15"
                :circle-height="8"
                height="100%"
              />
            </div>
          </div>
          <div class="style-item">
            <h4>标准模式</h4>
            <div class="style-chart-container">
              <StackedCircle3DBar 
                :data="compactData"
                :bar-width="20"
                :circle-height="12"
                height="100%"
              />
            </div>
          </div>
          <div class="style-item">
            <h4>宽松模式</h4>
            <div class="style-chart-container">
              <StackedCircle3DBar 
                :data="compactData"
                :bar-width="30"
                :circle-height="18"
                height="100%"
              />
            </div>
          </div>
        </div>
      </div>
      
      <!-- 边界情况测试 -->
      <div class="chart-section full-width">
        <h3>边界情况和异常数据测试</h3>
        <div class="edge-cases-grid">
          <div class="edge-case-item">
            <h4>单系列数据</h4>
            <div class="edge-case-chart-container">
              <StackedCircle3DBar 
                :data="edgeCases.singleSeries"
                height="100%"
              />
            </div>
          </div>
          <div class="edge-case-item">
            <h4>极值数据（0和大数值）</h4>
            <div class="edge-case-chart-container">
              <StackedCircle3DBar 
                :data="edgeCases.extremeValues"
                height="100%"
              />
            </div>
          </div>
          <div class="edge-case-item">
            <h4>小数值数据</h4>
            <div class="edge-case-chart-container">
              <StackedCircle3DBar 
                :data="edgeCases.smallValues"
                height="100%"
              />
            </div>
          </div>
          <div class="edge-case-item">
            <h4>不规则分布</h4>
            <div class="edge-case-chart-container">
              <StackedCircle3DBar 
                :data="edgeCases.irregularDistribution"
                height="100%"
              />
            </div>
          </div>
          <div class="edge-case-item">
            <h4>大量系列（6个系列）</h4>
            <div class="edge-case-chart-container">
              <StackedCircle3DBar 
                :data="edgeCases.manySeries"
                height="100%"
              />
            </div>
          </div>
          <div class="edge-case-item">
            <h4>大量数据点</h4>
            <div class="edge-case-chart-container">
              <StackedCircle3DBar 
                :data="edgeCases.manyDataPoints"
                :bar-width="12"
                :circle-height="8"
                height="100%"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import StackedCircle3DBar from '@/components/StackedCircle3DBar.vue'

// 自定义数据
const customData = ref({
  xdata: ['北京', '上海', '广州', '深圳', '杭州', '成都'],
  result: [
    { name: '移动端', data: [220, 320, 280, 410, 350, 290] },
    { name: 'PC端', data: [180, 250, 190, 280, 210, 240] },
    { name: '平板端', data: [120, 150, 140, 180, 160, 130] },
    { name: '其他', data: [80, 100, 90, 120, 100, 85] }
  ]
})

// 交互控制数据
const interactiveData = ref({
  xdata: ['系统A', '系统B', '系统C', '系统D', '系统E'],
  result: [
    { name: '正常', data: [120, 200, 150, 180, 170] },
    { name: '告警', data: [50, 80, 60, 70, 65] },
    { name: '故障', data: [20, 30, 25, 35, 28] }
  ]
})

// 交互控制参数
const legendTop = ref(false)
const barWidth = ref(20)
const circleHeight = ref(12)

// 多场景数据
const scenarioData = reactive({
  system: {
    xdata: ['登录', '查询', '报表', '导出', '审批'],
    result: [
      { name: '今日', data: [850, 420, 380, 290, 650] },
      { name: '昨日', data: [720, 380, 350, 260, 580] },
      { name: '上周同期', data: [680, 360, 320, 240, 520] }
    ]
  },
  region: {
    xdata: ['华北', '华东', '华南', '西南', '东北'],
    result: [
      { name: '一线城市', data: [480, 520, 460, 320, 280] },
      { name: '二线城市', data: [320, 380, 340, 260, 220] },
      { name: '三线城市', data: [180, 220, 200, 160, 140] }
    ]
  },
  monthly: {
    xdata: ['1月', '2月', '3月', '4月', '5月', '6月'],
    result: [
      { name: '收入', data: [820, 932, 901, 1200, 1330, 1320] },
      { name: '支出', data: [620, 732, 701, 900, 1030, 1020] },
      { name: '利润', data: [200, 200, 200, 300, 300, 300] }
    ]
  },
  department: {
    xdata: ['研发部', '销售部', '市场部', '运营部', '客服部'],
    result: [
      { name: 'Q1', data: [75, 82, 68, 91, 77] },
      { name: 'Q2', data: [88, 94, 75, 86, 83] },
      { name: 'Q3', data: [92, 87, 79, 94, 89] },
      { name: 'Q4', data: [85, 91, 84, 88, 92] }
    ]
  }
})

// 紧凑数据
const compactData = ref({
  xdata: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
  result: [
    { name: '类型1', data: [45, 52, 38, 65, 48, 72, 59, 41] },
    { name: '类型2', data: [32, 41, 29, 48, 35, 53, 42, 30] },
    { name: '类型3', data: [18, 25, 16, 28, 20, 31, 24, 17] }
  ]
})

// 边界情况测试数据
const edgeCases = reactive({
  // 单系列数据
  singleSeries: {
    xdata: ['第一季度', '第二季度', '第三季度', '第四季度'],
    result: [
      { name: '单一指标', data: [150, 280, 320, 450] }
    ]
  },
  
  // 极值数据
  extremeValues: {
    xdata: ['项目A', '项目B', '项目C', '项目D'],
    result: [
      { name: '正常值', data: [0, 1200, 800, 0] },
      { name: '高值', data: [2500, 0, 1800, 3000] },
      { name: '低值', data: [1, 2, 0, 5] }
    ]
  },
  
  // 小数值数据
  smallValues: {
    xdata: ['指标1', '指标2', '指标3', '指标4', '指标5'],
    result: [
      { name: '组A', data: [0.5, 1.2, 0.8, 2.1, 1.5] },
      { name: '组B', data: [0.3, 0.9, 1.1, 0.7, 0.4] },
      { name: '组C', data: [0.2, 0.4, 0.6, 0.3, 0.8] }
    ]
  },
  
  // 不规则分布
  irregularDistribution: {
    xdata: ['区域1', '区域2', '区域3', '区域4', '区域5'],
    result: [
      { name: '高峰', data: [800, 20, 15, 900, 5] },
      { name: '平均', data: [200, 500, 300, 100, 400] },
      { name: '低谷', data: [50, 800, 700, 30, 600] }
    ]
  },
  
  // 大量系列
  manySeries: {
    xdata: ['Jan', 'Feb', 'Mar', 'Apr'],
    result: [
      { name: '系列1', data: [120, 140, 160, 180] },
      { name: '系列2', data: [80, 90, 100, 110] },
      { name: '系列3', data: [60, 70, 80, 90] },
      { name: '系列4', data: [40, 50, 60, 70] },
      { name: '系列5', data: [20, 30, 40, 50] },
      { name: '系列6', data: [10, 15, 20, 25] }
    ]
  },
  
  // 大量数据点
  manyDataPoints: {
    xdata: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    result: [
      { name: '产品A', data: [120, 132, 101, 134, 90, 230, 210, 182, 191, 234, 290, 330] },
      { name: '产品B', data: [80, 95, 87, 120, 85, 180, 165, 142, 151, 184, 220, 250] },
      { name: '产品C', data: [50, 60, 55, 80, 60, 120, 110, 95, 101, 123, 140, 160] }
    ]
  }
})

// 生成随机数据的辅助函数
const generateRandomData = (min = 50, max = 300) => {
  return Math.floor(Math.random() * (max - min) + min)
}

// 更新数据方法
const updateData = () => {
  interactiveData.value.result = interactiveData.value.result.map(series => ({
    ...series,
    data: series.data.map(() => generateRandomData())
  }))
}

// 添加系列
const addSeries = () => {
  if (interactiveData.value.result.length < 6) {
    const seriesNames = ['严重', '中等', '轻微', '信息', '提示', '其他']
    const existingNames = interactiveData.value.result.map(s => s.name)
    const availableNames = seriesNames.filter(name => !existingNames.includes(name))
    
    if (availableNames.length > 0) {
      interactiveData.value.result.push({
        name: availableNames[0],
        data: interactiveData.value.xdata.map(() => generateRandomData(20, 150))
      })
    }
  }
}

// 删除系列
const removeSeries = () => {
  if (interactiveData.value.result.length > 1) {
    interactiveData.value.result.pop()
  }
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
  grid-template-columns: repeat(auto-fit, minmax(600px, 1fr));
  gap: 25px;
  max-width: 1600px;
  margin: 0 auto;
}

.chart-section {
  background: rgba(0, 191, 255, 0.05);
  border: 1px solid rgba(0, 191, 255, 0.3);
  border-radius: 12px;
  padding: 20px;
  backdrop-filter: blur(10px);
  min-height: 480px;
  display: flex;
  flex-direction: column;
}

.chart-section.full-width {
  grid-column: span 2;
  min-height: 600px;
}

.chart-section h3 {
  color: #8cc8ff;
  margin: 0 0 20px 0;
  font-size: 1.2rem;
  text-align: center;
  border-bottom: 2px solid rgba(0, 191, 255, 0.3);
  padding-bottom: 10px;
  flex-shrink: 0;
}

/* 统一图表容器样式 */
.chart-container {
  flex: 1;
  min-height: 350px;
  width: 100%;
}

.demo-chart {
  max-width: 900px;
  margin: 0 auto;
}

.demo-chart-container {
  height: 450px;
  width: 100%;
}

.comparison-chart-container {
  height: 280px;
  width: 100%;
}

.style-chart-container {
  height: 260px;
  width: 100%;
}

.edge-case-chart-container {
  height: 240px;
  width: 100%;
}

/* 控制面板样式 */
.controls-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 25px;
  margin-bottom: 30px;
  padding: 25px;
  background: rgba(0, 191, 255, 0.08);
  border: 1px solid rgba(0, 191, 255, 0.2);
  border-radius: 12px;
  backdrop-filter: blur(8px);
}

.control-group {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  min-height: 40px;
}

.control-btn {
  background: rgba(0, 191, 255, 0.15);
  border: 1px solid rgba(0, 191, 255, 0.4);
  color: #00bfff;
  padding: 10px 18px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  margin: 3px;
  text-transform: none;
  white-space: nowrap;
}

.control-btn:hover {
  background: rgba(0, 191, 255, 0.25);
  border-color: #00bfff;
  box-shadow: 0 4px 12px rgba(0, 191, 255, 0.25);
  transform: translateY(-1px);
}

.control-btn:active {
  transform: translateY(0);
  box-shadow: 0 2px 6px rgba(0, 191, 255, 0.3);
}

.switch {
  position: relative;
  display: inline-block;
  width: 54px;
  height: 28px;
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
  background-color: rgba(255, 255, 255, 0.15);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 28px;
  border: 1px solid rgba(0, 191, 255, 0.3);
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
}

.slider:before {
  position: absolute;
  content: "";
  height: 22px;
  width: 22px;
  left: 2px;
  bottom: 2px;
  background: linear-gradient(135deg, #8cc8ff 0%, #6bb3ff 100%);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 50%;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}

input:checked + .slider {
  background: linear-gradient(135deg, rgba(0, 191, 255, 0.4) 0%, rgba(0, 191, 255, 0.6) 100%);
  border-color: #00bfff;
  box-shadow: 0 0 12px rgba(0, 191, 255, 0.3);
}

input:checked + .slider:before {
  transform: translateX(26px);
  background: linear-gradient(135deg, #00bfff 0%, #0080cc 100%);
  box-shadow: 0 2px 8px rgba(0, 191, 255, 0.4);
}

.control-label {
  color: #8cc8ff;
  font-size: 14px;
  font-weight: 500;
}

.range-label {
  color: #8cc8ff;
  font-size: 14px;
  font-weight: 500;
  min-width: 130px;
  white-space: nowrap;
}

.range-slider {
  flex: 1;
  height: 6px;
  -webkit-appearance: none;
  appearance: none;
  background: linear-gradient(90deg, rgba(0, 191, 255, 0.2) 0%, rgba(0, 191, 255, 0.3) 100%);
  border-radius: 3px;
  outline: none;
  transition: all 0.3s ease;
  border: 1px solid rgba(0, 191, 255, 0.2);
  min-width: 120px;
}

.range-slider:hover {
  background: linear-gradient(90deg, rgba(0, 191, 255, 0.3) 0%, rgba(0, 191, 255, 0.4) 100%);
  box-shadow: 0 0 8px rgba(0, 191, 255, 0.2);
}

.range-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  background: linear-gradient(135deg, #00bfff 0%, #0080cc 100%);
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 191, 255, 0.4);
  border: 2px solid rgba(255, 255, 255, 0.8);
  transition: all 0.2s ease;
}

.range-slider::-webkit-slider-thumb:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(0, 191, 255, 0.6);
}

.range-slider::-moz-range-thumb {
  width: 20px;
  height: 20px;
  background: linear-gradient(135deg, #00bfff 0%, #0080cc 100%);
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 191, 255, 0.4);
  border: 2px solid rgba(255, 255, 255, 0.8);
  transition: all 0.2s ease;
}

.range-slider::-moz-range-thumb:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(0, 191, 255, 0.6);
}

.demo-chart {
  max-width: 800px;
  margin: 0 auto;
}

/* 对比网格样式 */
.comparison-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 20px;
}

.comparison-item {
  background: rgba(0, 191, 255, 0.03);
  border: 1px solid rgba(0, 191, 255, 0.2);
  border-radius: 8px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  min-height: 320px;
}

.comparison-item h4 {
  color: #8cc8ff;
  text-align: center;
  margin: 0 0 15px 0;
  font-size: 1rem;
  border-bottom: 1px solid rgba(0, 191, 255, 0.2);
  padding-bottom: 8px;
  flex-shrink: 0;
}

/* 样式对比 */
.style-comparison {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 20px;
}

.style-item {
  background: rgba(0, 191, 255, 0.03);
  border: 1px solid rgba(0, 191, 255, 0.2);
  border-radius: 8px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  min-height: 300px;
}

.style-item h4 {
  color: #8cc8ff;
  text-align: center;
  margin: 0 0 15px 0;
  font-size: 1rem;
  border-bottom: 1px solid rgba(0, 191, 255, 0.2);
  padding-bottom: 8px;
  flex-shrink: 0;
}

/* 边界情况测试网格 */
.edge-cases-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
  gap: 20px;
}

.edge-case-item {
  background: rgba(255, 193, 7, 0.05);
  border: 1px solid rgba(255, 193, 7, 0.3);
  border-radius: 8px;
  padding: 15px;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  min-height: 280px;
}

.edge-case-item:hover {
  background: rgba(255, 193, 7, 0.08);
  border-color: rgba(255, 193, 7, 0.5);
  box-shadow: 0 4px 12px rgba(255, 193, 7, 0.15);
}

.edge-case-item h4 {
  color: #ffc107;
  text-align: center;
  margin: 0 0 15px 0;
  font-size: 0.95rem;
  border-bottom: 1px solid rgba(255, 193, 7, 0.3);
  padding-bottom: 8px;
  font-weight: 600;
  flex-shrink: 0;
}

@media (max-width: 1400px) {
  .charts-container {
    grid-template-columns: 1fr;
    max-width: 1200px;
  }
  
  .chart-section.full-width {
    grid-column: span 1;
  }
}

@media (max-width: 1200px) {
  .charts-container {
    grid-template-columns: 1fr;
    gap: 20px;
    max-width: 1000px;
  }
  
  .comparison-grid {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
  
  .style-comparison {
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  }
  
  .edge-cases-grid {
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  }
}

@media (max-width: 900px) {
  .comparison-grid {
    grid-template-columns: 1fr;
  }
  
  .style-comparison {
    grid-template-columns: 1fr;
  }
  
  .edge-cases-grid {
    grid-template-columns: 1fr;
  }
  
  .chart-section {
    min-height: 420px;
  }
  
  .chart-container {
    min-height: 300px;
  }
}

@media (max-width: 768px) {
  .test-page {
    padding: 15px;
  }
  
  .charts-container {
    gap: 15px;
  }
  
  .controls-grid {
    grid-template-columns: 1fr;
    gap: 15px;
  }
  
  .control-group {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
  
  .chart-section {
    padding: 15px;
    min-height: 380px;
  }
  
  .chart-section.full-width {
    min-height: 500px;
  }
  
  .edge-case-item {
    padding: 12px;
    min-height: 260px;
  }
  
  .edge-case-item h4 {
    font-size: 0.9rem;
  }
  
  .comparison-item {
    min-height: 280px;
  }
  
  .style-item {
    min-height: 260px;
  }
}

@media (max-width: 480px) {
  .test-header h1 {
    font-size: 2rem;
  }
  
  .chart-section {
    min-height: 350px;
  }
  
  .chart-container {
    min-height: 250px;
  }
  
  .demo-chart-container {
    height: 350px;
  }
  
  .comparison-chart-container {
    height: 220px;
  }
  
  .style-chart-container {
    height: 200px;
  }
  
  .edge-case-chart-container {
    height: 180px;
  }
}
</style>