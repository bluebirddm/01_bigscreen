<template>
  <div class="system-risk-level">
    <Risk3DEffect
      :value="213"
      trend="down"
      label="不符合"
      unit="个"
      colorTheme="red"
    />
    <Risk3DEffect
      :value="3485"
      trend="up"
      label="符合"
      unit="个"
      colorTheme="blue"
    />
    <Risk3DEffect
      :value="234"
      trend="up"
      label="基本符合"
      unit="个"
      colorTheme="yellow"
    />
  </div>
</template>

<script setup>
import Risk3DEffect from '../Risk3DEffect.vue'
</script>

<style scoped>
.system-risk-level {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  transform: scale(0.8);
  position: relative;
  padding: 0 50px; /* 可以调整这个值来控制整体左右边距 */
}

/* 第一个元素 - 自由调节距离左边的距离 */
.system-risk-level > :nth-child(1) {
  margin-left: -136px; /* 调整这个值来控制第一个元素距离左边的距离 */
}

/* 第二个元素 - 居中 */
.system-risk-level > :nth-child(2) {
  position: absolute;
  left: 458px;
  transform: translateX(-50%);
}

/* 第三个元素 - 自由调节距离右边的距离 */
.system-risk-level > :nth-child(3) {
  margin-right: -136px; /* 调整这个值来控制第三个元素距离右边的距离 */
  margin-left: auto; /* 让它自动靠右 */
}
</style>