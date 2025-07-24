<template>
  <div class="risk-3d-indicator">
    <!-- 顶部数据卡片 -->
    <div class="data-card">
      <div class="card-content">
        <span class="label">高危</span>
        <span class="value">{{ value }}</span>
        <svg class="trend-arrow" width="20" height="20" viewBox="0 0 20 20">
          <path d="M10 4 L16 10 L13 10 L13 16 L7 16 L7 10 L4 10 Z" 
                :fill="trend === 'up' ? '#ff6b6b' : '#4ecdc4'" 
                :transform="trend === 'down' ? 'rotate(180 10 10)' : ''" />
        </svg>
      </div>
    </div>

    <!-- 中部3D四面体 -->
    <div class="pyramid-container">
      <v-chart class="chart" :option="chartOption" autoresize />
    </div>

    <!-- 底部动画同心圆环 -->
    <div class="rings-container">
      <div class="ring ring-1"></div>
      <div class="ring ring-2"></div>
      <div class="ring ring-3"></div>
      <div class="center-point"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { use } from 'echarts/core'
import { CustomChart } from 'echarts/charts'
import { GridComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import VChart from 'vue-echarts'
import * as echarts from 'echarts'
import 'echarts-gl'

// 注册必要的组件
use([
  CanvasRenderer,
  CustomChart,
  GridComponent
])

// Props定义
const props = defineProps({
  value: {
    type: Number,
    default: 124
  },
  trend: {
    type: String,
    default: 'up',
    validator: (value) => ['up', 'down'].includes(value)
  },
  color: {
    type: String,
    default: '#ff6b6b'
  }
})

const chartOption = ref({})

// 创建倒置五面体（方形金字塔）的顶点坐标
const createPyramidVertices = (size = 1) => {
  const halfSize = size / 2
  return {
    // 顶部四个顶点（正方形） - 现在在上方
    topFL: [-halfSize, -halfSize, size * 1.2], // Front Left
    topFR: [halfSize, -halfSize, size * 1.2],  // Front Right
    topBR: [halfSize, halfSize, size * 1.2],   // Back Right
    topBL: [-halfSize, halfSize, size * 1.2],  // Back Left
    // 底部顶点 - 现在指向下方（在圆环中心）
    bottom: [0, 0, 0]
  }
}

// 3D坐标转换为2D（简单的正交投影）
const project3DTo2D = (point3D, scale = 50, offsetX = 0, offsetY = 0) => {
  // 简单的等距投影
  const x = (point3D[0] - point3D[1] * 0.5) * scale + offsetX
  const y = (-point3D[2] + point3D[1] * 0.5) * scale + offsetY
  return [x, y]
}

// 初始化图表配置
const initChartOption = () => {
  const vertices = createPyramidVertices(1)
  
  chartOption.value = {
    backgroundColor: 'transparent',
    grid: {
      left: '50%',
      top: '50%',
      width: 0,
      height: 0
    },
    xAxis: {
      show: false,
      min: -100,
      max: 100
    },
    yAxis: {
      show: false,
      min: -100,
      max: 100
    },
    series: [{
      type: 'custom',
      coordinateSystem: 'cartesian2d',
      renderItem: (_, api) => {
        const centerX = api.getWidth() / 2
        const centerY = api.getHeight() / 2  // 向下移动，使底部顶点位于圆环中心
        
        // 投影3D顶点到2D
        const topFL_2D = project3DTo2D(vertices.topFL, 35, centerX, centerY)
        const topFR_2D = project3DTo2D(vertices.topFR, 35, centerX, centerY)
        const topBR_2D = project3DTo2D(vertices.topBR, 35, centerX, centerY)
        const topBL_2D = project3DTo2D(vertices.topBL, 35, centerX, centerY)
        const bottom_2D = project3DTo2D(vertices.bottom, 35, centerX, centerY)
        
        const group = {
          type: 'group',
          children: []
        }
        
        // 绘制五个面（倒置五面体）
        const faces = [
          // 前面 - 最亮的面（不透明）
          {
            points: [topFL_2D, topFR_2D, bottom_2D],
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(255, 200, 200, 1)' },
              { offset: 0.5, color: 'rgba(255, 107, 107, 1)' },
              { offset: 1, color: 'rgba(255, 20, 20, 1)' }
            ]),
            stroke: 'rgba(255, 255, 255, 0.4)',
            lineWidth: 1.5
          },
          // 右面 - 较亮
          {
            points: [topFR_2D, topBR_2D, bottom_2D],
            color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [
              { offset: 0, color: 'rgba(200, 120, 120, 1)' },
              { offset: 0.5, color: 'rgba(220, 80, 80, 1)' },
              { offset: 1, color: 'rgba(240, 60, 60, 1)' }
            ]),
            stroke: 'rgba(255, 200, 200, 0.3)',
            lineWidth: 1.2
          },
          // 后面 - 较暗
          {
            points: [topBR_2D, topBL_2D, bottom_2D],
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(130, 70, 70, 1)' },
              { offset: 0.5, color: 'rgba(150, 70, 70, 1)' },
              { offset: 1, color: 'rgba(170, 50, 50, 1)' }
            ]),
            stroke: 'rgba(200, 150, 150, 1)',
            lineWidth: 1
          },
          // 左面 - 最暗
          {
            points: [topBL_2D, topFL_2D, bottom_2D],
            color: new echarts.graphic.LinearGradient(1, 0, 0, 1, [
              { offset: 0, color: 'rgba(100, 50, 50, 1)' },
              { offset: 0.5, color: 'rgba(120, 50, 50, 1)' },
              { offset: 1, color: 'rgba(140, 40, 40, 1)' }
            ]),
            stroke: 'rgba(180, 130, 130, 0)',
            lineWidth: 0.8
          },
          // 顶面（正方形） - 半透明
          {
            points: [topFL_2D, topFR_2D, topBR_2D, topBL_2D],
            color: new echarts.graphic.RadialGradient(0.5, 0.5, 0.8, [
              { offset: 0, color: 'rgba(120, 40, 40, 1)' },
              { offset: 0.7, color: 'rgba(80, 30, 30, 1)' },
              { offset: 1, color: 'rgba(60, 20, 20, 1)' }
            ]),
            stroke: 'rgba(160, 110, 110, 0.25)',
            lineWidth: 0.8
          }
        ]
        
        // 根据面的深度排序（简单的画家算法）
        faces.forEach((face) => {
          const polygon = {
            type: 'polygon',
            shape: {
              points: face.points
            },
            style: {
              fill: face.color,
              stroke: face.stroke || 'rgba(255, 255, 255, 0.2)',
              lineWidth: face.lineWidth || 1
            }
          }
          group.children.push(polygon)
        })
        
        // 添加底部顶点的高光效果
        const highlight = {
          type: 'circle',
          shape: {
            cx: bottom_2D[0],
            cy: bottom_2D[1],
            r: 8
          },
          style: {
            fill: new echarts.graphic.RadialGradient(0.5, 0.5, 1, [
              { offset: 0, color: 'rgba(255, 255, 255, 0.8)' },
              { offset: 0.5, color: 'rgba(255, 200, 200, 0.5)' },
              { offset: 1, color: 'rgba(255, 100, 100, 0)' }
            ])
          }
        }
        // group.children.push(highlight)
        
        return group
      },
      data: [[0, 0]]
    }]
  }
}

