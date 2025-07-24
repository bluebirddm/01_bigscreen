<template>
  <div class="dashboard">
    <header class="dashboard-header">
      <img src="../assets/head_content.png" alt="等保测评智慧可视化大屏" class="header-content" />
    </header>
    
    <main class="dashboard-main">
      <div class="left-panel">
        <div class="panel-section security-level-section">
          <h3 class="section-title">各等保级别完成情况</h3>
          <SecurityLevelStatus />
        </div>
        
        <div class="panel-section security-radar-section">
          <h3 class="section-title">各板块/系统类型完成情况</h3>
          <SecurityRadarCharts />
        </div>
        
        <div class="panel-section unit-completion-top10-section">
          <h3 class="section-title">各单位完成情况TOP10</h3>
          <UnitCompletionTOP10 />
        </div>
      </div>
      
      <div class="center-panel">
        <div class="center-main-area">
          <div class="security-nav-wrapper">
            <SecurityNavButtons />
          </div>
          <div class="security-counter-wrapper">
            <SecurityCounter />
          </div>
          <div class="china-3d-map-wrapper">
            <China3DMap />
          </div>
        </div>
        
        <div class="center-charts-area">
          <div class="panel-section security-issues-section">
            <h3 class="section-title">安全问题统计分布</h3>
            <SecurityIssuesDistribution />
          </div>
          
          <div class="panel-section security-rectify-section">
            <h3 class="section-title">安全问题整改情况统计</h3>
            <SecurityIssuesRectify />
          </div>
        </div>
      </div>
      
      <div class="right-panel">
        <div class="panel-section unit-completion-section">
          <h3 class="section-title">各单位等保测评结果统计</h3>
          <UnitCompletionChart />
        </div>
        
        <div class="panel-section institution-count-section">
          <h3 class="section-title">等保测评机构测评数量TOP10</h3>
          <InstitutionReviewCountRanking />
        </div>
        
        <div class="panel-section institution-quality-section">
          <h3 class="section-title">等保测评机构测评质量评分TOP10</h3>
          <InstitutionReviewQualityRatingRanking />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import SecurityLevelStatus from '../components/screen2/SecurityLevelStatus.vue'
import SecurityRadarCharts from '../components/screen2/SecurityRadarCharts.vue'
import SecurityNavButtons from '../components/screen2/SecurityNavButtons.vue'
import SecurityCounter from '../components/screen2/SecurityCounter.vue'
import UnitCompletionChart from '../components/screen2/UnitCompletionChart.vue'
import InstitutionReviewCountRanking from '../components/screen2/InstitutionReviewCountRanking.vue'
import UnitCompletionTOP10 from '../components/screen2/UnitCompletionTOP10.vue'
import SecurityIssuesDistribution from '../components/screen2/SecurityIssuesDistribution.vue'
import SecurityIssuesRectify from '../components/screen2/SecurityIssuesRectify.vue'
import InstitutionReviewQualityRatingRanking from '../components/screen2/InstitutionReviewQualityRatingRanking.vue'
import China3DMap from '../components/China3DMap.vue'
</script>

<style scoped>
.dashboard {
  width: 1920px;
  height: 1080px;
  display: flex;
  flex-direction: column;
  background: url('../assets/backgroud.png') no-repeat center center;
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
  background: url('../assets/head_bg.png') no-repeat center center;
  background-size: cover;
}

.header-content {
  height: 40px;
  max-width: 100%;
  object-fit: contain;
  transform: translateY(-17px);
}

.dashboard-main {
  height: 930px;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  /* gap: 30px; */
  padding: 0 30px 0;
}

.left-panel,
.right-panel {
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 100%;
  overflow: hidden;
}

.center-panel {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.center-main-area {
  flex: 2;
  position: relative;
  min-height: 0;
}

.center-charts-area {
  flex: 1;
  display: flex;
  gap: 20px;
  min-height: 0;
}

/* 导航按钮浮动在最顶部 */
.center-main-area .security-nav-wrapper {
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 15;
}

/* 计数器浮动在导航按钮下方 */
.center-main-area .security-counter-wrapper {
  position: absolute;
  top: 60px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
}

.center-main-area .china-3d-map-wrapper {
  position: absolute;
  top: 90px;
  left: 0;
  width: 100%;
  height: calc(100% - 80px);
}

/* Center charts area sections */
.center-charts-area .panel-section {
  flex: 1;
  min-height: 0;
}

.panel-section {
  padding: 20px;
  flex: 1;
  min-height: 0;
}

/* Left panel sections - 垂直等分 */
.security-level-section,
.security-radar-section,
.unit-completion-top10-section {
  flex: 1;
  min-height: 0;
}

/* Right panel sections - 垂直等分 */
.unit-completion-section,
.institution-count-section,
.institution-quality-section {
  flex: 1;
  min-height: 0;
}


.section-title {
  font-size: 18px;
  color: #E5F2F9;
  text-align: left;
  position: relative;
  text-indent: 30px;
  background-image: url('../assets/little_title_bg.png');
  background-repeat: no-repeat;
  background-position: left center;
  background-size: contain;
  padding: 25px 20px 25px 20px;
  height: 60px;
}
</style>
