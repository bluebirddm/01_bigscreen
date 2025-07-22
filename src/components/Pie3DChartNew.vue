<template>
  <div ref="chartContainer" :style="{ width: width, height: height }"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import * as echarts from 'echarts'
import 'echarts-gl'

// Props 定义
const props = defineProps({
  data: {
    type: Array,
    default: () => [
      { name: '性能测试', value: 134 },
      { name: '安全', value: 56 },
      { name: '功能', value: 57 },
      { name: '代码', value: 11 },
      { name: '易用性', value: 51 }
    ]
  },
  width: {
    type: String,
    default: '100%'
  },
  height: {
    type: String,
    default: '600px'
  },
  autoRotate: {
    type: Boolean,
    default: true
  },
  backgroundColor: {
    type: String,
    default: '#163043'
  },
  internalDiameterRatio: {
    type: Number,
    default: 0.7
  }
})

// 响应式数据
const chartContainer = ref(null)
const chart = ref(null)

// 颜色列表
const colorList = [
  'rgba(69, 244, 245, 0.9)',
  'rgba(7, 166, 255, 0.9)', 
  'rgba(255, 208, 118, 0.9)',
  'rgba(109, 148, 198, 0.9)',
  'rgba(255, 255, 255, 0.9)'
]

// 生成扇形的曲面参数方程，用于 series-surface.parametricEquation
function getParametricEquation(startRatio, endRatio, isSelected, isHovered, k, h) {
  // 计算
  let midRatio = (startRatio + endRatio) / 2;
  let startRadian = startRatio * Math.PI * 2;
  let endRadian = endRatio * Math.PI * 2;
  let midRadian = midRatio * Math.PI * 2;

  // 如果只有一个扇形，则不实现选中效果
  isSelected = false;
  
  // 通过扇形内径/外径的值，换算出辅助参数 k（默认值 1/3）
  k = typeof k !== 'undefined' ? k : 1 / 3;

  // 计算选中效果分别在 x 轴、y 轴方向上的位移（未选中，则位移均为 0）
  let offsetX = isSelected ? Math.sin(midRadian) * 0.1 : 0;
  let offsetY = isSelected ? Math.cos(midRadian) * 0.1 : 0;

  // 计算高亮效果的放大比例（未高亮，则比例为 1）
  let hoverRate = isHovered ? 1.05 : 1;

  // 返回曲面参数方程
  return {
    u: {
      min: -Math.PI,
      max: Math.PI * 3,
      step: Math.PI / 32,
    },
    v: {
      min: 0,
      max: Math.PI * 2,
      step: Math.PI / 20,
    },
    x: function (u, v) {
      if (u < startRadian) {
        return offsetX + Math.cos(startRadian) * (1 + Math.cos(v) * k) * hoverRate;
      }
      if (u > endRadian) {
        return offsetX + Math.cos(endRadian) * (1 + Math.cos(v) * k) * hoverRate;
      }
      return offsetX + Math.cos(u) * (1 + Math.cos(v) * k) * hoverRate;
    },
    y: function (u, v) {
      if (u < startRadian) {
        return offsetY + Math.sin(startRadian) * (1 + Math.cos(v) * k) * hoverRate;
      }
      if (u > endRadian) {
        return offsetY + Math.sin(endRadian) * (1 + Math.cos(v) * k) * hoverRate;
      }
      return offsetY + Math.sin(u) * (1 + Math.cos(v) * k) * hoverRate;
    },
    z: function (u, v) {
      if (u < -Math.PI * 0.5) {
        return Math.sin(u);
      }
      if (u > Math.PI * 2.5) {
        return Math.sin(u) * h * 0.1;
      }
      return Math.sin(v) > 0 ? 1 * h * 0.1 : -1;
    },
  };
}

