# ECharts 配置复用使用指南

本项目已经实现了 ECharts 配置和样式的统一管理，可以大幅减少重复代码，提高维护效率。

## 文件结构

```
src/
├── config/
│   └── chartConfig.js        # ECharts 通用配置
├── composables/
│   └── useChartConfig.js     # 高级配置 Composable
└── styles/
    └── dashboard-common.css  # CSS 变量和通用样式
```

## 使用方法

### 方法一：直接导入配置（推荐）

最简单直接的方式，适合大多数场景。

```javascript
import { 
  commonGridConfig, 
  commonTooltipConfig, 
  commonLegendConfig,
  commonXAxisConfig,
  commonYAxisConfig,
  commonAnimationConfig 
} from '@/config/chartConfig'

// 在组件中使用
onMounted(() => {
  chartOption.value = {
    backgroundColor: 'transparent',
    tooltip: commonTooltipConfig,
    legend: {
      ...commonLegendConfig,
      data: ['已完成', '进行中', '未开始']
    },
    grid: commonGridConfig,
    xAxis: {
      ...commonXAxisConfig,
      data: ['深圳市', '北京市', '上海市']
    },
    yAxis: commonYAxisConfig,
    series: [
      // 你的 series 配置
    ],
    ...commonAnimationConfig
  }
})
```

### 方法二：使用 CSS 变量和通用类

替换原有的固定样式为 CSS 变量。

#### 原代码：
```vue
<template>
  <div class="unit-completion-top10">
    <v-chart class="chart" :option="chartOption" />
  </div>
</template>

<style scoped>
.unit-completion-top10 {
  height: 263px;
  width: 100%;
  padding: 10px;
}
</style>
```

#### 新代码：
```vue
<template>
  <div class="chart-container">
    <v-chart class="chart" :option="chartOption" />
  </div>
</template>

<style scoped>
/* 使用通用的 chart-container 类，无需额外样式 */
</style>
```

#### 可用的 CSS 类：
- `chart-container` - 标准尺寸（263px）
- `chart-container-sm` - 小尺寸（200px）
- `chart-container-lg` - 大尺寸（300px）

### 方法三：使用 Composable（高级用法）

适合需要创建多个相似图表的场景。

```javascript
import { useChartConfig } from '@/composables/useChartConfig'

export default {
  setup() {
    const { createBarChartOption, mergeConfig } = useChartConfig('bar')
    
    onMounted(() => {
      // 快速创建柱状图
      const baseOption = createBarChartOption({
        xAxisData: ['北京', '上海', '广州', '深圳'],
        series: [{
          name: '销量',
          type: 'bar',
          data: [120, 200, 150, 180]
        }]
      })
      
      // 如需自定义，可以合并配置
      chartOption.value = mergeConfig(baseOption, {
        title: {
          text: '城市销量统计'
        }
      })
    })
  }
}
```

## 可用的配置项

### 1. Grid 配置
- `commonGridConfig` - 标准网格配置（left: 15%, right: 10%, top: 20%, bottom: 15%）
- `compactGridConfig` - 紧凑网格配置（left: 10%, right: 5%, top: 15%, bottom: 10%）

### 2. 颜色主题
```javascript
import { themeColors } from '@/config/chartConfig'

// 可用颜色
themeColors.primary   // #00bfff
themeColors.secondary // #8cc8ff
themeColors.success   // #4CAF50
themeColors.warning   // #ff9800
themeColors.danger    // #ff6b6b
themeColors.info      // #2196F3
```

### 3. CSS 变量
```css
/* 在自定义样式中使用 */
.my-custom-chart {
  height: var(--chart-height);      /* 263px */
  padding: var(--chart-padding);    /* 10px */
  color: var(--color-primary);      /* #00bfff */
  font-size: var(--font-size-base); /* 10px */
}
```

## 批量迁移建议

### 1. 查找需要修改的文件
```bash
# 查找包含 grid 配置的文件
grep -r "grid:" --include="*.vue" src/components/

# 查找包含 height: 263px 的文件
grep -r "height: 263px" --include="*.vue" src/components/
```

### 2. 使用 VS Code 批量替换

#### 替换 Grid 配置：
- 查找：`grid:\s*{\s*left:\s*'15%',\s*right:\s*'10%',\s*top:\s*'20%',\s*bottom:\s*'15%',\s*containLabel:\s*true\s*}`
- 替换为：`grid: commonGridConfig`

#### 替换 CSS 类：
- 查找：`height:\s*263px;\s*width:\s*100%;\s*padding:\s*10px;`
- 替换为：使用 `chart-container` 类

### 3. 逐步迁移
1. 先修改一个屏幕的所有组件（如 screen2）
2. 测试确保功能正常
3. 再迁移下一个屏幕

## 维护建议

1. **统一修改**：需要调整图表样式时，只需修改 `chartConfig.js` 或 CSS 变量
2. **新增配置**：如需新的通用配置，添加到 `chartConfig.js` 中
3. **特殊情况**：某些图表需要特殊配置时，可以使用展开运算符覆盖默认配置

```javascript
grid: {
  ...commonGridConfig,
  left: '20%'  // 覆盖默认的 left 值
}
```

## 注意事项

1. 确保在使用配置前已正确导入
2. 使用 `@/` 别名需要 Vite 配置支持（本项目已配置）
3. CSS 变量在 IE 浏览器中不支持（如需支持 IE，请使用 PostCSS 插件）