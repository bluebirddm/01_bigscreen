/**
 * ECharts 通用配置文件
 * 存储所有可复用的图表配置
 */

// 通用的网格配置
export const commonGridConfig = {
  left: '15%',
  right: '10%',
  top: '20%',
  bottom: '15%',
  containLabel: true
}

// 紧凑型网格配置（用于空间较小的图表）
export const compactGridConfig = {
  left: '10%',
  right: '5%',
  top: '15%',
  bottom: '10%',
  containLabel: true
}

// 通用的提示框配置
export const commonTooltipConfig = {
  trigger: 'axis',
  axisPointer: {
    type: 'shadow'
  },
  backgroundColor: 'rgba(0, 20, 40, 0.9)',
  borderColor: '#00bfff',
  borderWidth: 1,
  textStyle: {
    color: '#fff',
    fontSize: 10
  }
}

// 通用的图例配置
export const commonLegendConfig = {
  top: '5%',
  textStyle: {
    color: '#8cc8ff',
    fontSize: 9
  },
  itemWidth: 8,
  itemHeight: 8
}

// 通用的 X 轴配置
export const commonXAxisConfig = {
  type: 'category',
  axisLine: {
    lineStyle: {
      color: 'rgba(0, 191, 255, 0.3)'
    }
  },
  axisTick: {
    show: false
  },
  axisLabel: {
    color: '#8cc8ff',
    fontSize: 8,
    interval: 0,
    rotate: 45
  }
}

// 通用的 Y 轴配置
export const commonYAxisConfig = {
  type: 'value',
  axisLine: {
    show: false
  },
  axisTick: {
    show: false
  },
  axisLabel: {
    color: '#8cc8ff',
    fontSize: 9
  },
  splitLine: {
    lineStyle: {
      color: 'rgba(0, 191, 255, 0.1)',
      type: 'dashed'
    }
  }
}

// 通用的动画配置
export const commonAnimationConfig = {
  animationDuration: 2000,
  animationEasing: 'cubicOut'
}

// 主题色配置
export const themeColors = {
  primary: '#00bfff',
  secondary: '#8cc8ff',
  success: '#4CAF50',
  warning: '#ff9800',
  danger: '#ff6b6b',
  info: '#2196F3'
}

// 获取基础图表配置的函数
export function getBaseChartOption(customConfig = {}) {
  return {
    backgroundColor: 'transparent',
    grid: commonGridConfig,
    tooltip: commonTooltipConfig,
    ...commonAnimationConfig,
    ...customConfig
  }
}