// 生成模拟 3D 饼图的配置项
function getPie3D(pieData, internalDiameterRatio) {
  let series = [];
  let sumValue = 0;
  let startValue = 0;
  let endValue = 0;
  let legendData = [];
  let k = typeof internalDiameterRatio !== 'undefined'
    ? (1 - internalDiameterRatio) / (1 + internalDiameterRatio)
    : 1 / 3;

  // 为每一个饼图数据，生成一个 series-surface 配置
  for (let i = 0; i < pieData.length; i++) {
    sumValue += pieData[i].value;

    let seriesItem = {
      name: typeof pieData[i].name === 'undefined' ? `series${i}` : pieData[i].name,
      type: 'surface',
      parametric: true,
      wireframe: {
        show: false,
      },
      pieData: pieData[i],
      pieStatus: {
        selected: false,
        hovered: false,
        k: 1 / 10,
      },
    };

    if (typeof pieData[i].itemStyle != 'undefined') {
      let itemStyle = {};
      typeof pieData[i].itemStyle.color != 'undefined' ? (itemStyle.color = pieData[i].itemStyle.color) : null;
      typeof pieData[i].itemStyle.opacity != 'undefined'
        ? (itemStyle.opacity = pieData[i].itemStyle.opacity)
        : null;
      seriesItem.itemStyle = itemStyle;
    }
    series.push(seriesItem);
  }

  // 使用上一次遍历时，计算出的数据和 sumValue，调用 getParametricEquation 函数
  for (let i = 0; i < series.length; i++) {
    endValue = startValue + series[i].pieData.value;

    series[i].pieData.startRatio = startValue / sumValue;
    series[i].pieData.endRatio = endValue / sumValue;
    series[i].parametricEquation = getParametricEquation(
      series[i].pieData.startRatio,
      series[i].pieData.endRatio,
      false,
      false,
      k,
      series[i].pieData.value
    );

    startValue = endValue;
    legendData.push(series[i].name);
  }

  // 补充透明的圆环，用于支撑高亮功能的近似实现
  series.push({
    name: 'mouseoutSeries',
    type: 'surface',
    parametric: true,
    wireframe: {
      show: false,
    },
    itemStyle: {
      opacity: 0.1,
      color: '#E1E8EC',
    },
    parametricEquation: {
      u: {
        min: 0,
        max: Math.PI * 2,
        step: Math.PI / 20,
      },
      v: {
        min: 0,
        max: Math.PI,
        step: Math.PI / 20,
      },
      x: function (u, v) {
        return ((Math.sin(v) * Math.sin(u) + Math.sin(u)) / Math.PI) * 2;
      },
      y: function (u, v) {
        return ((Math.sin(v) * Math.cos(u) + Math.cos(u)) / Math.PI) * 2;
      },
      z: function (u, v) {
        return Math.cos(v) > 0 ? -0.5 : -5;
      },
    },
  });

  // 补充第二层透明圆环
  series.push({
    name: 'mouseoutSeries',
    type: 'surface',
    parametric: true,
    wireframe: {
      show: false,
    },
    itemStyle: {
      opacity: 0.1,
      color: 'rgba(101, 153, 164, 0.24)',
    },
    parametricEquation: {
      u: {
        min: 0,
        max: Math.PI * 2,
        step: Math.PI / 20,
      },
      v: {
        min: 0,
        max: Math.PI,
        step: Math.PI / 20,
      },
      x: function (u, v) {
        return ((Math.sin(v) * Math.sin(u) + Math.sin(u)) / Math.PI) * 2;
      },
      y: function (u, v) {
        return ((Math.sin(v) * Math.cos(u) + Math.cos(u)) / Math.PI) * 2;
      },
      z: function (u, v) {
        return Math.cos(v) > 0 ? -5 : -7;
      },
    },
  });

  // 补充第三层透明圆环
  series.push({
    name: 'mouseoutSeries',
    type: 'surface',
    parametric: true,
    wireframe: {
      show: false,
    },
    itemStyle: {
      opacity: 0.1,
      color: '#E1E8EC',
    },
    parametricEquation: {
      u: {
        min: 0,
        max: Math.PI * 2,
        step: Math.PI / 20,
      },
      v: {
        min: 0,
        max: Math.PI,
        step: Math.PI / 20,
      },
      x: function (u, v) {
        return ((Math.sin(v) * Math.sin(u) + Math.sin(u)) / Math.PI) * 2.2;
      },
      y: function (u, v) {
        return ((Math.sin(v) * Math.cos(u) + Math.cos(u)) / Math.PI) * 2.2;
      },
      z: function (u, v) {
        return Math.cos(v) > 0 ? -7 : -7;
      },
    },
  });

  // 准备待返回的配置项
  let option = {
    backgroundColor: props.backgroundColor,
    fontFamily: 'Source Han Sans CN',
    legend: {
      orient: 'vertical',
      data: pieData.map(item => item.name),
      right: '8%',
      top: '25%',
      itemGap: 20,
      itemWidth: 10,
      itemHeight: 10,
      selectedMode: false, // 关闭图例选择
      textStyle: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'Source Han Sans CN'
      }
    },
    xAxis3D: {},
    yAxis3D: {},
    zAxis3D: {},
    grid3D: {
      viewControl: {
        autoRotate: props.autoRotate,
        alpha: 25,
        beta: 40,
        distance: 200,
        roam: false,
        panSensitivity: 0,
        zoomSensitivity: 0,
        rotationSensitivity: 0
      },
      left: '8%',
      width: '45%',
      show: false,
      boxHeight: 10,
    },
    series: series,
  };
  return option;
}

