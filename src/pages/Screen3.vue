<template>
  <div class="dashboard">
    <header class="dashboard-header">
      <img src="../assets/head_content.png" alt="安全合规智慧可视化大屏" class="header-content" />
    </header>
    
    <main class="dashboard-main">
      <div class="left-panel">
        <div class="panel-section security-level-section">
          <h3 class="section-title">合规工作开展情况</h3>
          <ComplianceWorkStatus />
        </div>
        
        <div class="panel-section security-radar-section">
          <h3 class="section-title">各板块合规情况</h3>
          <ComplianceRadarChart />
        </div>
        
        <div class="panel-section unit-completion-top10-section">
          <h3 class="section-title">各系统类型合规完成情况</h3>
          <ComplianceLevelChart />
        </div>
      </div>
      
      <div class="center-panel">
        <div class="center-main-area">
          <div class="security-nav-wrapper">
            <SecurityNavButtons />
          </div>
          <div class="security-counter-wrapper">
            <ComplianceCounter />
          </div>
          <div class="china-3d-map-wrapper">
            <China3DMap />
          </div>
        </div>
        
        <div class="center-charts-area">
          <div class="panel-section security-issues-section">
            <h3 class="section-title">各类合规问题统计</h3>
            <ComplianceIssuesChart />
          </div>
        </div>
      </div>
      
      <div class="right-panel">
        <div class="panel-section unit-completion-section">
          <h3 class="section-title">各单位合规情况</h3>
          <UnitComplianceChart />
        </div>
        
        <div class="panel-section institution-count-section">
          <h3 class="section-title">各省份合规情况</h3>
          <ProvinceComplianceStackedChart />
        </div>
        
        <div class="panel-section institution-quality-section">
          <h3 class="section-title">各安全类别问题分布情况</h3>
          <ComplianceDistributionChart />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import ComplianceWorkStatus from '../components/screen3/ComplianceWorkStatus.vue'
import ComplianceRadarChart from '../components/screen3/ComplianceRadarChart.vue'
import ComplianceLevelChart from '../components/screen3/ComplianceLevelChart.vue'
import ComplianceCounter from '../components/screen3/ComplianceCounter.vue'
import ComplianceIssuesChart from '../components/screen3/ComplianceIssuesChart.vue'
import UnitComplianceChart from '../components/screen3/UnitComplianceChart.vue'
import ProvinceComplianceStackedChart from '../components/screen3/ProvinceComplianceStackedChart.vue'
import ComplianceDistributionChart from '../components/screen3/ComplianceDistributionChart.vue'
import China3DMap from '../components/China3DMap.vue'
import SecurityNavButtons from '../components/screen2/SecurityNavButtons.vue'

// 引入通用样式
import '../styles/dashboard-common.css'
</script>

<style scoped>
/* Screen3 特有样式 - 所有通用样式已移至 dashboard-common.css */
</style>