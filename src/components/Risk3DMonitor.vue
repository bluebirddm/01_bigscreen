<template>
  <div class="risk-3d-monitor">
    <div ref="threeContainer" class="three-container"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'

// 响应式引用
const threeContainer = ref(null)

// Three.js 变量
let scene, camera, renderer, animationId
let rotationGroup, centerRing
let clock = new THREE.Clock()

// 报警图例数据
const alertData = [
  { label: '高危', value: 124, colorTheme: 'red', angle: 0 },
  { label: '中危', value: 86, colorTheme: 'yellow', angle: Math.PI * 2 / 3 },
  { label: '低危', value: 42, colorTheme: 'blue', angle: Math.PI * 4 / 3 }
]

// 初始化Three.js场景
const initThreeScene = () => {
  // 创建场景
  scene = new THREE.Scene()
  scene.background = new THREE.Color(0x0a0e27)
  
  // 创建相机 - 俯视角度
  const aspect = 800 / 600
  camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 1000)
  camera.position.set(0, 15, 25)
  camera.lookAt(0, 0, 0)
  
  // 创建渲染器
  renderer = new THREE.WebGLRenderer({ 
    antialias: true
  })
  renderer.setSize(800, 600)
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap
  
  // 将渲染器添加到DOM
  threeContainer.value.appendChild(renderer.domElement)
}

// 创建中心发光圆环
const createCenterRing = () => {
  const geometry = new THREE.TorusGeometry(10, 0.02, 16, 50)  // 管道半径从0.5改为0.02，更细
  const material = new THREE.MeshPhongMaterial({
    color: 0x00ffff,
    emissive: 0x00ffff,
    emissiveIntensity: 0.5,
    transparent: true,
    opacity: 0.8
  })
  
  centerRing = new THREE.Mesh(geometry, material)
  centerRing.rotation.x = -Math.PI / 2
  centerRing.position.y = 0
  scene.add(centerRing)
  
  // 添加内部发光圆盘
  const diskGeometry = new THREE.CircleGeometry(4.5, 64)
  const diskMaterial = new THREE.MeshPhongMaterial({
    color: 0x004488,
    emissive: 0x0066aa,
    emissiveIntensity: 0.3,
    transparent: true,
    opacity: 0.5,
    side: THREE.DoubleSide
  })
  
  const disk = new THREE.Mesh(diskGeometry, diskMaterial)
  disk.rotation.x = -Math.PI / 2
  disk.position.y = -0.1
  // scene.add(disk)
}

// 创建报警图例组
const createAlertGroup = (data) => {
  const group = new THREE.Group()
  
  // 创建金字塔
  const pyramidGeometry = new THREE.ConeGeometry(1.2, 2.5, 4)
  const colors = getThemeColors(data.colorTheme)
  const pyramidMaterial = new THREE.MeshPhongMaterial({
    color: colors.primary,
    emissive: colors.emissive,
    emissiveIntensity: 0.5,
    shininess: 250,
    transparent: true,
    opacity: 0.98
  })
  
  const pyramid = new THREE.Mesh(pyramidGeometry, pyramidMaterial)
  pyramid.rotation.x = Math.PI
  pyramid.position.y = 1.25  // 调整位置使顶部正好在圆环平面上
  pyramid.position.z = 0  // 恢复原位
  group.add(pyramid)
  
  // 创建扩散圆环
  const ringCount = 2
  for (let i = 0; i < ringCount; i++) {
    const innerRadius = 0.6 + i * 0.8
    const outerRadius = innerRadius + 0.3
    const ringGeometry = new THREE.RingGeometry(innerRadius, outerRadius, 64)
    
    const ringMaterial = new THREE.MeshPhongMaterial({
      color: i === 0 ? colors.ring1 : colors.ring2,
      emissive: i === 0 ? colors.ringEmissive1 : colors.ringEmissive2,
      emissiveIntensity: 0.6,
      transparent: true,
      opacity: 0.9 - i * 0.15,
      side: THREE.DoubleSide,
      shininess: 100
    })
    
    const ring = new THREE.Mesh(ringGeometry, ringMaterial)
    ring.rotation.x = -Math.PI / 2
    ring.position.y = -0.5
    ring.position.z = 0  // 恢复原位
    ring.userData = { 
      initialScale: 0.5,
      animationDelay: i * 1.2,
      index: i
    }
    group.add(ring)
  }
  
  // 创建数据卡片Sprite
  const canvas = createDataCardCanvas(data, colors)
  const texture = new THREE.CanvasTexture(canvas)
  const spriteMaterial = new THREE.SpriteMaterial({
    map: texture,
    transparent: true
  })
  
  const sprite = new THREE.Sprite(spriteMaterial)
  sprite.scale.set(4, 2, 1)
  sprite.position.y = 3.5
  sprite.position.z = 0  // 恢复原位
  group.add(sprite)
  
  return group
}

