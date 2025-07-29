<template>
  <div class="dashboard">
    <header class="dashboard-header">
      <img src="../assets/head_content.png" alt="信息系统智慧可视化大屏" class="header-content" />
    </header>
    
    <main class="dashboard-main">
      <div class="left-panel">
        <div class="panel-section system-status-section">
          <h3 class="section-title">信息系统实况情况</h3>
          <InfoSystemStatus />
        </div>
        
        <div class="panel-section unit-ranking-section">
          <h3 class="section-title">各单位数据排行TOP10</h3>
          <SystemRanking />
        </div>

        <div class="panel-section province-ranking-section">
          <h3 class="section-title">各省份数据排行TOP10</h3>
          <ProvinceRankingEnhanced />
        </div>
        

      </div>
      
      <div class="center-panel">
        <div class="info-counter-wrapper">
          <InfoCounter />
        </div>
        <div class="china-3d-map-wrapper">
          <China3DMap />
        </div>
      </div>
      
      <div class="right-panel">
        <!-- 右侧面板暂时空置 -->
      </div>
    </main>
    
    <!-- 底部分布图表区域 -->
    <div class="bottom-charts">
      <div class="chart-section layout-distribution-section">
        <h3 class="section-title">各板块分布情况</h3>
        <SystemLayout />
      </div>
      
      <div class="chart-section system-type-section">
        <h3 class="section-title">各系统类型分布情况</h3>
        <SystemType3D />
      </div>
    </div>
  </div>
</template>

<script setup>
import InfoSystemStatus from '../components/screen1/InfoSystemStatus.vue'
import ProvinceRankingEnhanced from '../components/screen1/ProvinceRankingEnhanced.vue'
import SystemRanking from '../components/screen1/SystemRanking.vue'
import China3DMap from '../components/China3DMap.vue'
import SystemLayout from '../components/screen1/SystemLayout.vue'
import SystemType3D from '../components/screen1/SystemType3D.vue'
import InfoCounter from '../components/screen1/InfoCounter.vue'

// 引入通用样式
import '../styles/dashboard-common.css'

</script>

<style scoped>
/* Screen1 特有样式 */

.dashboard-main {
  height: 966px;
  grid-template-columns: 638px 1162px 1fr;
  gap: 30px;
}

.center-panel {
  position: relative;
  width: 1162px;
  height: 636px;
  gap: 0; /* 覆盖通用样式 */
}

/* InfoCounter 浮动在 China3DMap 上方 */
.center-panel .info-counter-wrapper {
  top: 20px; /* 覆盖通用样式 */
  transform: translateY(48px);
}

.center-panel .china-3d-map-wrapper {
  width: 100%;
  height: 100%;
}

/* Screen1 特有的section样式 */
.system-status-section {
  width: 638px;
  height: 280px;
  flex: none;
}

.province-ranking-section {
  width: 100%;
  height: 323px;
  flex: none;
  z-index: 5;
  position: relative;
}

.unit-ranking-section {
  width: 100%;
  height: 323px;
  flex: none;
}

/* Screen1 特有的底部图表区域 */
.bottom-charts {
  height: 322px;
  display: flex;
  gap: 30px;
  padding: 0px 30px 30px 30px;
  justify-content: flex-start;
  position: absolute;
  top: 673px;
  left: 586px;
  right: 0;
}

.chart-section {
  padding: 20px;
}

.layout-distribution-section {
  width: 636px;
  height: 323px;
  margin-left: 30px;
}

.system-type-section {
  width: 636px;
  height: 282px;
}

</style>