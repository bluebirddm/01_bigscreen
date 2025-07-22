<template>
  <div class="china-map">
    <div class="map-placeholder">
      <div class="map-container">
        <div class="china-outline">
          <div class="map-points">
            <div class="point" v-for="(point, index) in mapPoints" :key="index" 
                 :style="{ left: point.x + '%', top: point.y + '%' }">
              <div class="point-pulse"></div>
              <div class="point-label">{{ point.name }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const mapPoints = ref([
  { name: '北京', x: 58, y: 25, value: 1200 },
  { name: '上海', x: 72, y: 45, value: 1100 },
  { name: '广州', x: 65, y: 75, value: 1000 },
  { name: '深圳', x: 66, y: 78, value: 950 },
  { name: '杭州', x: 70, y: 50, value: 800 },
  { name: '成都', x: 45, y: 55, value: 700 },
  { name: '武汉', x: 60, y: 52, value: 600 },
  { name: '西安', x: 50, y: 45, value: 500 }
])

</script>

<style scoped>
.china-map {
  height: 100%;
  width: 100%;
  position: relative;
}

.map-placeholder {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.map-container {
  width: 80%;
  height: 80%;
  position: relative;
}

.china-outline {
  width: 100%;
  height: 100%;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><path d="M50,50 L350,50 L350,250 L50,250 Z M80,80 L120,60 L180,70 L250,80 L320,90 L330,130 L310,180 L280,220 L200,240 L150,230 L100,200 L70,150 Z" fill="none" stroke="%2300bfff" stroke-width="2" opacity="0.6"/></svg>') center/contain no-repeat;
  border: 2px solid rgba(0, 191, 255, 0.3);
  border-radius: 10px;
  background-color: rgba(0, 191, 255, 0.05);
  position: relative;
}

.map-points {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.point {
  position: absolute;
  transform: translate(-50%, -50%);
  cursor: pointer;
}

.point-pulse {
  width: 12px;
  height: 12px;
  background: #00bfff;
  border-radius: 50%;
  position: relative;
  animation: pulse 2s infinite;
}

.point-pulse::before {
  content: '';
  position: absolute;
  top: -4px;
  left: -4px;
  right: -4px;
  bottom: -4px;
  border: 2px solid rgba(0, 191, 255, 0.5);
  border-radius: 50%;
  animation: ripple 2s infinite;
}

.point-label {
  position: absolute;
  top: -30px;
  left: 50%;
  transform: translateX(-50%);
  color: #00bfff;
  font-size: 12px;
  white-space: nowrap;
  background: rgba(0, 20, 40, 0.8);
  padding: 2px 6px;
  border-radius: 4px;
  border: 1px solid rgba(0, 191, 255, 0.3);
}

@keyframes pulse {
  0% { box-shadow: 0 0 0 0 rgba(0, 191, 255, 0.7); }
  70% { box-shadow: 0 0 0 10px rgba(0, 191, 255, 0); }
  100% { box-shadow: 0 0 0 0 rgba(0, 191, 255, 0); }
}

@keyframes ripple {
  0% { transform: scale(0.8); opacity: 1; }
  100% { transform: scale(2); opacity: 0; }
}
</style>