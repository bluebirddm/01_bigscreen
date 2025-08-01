# UnitRiskStatus 柱状图渐变色配置

从 `src/components/screen5/UnitRiskStatus.vue` 提取的柱状图渐变色配置。

## 高风险渐变色
```javascript
itemStyle: {
  color: {
    type: 'linear',
    x: 0, y: 0, x2: 0, y2: 1,
    colorStops: [
      { offset: 0, color: '#06F8CD' },
      { offset: 1, color: '#000000' }
    ]
  }
}
```

## 中风险渐变色
```javascript
itemStyle: {
  color: {
    type: 'linear',
    x: 0, y: 0, x2: 0, y2: 1,
    colorStops: [
      { offset: 0, color: '#FAB302' },
      { offset: 1, color: '#000000' }
    ]
  }
}
```

## 低风险渐变色
```javascript
itemStyle: {
  color: {
    type: 'linear',
    x: 0, y: 0, x2: 0, y2: 1,
    colorStops: [
      { offset: 0, color: '#F1061F' },
      { offset: 1, color: '#000000' }
    ]
  }
}
```

## 渐变方向说明
- `x: 0, y: 0, x2: 0, y2: 1` 表示从上到下的垂直渐变
- `offset: 0` 起始位置颜色（顶部）
- `offset: 1` 结束位置颜色（底部）

## 颜色说明
- **高风险**: 从青绿色 (#06F8CD) 渐变到黑色 (#000000)
- **中风险**: 从橙黄色 (#FAB302) 渐变到黑色 (#000000)  
- **低风险**: 从红色 (#F1061F) 渐变到黑色 (#000000)