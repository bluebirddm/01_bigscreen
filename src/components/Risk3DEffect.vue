<template>
  <div class="risk-3d-effect">
    <!-- Three.js 3D场景容器 -->
    <div ref="threeContainer" class="three-container"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'

// Props定义
const props = defineProps({
  value: {
    type: Number,
    default: 124
  },
  trend: {
    type: String,
    default: 'up',
    validator: (value) => ['up', 'down'].includes(value)
  },
  label: {
    type: String,
    default: '高危'
  },
  unit: {
    type: String,
    default: '个'
  },
  colorTheme: {
    type: String,
    default: 'red',
    validator: (value) => ['red', 'yellow', 'blue'].includes(value)
  }
})

// 响应式引用
const threeContainer = ref(null)

// Three.js 变量
let scene, camera, renderer, animationId
let pyramidGeometry, pyramidMaterials, pyramidMesh
let rings = []
let clock = new THREE.Clock()
let dataCardSprite = null

// 初始化Three.js场景
const initThreeScene = () => {
  // 创建场景
  scene = new THREE.Scene()
  
  // 创建相机 - 45度斜视角
  const aspect = 260 / 200 // 容器宽高比
  camera = new THREE.PerspectiveCamera(65, aspect, 0.1, 1000)
  camera.position.set(5, 5, 5) // 45度角位置 (x=z，y为高度)
  camera.lookAt(0, 0, 0) // 看向原点中心
  
  // 创建渲染器
  renderer = new THREE.WebGLRenderer({ 
    antialias: true, 
    alpha: true // 透明背景
  })
  renderer.setSize(260, 200)
  renderer.setClearColor(0x000000, 0) // 完全透明
  
  // 将渲染器添加到DOM
  threeContainer.value.appendChild(renderer.domElement)
}

// 获取主题颜色
const getThemeColors = () => {
  const themes = {
    red: {
      primary: 0xff8844,
      emissive: 0xff4422,
      ring1: 0xff8844,
      ring2: 0xff6644,
      ringEmissive1: 0x662211,
      ringEmissive2: 0x441100,
      text: '#ff6b6b',
      textShadow: 'rgba(255, 107, 107, 0.5)',
      textLight: '#ffaaaa',
      gradient1: 'rgba(255, 107, 107, 0.1)',
      gradient2: 'rgba(204, 85, 85, 0.1)',
      border: 'rgba(255, 107, 107, 0.6)'
    },
    yellow: {
      primary: 0xffcc44,
      emissive: 0xffaa22,
      ring1: 0xffcc44,
      ring2: 0xffaa44,
      ringEmissive1: 0x886611,
      ringEmissive2: 0x664400,
      text: '#ffcc44',
      textShadow: 'rgba(255, 204, 68, 0.5)',
      textLight: '#ffe088',
      gradient1: 'rgba(255, 204, 68, 0.1)',
      gradient2: 'rgba(204, 163, 54, 0.1)',
      border: 'rgba(255, 204, 68, 0.6)'
    },
    blue: {
      primary: 0x4488ff,
      emissive: 0x2266ff,
      ring1: 0x4488ff,
      ring2: 0x6688ff,
      ringEmissive1: 0x224488,
      ringEmissive2: 0x112266,
      text: '#4488ff',
      textShadow: 'rgba(68, 136, 255, 0.5)',
      textLight: '#88aaff',
      gradient1: 'rgba(68, 136, 255, 0.1)',
      gradient2: 'rgba(54, 109, 204, 0.1)',
      border: 'rgba(68, 136, 255, 0.6)'
    }
  }
  return themes[props.colorTheme] || themes.red
}

// 创建3D四面金字塔
const createPyramid = () => {
  const colors = getThemeColors()
  // 使用简单的CylinderGeometry作为金字塔基础，然后修改为多材质
  pyramidGeometry = new THREE.ConeGeometry(1.2, 2.5, 4) // 4面锥形就是金字塔
  
  // 创建多个明亮材质
  pyramidMaterials = [
    // 4个侧面使用不同的明亮颜色
    new THREE.MeshPhongMaterial({ 
      color: 0xff4444,    // 亮红色
      shininess: 150,
      transparent: true,
      opacity: 0.9 
    }),
    new THREE.MeshPhongMaterial({ 
      color: 0xff8844,    // 橙红色
      shininess: 150,
      transparent: true,
      opacity: 0.9 
    }),
    new THREE.MeshPhongMaterial({ 
      color: 0xffcc44,    // 金黄色
      shininess: 150,
      transparent: true,
      opacity: 0.9 
    }),
    new THREE.MeshPhongMaterial({ 
      color: 0xff6666,    // 亮粉红色
      shininess: 150,
      transparent: true,
      opacity: 0.9 
    }),
  ]
  
  // 创建网格 - 使用发光材质
  const glowMaterial = new THREE.MeshPhongMaterial({ 
    color: colors.primary,
    emissive: colors.emissive,
    emissiveIntensity: 0.5,
    shininess: 250,
    transparent: true,
    opacity: 0.98 
  })
  
  pyramidMesh = new THREE.Mesh(pyramidGeometry, glowMaterial)
  
  // 设置金字塔位置和旋转（尖端向上）
  pyramidMesh.position.set(0, 0.5, 0)
  pyramidMesh.rotation.x = Math.PI // 翻转让尖端向下
  
  scene.add(pyramidMesh)
}

