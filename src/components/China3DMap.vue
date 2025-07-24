<template>
  <div class="china-3d-map">
    <v-chart class="chart" :option="option" autoresize />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { VisualMapComponent, LegendComponent } from 'echarts/components'
import { MapChart, ScatterChart, EffectScatterChart, LinesChart } from 'echarts/charts'
import VChart from 'vue-echarts'
import * as echarts from 'echarts'

// 注册必要的组件
use([
  CanvasRenderer,
  VisualMapComponent,
  LegendComponent,
  MapChart,
  ScatterChart,
  EffectScatterChart,
  LinesChart
])

// 创建一个 Canvas 来绘制自定义图标
const createLabelIcon = () => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = 110;
  canvas.height = 60;
  
  // 绘制渐变背景
  const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
  gradient.addColorStop(0, 'rgba(0, 255, 246, 0.5)');
  gradient.addColorStop(1, 'rgba(0, 191, 255, 0.5)');
  
  // 绘制圆角矩形
  const radius = 10;
  ctx.beginPath();
  ctx.moveTo(radius, 0);
  ctx.lineTo(canvas.width - radius, 0);
  ctx.quadraticCurveTo(canvas.width, 0, canvas.width, radius);
  ctx.lineTo(canvas.width, canvas.height - radius);
  ctx.quadraticCurveTo(canvas.width, canvas.height, canvas.width - radius, canvas.height);
  ctx.lineTo(radius, canvas.height);
  ctx.quadraticCurveTo(0, canvas.height, 0, canvas.height - radius);
  ctx.lineTo(0, radius);
  ctx.quadraticCurveTo(0, 0, radius, 0);
  ctx.closePath();
  
  ctx.fillStyle = gradient;
  ctx.fill();
  
  // 添加边框
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
  ctx.lineWidth = 2;
  ctx.stroke();
  
  return canvas.toDataURL();
};

// 图标数据 - 在组件挂载后创建
let img2 = 'rect'; // 默认使用矩形

const mapName = 'china'

// 地图数据
const data = [
  { name: '北京', value: 5 },
  { name: '天津', value: 14 },
  { name: '河北', value: 157 },
  { name: '山西', value: 110 },
  { name: '内蒙古', value: 40 },
  { name: '辽宁', value: 40 },
  { name: '吉林', value: 40 },
  { name: '黑龙江', value: 60 },
  { name: '上海', value: 10 },
  { name: '江苏', value: 60 },
  { name: '浙江', value: 50 },
  { name: '安徽', value: 151 },
  { name: '福建', value: 60 },
  { name: '江西', value: 74 },
  { name: '山东', value: 200 },
  { name: '河南', value: 100 },
  { name: '湖北', value: 40 },
  { name: '湖南', value: 50 },
  { name: '重庆', value: 40 },
  { name: '四川', value: 120 },
  { name: '贵州', value: 135 },
  { name: '云南', value: 90 },
  { name: '西藏', value: 25 },
  { name: '陕西', value: 100 },
  { name: '甘肃', value: 60 },
  { name: '青海', value: 20 },
  { name: '宁夏', value: 110 },
  { name: '新疆', value: 32 },
  { name: '广东', value: 10 },
  { name: '广西', value: 100 },
  { name: '海南', value: 40 },
]

// 工具提示数据
const toolTipData = [
  { name: '湖南', value: 5, areas: ["长沙", "株洲", "益阳"] },
  { name: '安徽', value: 3, areas: ["合肥", "芜湖"] },
  { name: '山东', value: 80, areas: ["济南", "青岛", "淄博", "烟台", "威海", "临沂"] },
  { name: '四川', value: 35, areas: ["成都", "攀枝花", "乐山", "泸州"] },
  { name: '云南', value: 27, areas: ["昆明", "玉溪", "丽江", "普洱", "临沧"] },
  { name: '黑龙江', value: 13, areas: ["哈尔滨", "鹤岗", "黑河", "绥化", "大庆", "佳木斯"] },
  { name: '甘肃', value: 42, areas: ["兰州", "嘉峪关", "天水", "酒泉"] },
  { name: '西藏', value: 74, areas: [] }
]

// 地理坐标映射（排除海南省坐标）
const geoCoordMap = {
  '黑龙江': [127.9688, 45.368],
  '内蒙古': [110.3467, 41.4899],
  "吉林": [125.8154, 44.2584],
  '北京市': [116.4551, 40.2539],
  "辽宁": [123.1238, 42.1216],
  "河北": [114.4995, 38.1006],
  "天津": [117.4219, 39.4189],
  "山西": [112.3352, 37.9413],
  "陕西": [109.1162, 34.2004],
  "甘肃": [103.5901, 36.3043],
  "宁夏": [106.3586, 38.1775],
  "青海": [101.4038, 36.8207],
  "新疆": [87.611053, 43.828171],
  "西藏": [91.117212, 29.646922],
  "四川": [103.9526, 30.7617],
  "重庆": [108.384366, 30.439702],
  "山东": [117.1582, 36.8701],
  "河南": [113.4668, 34.6234],
  "江苏": [118.8062, 31.9208],
  "安徽": [117.29, 32.0581],
  "湖北": [114.3896, 30.6628],
  "浙江": [119.5313, 29.8773],
  "福建": [119.4543, 25.9222],
  "江西": [116.0046, 28.6633],
  "湖南": [113.0823, 28.2568],
  "贵州": [106.6992, 26.7682],
  "云南": [102.9199, 25.4663],
  "广东": [113.12244, 23.009505],
  "广西": [108.479, 23.1152],
  "台湾": [120.702967, 24.123621],
  '上海': [121.4648, 31.2891],
  "海南": [110.3893, 19.8516],
}