// 创建数据卡片Canvas
const createDataCardCanvas = (data, colors) => {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  
  canvas.width = 512
  canvas.height = 256
  
  // 绘制背景
  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
  gradient.addColorStop(0, colors.gradient1)
  gradient.addColorStop(1, colors.gradient2)
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  
  // 绘制边框
  ctx.strokeStyle = colors.border
  ctx.lineWidth = 4
  ctx.strokeRect(2, 2, canvas.width - 4, canvas.height - 4)
  
  // 设置文本样式
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  
  // 绘制标签
  ctx.font = 'bold 36px sans-serif'
  ctx.fillStyle = colors.textLight
  ctx.fillText(data.label, canvas.width * 0.25, canvas.height * 0.5)
  
  // 绘制数值
  ctx.font = 'bold 64px sans-serif'
  ctx.fillStyle = colors.text
  ctx.shadowColor = colors.textShadow
  ctx.shadowBlur = 10
  ctx.fillText(data.value.toString(), canvas.width * 0.5, canvas.height * 0.5)
  ctx.shadowBlur = 0
  
  // 绘制趋势箭头
  ctx.save()
  ctx.translate(canvas.width * 0.7, canvas.height * 0.5)
  ctx.fillStyle = '#ff6b6b'
  ctx.beginPath()
  ctx.moveTo(0, -20)
  ctx.lineTo(10, 0)
  ctx.lineTo(5, 0)
  ctx.lineTo(5, 20)
  ctx.lineTo(-5, 20)
  ctx.lineTo(-5, 0)
  ctx.lineTo(-10, 0)
  ctx.closePath()
  ctx.fill()
  ctx.restore()
  
  // 绘制单位
  ctx.font = 'bold 32px sans-serif'
  ctx.fillStyle = colors.textLight
  ctx.fillText('个', canvas.width * 0.85, canvas.height * 0.5)
  
  return canvas
}

// 获取主题颜色
const getThemeColors = (colorTheme) => {
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
  return themes[colorTheme] || themes.red
}

// 添加光照
const addLights = () => {
  // 环境光
  const ambientLight = new THREE.AmbientLight(0x404040, 0.6)
  scene.add(ambientLight)
  
  // 主方向光
  const directionalLight1 = new THREE.DirectionalLight(0xffffff, 1)
  directionalLight1.position.set(5, 10, 5)
  directionalLight1.castShadow = true
  directionalLight1.shadow.camera.near = 0.1
  directionalLight1.shadow.camera.far = 50
  directionalLight1.shadow.camera.right = 15
  directionalLight1.shadow.camera.left = -15
  directionalLight1.shadow.camera.top = 15
  directionalLight1.shadow.camera.bottom = -15
  directionalLight1.shadow.mapSize.width = 1024
  directionalLight1.shadow.mapSize.height = 1024
  scene.add(directionalLight1)
  
  // 辅助方向光
  const directionalLight2 = new THREE.DirectionalLight(0x4488ff, 0.5)
  directionalLight2.position.set(-5, 10, -5)
  scene.add(directionalLight2)
  
  // 点光源
  const pointLight = new THREE.PointLight(0x00ffff, 1, 20)
  pointLight.position.set(0, 5, 0)
  scene.add(pointLight)
}

// 创建所有报警图例
const createAllAlerts = () => {
  rotationGroup = new THREE.Group()
  
  alertData.forEach((data) => {
    const alertGroup = createAlertGroup(data)
    
    // 设置位置（围绕中心圆环）
    const radius = 10  // 与圆环半径相同
    alertGroup.position.x = Math.cos(data.angle) * radius
    alertGroup.position.z = Math.sin(data.angle) * radius
    alertGroup.position.y = 0
    
    alertGroup.userData = data
    rotationGroup.add(alertGroup)
  })
  
  scene.add(rotationGroup)
}

// 动画循环
const animate = () => {
  const elapsedTime = clock.getElapsedTime()
  
  // 旋转主组
  if (rotationGroup) {
    rotationGroup.rotation.y = elapsedTime * 0.2
  }
  
  // 中心圆环呼吸效果
  if (centerRing) {
    const breathe = Math.sin(elapsedTime * 2) * 0.2 + 0.8
    centerRing.material.emissiveIntensity = breathe * 0.5
  }
  
  // 更新每个报警图例
  if (rotationGroup) {
    rotationGroup.children.forEach((alertGroup) => {
      // 直接面向相机，不保持倾斜
      // alertGroup.lookAt(camera.position)
      
      // 保持垂直朝向
      alertGroup.rotation.z = 0
      
      // 上下浮动
      // const floatY = Math.sin(elapsedTime * 1.5 + alertGroup.userData.angle) * 0.3
      // alertGroup.position.y = floatY
      
      // 更新扩散圆环动画
      alertGroup.children.forEach((child) => {
        if (child.userData && child.userData.initialScale !== undefined) {
          const delay = child.userData.animationDelay
          const animTime = (elapsedTime - delay) % 3.0
          
          if (animTime > 0) {
            const progress = animTime / 3.0
            const scale = child.userData.initialScale + progress * 1.8
            child.scale.setScalar(scale)
            
            const baseOpacity = 0.9 - child.userData.index * 0.15
            const opacity = Math.max(0, baseOpacity * (1 - progress))
            child.material.opacity = opacity
          } else {
            child.scale.setScalar(child.userData.initialScale)
            child.material.opacity = 0
          }
        }
      })
    })
  }
  
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
  
  // 清理场景中的所有对象
  scene.traverse((object) => {
    if (object.geometry) object.geometry.dispose()
    if (object.material) {
      if (Array.isArray(object.material)) {
        object.material.forEach(material => material.dispose())
      } else {
        object.material.dispose()
      }
    }
    if (object.material && object.material.map) {
      object.material.map.dispose()
    }
  })
}

// 生命周期钩子
onMounted(() => {
  initThreeScene()
  createCenterRing()
  createAllAlerts()
  addLights()
  animate()
})

onUnmounted(() => {
  cleanup()
})
</script>

<style scoped>
.risk-3d-monitor {
  width: 800px;
  height: 600px;
  position: relative;
  background: #0a0e27;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 0 40px rgba(0, 191, 255, 0.3);
}

.three-container {
  width: 100%;
  height: 100%;
}
</style>