// 创建同心圆环系统
const createRings = () => {
  const colors = getThemeColors()
  const ringCount = 2
  const glowColors = [colors.ring1, colors.ring2]
  const emissiveColors = [colors.ringEmissive1, colors.ringEmissive2]
  
  for (let i = 0; i < ringCount; i++) {
    // 创建指定半径的环形几何体
    const innerRadius = 0.6 + i * 0.8 // 从0.6开始，间距0.8
    const outerRadius = innerRadius + 0.3 // 更粗的环
    const ringGeometry = new THREE.RingGeometry(innerRadius, outerRadius, 64) // 更多分段
    
    // 创建自发光材质 - 使用MeshPhongMaterial支持发光
    const ringMaterial = new THREE.MeshPhongMaterial({
      color: glowColors[i],
      emissive: emissiveColors[i],     // 添加自发光
      emissiveIntensity: 0.6,          // 发光强度
      transparent: true,
      opacity: 0.9 - i * 0.15,
      side: THREE.DoubleSide,
      shininess: 100
    })
    
    // 创建环形网格
    const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial)
    
    // 设置位置和旋转（水平放置）
    ringMesh.position.set(0, -1.2, 0) // 稍微降低位置
    ringMesh.rotation.x = -Math.PI / 2
    
    // 添加自定义属性用于动画
    ringMesh.initialScale = 0.5
    ringMesh.animationDelay = i * 1.2 // 2个环之间1.2秒延迟
    ringMesh.userData = { ring: true, index: i }
    
    rings.push(ringMesh)
    scene.add(ringMesh)
  }
}

// 添加光照
const addLights = () => {
  // 环境光 - 增强亮度
  const ambientLight = new THREE.AmbientLight(0x404040, 0.8)
  scene.add(ambientLight)
  
  // 主方向光 - 从右前方照射
  const directionalLight1 = new THREE.DirectionalLight(0xffffff, 1.2)
  directionalLight1.position.set(3, 4, 3)
  directionalLight1.lookAt(0, 0, 0)
  scene.add(directionalLight1)
  
  // 辅助方向光 - 从左后方照射，突出层次
  const directionalLight2 = new THREE.DirectionalLight(0xffaaaa, 0.6)
  directionalLight2.position.set(-2, 3, -2)
  directionalLight2.lookAt(0, 0, 0)
  scene.add(directionalLight2)
  
  // 顶部点光源 - 增强金字塔顶部亮度
  const pointLight1 = new THREE.PointLight(0xffff88, 1.5, 8)
  pointLight1.position.set(0, 3, 0)
  scene.add(pointLight1)
  
  // 侧面点光源 - 增强面的对比度
  const pointLight2 = new THREE.PointLight(0xff8844, 1, 6)
  pointLight2.position.set(2, 1, 2)
  scene.add(pointLight2)
}

// 动画循环
const animate = () => {
  const elapsedTime = clock.getElapsedTime()
  
  // 金字塔轻微旋转和发光动画
  if (pyramidMesh) {
    pyramidMesh.rotation.y = elapsedTime * 0.5
    
    // 发光呼吸效果 - 更强烈的变化
    const breathe = Math.sin(elapsedTime * 1.5) * 0.4 + 0.6 // 0.2 到 1.0 之间变化
    pyramidMesh.material.emissiveIntensity = breathe
    
    // 额外的颜色脉冲效果
    const pulse = Math.sin(elapsedTime * 3) * 0.1 + 0.9 // 0.8 到 1.0 之间变化
    pyramidMesh.material.opacity = pulse
  }
  
  // 同心圆扩散动画
  rings.forEach((ring, index) => {
    const delay = ring.animationDelay
    const animTime = (elapsedTime - delay) % 3.0 // 3秒循环
    
    if (animTime > 0) {
      // 缩放动画（从小到大）
      const progress = animTime / 3.0
      const scale = ring.initialScale + progress * 1.8 // 更大的扩散范围
      ring.scale.setScalar(scale)
      
      // 透明度动画（从不透明到透明）
      const baseOpacity = 0.9 - index * 0.15
      const opacity = Math.max(0, baseOpacity * (1 - progress))
      ring.material.opacity = opacity
      
      // 发光强度动画
      const emissiveIntensity = 0.6 * (1 - progress * 0.7) // 发光逐渐减弱
      ring.material.emissiveIntensity = emissiveIntensity
    } else {
      // 重置状态
      ring.scale.setScalar(ring.initialScale)
      ring.material.opacity = 0
      ring.material.emissiveIntensity = 0
    }
  })
  
  // 渲染场景
  renderer.render(scene, camera)
  
  // 继续动画
  animationId = requestAnimationFrame(animate)
}