onMounted(() => {
  initChartOption()
})
</script>

<style scoped>
.risk-3d-indicator {
  width: 300px;
  height: 400px;
  position: relative;
  background: radial-gradient(ellipse at center bottom, 
    rgba(0, 191, 255, 0.1) 0%, 
    rgba(0, 31, 78, 0.9) 50%, 
    rgba(0, 15, 40, 1) 100%);
  border-radius: 12px;
  padding: 20px;
  overflow: hidden;
}

/* 数据卡片样式 */
.data-card {
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  background: linear-gradient(135deg, 
    rgba(255, 107, 107, 0.1) 0%, 
    rgba(204, 85, 85, 0.1) 100%);
  border: 2px solid rgba(255, 107, 107, 0.6);
  border-radius: 8px;
  padding: 12px 24px;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 20px rgba(255, 107, 107, 0.3);
}

.card-content {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #fff;
}

.label {
  font-size: 18px;
  font-weight: 500;
  color: #ffaaaa;
}

.value {
  font-size: 32px;
  font-weight: bold;
  color: #ff6b6b;
  text-shadow: 0 0 10px rgba(255, 107, 107, 0.5);
}

.trend-arrow {
  margin-left: 8px;
}

/* 3D四面体容器 */
.pyramid-container {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  width: 200px;
  height: 150px;
  z-index: 5;
}

