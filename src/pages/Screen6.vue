<template>
  <div class="dashboard">
    <header class="dashboard-header">
      <img src="../assets/head_content.png" alt="密码评估智慧可视化大屏" class="header-content" />
    </header>
    
    <main class="dashboard-main">
      <div class="left-panel">
        <div class="panel-section unit-completion-ranking-section">
          <h3 class="section-title">各单位完成情况排名TOP10</h3>
          <UnitCompletionRanking />
        </div>
        
        <div class="panel-section unit-security-average-section">
          <h3 class="section-title">各单位密评平均分排名TOP10</h3>
          <UnitSecurityAverageRanking />
        </div>
        
        <div class="panel-section block-completion-section">
          <h3 class="section-title">各板块完成情况排名</h3>
          <BlockCompletionStats />
        </div>
      </div>
      
      <div class="center-panel">
        <div class="center-main-area">
          <div class="security-nav-wrapper">
            <SecurityNavButtons />
          </div>
          <div class="risk-counters-wrapper">
            <RiskCounters />
          </div>
          <div class="bg-wrapper">
            <div class="mid-bg-container"></div>
          </div>
          <div class="risk-level-wrapper">
            <SystemRiskLevel />
          </div>
          <div class="level-counters-wrapper">
            <LevelCounters />
          </div>
        </div>
        
        <div class="center-charts-area">
          <div class="panel-section evaluation-count-section">
            <h3 class="section-title">密码评估机构测评数量TOP10</h3>
            <EvaluationCountRanking />
          </div>
          
          <div class="panel-section evaluation-quality-section">
            <h3 class="section-title">密码评估机构测评质量评分TOP10</h3>
            <EvaluationQualityRanking />
          </div>
        </div>
      </div>
      
      <div class="right-panel">
        <div class="panel-section problem-type-stats-section">
          <h3 class="section-title">安全问题统计分布</h3>
          <SecurityProblemTypeStats />
        </div>
        
        <div class="panel-section problem-type-ranking-section">
          <h3 class="section-title">问题整改情况统计</h3>
          <ProblemTypeRanking />
        </div>
        
        <div class="panel-section unit-problem-ranking-section">
          <h3 class="section-title">各单位问题整改情况</h3>
          <UnitProblemRanking />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import UnitCompletionRanking from '../components/screen6/UnitCompletionRanking.vue'
import UnitSecurityAverageRanking from '../components/screen6/UnitSecurityAverageRanking.vue'
import BlockCompletionStats from '../components/screen6/BlockCompletionStats.vue'
import PasswordNavButtons from '../components/screen6/PasswordNavButtons.vue'
import RiskCounters from '../components/screen6/RiskCounters.vue'
import LevelCounters from '../components/screen6/LevelCounters.vue'
import SecurityShield from '../components/screen6/SecurityShield.vue'
import SystemRiskLevel from '../components/screen6/SystemRiskLevel.vue'
import EvaluationCountRanking from '../components/screen6/EvaluationCountRanking.vue'
import EvaluationQualityRanking from '../components/screen6/EvaluationQualityRanking.vue'
import SecurityProblemTypeStats from '../components/screen6/SecurityProblemTypeStats.vue'
import ProblemTypeRanking from '../components/screen6/ProblemTypeRanking.vue'
import UnitProblemRanking from '../components/screen6/UnitProblemRanking.vue'
import SecurityNavButtons from '../components/screen2/SecurityNavButtons.vue'

// 引入通用样式
import '../styles/dashboard-common.css'
</script>

<style scoped>
/* Screen6 特有样式 */
.security-shield-wrapper {
  position: absolute;
  top: 100px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 8;
  width: 400px;
  height: 400px;
}

.risk-counters-wrapper {
  position: absolute;
  top: 150px;
  left: 100px;
  z-index: 5;
}

.risk-level-wrapper {
  position: absolute;
  top: 353px;
  z-index: 10;
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 30px;
}

.level-counters-wrapper{
  position: absolute;
  top: 150px;
  right: 100px;
  z-index: 5;
}

/* 调整center面板布局以适应Shield和RiskLevel */
.center-main-area {
  position: relative;
  height: 100%;
}



/* 中间背景图片容器样式 */
.mid-bg-container {
  width: 100%;
  height: 100%;
  background-image: url('../assets/screen6_mid_bg.png');
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