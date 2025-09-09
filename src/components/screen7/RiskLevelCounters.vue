<template>
  <div class="risk-level-counters">
    <div class="risk-item risk-item-left">
      <Risk3DEffect
        :value="234"
        trend="down"
        label="高危"
        unit="个"
        colorTheme="red"
      />
    </div>
    <div class="risk-item risk-item-center">
      <Risk3DEffect
        :value="234"
        trend="stable"
        label="中危"
        unit="个"
        colorTheme="yellow"
      />
    </div>
    <div class="risk-item risk-item-right">
      <Risk3DEffect
        :value="237"
        trend="up"
        label="低危"
        unit="个"
        colorTheme="blue"
      />
    </div>
  </div>
</template>

<script setup>
import Risk3DEffect from '../Risk3DEffect.vue'
</script>

<style scoped>
.risk-level-counters {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  width: 100%;
  transform: scale(0.8);
  position: relative;
  padding: 20px 0;
}

.risk-item {
  position: relative;
  transition: transform 0.3s ease;
}

/* 左侧组件 - 向左下偏移并旋转 */
.risk-item-left {
  transform: translateY(0px) translateX(-30px) rotate(-0deg);
  z-index: 1;
}

/* 中间组件 - 作为弧形顶点，位置最高 */
.risk-item-center {
  transform: translateY(120px) translateX(0) rotate(0deg);
  z-index: 2;
  margin: 0 -10px; /* 减小间距让弧形更紧凑 */
}

/* 右侧组件 - 向右下偏移并旋转 */
.risk-item-right {
  transform: translateY(0px) translateX(30px) rotate(0deg);
  z-index: 1;
}

/* 悬停效果 - 增强交互体验 */
.risk-item:hover {
  transform: scale(1.05) translateY(0px);
  z-index: 10;
}

.risk-item-left:hover {
  transform: scale(1.05) translateY(5px) translateX(0) rotate(-0deg);
}

.risk-item-center:hover {
  transform: scale(1.05) translateY(-5px) translateX(0) rotate(0deg);
}

.risk-item-right:hover {
  transform: scale(1.05) translateY(5px) translateX(0) rotate(0deg);
}
</style>