.chart {
  width: 100%;
  height: 100%;
}

/* 同心圆环动画 */
.rings-container {
  position: absolute;
  bottom: 60px;
  left: 50%;
  transform: translateX(-50%);
  width: 200px;
  height: 100px;
  z-index: 3;
}

.ring {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border: 2px solid;
  border-radius: 50%;
  animation: pulse 3s linear infinite;
}

.ring-1 {
  width: 80px;
  height: 40px;
  animation-delay: 0s;
  border-color: rgba(0, 191, 255, 0.8);
  box-shadow: 0 0 20px rgba(0, 191, 255, 0.5),
              inset 0 0 20px rgba(0, 191, 255, 0.3);
}

.ring-2 {
  width: 120px;
  height: 60px;
  animation-delay: 1s;
  border-color: rgba(0, 191, 255, 0.6);
  box-shadow: 0 0 15px rgba(0, 191, 255, 0.4),
              inset 0 0 15px rgba(0, 191, 255, 0.2);
}

.ring-3 {
  width: 160px;
  height: 80px;
  animation-delay: 2s;
  border-color: rgba(0, 191, 255, 0.4);
  box-shadow: 0 0 10px rgba(0, 191, 255, 0.3),
              inset 0 0 10px rgba(0, 191, 255, 0.1);
}

.center-point {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 30px;
  height: 15px;
  background: radial-gradient(ellipse at center, 
    rgba(0, 255, 255, 1) 0%, 
    rgba(0, 191, 255, 0.8) 30%, 
    rgba(0, 191, 255, 0.4) 60%, 
    transparent 100%);
  border-radius: 50%;
  box-shadow: 0 0 30px rgba(0, 255, 255, 0.8),
              0 0 50px rgba(0, 191, 255, 0.6),
              0 0 70px rgba(0, 191, 255, 0.4);
  animation: glow 2s ease-in-out infinite;
}

/* 脉冲动画 */
@keyframes pulse {
  0% {
    transform: translate(-50%, -50%) scale(0.8) scaleY(0.5);
    opacity: 1;
    filter: blur(0px);
  }
  50% {
    transform: translate(-50%, -50%) scale(1.1) scaleY(0.5);
    opacity: 0.6;
    filter: blur(1px);
  }
  100% {
    transform: translate(-50%, -50%) scale(1.5) scaleY(0.5);
    opacity: 0;
    filter: blur(2px);
  }
}

/* 中心点发光动画 */
@keyframes glow {
  0%, 100% {
    transform: translate(-50%, -50%) scale(1);
    filter: brightness(1);
  }
  50% {
    transform: translate(-50%, -50%) scale(1.1);
    filter: brightness(1.5);
  }
}

/* 添加整体发光效果 */
.risk-3d-indicator::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 250px;
  height: 250px;
  background: radial-gradient(circle, 
    rgba(255, 107, 107, 0.1) 0%, 
    transparent 70%);
  filter: blur(40px);
  z-index: 0;
}
</style>