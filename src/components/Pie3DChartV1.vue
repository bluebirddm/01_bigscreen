<template>
  <div ref="chartContainer" class="chart-container" :style="{ width, height }"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue'
import * as echarts from 'echarts'
import 'echarts-gl'

// Props定义
const props = defineProps({
  data: {
    type: Array,
    default: () => [
      {
        name: 'cc',
        value: 36,
        itemStyle: {
          color: '#F6B357',
        },
      },
      {
        name: 'cc',
        value: 52,
        itemStyle: {
          color: '#f77b66',
        },
      },
      {
        name: 'aa',
        value: 44,
        itemStyle: {
          color: '#3edce0',
        },
      },
      {
        name: 'bb',
        value: 32,
        itemStyle: {
          color: '#f94e76',
        },
      },
      {
        name: 'ee',
        value: 16,
        itemStyle: {
          color: '#018ef1',
        },
      },
      {
        name: 'dd',
        value: 23,
        itemStyle: {
          color: '#9e60f9',
        },
      },
    ]
  },
  width: {
    type: String,
    default: '100%'
  },
  height: {
    type: String,
    default: '400px'
  },
  internalDiameterRatio: {
    type: Number,
    default: 0.59
  }
})

// 响应式数据
const chartContainer = ref(null)
let myChart = null
let option = null
let selectedIndex = ref('')
let hoveredIndex = ref('')

// 生成扇形的曲面参数方程，用于 series-surface.parametricEquation
function getParametricEquation(startRatio, endRatio, isSelected, isHovered, k, h) {
  // 计算
  let midRatio = (startRatio + endRatio) / 2;

  let startRadian = startRatio * Math.PI * 2;
  let endRadian = endRatio * Math.PI * 2;
  let midRadian = midRatio * Math.PI * 2;

  // 如果只有一个扇形，则不实现选中效果。
  if (startRatio === 0 && endRatio === 1) {
    isSelected = false;
  }

  // 通过扇形内径/外径的值，换算出辅助参数 k（默认值 1/3）
  k = typeof k !== 'undefined' ? k : 1 / 3;

  // 计算选中效果分别在 x 轴、y 轴方向上的位移（未选中，则位移均为 0）
  let offsetX = isSelected ? Math.cos(midRadian) * 0.1 : 0;
  let offsetY = isSelected ? Math.sin(midRadian) * 0.1 : 0;

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
        k: k,
      },
    };

    if (typeof pieData[i].itemStyle != 'undefined') {
      let itemStyle = {};

      typeof pieData[i].itemStyle.color != 'undefined' ? (itemStyle.color = pieData[i].itemStyle.color) : null;
      typeof pieData[i].itemStyle.opacity != 'undefined' ? (itemStyle.opacity = pieData[i].itemStyle.opacity) : null;

      seriesItem.itemStyle = itemStyle;
    }
    series.push(seriesItem);
  }

  // 使用上一次遍历时，计算出的数据和 sumValue，调用 getParametricEquation 函数，
  // 向每个 series-surface 传入不同的参数方程 series-surface.parametricEquation，也就是实现每一个扇形。
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

  // 补充一个透明的圆环，用于支撑高亮功能的近似实现。
  series.push({
    name: 'mouseoutSeries',
    type: 'surface',
    parametric: true,
    wireframe: {
      show: false,
    },
    itemStyle: {
      opacity: 0,
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
        return Math.sin(v) * Math.sin(u) + Math.sin(u);
      },
      y: function (u, v) {
        return Math.sin(v) * Math.cos(u) + Math.cos(u);
      },
      z: function (u, v) {
        return Math.cos(v) > 0 ? 0.1 : -0.1;
      },
    },
  });

  // 准备待返回的配置项，把准备好的 legendData、series 传入。
  let chartOption = {
    legend: {
      data: legendData,
    },
    tooltip: {
      formatter: (params) => {
        if (params.seriesName !== 'mouseoutSeries') {
          return `${params.seriesName}<br/><span style='display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${params.color};'></span>${series[params.seriesIndex].pieData.value}`;
        }
      },
    },
    xAxis3D: {
      min: -1,
      max: 1,
    },
    yAxis3D: {
      min: -1,
      max: 1,
    },
    zAxis3D: {
      min: -1,
      max: 1,
    },
    grid3D: {
      show: false,
      boxHeight: 10,
      viewControl: {
        alpha: 40,
        rotateSensitivity: 0,
        zoomSensitivity: 0,
        panSensitivity: 0,
        autoRotate: false,
      },
      postEffect: {
        enable: true,
        bloom: {
          enable: true,
          bloomIntensity: 0.1,
        },
        SSAO: {
          enable: true,
          quality: 'medium',
          radius: 2,
        },
      },
    },
    series: series,
  };
  return chartOption;
}

