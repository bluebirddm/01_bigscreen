<template>
  <div class="security-shield">
    <div ref="threeContainer" class="three-container"></div>
    <div class="shield-info">
      <div class="info-card left-card">
        <div class="card-title">风险评估总数（累计）</div>
        <div class="card-value">8052<span class="unit">个</span></div>
      </div>
      <div class="info-card right-card">
        <div class="card-title">风险评估总数（本年）</div>
        <div class="card-value">2349<span class="unit">个</span></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'

const threeContainer = ref(null)

let scene, camera, renderer, animationId
let shield, shieldGlow, rings = []
let clock = new THREE.Clock()

const initThreeScene = () => {
  scene = new THREE.Scene()
  
  const aspect = 400 / 400
  camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 1000)
  camera.position.set(0, 0, 8)
  camera.lookAt(0, 0, 0)
  
  renderer = new THREE.WebGLRenderer({ 
    antialias: true, 
    alpha: true
  })
  renderer.setSize(400, 400)
  renderer.setClearColor(0x000000, 0)
  
  threeContainer.value.appendChild(renderer.domElement)
}

const createShield = () => {
  // 创建盾牌形状
  const shape = new THREE.Shape()
  const x = 0, y = 0
  shape.moveTo(x, y + 2)
  shape.bezierCurveTo(x, y + 2, x - 1.5, y + 1.5, x - 1.5, y)
  shape.bezierCurveTo(x - 1.5, y - 1, x - 1, y - 2, x, y - 2.5)
  shape.bezierCurveTo(x + 1, y - 2, x + 1.5, y - 1, x + 1.5, y)
  shape.bezierCurveTo(x + 1.5, y + 1.5, x, y + 2, x, y + 2)
  
  // 挤出几何体
  const extrudeSettings = {
    depth: 0.3,
    bevelEnabled: true,
    bevelSegments: 5,
    steps: 2,
    bevelSize: 0.1,
    bevelThickness: 0.1
  }
  
  const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings)
  
  // 创建发光材质
  const material = new THREE.MeshPhongMaterial({
    color: 0x00bfff,
    emissive: 0x0066cc,
    emissiveIntensity: 0.5,
    shininess: 100,
    transparent: true,
    opacity: 0.9
  })
  
  shield = new THREE.Mesh(geometry, material)
  shield.position.set(0, 0, 0)
  scene.add(shield)
  
  // 添加盾牌中心的锁图标
  const lockGeometry = new THREE.BoxGeometry(0.3, 0.4, 0.1)
  const lockMaterial = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    emissive: 0x00bfff,
    emissiveIntensity: 0.3
  })
  const lock = new THREE.Mesh(lockGeometry, lockMaterial)
  lock.position.set(0, -0.2, 0.2)
  shield.add(lock)
  
  // 锁环
  const torusGeometry = new THREE.TorusGeometry(0.15, 0.03, 8, 16, Math.PI)
  const lockRing = new THREE.Mesh(torusGeometry, lockMaterial)
  lockRing.position.set(0, 0.1, 0.2)
  lockRing.rotation.z = Math.PI
  shield.add(lockRing)
}

const createGlowEffect = () => {
  // 创建外发光效果
  const glowGeometry = new THREE.SphereGeometry(3, 32, 32)
  const glowMaterial = new THREE.MeshBasicMaterial({
    color: 0x00bfff,
    transparent: true,
    opacity: 0.1,
    side: THREE.BackSide
  })
  
  shieldGlow = new THREE.Mesh(glowGeometry, glowMaterial)
  scene.add(shieldGlow)
}

const createRings = () => {
  const ringCount = 3
  
  for (let i = 0; i < ringCount; i++) {
    const radius = 2.5 + i * 0.5
    const ringGeometry = new THREE.RingGeometry(radius, radius + 0.05, 64)
    
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0x00bfff,
      transparent: true,
      opacity: 0.3 - i * 0.08,
      side: THREE.DoubleSide
    })
    
    const ring = new THREE.Mesh(ringGeometry, ringMaterial)
    ring.rotation.x = Math.PI / 2
    ring.userData = { radius, delay: i * 0.5 }
    
    rings.push(ring)
    scene.add(ring)
  }
}

const addLights = () => {
  const ambientLight = new THREE.AmbientLight(0x404040, 0.5)
  scene.add(ambientLight)
  
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
  directionalLight.position.set(5, 5, 5)
  scene.add(directionalLight)
  
  const pointLight = new THREE.PointLight(0x00bfff, 1, 10)
  pointLight.position.set(0, 0, 5)
  scene.add(pointLight)
}

const animate = () => {
  const elapsedTime = clock.getElapsedTime()
  
  if (shield) {
    shield.rotation.y = elapsedTime * 0.3
    shield.rotation.z = Math.sin(elapsedTime * 0.5) * 0.1
    
    // 呼吸效果
    const breathe = Math.sin(elapsedTime * 2) * 0.1 + 1
    shield.scale.setScalar(breathe)
  }
  
  if (shieldGlow) {
    shieldGlow.material.opacity = Math.sin(elapsedTime * 3) * 0.05 + 0.1
  }
  
  // 环形扩散动画
  rings.forEach((ring, index) => {
    const time = (elapsedTime + ring.userData.delay) % 3
    const scale = 1 + time * 0.3
    ring.scale.setScalar(scale)
    ring.material.opacity = Math.max(0, (0.3 - index * 0.08) * (1 - time / 3))
  })
  
  renderer.render(scene, camera)
  animationId = requestAnimationFrame(animate)
}

const cleanup = () => {
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
  
  if (renderer && threeContainer.value) {
    threeContainer.value.removeChild(renderer.domElement)
    renderer.dispose()
  }
}

onMounted(() => {
  initThreeScene()
  // createShield()
  // createGlowEffect()
  // createRings()
  addLights()
  animate()
})

onUnmounted(() => {
  cleanup()
})
</script>

<style scoped>
.security-shield {
  width: 100%;
  height: 100%;
  position: relative;
}

.three-container {
  width: 100%;
  height: 100%;
}

.shield-info {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  display: flex;
  justify-content: space-between;
  pointer-events: none;
}

.info-card {
  background: rgba(0, 20, 40, 0.8);
  border: 1px solid rgba(0, 191, 255, 0.3);
  border-radius: 8px;
  padding: 15px 20px;
  backdrop-filter: blur(10px);
}

.left-card {
  transform: translateX(-120px);
}

.right-card {
  transform: translateX(120px);
}

.card-title {
  font-size: 12px;
  color: #8cc8ff;
  margin-bottom: 8px;
}

.card-value {
  font-size: 24px;
  color: #00bfff;
  font-weight: bold;
}

.unit {
  font-size: 14px;
  color: #8cc8ff;
  margin-left: 4px;
  font-weight: normal;
}
</style>