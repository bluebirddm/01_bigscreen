<template>
  <div class="province-compliance-stacked-chart">
    <StackedCircle3DBar 
      :data="stackedData" 
      :barWidth="25" 
      :circleHeight="10"
      :colors="brightColors"
      legendPosition="top-right"
    />
  </div>
</template>

<script setup>
import StackedCircle3DBar from '../StackedCircle3DBar.vue'

// 各省份合规数据 - 对应图片中的省份和数值
const provinceComplianceData = [
  { name: '北京', value: 53, max: 80 },
  { name: '上海', value: 22, max: 40 },
  { name: '天津', value: 54, max: 70 },
  { name: '广西', value: 15, max: 20 },
  { name: '湖北', value: 52, max: 60 },
  { name: '河北', value: 13, max: 30 },
  { name: '江苏', value: 23, max: 40 },
  { name: '山东', value: 42, max: 70 }
]

// 转换数据格式以适配 StackedCircle3DBar 组件
const stackedData = {
  xdata: provinceComplianceData.map(item => item.name),
  result: [
    {
      name: '已完成',
      data: provinceComplianceData.map(item => item.value)
    },
    {
      name: '未完成',
      data: provinceComplianceData.map(item => item.max - item.value)
    }
  ]
}

// 明亮的颜色方案
const brightColors = [
  [
    { offset: 0, color: "#FFD700" },  // 金色
    { offset: 0.5, color: "#FFA500" }, // 橙色
    { offset: 1, color: "#FF8C00" }   // 深橙色
  ],
  [
    { offset: 0, color: "#00FF7F" },  // 春绿色
    { offset: 0.5, color: "#32CD32" }, // 酸橙绿
    { offset: 1, color: "#228B22" }   // 森林绿
  ],
  [
    { offset: 0, color: "#FF69B4" },  // 热粉红
    { offset: 0.5, color: "#FF1493" }, // 深粉红
    { offset: 1, color: "#C71585" }   // 中紫红
  ],
  [
    { offset: 0, color: "#00BFFF" },  // 深天蓝
    { offset: 0.5, color: "#1E90FF" }, // 道奇蓝
    { offset: 1, color: "#4169E1" }   // 皇家蓝
  ],
  [
    { offset: 0, color: "#FFE4B5" },  // 鹿皮色
    { offset: 0.5, color: "#FFDAB9" }, // 桃色
    { offset: 1, color: "#FFB6C1" }   // 浅粉红
  ],
  [
    { offset: 0, color: "#DDA0DD" },  // 梅红色
    { offset: 0.5, color: "#DA70D6" }, // 兰花紫
    { offset: 1, color: "#BA55D3" }   // 中兰花紫
  ]
]
</script>

<style scoped>
.province-compliance-stacked-chart {
  height: 263px;
  max-height: 263px;
  width: 100%;
  margin: 0 auto;
}
</style>