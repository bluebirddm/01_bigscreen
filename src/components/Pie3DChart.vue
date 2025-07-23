<template>
  <div class="pie3d-container" :style="{ width: width, height: height }">
    <div ref="chartContainer" style="width: 100%; height: 100%"></div>
    <!-- 自定义tooltip -->
    <div 
      v-show="showTooltip" 
      ref="tooltip" 
      class="custom-tooltip"
      :style="tooltipStyle"
    >
      <div class="tooltip-content" v-html="tooltipContent"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import 'echarts-gl'

export default {
  name: 'Pie3DChart',
  props: {
    data: {
      type: Array,
      default: () => [
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
      default: 0.8
    },
    title: {
      type: String,
      default: ''
    },
    backgroundColor: {
      type: String,
      default: '#0E3567'
    },
    autoRotate: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      chart: null,
      selectedIndex: '',  // 当前选中的扇形索引
      hoveredIndex: '',   // 当前悬停的扇形索引
      option: null,       // 存储图表配置
      showTooltip: false, // 显示tooltip
      tooltipContent: '', // tooltip内容
      tooltipStyle: {}    // tooltip样式
    }
  },
  mounted() {
    this.initChart()
  },
  beforeUnmount() {
    if (this.chart) {
      // 移除事件监听器
      this.chart.off('click', this.handleClick);
      this.chart.off('mouseover', this.handleMouseOver);
      this.chart.off('mouseout', this.hideCustomTooltip);
      this.chart.off('globalout', this.handleGlobalOut);
      this.chart.dispose()
    }
    // 移除窗口大小变化监听器
    window.removeEventListener('resize', this.handleResize);
  },
  watch: {
    data: {
      handler() {
        this.updateChart()
      },
      deep: true
    }
  },
  methods: {
    // 获取3D饼图的参数方程
    getParametricEquation(startRatio, endRatio, isSelected, isHovered, k, height) {
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
      k = typeof k !== "undefined" ? k : 1 / 3;

      // 计算选中效果分别在 x 轴、y 轴方向上的位移（未选中，则位移均为 0）
      let offsetX = isSelected ? Math.cos(midRadian) * 0.1 : 0;
      let offsetY = isSelected ? Math.sin(midRadian) * 0.1 : 0;

      // 计算高亮效果的放大比例（未高亮，则比例为 1）
      let hoverRate = isHovered ? 1.15 : 1;

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
            return (
              offsetX +
              Math.cos(startRadian) * (1 + Math.cos(v) * k) * hoverRate
            );
          }
          if (u > endRadian) {
            return (
              offsetX +
              Math.cos(endRadian) * (1 + Math.cos(v) * k) * hoverRate
            );
          }
          return offsetX + Math.cos(u) * (1 + Math.cos(v) * k) * hoverRate;
        },
        y: function (u, v) {
          if (u < startRadian) {
            return (
              offsetY +
              Math.sin(startRadian) * (1 + Math.cos(v) * k) * hoverRate
            );
          }
          if (u > endRadian) {
            return (
              offsetY +
              Math.sin(endRadian) * (1 + Math.cos(v) * k) * hoverRate
            );
          }
          return offsetY + Math.sin(u) * (1 + Math.cos(v) * k) * hoverRate;
        },
        z: function (u, v) {
          if (u < -Math.PI * 0.5) {
            return Math.sin(u);
          }
          if (u > Math.PI * 2.5) {
            return Math.sin(u) * height * 0.1;
          }
          return Math.sin(v) > 0 ? 1 * height * 0.1 : -1;
        },
      };
    },

    // 生成模拟 3D 饼图的配置项
    getPie3D(pieData, internalDiameterRatio) {
      let series = [];
      let sumValue = 0;
      let startValue = 0;
      let endValue = 0;
      let legendData = [];
      let k =
        typeof internalDiameterRatio !== "undefined"
          ? (1 - internalDiameterRatio) / (1 + internalDiameterRatio)
          : 1 / 3;

      // 为每一个饼图数据，生成一个 series-surface 配置
      for (let i = 0; i < pieData.length; i++) {
        sumValue += pieData[i].value;

        let seriesItem = {
          name:
            typeof pieData[i].name === "undefined"
              ? `series${i}`
              : pieData[i].name,
          type: "surface",
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

        if (typeof pieData[i].itemStyle != "undefined") {
          let itemStyle = {};

          typeof pieData[i].itemStyle.color != "undefined"
            ? (itemStyle.color = pieData[i].itemStyle.color)
            : null;
          typeof pieData[i].itemStyle.opacity != "undefined"
            ? (itemStyle.opacity = pieData[i].itemStyle.opacity)
            : null;

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
        series[i].parametricEquation = this.getParametricEquation(
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

      return series;
    },

    // 生成图表配置
    generateOption() {
      const series = this.getPie3D(this.data, this.internalDiameterRatio);
      const legendData = this.data.map(item => item.name);

      this.option = {
        legend: {
          show: true,
          data: legendData,
          tooltip: {
            show: true,
          },
          orient: "vertical",
          top: "center",
          itemGap: 14,
          itemHeight: 8,
          itemWidth: 17,
          right: "2%",
          textStyle: {
            color: "#fff",
            fontSize: 12,
          },
        },
        animation: true,
        tooltip: {
          show: false,
        },
        title: {
          text: this.title,
          x: "center",
          top: "20",
          textStyle: {
            color: "#fff",
            fontSize: 22,
          },
        },
        backgroundColor: this.backgroundColor,
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
            autoRotate: this.autoRotate,
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
          light: {
            main: {
              intensity: 1.2
            }
          }
        },
        series: series,
      };
      
      return this.option;
    },

    // 初始化图表
    initChart() {
      if (this.$refs.chartContainer) {
        this.chart = echarts.init(this.$refs.chartContainer);
        this.updateChart();

        // 添加鼠标事件监听
        this.setupEventListeners();

        // 监听窗口大小变化
        window.addEventListener('resize', this.handleResize);
      }
    },

    // 更新图表
    updateChart() {
      if (this.chart) {
        const option = this.generateOption();
        this.chart.setOption(option, true);
      }
    },

    // 处理窗口大小变化
    handleResize() {
      if (this.chart) {
        this.chart.resize();
      }
    },

    // 设置鼠标事件监听器
    setupEventListeners() {
      if (!this.chart) return;

      // 监听点击事件，实现选中效果（单选）
      this.chart.on('click', this.handleClick);
      
      // 监听 mouseover，近似实现高亮（放大）效果
      this.chart.on('mouseover', this.handleMouseOver);
      
      // 监听 mouseout事件
      this.chart.on('mouseout', this.hideCustomTooltip);
      
      // 修正取消高亮失败的 bug
      this.chart.on('globalout', this.handleGlobalOut);
    },

    // 处理点击事件
    handleClick(params) {
      if (!this.option || params.seriesName === 'mouseoutSeries') {
        return;
      }
      
      // 从 option.series 中读取重新渲染扇形所需的参数，将是否选中取反。
      let isSelected = !this.option.series[params.seriesIndex].pieStatus.selected;
      let isHovered = this.option.series[params.seriesIndex].pieStatus.hovered;
      let k = this.option.series[params.seriesIndex].pieStatus.k;
      let startRatio = this.option.series[params.seriesIndex].pieData.startRatio;
      let endRatio = this.option.series[params.seriesIndex].pieData.endRatio;

      // 如果之前选中过其他扇形，将其取消选中（对 option 更新）
      if (this.selectedIndex !== '' && this.selectedIndex !== params.seriesIndex) {
        this.option.series[this.selectedIndex].parametricEquation = this.getParametricEquation(
          this.option.series[this.selectedIndex].pieData.startRatio,
          this.option.series[this.selectedIndex].pieData.endRatio,
          false,
          false,
          k,
          this.option.series[this.selectedIndex].pieData.value
        );
        this.option.series[this.selectedIndex].pieStatus.selected = false;
      }

      // 对当前点击的扇形，执行选中/取消选中操作（对 option 更新）
      this.option.series[params.seriesIndex].parametricEquation = this.getParametricEquation(
        startRatio,
        endRatio,
        isSelected,
        isHovered,
        k,
        this.option.series[params.seriesIndex].pieData.value
      );
      this.option.series[params.seriesIndex].pieStatus.selected = isSelected;

      // 如果本次是选中操作，记录上次选中的扇形对应的系列号 seriesIndex
      this.selectedIndex = isSelected ? params.seriesIndex : '';

      // 使用更新后的 option，渲染图表
      this.chart.setOption(this.option);
    },

    // 处理鼠标悬停事件
    handleMouseOver(params) {
      if (!this.option) return;
      
      // 显示自定义tooltip
      if (params.seriesName !== 'mouseoutSeries') {
        this.showCustomTooltip(params);
      }
      
      // 准备重新渲染扇形所需的参数
      let isSelected;
      let isHovered;
      let startRatio;
      let endRatio;
      let k;

      // 如果触发 mouseover 的扇形当前已高亮，则不做操作
      if (this.hoveredIndex === params.seriesIndex) {
        return;
      } else {
        // 如果当前有高亮的扇形，取消其高亮状态（对 option 更新）
        if (this.hoveredIndex !== '') {
          isSelected = this.option.series[this.hoveredIndex].pieStatus.selected;
          isHovered = false;
          startRatio = this.option.series[this.hoveredIndex].pieData.startRatio;
          endRatio = this.option.series[this.hoveredIndex].pieData.endRatio;
          k = this.option.series[this.hoveredIndex].pieStatus.k;

          this.option.series[this.hoveredIndex].parametricEquation = this.getParametricEquation(
            startRatio,
            endRatio,
            isSelected,
            isHovered,
            k,
            this.option.series[this.hoveredIndex].pieData.value
          );
          this.option.series[this.hoveredIndex].pieStatus.hovered = isHovered;
          this.hoveredIndex = '';
        }

        // 如枟触发 mouseover 的扇形不是透明圆环，将其高亮（对 option 更新）
        if (params.seriesName !== 'mouseoutSeries') {
          isSelected = this.option.series[params.seriesIndex].pieStatus.selected;
          isHovered = true;
          startRatio = this.option.series[params.seriesIndex].pieData.startRatio;
          endRatio = this.option.series[params.seriesIndex].pieData.endRatio;
          k = this.option.series[params.seriesIndex].pieStatus.k;

          this.option.series[params.seriesIndex].parametricEquation = this.getParametricEquation(
            startRatio,
            endRatio,
            isSelected,
            isHovered,
            k,
            this.option.series[params.seriesIndex].pieData.value + 5
          );
          this.option.series[params.seriesIndex].pieStatus.hovered = isHovered;
          this.hoveredIndex = params.seriesIndex;
        } else {
          // 鼠标移到透明圆环上，隐藏tooltip
          this.hideCustomTooltip();
        }

        // 使用更新后的 option，渲染图表
        this.chart.setOption(this.option);
      }
    },

    // 处理全局鼠标移出事件
    handleGlobalOut() {
      // 隐藏tooltip
      this.hideCustomTooltip();
      
      if (!this.option || this.hoveredIndex === '') return;
      
      let isSelected = this.option.series[this.hoveredIndex].pieStatus.selected;
      let isHovered = false;
      let k = this.option.series[this.hoveredIndex].pieStatus.k;
      let startRatio = this.option.series[this.hoveredIndex].pieData.startRatio;
      let endRatio = this.option.series[this.hoveredIndex].pieData.endRatio;

      this.option.series[this.hoveredIndex].parametricEquation = this.getParametricEquation(
        startRatio,
        endRatio,
        isSelected,
        isHovered,
        k,
        this.option.series[this.hoveredIndex].pieData.value
      );
      this.option.series[this.hoveredIndex].pieStatus.hovered = isHovered;
      this.hoveredIndex = '';

      this.chart.setOption(this.option);
    },

    // 显示自定义tooltip
    showCustomTooltip(params) {
      if (params.seriesName === 'mouseoutSeries') return;
      
      const seriesData = this.option.series[params.seriesIndex];
      const color = seriesData.itemStyle?.color || params.color;
      const value = seriesData.pieData.value;
      const name = params.seriesName;
      
      this.tooltipContent = `
        <div style="font-size: 14px; color: #fff;">
          ${name}<br/>
          <span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${color};"></span>
          ${value}
        </div>
      `;
      
      this.showTooltip = true;
      
      // 获取鼠标位置
      this.$nextTick(() => {
        if (this.$refs.tooltip) {
          this.tooltipStyle = {
            position: 'absolute',
            left: '50%',
            top: '10px',
            transform: 'translateX(-50%)',
            backgroundColor: 'rgba(0, 20, 40, 0.9)',
            border: '1px solid #00bfff',
            borderRadius: '4px',
            padding: '8px 12px',
            zIndex: 1000,
            pointerEvents: 'none'
          };
        }
      });
    },

    // 隐藏自定义tooltip
    hideCustomTooltip() {
      this.showTooltip = false;
      this.tooltipContent = '';
    }
  }
}
</script>

<style scoped>
.pie3d-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.custom-tooltip {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  white-space: nowrap;
  transition: opacity 0.2s ease;
}

.tooltip-content {
  line-height: 1.4;
}
</style>
