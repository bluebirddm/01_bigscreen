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
            <SecurityRiskDistribution />
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
import SecurityRiskDistribution from '../components/screen2/SecurityRiskDistribution.vue'
import SecurityIssuesRectify from '../components/screen2/SecurityIssuesRectify.vue'
import InstitutionReviewQualityRatingRanking from '../components/screen2/InstitutionReviewQualityRatingRanking.vue'
import China3DMap from '../components/China3DMap.vue'

// 引入通用样式
import '../styles/dashboard-common.css'
</script>

<style scoped>
/* Screen2 特有样式 - 所有通用样式已移至 dashboard-common.css */
</style>
