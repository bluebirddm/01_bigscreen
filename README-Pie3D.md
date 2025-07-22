# 3D饼图组件 (Pie3DChart)

一个基于 ECharts GL 的 Vue 3D 饼图组件，支持自动旋转、交互式操作和丰富的自定义配置。

## 特性

- 🎯 3D 立体饼图效果
- 🔄 支持自动旋转
- 🎨 丰富的样式自定义
- 📱 响应式设计
- ⚡ 高性能渲染
- 🖱️ 交互式操作（悬停、点击）
- 📊 实时数据更新

## 安装依赖

```bash
npm install echarts echarts-gl
# 或
yarn add echarts echarts-gl
# 或
pnpm add echarts echarts-gl
```

## 基础用法

```vue
<template>
  <div>
    <Pie3DChart 
      :data="chartData" 
      title="数据统计"
      width="600px"
      height="400px"
    />
  </div>
</template>

<script>
import Pie3DChart from './components/Pie3DChart.vue'

export default {
  components: {
    Pie3DChart
  },
  data() {
    return {
      chartData: [
        {
          name: "类别A",
          value: 4256,
          itemStyle: {
            color: "#2A71FF",
          },
        },
        {
          name: "类别B",
          value: 2356,
          itemStyle: {
            color: "#00EDFE",
          },
        },
        {
          name: "类别C",
          value: 2018,
          itemStyle: {
            color: "#FEDB4B",
          },
        }
      ]
    }
  }
}
</script>
```

## Props 配置

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `data` | Array | `[]` | 图表数据数组 |
| `width` | String | `'100%'` | 图表宽度 |
| `height` | String | `'400px'` | 图表高度 |
| `internalDiameterRatio` | Number | `0.8` | 内径比例 (0-1) |
| `title` | String | `''` | 图表标题 |
| `backgroundColor` | String | `'#0E3567'` | 背景颜色 |
| `autoRotate` | Boolean | `true` | 是否自动旋转 |

## 数据格式

```javascript
const data = [
  {
    name: "数据名称",        // 必需：数据项名称
    value: 1000,            // 必需：数据值
    itemStyle: {            // 可选：样式配置
      color: "#2A71FF",     // 颜色
      opacity: 0.8          // 透明度
    }
  }
]
```

## 高级用法

### 自定义样式

```vue
<Pie3DChart 
  :data="chartData" 
  title="销售数据统计"
  width="800px"
  height="500px"
  :internal-diameter-ratio="0.6"
  background-color="#1a1a2e"
  :auto-rotate="false"
/>
```

### 动态数据更新

```vue
<template>
  <div>
    <button @click="updateData">更新数据</button>
    <Pie3DChart :data="dynamicData" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      dynamicData: [...]
    }
  },
  methods: {
    updateData() {
      // 数据会自动响应更新
      this.dynamicData = this.dynamicData.map(item => ({
        ...item,
        value: Math.floor(Math.random() * 5000) + 1000
      }))
    }
  }
}
</script>
```

## 样式自定义

组件支持通过 CSS 变量进行样式自定义：

```css
.pie3d-container {
  --chart-background: #0E3567;
  --legend-text-color: #ffffff;
  --tooltip-background: rgba(0, 0, 0, 0.8);
}
```

## 事件处理

组件会自动处理以下交互：
- 鼠标悬停高亮效果
- 图例点击切换显示
- 自动旋转控制
- 响应式窗口大小调整

## 性能优化

- 组件在卸载时会自动清理 ECharts 实例
- 支持窗口大小变化时的自动重绘
- 使用 ECharts GL 进行硬件加速渲染

## 浏览器兼容性

- Chrome 45+
- Firefox 45+
- Safari 10+
- Edge 12+

需要支持 WebGL 的现代浏览器。

## 注意事项

1. 确保已安装 `echarts` 和 `echarts-gl` 依赖
2. 数据数组不能为空，至少需要一个数据项
3. 颜色值建议使用十六进制格式
4. 在移动设备上建议关闭自动旋转以提升性能

## 示例

查看 `examples/Pie3DExample.vue` 文件获取完整的使用示例。

## 许可证

MIT License
