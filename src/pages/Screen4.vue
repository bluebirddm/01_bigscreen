<template>
  <div class="dashboard">
    <header class="dashboard-header">
      <img src="../assets/screen4_head_content.png" alt="技术监督智慧可视化大屏" class="header-content" />
    </header>
    
    <main class="dashboard-main">
      <div class="left-panel">
        <div class="panel-section yearly-inspection-section">
          <h3 class="section-title">历年检查统计</h3>
          <YearlyInspectionChart />
        </div>
        
        <div class="panel-section unit-supervision-ranking-section">
          <h3 class="section-title">各单位技术监督数量排名TOP10</h3>
          <UnitSupervisionRanking />
        </div>
        
        <div class="panel-section unit-supervision-status-section">
          <h3 class="section-title">各单位技术监督完成情况</h3>
          <UnitSupervisionStatus />
        </div>
      </div>
      
      <div class="center-panel">
        <div class="center-main-area">
          <div class="security-nav-wrapper">
            <SecurityNavButtons />
          </div>
          <div class="tech-counter-wrapper">
            <TechSupervisionCounter />
          </div>
          <div class="bg-wrapper">
            <div class="mid-bg-container"></div>
          </div>
        </div>
        
        <div class="center-charts-area">
          <div class="panel-section unit-inspection-conclusion-section">
            <h3 class="section-title">各单位检查项目结论统计</h3>
            <UnitInspectionConclusion />
          </div>
        </div>
      </div>
      
      <div class="right-panel">
        <div class="panel-section security-category-distribution-section">
          <h3 class="section-title">各安全类别问题分布情况</h3>
          <SecurityCategoryDistribution />
        </div>
        
        <div class="panel-section security-category-improvement-section">
          <h3 class="section-title">各安全类别问题改进情况</h3>
          <SecurityCategoryImprovement />
        </div>
        
        <div class="panel-section unit-management-rectification-section">
          <h3 class="section-title">各单位管理问题整改情况</h3>
          <UnitManagementRectification />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import YearlyInspectionChart from '../components/screen4/YearlyInspectionChart.vue'
import UnitSupervisionRanking from '../components/screen4/UnitSupervisionRanking.vue'
import UnitSupervisionStatus from '../components/screen4/UnitSupervisionStatus.vue'
import TechSupervisionCounter from '../components/screen4/TechSupervisionCounter.vue'
import TechSupervisionNavButtons from '../components/screen4/TechSupervisionNavButtons.vue'
import UnitInspectionConclusion from '../components/screen4/UnitInspectionConclusion.vue'
import SecurityCategoryDistribution from '../components/screen4/SecurityCategoryDistribution.vue'
import SecurityCategoryImprovement from '../components/screen4/SecurityCategoryImprovement.vue'
import UnitManagementRectification from '../components/screen4/UnitManagementRectification.vue'
import China3DMap from '../components/China3DMap.vue'
import SecurityNavButtons from '../components/screen2/SecurityNavButtons.vue'

// 引入通用样式
import '../styles/dashboard-common.css'
</script>

<style scoped>
/* Screen4 特有样式 - 所有通用样式已移至 dashboard-common.css */

/* 调整技术监督计数器位置 */
.center-main-area .tech-counter-wrapper {
  position: absolute;
  top: 150px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
}

/* 中间背景图片容器样式 */
.mid-bg-container {
  width: 100%;
  height: 100%;
  background-image: url('../assets/screen4_mid_bg.png');
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}


.bg-wrapper {
  position: absolute;
  top: 50px;
  left: 0;
  width: 100%;
  height: calc(100% - 80px);
}
</style>