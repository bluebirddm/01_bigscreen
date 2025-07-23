<template>
  <div class="dashboard">
    <header class="dashboard-header">
      <img src="./assets/head_content.png" alt="信息系统智慧可视化大屏" class="header-content" />
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
import InfoSystemStatus from './components/InfoSystemStatus.vue'
import ProvinceRankingEnhanced from './components/ProvinceRankingEnhanced.vue'
import SystemRanking from './components/SystemRanking.vue'
import China3DMap from './components/China3DMap.vue'
import SystemLayout from './components/SystemLayout.vue'
import ArchitectureDistribution from './components/ArchitectureDistribution.vue'
import SystemType3D from './components/SystemType3D.vue'
import SystemType3DNew from './components/SystemType3DNew.vue'
import InfoCounter from './components/InfoCounter.vue'


</script>

<style scoped>


.dashboard {
  width: 1920px;
  height: 1080px;
  display: flex;
  flex-direction: column;
  background: url('./assets/backgroud.png') no-repeat center center;
  background-size: cover;
  position: relative;
  overflow: hidden;
}

.dashboard-header {
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background: url('./assets/head_bg.png') no-repeat center center;
  background-size: cover;
}

.header-content {
  height: 40px;
  max-width: 100%;
  object-fit: contain;
  transform: translateY(-17px);
}

.dashboard-main {
  height: 696px;
  display: grid;
  grid-template-columns: 638px 1162px 1fr;
  gap: 30px;
  padding: 0 30px 0;
}

.left-panel,
.right-panel {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.center-panel {
  display: flex;
  flex-direction: column;
  position: relative;
  width: 1162px;
  height: 636px;
}

/* InfoCounter 浮动在 China3DMap 上方 */
.center-panel .info-counter-wrapper {
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
}

.center-panel .china-3d-map-wrapper {
  width: 100%;
  height: 100%;
}

.panel-section {
  /* background: rgba(0, 20, 40, 0.6); 
  border: 1px solid rgba(0, 191, 255, 0.2);
  border-radius: 12px;
  padding: 20px;
  backdrop-filter: blur(10px);
  flex: 1;
  min-height: 0;*/
  padding: 20px;
  flex: 1;
  min-height: 0;
}

/* 信息系统实况情况 */
.system-status-section {
  width: 638px;
  height: 280px;
  flex: none;
}

/* 各省份数据排行TOP10 - 左边中间 */
.province-ranking-section {
  width: 500px;
  height: 323px;
  flex: none;
  z-index: 5;
  position: relative;
}

/* 各单位数据排行TOP10 - 左下角 */
.unit-ranking-section {
  width: 500px;
  height: 323px;
  flex: none;
}

/* 底部图表区域 */
.bottom-charts {
  height: 322px;
  display: flex;
  gap: 30px;
  padding: 0px 30px 30px 30px;
  justify-content: flex-start;
  position: absolute;
  top: 744px;
  left: 586px;
  right: 0;
}

.chart-section {
  /* background: rgba(0, 20, 40, 0.6); 
  border: 1px solid rgba(0, 191, 255, 0.2);
  border-radius: 12px;
  padding: 20px;
  backdrop-filter: blur(10px);*/
  padding: 20px;
}

/* 各板块分布情况 - 底部中间 */
.layout-distribution-section {
  width: 636px;
  height: 323px;
  margin-left: 30px;
}

/* 各系统类型分布情况 - 底部右下 */
.system-type-section {
  width: 636px;
  height: 282px;
}

.section-title {
  font-size: 18px;
  color: #E5F2F9;
  text-align: left;
  position: relative;
  text-indent: 30px;
  background-image: url('./assets/little_title_bg.png');
  background-repeat: no-repeat;
  background-position: left center;
  background-size: contain;
  padding: 25px 20px 25px 20px;
  height: 60px;
}

</style>