// 数据转换函数
const convertData = function (data) {
  const res = []
  for (let i = 0; i < data.length; i++) {
    const geoCoord = geoCoordMap[data[i].name]
    if (geoCoord) {
      res.push({
        name: data[i].name,
        value: geoCoord.concat(data[i].value),
      })
    }
  }
  return res
}

// 柱状体的主干
const lineData = function() {
  return toolTipData.map((item) => {
    return {
      coords: [geoCoordMap[item.name], [geoCoordMap[item.name][0], geoCoordMap[item.name][1] + 1.5]]
    }
  })
}

// 柱状体的顶部
const scatterData = function() {
  return toolTipData.map((item) => {
    return [geoCoordMap[item.name][0], geoCoordMap[item.name][1] + 2, item]
  })
}

const option = ref({})

// 动态加载中国地图数据
onMounted(async () => {
  try {
    // 生成自定义图标
    img2 = 'image://' + createLabelIcon();
    
    // 从本地文件加载中国地图数据
    const response = await fetch('/src/assets/map/china.json')
    const chinaJson = await response.json()

    echarts.registerMap(mapName, chinaJson)

    // 获取地图特征并更新坐标
    const mapFeatures = echarts.getMap(mapName).geoJson.features

    mapFeatures.forEach(function (v) {
      const name = v.properties.name
      geoCoordMap[name] = v.properties.cp
    })

    // 地图加载成功后设置option
    option.value = {
      // backgroundColor: "#003366",
      title: {
        show: true,
        text: "",
        x: 'center',
        top: "10",
        textStyle: {
          color: "#fff",
          fontFamily: "等线",
          fontSize: 18,
        },
      },
      tooltip: {
        trigger: 'none',
        formatter: function (params) {
          if (typeof params.value[2] == 'undefined') {
            let toolTiphtml = ''
            for (let i = 0; i < toolTipData.length; i++) {
              if (params.name == toolTipData[i].name) {
                toolTiphtml += toolTipData[i].name + "：" + toolTipData[i].value
              }
            }
            return toolTiphtml
          } else {
            let toolTiphtml = ''
            for (let i = 0; i < toolTipData.length; i++) {
              if (params.name == toolTipData[i].name) {
                toolTiphtml += toolTipData[i].name + "：" + toolTipData[i].value
              }
            }
            return toolTiphtml
          }
        },
        backgroundColor: "#fff",
        borderColor: "#333",
        padding: [5, 10],
        textStyle: {
          color: "#333",
          fontSize: "16"
        }
      },
      geo: [{
        layoutCenter: ['50%', '50%'],//位置
        layoutSize: '180%',//大小
        show: true,
        map: mapName,
        roam: false,
        zoom: 0.65,
        aspectScale: 1,
        label: {
          normal: {
            show: false,
            textStyle: {
              color: '#fff'
            }
          },
          emphasis: {
            show: true,
            textStyle: {
              color: '#fff'
            }
          }
        },
        itemStyle: {
          normal: {
            areaColor: {
              type: "linear",
              x: 1200,
              y: 0,
              x2: 0,
              y2: 0,
              colorStops: [{
                offset: 0,
                color: "rgba(3,27,78,0.75)", // 0% 处的颜色
              }, {
                offset: 1,
                color: "rgba(58,149,253,0.75)", // 50% 处的颜色
              }],
              global: true, // 缺省为 false
            },
            borderColor: "#c0f3fb",
            borderWidth: 1,
            shadowColor: "#8cd3ef",
            shadowOffsetY: 10,
            shadowBlur: 120,
          },
          emphasis: {
            areaColor: "rgba(0,254,233,0.6)",
          }
        }
      }, {
        type: "map",
        map: mapName,
        zlevel: -1,
        aspectScale: 1,
        zoom: 0.65,
        layoutCenter: ["50%", "51%"],
        layoutSize: "180%",
        roam: false,
        silent: true,
        itemStyle: {
          normal: {
            borderWidth: 1,
            borderColor: "rgba(58,149,253,0.8)",
            shadowColor: "rgba(172, 122, 255,0.5)",
            shadowOffsetY: 5,
            shadowBlur: 15,
            areaColor: "rgba(5,21,35,0.1)",
          },
        },
      }, {
        type: "map",
        map: mapName,
        zlevel: -2,
        aspectScale: 1,
        zoom: 0.65,
        layoutCenter: ["50%", "52%"],
        layoutSize: "180%",
        roam: false,
        silent: true,
        itemStyle: {
          normal: {
            borderWidth: 1,
            borderColor: "rgba(58,149,253,0.6)",
            shadowColor: "rgba(65, 214, 255,1)",
            shadowOffsetY: 5,
            shadowBlur: 15,
            areaColor: "transpercent",
          },
        },
      }, {
        type: "map",
        map: mapName,
        zlevel: -3,
        aspectScale: 1,
        zoom: 0.65,
        layoutCenter: ["50%", "53%"],
        layoutSize: "180%",
        roam: false,
        silent: true,
        itemStyle: {
          normal: {
            borderWidth: 1,
            borderColor: "rgba(58,149,253,0.4)",
            shadowColor: "rgba(58,149,253,1)",
            shadowOffsetY: 15,
            shadowBlur: 10,
            areaColor: "transpercent",
          },
        },
      }, {
        type: "map",
        map: mapName,
        zlevel: -4,
        aspectScale: 1,
        zoom: 0.65,
        layoutCenter: ["50%", "54%"],
        layoutSize: "180%",
        roam: false,
        silent: true,
        itemStyle: {
          normal: {
            borderWidth: 5,
            borderColor: "rgba(5,9,57,0.8)",
            shadowColor: "rgba(29, 111, 165,0.8)",
            shadowOffsetY: 15,
            shadowBlur: 10,
            areaColor: "rgba(5,21,35,0.1)",
          },
        },
      }],
      series: [
        {
          type: 'map',
          map: mapName,
          geoIndex: 0,
          aspectScale: 1, //长宽比
          zoom: 0.65,
          showLegendSymbol: true,
          roam: true,
          label: {
            normal: {
              show: true,
              textStyle: {
                color: "#fff",
                fontSize: "120%"
              },
            },
            emphasis: {
              // show: false,
            },
          },
          itemStyle: {
            normal: {
              areaColor: {
                type: "linear",
                x: 1200,
                y: 0,
                x2: 0,
                y2: 0,
                colorStops: [{
                  offset: 0,
                  color: "rgba(3,27,78,0.75)", // 0% 处的颜色
                }, {
                  offset: 1,
                  color: "rgba(58,149,253,0.75)", // 50% 处的颜色
                }],
                global: true, // 缺省为 false
              },
              borderColor: "#fff",
              borderWidth: 0.2,
            },
          },
          layoutCenter: ["50%", "50%"],
          layoutSize: "180%",
          animation: false,
          markPoint: {
            symbol: "none"
          },
          data: data,
        },
        //柱状体的主干
        {
          type: 'lines',
          zlevel: 5,
          effect: {
            show: false,
            symbolSize: 5 // 图标大小
          },
          lineStyle: {
            width: 6, // 尾迹线条宽度
            color: 'rgba(249, 105, 13, .6)',
            opacity: 1, // 尾迹线条透明度
            curveness: 0 // 尾迹线条曲直度
          },
          label: {
            show: 0,
            position: 'end',
            formatter: '245'
          },
          silent: true,
          data: lineData()
        },
        // 柱状体的顶部
        {
          type: 'scatter',
          coordinateSystem: 'geo',
          geoIndex: 0,
          zlevel: 5,
          label: {
            normal: {
              show: true,
              formatter: function (params) {
                const name = params.data[2].name
                const value = params.data[2].value
                const text = `{tline|${name}} : {fline|${value}}个`
                return text
              },
              color: '#fff',
              rich: {
                fline: {
                  color: '#fff',
                  fontSize: 14,
                  fontWeight: 600
                },
                tline: {
                  color: '#ABF8FF',
                  fontSize: 12,
                },
              }
            },
            emphasis: {
              show: true
            }
          },
          itemStyle: {
            color: '#00FFF6',
            opacity: 1
          },
          symbol: img2,
          symbolSize: [110, 60],
          symbolOffset: [0, -20],
          z: 999,
          data: scatterData(),
        },
        {
          name: 'Top 5',
          type: 'effectScatter',
          coordinateSystem: 'geo',
          data: convertData(toolTipData),
          showEffectOn: 'render',
          itemStyle: {
            normal: {
              color: '#00FFFF',
            }
          },
          rippleEffect: {
            scale: 5,
            brushType: 'stroke',
          },
          label: {
            normal: {
              formatter: '{b}',
              position: 'bottom',
              show: false,
              color: "#fff",
              distance: 10,
            },
          },
          symbol: 'circle',
          symbolSize: [20, 10],
          itemStyle: {
            normal: {
              color: '#16ffff',
              shadowBlur: 10,
              shadowColor: '#16ffff',
            },
            opacity: 1
          },
          zlevel: 4,
        },
      ]
    }
  } catch (error) {
    console.error('加载地图数据失败:', error)
  }
})
</script>

<style scoped>
.china-3d-map {
  width: 100%;
  height: 100%;
  position: relative;
}

.chart {
  width: 100%;
  height: 100%;
}
</style>