<template>
  <div ref="chartContainer" :style="{ width: width, height: height }"></div>
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
      chart: null
    }
  },
  mounted() {
    this.initChart()
  },
  beforeUnmount() {
    if (this.chart) {
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
            return Math.sin(u);
          }
          return Math.sin(v) > 0 ? 1 * height : -1;
        },
      };
    },

    // 生成模拟 3D 饼图的配置项
    getPie3D(pieData, internalDiameterRatio) {
      let series = [];
      let sumValue = 0;
      let startValue = 0;
      let endValue = 0;
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
      }
      return series;
    },

    // 生成图表配置
    generateOption() {
      const series = this.getPie3D(this.data, this.internalDiameterRatio);

      // 添加2D饼图用于标签显示
      series.push({
        name: "pie2d",
        type: "pie",
        label: {
          opacity: 1,
          fontSize: 14,
          lineHeight: 20,
          textStyle: {
            fontSize: 14,
            color: "#fff",
          },
        },
        labelLine: {
          length: 30,
          length2: 30,
        },
        startAngle: -30,
        clockwise: false,
        radius: ["40%", "60%"],
        center: ["50%", "50%"],
        data: this.data,
        itemStyle: {
          opacity: 0,
        },
      });

      return {
        legend: {
          show: true,
          tooltip: {
            show: true,
          },
          orient: "vertical",
          data: this.data.map(item => item.name),
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
          formatter: (params) => {
            if (params.seriesName === "pie2d") {
              return `${params.name}<br/><span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${params.color};"></span>${params.value}个`;
            }
            return '';
          },
          textStyle: {
            fontSize: 14,
            color: '#fff'
          },
          backgroundColor: 'rgba(0, 20, 40, 0.9)',
          borderColor: '#00bfff',
          borderWidth: 1,
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
          boxHeight: 2,
          bottom: "50%",
          viewControl: {
            distance: 200,
            alpha: 35,
            beta: 40,
            autoRotate: this.autoRotate,
            roam: false,
            panSensitivity: 0,
            zoomSensitivity: 0,
            rotationSensitivity: 0
          },
        },
        series: series,
      };
    },

    // 初始化图表
    initChart() {
      if (this.$refs.chartContainer) {
        this.chart = echarts.init(this.$refs.chartContainer);
        this.updateChart();

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
    }
  }
}
</script>

<style scoped>
/* 组件样式 */
</style>