// 初始化图表
function initChart() {
  if (chartContainer.value) {
    myChart = echarts.init(chartContainer.value)
    updateChart()
    setupEventListeners()
    
    // 监听窗口大小变化
    window.addEventListener('resize', handleResize)
  }
}

// 更新图表
function updateChart() {
  if (myChart) {
    option = getPie3D(props.data, props.internalDiameterRatio)
    myChart.setOption(option)
  }
}

// 处理窗口大小变化
function handleResize() {
  if (myChart) {
    myChart.resize()
  }
}

// 设置事件监听器
function setupEventListeners() {
  if (!myChart) return

  // 监听点击事件，实现选中效果（单选）
  myChart.on('click', handleClick)
  
  // 监听 mouseover，近似实现高亮（放大）效果
  myChart.on('mouseover', handleMouseOver)
  
  // 修正取消高亮失败的 bug
  myChart.on('globalout', handleGlobalOut)
}

// 处理点击事件
function handleClick(params) {
  if (!option || params.seriesName === 'mouseoutSeries') return
  
  // 从 option.series 中读取重新渲染扇形所需的参数，将是否选中取反。
  let isSelected = !option.series[params.seriesIndex].pieStatus.selected;
  let isHovered = option.series[params.seriesIndex].pieStatus.hovered;
  let k = option.series[params.seriesIndex].pieStatus.k;
  let startRatio = option.series[params.seriesIndex].pieData.startRatio;
  let endRatio = option.series[params.seriesIndex].pieData.endRatio;

  // 如果之前选中过其他扇形，将其取消选中（对 option 更新）
  if (selectedIndex.value !== '' && selectedIndex.value !== params.seriesIndex) {
    option.series[selectedIndex.value].parametricEquation = getParametricEquation(
      option.series[selectedIndex.value].pieData.startRatio,
      option.series[selectedIndex.value].pieData.endRatio,
      false,
      false,
      k,
      option.series[selectedIndex.value].pieData.value
    );
    option.series[selectedIndex.value].pieStatus.selected = false;
  }

  // 对当前点击的扇形，执行选中/取消选中操作（对 option 更新）
  option.series[params.seriesIndex].parametricEquation = getParametricEquation(
    startRatio,
    endRatio,
    isSelected,
    isHovered,
    k,
    option.series[params.seriesIndex].pieData.value
  );
  option.series[params.seriesIndex].pieStatus.selected = isSelected;

  // 如果本次是选中操作，记录上次选中的扇形对应的系列号 seriesIndex
  selectedIndex.value = isSelected ? params.seriesIndex : '';

  // 使用更新后的 option，渲染图表
  myChart.setOption(option);
}

