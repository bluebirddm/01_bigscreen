<template>
  <div class="test-page">
    <div class="header">
      <h1>饼图+旭日图组合组件测试页面</h1>
      <p>测试 PieSunburstChart 组件的各种功能和配置</p>
    </div>

    <div class="test-sections">
      <!-- 基础测试 -->
      <div class="test-section">
        <h2>基础测试</h2>
        <div class="chart-wrapper">
          <PieSunburstChart 
            :pie-data="basicPieData" 
            :sunburst-data="basicSunburstData"
            :title="basicTitle"
            width="800px" 
            height="500px"
          />
        </div>
        <div class="controls">
          <h3>数据控制</h3>
          <button @click="updateBasicData">更新数据</button>
          <button @click="resetBasicData">重置数据</button>
          <button @click="randomizeData">随机化数据</button>
        </div>
      </div>

      <!-- 尺寸测试 -->
      <div class="test-section">
        <h2>尺寸测试</h2>
        <div class="size-controls">
          <label>
            宽度: 
            <select v-model="sizeConfig.width">
              <option value="600px">600px</option>
              <option value="800px">800px</option>
              <option value="1000px">1000px</option>
              <option value="100%">100%</option>
            </select>
          </label>
          <label>
            高度: 
            <select v-model="sizeConfig.height">
              <option value="400px">400px</option>
              <option value="500px">500px</option>
              <option value="600px">600px</option>
              <option value="700px">700px</option>
            </select>
          </label>
        </div>
        <div class="chart-wrapper">
          <PieSunburstChart 
            :pie-data="sizeTestPieData" 
            :width="sizeConfig.width" 
            :height="sizeConfig.height"
            :title="{ text: '尺寸测试', subtext: `${sizeConfig.width} x ${sizeConfig.height}` }"
          />
        </div>
      </div>

      <!-- 交互测试 -->
      <div class="test-section">
        <h2>交互测试</h2>
        <div class="interaction-controls">
          <label>
            <input type="checkbox" v-model="interactionConfig.showLegend" />
            显示图例
          </label>
          <label>
            <input type="checkbox" v-model="interactionConfig.enableTooltip" />
            启用工具提示
          </label>
        </div>
        <div class="chart-wrapper">
          <PieSunburstChart 
            :pie-data="interactionTestData" 
            :show-legend="interactionConfig.showLegend"
            :enable-tooltip="interactionConfig.enableTooltip"
            width="800px" 
            height="500px"
            :title="{ text: '交互测试', subtext: '测试图例和工具提示' }"
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
          <PieSunburstChart 
            :pie-data="testDatasets[currentDatasetIndex].pieData" 
            :sunburst-data="testDatasets[currentDatasetIndex].sunburstData"
            :title="testDatasets[currentDatasetIndex].title"
            width="800px" 
            height="500px"
          />
        </div>
        <div class="data-info">
          <h4>当前数据集: {{ testDatasets[currentDatasetIndex].name }}</h4>
          <div class="data-preview">
            <h5>饼图数据:</h5>
            <pre>{{ JSON.stringify(testDatasets[currentDatasetIndex].pieData, null, 2) }}</pre>
            <h5>旭日图数据:</h5>
            <pre>{{ JSON.stringify(testDatasets[currentDatasetIndex].sunburstData, null, 2) }}</pre>
          </div>
        </div>
      </div>

      <!-- 响应式测试 -->
      <div class="test-section">
        <h2>响应式测试</h2>
        <div class="responsive-wrapper">
          <PieSunburstChart 
            :pie-data="responsivePieData" 
            width="100%" 
            height="500px"
            :title="{ text: '响应式测试', subtext: '调整浏览器窗口大小测试响应式效果' }"
          />
        </div>
        <p>调整浏览器窗口大小测试响应式效果</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import PieSunburstChart from '@/components/PieSunburstChart.vue'

// 基础饼图数据
const basicPieData = ref([
  { value: 14.7, name: 'Apple' },
  { value: 10.4, name: 'Huawei' },
  { value: 6.3, name: 'Xiaomi' },
  { value: 21.6, name: 'Samsung' },
  { value: 7.6, name: 'Oppo' },
  { value: 39.4, name: 'Others' }
])

