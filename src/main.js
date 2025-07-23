import { createApp } from 'vue'
import App from './App.vue'
import Pie3DChartTest from './pages/Pie3DChartTest.vue'
import SimplePie3DTest from './pages/SimplePie3DTest.vue'
import './styles/index.css'

// 检查URL参数，如果包含test参数，则加载对应的测试页面
const urlParams = new URLSearchParams(window.location.search)
const testMode = urlParams.get('test')

let component = App
if (testMode === 'pie3d') {
  component = Pie3DChartTest
} else if (testMode === 'simple') {
  component = SimplePie3DTest
}

createApp(component).mount('#app')