// 生成图表配置项
const generateOption = () => {
  const serData = props.data.map((dItem, index) => {
    return {
      ...dItem,
      value: Number(dItem.value),
      itemStyle: {
        color: colorList[index % colorList.length]
      },
    }
  })
  
  return getPie3D(serData, props.internalDiameterRatio);
}

// 初始化图表
const initChart = () => {
  if (chartContainer.value) {
    chart.value = echarts.init(chartContainer.value);
    updateChart();
    
    // 添加事件监听器
    setupEventListeners();
    
    // 监听窗口大小变化
    window.addEventListener('resize', handleResize);
  }
}

// 更新图表
const updateChart = () => {
  if (chart.value) {
    const option = generateOption();
    chart.value.setOption(option, true);
  }
}

// 设置事件监听器
const setupEventListeners = () => {
  if (!chart.value) return;

  // 点击事件监听
  chart.value.on('click', (params) => {
    if (params.seriesName !== 'mouseoutSeries') {
      const seriesIndex = params.seriesIndex;
      const option = chart.value.getOption();
      
      // 实现选中效果逻辑
      // 这里可以添加具体的选中处理逻辑
      console.log('点击了扇形:', params.seriesName, params.seriesIndex);
    }
  });

  // 鼠标悬停事件
  chart.value.on('mouseover', (params) => {
    if (params.seriesName !== 'mouseoutSeries') {
      // 实现悬停高亮效果
      console.log('悬停:', params.seriesName);
    }
  });

  // 全局鼠标离开事件
  chart.value.on('globalout', () => {
    // 取消所有高亮效果
    console.log('鼠标离开图表区域');
  });
}

// 处理窗口大小变化
const handleResize = () => {
  if (chart.value) {
    chart.value.resize();
  }
}

// 组件挂载时初始化图表
onMounted(() => {
  initChart();
})

// 组件卸载时清理资源
onUnmounted(() => {
  if (chart.value) {
    chart.value.dispose();
  }
  window.removeEventListener('resize', handleResize);
})

// 监听数据变化
watch(() => props.data, () => {
  updateChart();
}, { deep: true })
</script>

<style scoped>
/* 组件样式 */
div {
  width: 100%;
  height: 100%;
}
</style>