// 清理函数
const cleanup = () => {
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
  
  if (renderer && threeContainer.value) {
    threeContainer.value.removeChild(renderer.domElement)
    renderer.dispose()
  }
  
  // 清理几何体和材质
  if (pyramidGeometry) pyramidGeometry.dispose()
  if (pyramidMaterials) {
    pyramidMaterials.forEach(material => material.dispose())
  }
  
  rings.forEach(ring => {
    if (ring.geometry) ring.geometry.dispose()
    if (ring.material) ring.material.dispose()
  })
  
  // 清理数据卡片
  if (dataCardSprite) {
    if (dataCardSprite.material.map) dataCardSprite.material.map.dispose()
    if (dataCardSprite.material) dataCardSprite.material.dispose()
  }
  
  rings = []
}

// 创建数据卡片的Canvas纹理
const createDataCardTexture = () => {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  const colors = getThemeColors()
  
  // 设置Canvas尺寸
  canvas.width = 768
  canvas.height = 384
  
  // 绘制背景
  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
  gradient.addColorStop(0, colors.gradient1)
  gradient.addColorStop(1, colors.gradient2)
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  
  // 绘制边框
  ctx.strokeStyle = colors.border
  ctx.lineWidth = 3
  ctx.strokeRect(1.5, 1.5, canvas.width - 3, canvas.height - 3)
  
  // 设置文本样式
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  
  // 绘制标签
  ctx.font = 'bold 54px sans-serif'
  ctx.fillStyle = colors.textLight
  ctx.fillText(props.label, canvas.width * 0.25, canvas.height * 0.5)
  
  // 绘制数值
  ctx.font = 'bold 96px sans-serif'
  ctx.fillStyle = colors.text
  ctx.shadowColor = colors.textShadow
  ctx.shadowBlur = 10
  ctx.fillText(props.value.toString(), canvas.width * 0.55, canvas.height * 0.5)
  ctx.shadowBlur = 0
  
  // 绘制单位
  ctx.font = 'bold 48px sans-serif'
  ctx.fillStyle = colors.textLight
  ctx.fillText(props.unit, canvas.width * 0.75, canvas.height * 0.5)
  
  return canvas
}

// 创建数据卡片Sprite
const createDataCardSprite = () => {
  const canvas = createDataCardTexture()
  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  
  const spriteMaterial = new THREE.SpriteMaterial({
    map: texture,
    transparent: true
  })
  
  dataCardSprite = new THREE.Sprite(spriteMaterial)
  dataCardSprite.scale.set(6, 3, 1) // 调整大小
  dataCardSprite.position.set(0, 3.5, 0) // 放置在金字塔上方
  
  scene.add(dataCardSprite)
}

// 生命周期钩子
onMounted(() => {
  initThreeScene()
  createPyramid()
  createRings()
  createDataCardSprite()
  addLights()
  animate()
})

onUnmounted(() => {
  cleanup()
})
</script>

<style scoped>
.risk-3d-effect {
  width: 300px;
  height: 400px;
  position: relative;
  /* background: radial-gradient(ellipse at center bottom, 
    rgba(0, 191, 255, 0.1) 0%, 
    rgba(0, 31, 78, 0.9) 50%, 
    rgba(0, 15, 40, 1) 100%); */
  /* border-radius: 12px; */
  padding: 0px;
  overflow: hidden;
}


/* Three.js容器 */
.three-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 260px;
  height: 200px;
  z-index: 5;
}

/* 添加整体发光效果 */
/* .risk-3d-effect::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 250px;
  height: 250px;
  background: radial-gradient(circle, 
    rgba(255, 107, 107, 0.1) 0%, 
    transparent 70%);
  filter: blur(40px);
  z-index: 0;
} */
</style>