// 基础旭日图数据
const basicSunburstData = ref([
  {
    name: 'Apple',
    value: 14.7,
    itemStyle: { color: '#FF6B6B' },
    children: [
      { name: 'iPhone 14', value: 8.2, itemStyle: { color: '#FF8E8E' } },
      { name: 'iPhone 13', value: 6.5, itemStyle: { color: '#FFAAAA' } }
    ]
  },
  {
    name: 'Huawei',
    value: 10.4,
    itemStyle: { color: '#4ECDC4' },
    children: [
      { name: 'Mate 50', value: 5.8, itemStyle: { color: '#6EDDD8' } },
      { name: 'P50', value: 4.6, itemStyle: { color: '#8EEEE8' } }
    ]
  },
  {
    name: 'Samsung',
    value: 21.6,
    itemStyle: { color: '#45B7D1' },
    children: [
      { name: 'Galaxy S23', value: 12.1, itemStyle: { color: '#6BC5D8' } },
      { name: 'Galaxy A54', value: 9.5, itemStyle: { color: '#91D3DF' } }
    ]
  }
])

// 基础标题
const basicTitle = ref({
  text: '2023全球手机市场份额',
  subtext: '饼图+旭日图组合展示',
  left: 'center'
})

// 尺寸配置
const sizeConfig = reactive({
  width: '800px',
  height: '500px'
})

const sizeTestPieData = ref([
  { value: 30, name: '类别A' },
  { value: 25, name: '类别B' },
  { value: 20, name: '类别C' },
  { value: 25, name: '类别D' }
])

// 交互配置
const interactionConfig = reactive({
  showLegend: true,
  enableTooltip: true
})

const interactionTestData = ref([
  { value: 35, name: '移动端' },
  { value: 40, name: '桌面端' },
  { value: 25, name: '平板端' }
])

// 多种测试数据集
const currentDatasetIndex = ref(0)
const testDatasets = ref([
  {
    name: '科技产品',
    pieData: [
      { value: 35, name: '智能手机' },
      { value: 25, name: '笔记本电脑' },
      { value: 20, name: '平板电脑' },
      { value: 20, name: '智能手表' }
    ],
    sunburstData: [
      {
        name: '智能手机',
        value: 35,
        itemStyle: { color: '#FF6B6B' },
        children: [
          { name: 'iOS', value: 18, itemStyle: { color: '#FF8E8E' } },
          { name: 'Android', value: 17, itemStyle: { color: '#FFAAAA' } }
        ]
      },
      {
        name: '笔记本电脑',
        value: 25,
        itemStyle: { color: '#4ECDC4' },
        children: [
          { name: 'Windows', value: 15, itemStyle: { color: '#6EDDD8' } },
          { name: 'MacOS', value: 10, itemStyle: { color: '#8EEEE8' } }
        ]
      }
    ],
    title: { text: '科技产品分布', subtext: '按类型和系统分类' }
  },
  {
    name: '销售数据',
    pieData: [
      { value: 40, name: '线上销售' },
      { value: 35, name: '线下门店' },
      { value: 15, name: '代理商' },
      { value: 10, name: '其他渠道' }
    ],
    sunburstData: [
      {
        name: '线上销售',
        value: 40,
        itemStyle: { color: '#45B7D1' },
        children: [
          { name: '官网', value: 22, itemStyle: { color: '#6BC5D8' } },
          { name: '电商平台', value: 18, itemStyle: { color: '#91D3DF' } }
        ]
      },
      {
        name: '线下门店',
        value: 35,
        itemStyle: { color: '#96CEB4' },
        children: [
          { name: '直营店', value: 20, itemStyle: { color: '#A8D5C0' } },
          { name: '加盟店', value: 15, itemStyle: { color: '#BADCCC' } }
        ]
      }
    ],
    title: { text: '销售渠道分布', subtext: '各渠道销售占比' }
  },
  {
    name: '用户分析',
    pieData: [
      { value: 45, name: '新用户' },
      { value: 30, name: '老用户' },
      { value: 25, name: '流失用户' }
    ],
    sunburstData: [
      {
        name: '新用户',
        value: 45,
        itemStyle: { color: '#FECA57' },
        children: [
          { name: '注册用户', value: 25, itemStyle: { color: '#FED670' } },
          { name: '游客用户', value: 20, itemStyle: { color: '#FEE089' } }
        ]
      },
      {
        name: '老用户',
        value: 30,
        itemStyle: { color: '#FF9FF3' },
        children: [
          { name: '活跃用户', value: 20, itemStyle: { color: '#FFB3F6' } },
          { name: '一般用户', value: 10, itemStyle: { color: '#FFC7F9' } }
        ]
      }
    ],
    title: { text: '用户类型分析', subtext: '用户活跃度统计' }
  }
])

