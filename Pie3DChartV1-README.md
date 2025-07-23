# Pie3DChartV1 组件使用文档

## 概述

`Pie3DChartV1.vue` 是基于原始HTML实现独立开发的Vue 3三维饼图组件，使用ECharts和ECharts-GL库进行3D渲染。

## 功能特性

- ✅ **3D立体饼图渲染**：使用参数方程生成真实的3D扇形
- ✅ **鼠标交互**：支持点击选中（单选）和悬停高亮效果
- ✅ **响应式设计**：支持数据动态更新和窗口大小变化
- ✅ **高度可配置**：支持自定义颜色、尺寸、内径比例等
- ✅ **Vue 3 Composition API**：使用现代Vue语法
- ✅ **TypeScript友好**：完整的props类型定义

## 安装依赖

```bash
npm install echarts echarts-gl vue
```

## 基本使用

```vue
<template>
  <div class="chart-wrapper">
    <Pie3DChartV1 
      :data="chartData"
      width="800px"
      height="600px"
      :internal-diameter-ratio="0.6"
    />
  </div>
</template>

<script setup>
import Pie3DChartV1 from './components/Pie3DChartV1.vue'

const chartData = [
  {
    name: '分类A',
    value: 36,
    itemStyle: {
      color: '#F6B357'
    }
  },
  {
    name: '分类B',
    value: 52,
    itemStyle: {
      color: '#f77b66'
    }
  },
  {
    name: '分类C',
    value: 44,
    itemStyle: {
      color: '#3edce0'
    }
  }
]
</script>
```

## Props 配置

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `data` | Array | 示例数据 | 饼图数据数组 |
| `width` | String | '100%' | 图表宽度 |
| `height` | String | '400px' | 图表高度 |
| `internalDiameterRatio` | Number | 0.59 | 内径与外径的比例 (0-1) |

## 数据格式

```javascript
const data = [
  {
    name: '数据项名称',        // 必需：显示名称
    value: 100,              // 必需：数值
    itemStyle: {             // 可选：样式配置
      color: '#FF6B6B',      // 扇形颜色
      opacity: 0.8           // 透明度
    }
  }
]
```

## 交互功能

### 点击选中
- 点击扇形可以选中/取消选中
- 选中的扇形会向外突出显示
- 支持单选模式（选中新的会取消之前的选中）

### 鼠标悬停
- 鼠标悬停时扇形会放大显示
- 显示tooltip提示信息
- 移开鼠标后恢复原状

### 自动适应
- 窗口大小变化时自动调整图表尺寸
- 数据更新时自动重新渲染

## 样式定制

组件支持通过CSS变量和props进行样式定制：

```vue
<template>
  <div class="custom-pie-chart">
    <Pie3DChartV1 
      :data="data"
      width="100%"
      height="500px"
      :internal-diameter-ratio="0.3"
    />
  </div>
</template>

<style>
.custom-pie-chart {
  background-color: #1a1a1a;
  border-radius: 8px;
  padding: 20px;
}
</style>
```

## 高级配置

### 内径比例说明
- `0`：普通实心饼图
- `0.3`：较厚的环形
- `0.6`：较薄的环形  
- `0.9`：非常薄的环形

### 颜色配置示例
```javascript
const colorfulData = [
  { name: '红色', value: 30, itemStyle: { color: '#FF6B6B' } },
  { name: '蓝色', value: 25, itemStyle: { color: '#4ECDC4' } },
  { name: '绿色', value: 20, itemStyle: { color: '#45B7D1' } },
  { name: '紫色', value: 15, itemStyle: { color: '#96CEB4' } },
  { name: '橙色', value: 10, itemStyle: { color: '#FECA57' } }
]
```

## 注意事项

1. **性能考虑**：3D渲染比较消耗资源，建议数据项不超过10个
2. **浏览器支持**：需要支持WebGL的现代浏览器
3. **数据验证**：确保传入的data数组不为空且格式正确
4. **容器尺寸**：确保父容器有明确的宽高，避免0尺寸问题

## 故障排除

### 图表不显示
- 检查容器是否有明确的宽高
- 确认ECharts和ECharts-GL依赖已正确安装
- 检查浏览器控制台是否有错误信息

### 交互不响应  
- 确认数据格式正确
- 检查是否有CSS样式影响鼠标事件

### 3D效果异常
- 检查浏览器是否支持WebGL
- 尝试更新显卡驱动

## 版本历史

- **v1.0.0** - 初始版本，基于HTML原始实现独立开发