// 处理鼠标悬停事件
function handleMouseOver(params) {
  if (!option) return
  
  // 准备重新渲染扇形所需的参数
  let isSelected;
  let isHovered;
  let startRatio;
  let endRatio;
  let k;

  // 如果触发 mouseover 的扇形当前已高亮，则不做操作
  if (hoveredIndex.value === params.seriesIndex) {
    return;
  } else {
    // 如果当前有高亮的扇形，取消其高亮状态（对 option 更新）
    if (hoveredIndex.value !== '') {
      // 从 option.series 中读取重新渲染扇形所需的参数，将是否高亮设置为 false。
      isSelected = option.series[hoveredIndex.value].pieStatus.selected;
      isHovered = false;
      startRatio = option.series[hoveredIndex.value].pieData.startRatio;
      endRatio = option.series[hoveredIndex.value].pieData.endRatio;
      k = option.series[hoveredIndex.value].pieStatus.k;

      // 对当前点击的扇形，执行取消高亮操作（对 option 更新）
      option.series[hoveredIndex.value].parametricEquation = getParametricEquation(
        startRatio,
        endRatio,
        isSelected,
        isHovered,
        k,
        option.series[hoveredIndex.value].pieData.value
      );
      option.series[hoveredIndex.value].pieStatus.hovered = isHovered;

      // 将此前记录的上次选中的扇形对应的系列号 seriesIndex 清空
      hoveredIndex.value = '';
    }

    // 如果触发 mouseover 的扇形不是透明圆环，将其高亮（对 option 更新）
    if (params.seriesName !== 'mouseoutSeries') {
      // 从 option.series 中读取重新渲染扇形所需的参数，将是否高亮设置为 true。
      isSelected = option.series[params.seriesIndex].pieStatus.selected;
      isHovered = true;
      startRatio = option.series[params.seriesIndex].pieData.startRatio;
      endRatio = option.series[params.seriesIndex].pieData.endRatio;
      k = option.series[params.seriesIndex].pieStatus.k;

      // 对当前点击的扇形，执行高亮操作（对 option 更新）
      option.series[params.seriesIndex].parametricEquation = getParametricEquation(
        startRatio,
        endRatio,
        isSelected,
        isHovered,
        k,
        option.series[params.seriesIndex].pieData.value + 5
      );
      option.series[params.seriesIndex].pieStatus.hovered = isHovered;

      // 记录上次高亮的扇形对应的系列号 seriesIndex
      hoveredIndex.value = params.seriesIndex;
    }

    // 使用更新后的 option，渲染图表
    myChart.setOption(option);
  }
}

// 处理全局鼠标离开事件
function handleGlobalOut() {
  if (!option || hoveredIndex.value === '') return
  
  // 从 option.series 中读取重新渲染扇形所需的参数，将是否高亮设置为 false。
  let isSelected = option.series[hoveredIndex.value].pieStatus.selected;
  let isHovered = false;
  let k = option.series[hoveredIndex.value].pieStatus.k;
  let startRatio = option.series[hoveredIndex.value].pieData.startRatio;
  let endRatio = option.series[hoveredIndex.value].pieData.endRatio;

  // 对当前点击的扇形，执行取消高亮操作（对 option 更新）
  option.series[hoveredIndex.value].parametricEquation = getParametricEquation(
    startRatio,
    endRatio,
    isSelected,
    isHovered,
    k,
    option.series[hoveredIndex.value].pieData.value
  );
  option.series[hoveredIndex.value].pieStatus.hovered = isHovered;

  // 将此前记录的上次选中的扇形对应的系列号 seriesIndex 清空
  hoveredIndex.value = '';

  // 使用更新后的 option，渲染图表
  myChart.setOption(option);
}

// 监听数据变化
watch(() => props.data, () => {
  updateChart()
}, { deep: true })

watch(() => props.internalDiameterRatio, () => {
  updateChart()
})

// 组件挂载
onMounted(() => {
  nextTick(() => {
    initChart()
  })
})

// 组件卸载
onUnmounted(() => {
  if (myChart) {
    window.removeEventListener('resize', handleResize)
    myChart.dispose()
    myChart = null
  }
})
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}

/* 确保ECharts容器正确显示 */
:deep(.echarts-instance) {
  width: 100% !important;
  height: 100% !important;
}
</style>