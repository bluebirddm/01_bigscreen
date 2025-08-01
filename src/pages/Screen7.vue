<template>
  <div class="dashboard">
    <header class="dashboard-header">
      <img src="../assets/head_content.png" alt="问题整改质量监测智慧可视化大屏" class="header-content" />
    </header>
    
    <main class="dashboard-main">
      <div class="left-panel">
        <div class="panel-section security-category-distribution-section">
          <h3 class="section-title">安全类别问题分布情况</h3>
          <SecurityCategoryDistribution />
        </div>
        
        <div class="panel-section security-category-improvement-section">
          <h3 class="section-title">安全类别问题整改情况</h3>
          <SecurityCategoryImprovement />
        </div>
        
        <div class="panel-section block-problem-ranking-section">
          <h3 class="section-title">各板块问题情况排名</h3>
          <BlockProblemRanking />
        </div>
        
        <div class="panel-section block-problem-improvement-section">
          <h3 class="section-title">各板块问题整改情况</h3>
          <BlockProblemImprovement />
        </div>
      </div>
      
      <div class="center-panel">
        <div class="center-main-area">
          <div class="improvement-counters-wrapper">
            <ImprovementCounters />
          </div>
          <div class="problem-total-counters-wrapper">
            <ProblemTotalCounters />
          </div>
          <div class="risk-level-counters-wrapper">
            <RiskLevelCounters />
          </div>
        </div>
        
        <div class="center-charts-area">
          <div class="panel-section system-type-improvement-ranking-section">
            <h3 class="section-title">各系统类型问题情况排名</h3>
            <SystemTypeImprovementRanking />
          </div>
          
          <div class="panel-section system-type-improvement-stats-section">
            <h3 class="section-title">各系统类型问题整改情况</h3>
            <SystemTypeImprovementStats />
          </div>
        </div>
      </div>
      
      <div class="right-panel">
        <div class="panel-section unit-improvement-ranking-section">
          <h3 class="section-title">各单位问题情况排名</h3>
          <UnitImprovementRanking />
        </div>
        
        <div class="panel-section unit-improvement-stats-section">
          <h3 class="section-title">各单位问题整改情况</h3>
          <UnitImprovementStats />
        </div>
        
        <div class="panel-section province-improvement-ranking-section">
          <h3 class="section-title">各省份问题情况排名</h3>
          <ProvinceImprovementRanking />
        </div>
        
        <div class="panel-section province-improvement-stats-section">
          <h3 class="section-title">各省份问题整改情况</h3>
          <ProvinceImprovementStats />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import SecurityCategoryDistribution from '../components/screen7/SecurityCategoryDistribution.vue'
import SecurityCategoryImprovement from '../components/screen7/SecurityCategoryImprovement.vue'
import BlockProblemRanking from '../components/screen7/BlockProblemRanking.vue'
import BlockProblemImprovement from '../components/screen7/BlockProblemImprovement.vue'
import ImprovementCounters from '../components/screen7/ImprovementCounters.vue'
import ProblemTotalCounters from '../components/screen7/ProblemTotalCounters.vue'
import RiskLevelCounters from '../components/screen7/RiskLevelCounters.vue'
import SystemTypeImprovementRanking from '../components/screen7/SystemTypeImprovementRanking.vue'
import SystemTypeImprovementStats from '../components/screen7/SystemTypeImprovementStats.vue'
import UnitImprovementRanking from '../components/screen7/UnitImprovementRanking.vue'
import UnitImprovementStats from '../components/screen7/UnitImprovementStats.vue'
import ProvinceImprovementRanking from '../components/screen7/ProvinceImprovementRanking.vue'
import ProvinceImprovementStats from '../components/screen7/ProvinceImprovementStats.vue'

// 引入通用样式
import '../styles/dashboard-common.css'
</script>

<style scoped>
/* Screen7 特有样式 */
.improvement-counters-wrapper {
  position: absolute;
  top: 50px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
}

.problem-total-counters-wrapper {
  position: absolute;
  top: 150px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9;
}

.risk-level-counters-wrapper {
  position: absolute;
  top: 250px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 8;
}

/* 调整center面板布局 */
.center-main-area {
  position: relative;
  height: 100%;
}
</style>