<template>
  <div class="system-layout">
    <div class="chart-container">
      <v-chart class="radar-chart" :option="radarChartOption" autoresize />
    </div>
    <div class="info-cards">
      <div 
        v-for="item in dataItems" 
        :key="item.name"
        class="info-card"
        :style="{ backgroundColor: item.color + '20', borderColor: item.color }"
      >
        <div class="card-content">
          <span class="category">{{ item.name }}</span>
          <span class="value">{{ item.value }}个</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { RadarChart } from 'echarts/charts'
import { 
  TooltipComponent,
  LegendComponent,
  RadarComponent
} from 'echarts/components'
import VChart from 'vue-echarts'

use([
  CanvasRenderer,
  RadarChart,
  TooltipComponent,
  LegendComponent,
  RadarComponent
])

// 数据配置
const dataItems = ref([
  { name: '煤炭', value: 50, color: '#ff6b6b' },
  { name: '化工', value: 50, color: '#4ecdc4' },
  { name: '火电', value: 10, color: '#45b7d1' },
  { name: '科技环保', value: 10, color: '#96ceb4' },
  { name: '新能源', value: 50, color: '#ffeaa7' },
  { name: '产业金融', value: 50, color: '#fd79a8' },
  { name: '水电', value: 10, color: '#6c5ce7' },
  { name: '大数据', value: 10, color: '#00cec9' },
  { name: '运输', value: 50, color: '#fdcb6e' },
  { name: '其他', value: 50, color: '#e17055' }
])

const radarChartOption = ref({})

onMounted(() => {
  radarChartOption.value = {
    backgroundColor: 'transparent',
    tooltip: {
      backgroundColor: 'rgba(0, 20, 40, 0.9)',
      borderColor: '#00bfff',
      borderWidth: 1,
      textStyle: {
        color: '#fff'
      }
    },
    legend: {
      show: false
    },
    radar: {
      indicator: [
        { name: '煤炭', max: 60 },
        { name: '化工', max: 60 },
        { name: '火电', max: 60 },
        { name: '新能源', max: 60 },
        { name: '运输', max: 60 }
      ],
      shape: 'polygon',
      radius: '65%',
      center: ['50%', '45%'],
      name: {
        textStyle: {
          color: '#8cc8ff',
          fontSize: 11
        }
      },
      axisLine: {
        lineStyle: {
          color: 'rgba(0, 191, 255, 0.3)'
        }
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(0, 191, 255, 0.2)'
        }
      },
      splitArea: {
        show: true,
        areaStyle: {
          color: [
            'rgba(0, 191, 255, 0.05)',
            'rgba(0, 191, 255, 0.1)'
          ]
        }
      }
    },
    series: [
      {
        type: 'radar',
        data: [
          {
            value: [50, 50, 10, 50, 50], // 煤炭, 化工, 火电, 新能源, 运输
            name: '各板块分布',
            itemStyle: {
              color: '#00bfff'
            },
            areaStyle: {
              color: 'rgba(0, 191, 255, 0.2)'
            },
            lineStyle: {
              color: '#00bfff',
              width: 2
            },
            symbol: 'circle',
            symbolSize: 4
          }
        ],
        animationDuration: 2000,
        animationEasing: 'elasticOut'
      }
    ]
  }
})
</script>

<style scoped>
.system-layout {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 30px;
}

.chart-container {
  flex: 0 0 45%;
  height: 100%;
  position: relative;
}

.radar-chart {
  height: 100%;
  width: 100%;
}

.info-cards {
  flex: 1;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px 16px;
  padding: 10px 0;
  align-content: start;
}

.info-card {
  width: 150px;
  height: 30px;
  background: rgba(0, 191, 255, 0.1);
  border: 1px solid rgba(0, 191, 255, 0.3);
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px 8px;
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);
  box-sizing: border-box;
}

.info-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 191, 255, 0.2);
}

.card-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.category {
  color: #8cc8ff;
  font-size: 12px;
  font-weight: 500;
}

.value {
  color: #00bfff;
  font-size: 13px;
  font-weight: bold;
}
</style>