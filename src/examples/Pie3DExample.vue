<template>
  <div class="pie3d-example">
    <h2>3D饼图示例</h2>
    
    <!-- 基础用法 -->
    <div class="chart-container">
      <h3>基础用法</h3>
      <Pie3DChart 
        :data="chartData" 
        title="动物数量统计"
        width="600px"
        height="400px"
      />
    </div>

    <!-- 自定义配置 -->
    <div class="chart-container">
      <h3>自定义配置</h3>
      <Pie3DChart 
        :data="customData" 
        title="销售数据"
        width="600px"
        height="400px"
        :internal-diameter-ratio="0.6"
        background-color="#1a1a2e"
        :auto-rotate="false"
      />
    </div>

    <!-- 控制面板 -->
    <div class="controls">
      <h3>控制面板</h3>
      <div class="control-group">
        <label>
          <input 
            type="checkbox" 
            v-model="autoRotate"
          />
          自动旋转
        </label>
      </div>
      
      <div class="control-group">
        <label>
          内径比例: {{ internalRatio }}
          <input 
            type="range" 
            min="0.1" 
            max="0.9" 
            step="0.1"
            v-model.number="internalRatio"
          />
        </label>
      </div>

      <div class="control-group">
        <label>
          背景颜色:
          <select v-model="bgColor">
            <option value="#0E3567">深蓝色</option>
            <option value="#1a1a2e">深紫色</option>
            <option value="#2c3e50">深灰色</option>
            <option value="#000000">黑色</option>
          </select>
        </label>
      </div>
    </div>

    <!-- 动态图表 -->
    <div class="chart-container">
      <h3>动态配置图表</h3>
      <Pie3DChart 
        :data="chartData" 
        title="动态配置示例"
        width="600px"
        height="400px"
        :internal-diameter-ratio="internalRatio"
        :background-color="bgColor"
        :auto-rotate="autoRotate"
      />
    </div>

    <!-- 数据更新示例 -->
    <div class="chart-container">
      <h3>数据更新示例</h3>
      <button @click="updateData" class="update-btn">更新数据</button>
      <Pie3DChart 
        :data="dynamicData" 
        title="动态数据"
        width="600px"
        height="400px"
      />
    </div>
  </div>
</template>

<script>
import Pie3DChart from '../components/Pie3DChart.vue'

export default {
  name: 'Pie3DExample',
  components: {
    Pie3DChart
  },
  data() {
    return {
      // 基础数据
      chartData: [
        {
          name: "猪",
          value: 4256,
          itemStyle: {
            color: "#2A71FF",
          },
        },
        {
          name: "鸡",
          value: 2356,
          itemStyle: {
            color: "#00EDFE",
          },
        },
        {
          name: "牛",
          value: 2018,
          itemStyle: {
            color: "#FEDB4B",
          },
        },
        {
          name: "鸭",
          value: 1998,
          itemStyle: {
            color: "#FE7C2F",
          },
        },
      ],
      
      // 自定义数据
      customData: [
        {
          name: "产品A",
          value: 3500,
          itemStyle: {
            color: "#FF6B6B",
          },
        },
        {
          name: "产品B",
          value: 2800,
          itemStyle: {
            color: "#4ECDC4",
          },
        },
        {
          name: "产品C",
          value: 2200,
          itemStyle: {
            color: "#45B7D1",
          },
        },
        {
          name: "产品D",
          value: 1800,
          itemStyle: {
            color: "#96CEB4",
          },
        },
        {
          name: "产品E",
          value: 1500,
          itemStyle: {
            color: "#FFEAA7",
          },
        },
      ],

      // 动态数据
      dynamicData: [],

      // 控制参数
      autoRotate: true,
      internalRatio: 0.8,
      bgColor: '#0E3567'
    }
  },
  
  mounted() {
    // 初始化动态数据
    this.dynamicData = [...this.chartData]
  },

  methods: {
    // 更新数据
    updateData() {
      this.dynamicData = this.dynamicData.map(item => ({
        ...item,
        value: Math.floor(Math.random() * 5000) + 1000
      }))
    }
  }
}
</script>

<style scoped>
.pie3d-example {
  padding: 20px;
  background-color: #f5f5f5;
  min-height: 100vh;
}

.chart-container {
  margin-bottom: 40px;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.chart-container h3 {
  margin-top: 0;
  color: #333;
  border-bottom: 2px solid #007bff;
  padding-bottom: 10px;
}

.controls {
  margin-bottom: 40px;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.control-group {
  margin-bottom: 15px;
}

.control-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #555;
}

.control-group input[type="range"] {
  width: 200px;
  margin-left: 10px;
}

.control-group select {
  margin-left: 10px;
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.update-btn {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 20px;
  font-size: 14px;
}

.update-btn:hover {
  background-color: #0056b3;
}

h2 {
  text-align: center;
  color: #333;
  margin-bottom: 30px;
}
</style>
