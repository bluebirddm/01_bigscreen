<template>
  <div class="dashboard">
    <header class="dashboard-header">
      <img src="../assets/head_content.png" alt="风险评估智慧可视化大屏" class="header-content" />
    </header>
    
    <main class="dashboard-main">
      <div class="left-panel">
        <div class="panel-section risk-assessment-conclusion-section">
          <h3 class="section-title">测评结论</h3>
          <RiskAssessmentConclusion />
        </div>
        
        <div class="panel-section unit-risk-completion-ranking-section">
          <h3 class="section-title">各单位风评完成数量排名TOP10</h3>
          <UnitRiskCompletionRanking />
        </div>
        
        <div class="panel-section security-category-issues-section">
          <h3 class="section-title">各安全类别问题分布情况</h3>
          <SecurityCategoryIssuesRadar />
        </div>
      </div>
      
      <div class="center-panel">
        <div class="center-main-area">
          <div class="security-nav-wrapper">
            <SecurityNavButtons />
          </div>
          <div class="risk-counter-wrapper">
            <RiskAssessmentCounter />
          </div>
          <div class="china-3d-map-wrapper">
            <!-- <China3DMap /> -->
          </div>
        </div>
        
        <div class="center-charts-area">
          <div class="panel-section security-improvement-section">
            <h3 class="section-title">各安全类别问题整改情况</h3>
            <SecurityCategoryImprovement />
          </div>
          <div class="panel-section risk-agency-count-section">
            <h3 class="section-title">风险评估机构测评数量TOP10</h3>
            <RiskAgencyCountRanking />
          </div>
        </div>
      </div>
      
      <div class="right-panel">
        <div class="panel-section unit-risk-status-section">
          <h3 class="section-title">各单位问题风险情况</h3>
          <UnitRiskStatus />
        </div>
        
        <div class="panel-section unit-issue-rectification-section">
          <h3 class="section-title">各单位问题整改情况</h3>
          <UnitIssueRectification />
        </div>
        
        <div class="panel-section risk-agency-quality-section">
          <h3 class="section-title">风险评估机构测评质量评分TOP10</h3>
          <RiskAgencyQualityRanking />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import RiskAssessmentConclusion from '../components/screen5/RiskAssessmentConclusion.vue'
import UnitRiskCompletionRanking from '../components/screen5/UnitRiskCompletionRanking.vue'
import SecurityCategoryIssuesRadar from '../components/screen5/SecurityCategoryIssuesRadar.vue'
import RiskAssessmentCounter from '../components/screen5/RiskAssessmentCounter.vue'
import RiskNavButtons from '../components/screen5/RiskNavButtons.vue'
import SecurityCategoryImprovement from '../components/screen5/SecurityCategoryImprovement.vue'
import RiskAgencyCountRanking from '../components/screen5/RiskAgencyCountRanking.vue'
import UnitRiskStatus from '../components/screen5/UnitRiskStatus.vue'
import UnitIssueRectification from '../components/screen5/UnitIssueRectification.vue'
import RiskAgencyQualityRanking from '../components/screen5/RiskAgencyQualityRanking.vue'
import China3DMap from '../components/China3DMap.vue'
import SecurityNavButtons from '../components/screen2/SecurityNavButtons.vue'

// 引入通用样式
import '../styles/dashboard-common.css'
</script>

<style scoped>
/* Screen5 特有样式 - 所有通用样式已移至 dashboard-common.css */

/* 调整风险评估计数器位置 */
.center-main-area .risk-counter-wrapper {
  position: absolute;
  top: 75px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
}

/* 中间底部图表区域分为左右两部分 */
.center-charts-area {
  display: flex;
  gap: 20px;
}

.center-charts-area .security-improvement-section {
  flex: 1.2;
}

.center-charts-area .risk-agency-count-section {
  flex: 1;
}
</style>