// 响应式数据
const responsivePieData = ref([
  { value: 45, name: '桌面端' },
  { value: 35, name: '移动端' },
  { value: 20, name: '平板端' }
])

// 更新基础数据
function updateBasicData() {
  basicPieData.value = basicPieData.value.map(item => ({
    ...item,
    value: Math.floor(Math.random() * 30) + 5
  }))
  
  // 同时更新旭日图数据
  basicSunburstData.value = basicSunburstData.value.map(item => ({
    ...item,
    value: Math.floor(Math.random() * 25) + 5,
    children: item.children.map(child => ({
      ...child,
      value: Math.floor(Math.random() * 12) + 2
    }))
  }))
}

// 重置基础数据
function resetBasicData() {
  basicPieData.value = [
    { value: 14.7, name: 'Apple' },
    { value: 10.4, name: 'Huawei' },
    { value: 6.3, name: 'Xiaomi' },
    { value: 21.6, name: 'Samsung' },
    { value: 7.6, name: 'Oppo' },
    { value: 39.4, name: 'Others' }
  ]
  
  basicSunburstData.value = [
    {
      name: 'Apple',
      value: 14.7,
      itemStyle: { color: '#FF6B6B' },
      children: [
        { name: 'iPhone 14', value: 8.2, itemStyle: { color: '#FF8E8E' } },
        { name: 'iPhone 13', value: 6.5, itemStyle: { color: '#FFAAAA' } }
      ]
    },
    {
      name: 'Huawei',
      value: 10.4,
      itemStyle: { color: '#4ECDC4' },
      children: [
        { name: 'Mate 50', value: 5.8, itemStyle: { color: '#6EDDD8' } },
        { name: 'P50', value: 4.6, itemStyle: { color: '#8EEEE8' } }
      ]
    },
    {
      name: 'Samsung',
      value: 21.6,
      itemStyle: { color: '#45B7D1' },
      children: [
        { name: 'Galaxy S23', value: 12.1, itemStyle: { color: '#6BC5D8' } },
        { name: 'Galaxy A54', value: 9.5, itemStyle: { color: '#91D3DF' } }
      ]
    }
  ]
}

// 随机化数据
function randomizeData() {
  const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57', '#FF9FF3']
  const names = ['产品A', '产品B', '产品C', '产品D', '产品E', '产品F']
  
  const count = Math.floor(Math.random() * 4) + 3 // 3-6个数据项
  basicPieData.value = Array.from({ length: count }, (_, i) => ({
    value: Math.floor(Math.random() * 40) + 10,
    name: names[i],
    itemStyle: { color: colors[i] }
  }))
  
  basicSunburstData.value = []
}
</script>

<style scoped>
.test-page {
  padding: 20px;
  max-width: 1400px;
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
  background: linear-gradient(135deg, #00bfff 0%, #0080ff 100%);
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
  border-bottom: 2px solid #00bfff;
  padding-bottom: 10px;
}

.chart-wrapper {
  margin: 20px 0;
  border: 2px dashed #6a6a6a;
  border-radius: 8px;
  padding: 20px;
  background: #3a3a3a;
  display: flex;
  justify-content: center;
  align-items: center;
}

.controls, .size-controls, .interaction-controls, .data-controls {
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
  background: #00bfff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.3s;
}

.controls button:hover, .data-controls button:hover {
  background: #0095cc;
}

.data-controls button.active {
  background: #e74c3c;
}

.size-controls label, .interaction-controls label {
  display: block;
  margin: 10px 0;
  font-weight: bold;
  color: #e0e0e0;
}

.size-controls select {
  margin-left: 10px;
  padding: 5px;
  border: 1px solid #6a6a6a;
  border-radius: 4px;
  background: #4a4a4a;
  color: #ffffff;
}

.interaction-controls input[type="checkbox"] {
  margin-right: 8px;
}

.size-controls select:focus {
  outline: none;
  border-color: #00bfff;
}

.data-info {
  margin-top: 20px;
  padding: 15px;
  background: #3a3a3a;
  border-radius: 8px;
  border-left: 4px solid #00bfff;
}

.data-info h4, .data-info h5 {
  margin: 0 0 10px 0;
  color: #ffffff;
}

.data-preview {
  max-height: 300px;
  overflow-y: auto;
}

.data-info pre {
  background: #2c3e50;
  color: #ecf0f1;
  padding: 15px;
  border-radius: 5px;
  overflow-x: auto;
  font-size: 12px;
  line-height: 1.4;
  margin: 10px 0;
}

.responsive-wrapper {
  width: 100%;
  min-height: 500px;
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