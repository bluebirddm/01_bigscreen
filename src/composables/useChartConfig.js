/**
 * ECharts 配置 Composable
 * 提供更高级的图表配置复用方案
 */

import { ref, computed } from 'vue'
import {
  commonGridConfig,
  commonTooltipConfig,
  commonLegendConfig,
  commonXAxisConfig,
  commonYAxisConfig,
  commonAnimationConfig,
  themeColors,
  getBaseChartOption
} from '@/config/chartConfig'

export function useChartConfig(chartType = 'bar') {
  // 基础配置
  const baseOption = ref(getBaseChartOption())
  
  // 根据图表类型获取预设配置
  const getChartTypeConfig = () => {
    const configs = {
      bar: {
        tooltip: {
          ...commonTooltipConfig,
          trigger: 'axis',
          axisPointer: { type: 'shadow' }
        }
      },
      line: {
        tooltip: {
          ...commonTooltipConfig,
          trigger: 'axis',
          axisPointer: { type: 'line' }
        }
      },
      pie: {
        tooltip: {
          ...commonTooltipConfig,
          trigger: 'item'
        }
      },
      radar: {
        tooltip: {
          ...commonTooltipConfig,
          trigger: 'item'
        }
      }
    }
    
    return configs[chartType] || {}
  }
  
  // 创建柱状图配置
  const createBarChartOption = (data) => {
    return {
      ...baseOption.value,
      ...getChartTypeConfig(),
      grid: commonGridConfig,
      xAxis: {
        ...commonXAxisConfig,
        data: data.xAxisData || []
      },
      yAxis: commonYAxisConfig,
      series: data.series || [],
      ...commonAnimationConfig
    }
  }
  
  // 创建折线图配置
  const createLineChartOption = (data) => {
    return {
      ...baseOption.value,
      ...getChartTypeConfig(),
      grid: commonGridConfig,
      xAxis: {
        ...commonXAxisConfig,
        data: data.xAxisData || []
      },
      yAxis: commonYAxisConfig,
      series: data.series || [],
      ...commonAnimationConfig
    }
  }
  
  // 创建饼图配置
  const createPieChartOption = (data) => {
    return {
      ...baseOption.value,
      ...getChartTypeConfig(),
      series: [{
        type: 'pie',
        radius: data.radius || ['40%', '70%'],
        center: data.center || ['50%', '50%'],
        data: data.data || [],
        ...data.seriesConfig
      }],
      ...commonAnimationConfig
    }
  }
  
  // 创建雷达图配置
  const createRadarChartOption = (data) => {
    return {
      ...baseOption.value,
      ...getChartTypeConfig(),
      radar: {
        indicator: data.indicator || [],
        ...data.radarConfig
      },
      series: [{
        type: 'radar',
        data: data.data || [],
        ...data.seriesConfig
      }],
      ...commonAnimationConfig
    }
  }
  
  // 合并自定义配置
  const mergeConfig = (baseConfig, customConfig) => {
    return {
      ...baseConfig,
      ...customConfig,
      // 深度合并特定属性
      grid: { ...baseConfig.grid, ...customConfig.grid },
      xAxis: { ...baseConfig.xAxis, ...customConfig.xAxis },
      yAxis: { ...baseConfig.yAxis, ...customConfig.yAxis },
      tooltip: { ...baseConfig.tooltip, ...customConfig.tooltip },
      legend: { ...baseConfig.legend, ...customConfig.legend }
    }
  }
  
  return {
    // 配置常量
    commonGridConfig,
    commonTooltipConfig,
    commonLegendConfig,
    commonXAxisConfig,
    commonYAxisConfig,
    commonAnimationConfig,
    themeColors,
    
    // 创建函数
    createBarChartOption,
    createLineChartOption,
    createPieChartOption,
    createRadarChartOption,
    mergeConfig,
    getBaseChartOption
  }
}