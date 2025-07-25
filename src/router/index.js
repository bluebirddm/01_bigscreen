import { createRouter, createWebHistory } from 'vue-router'
import Screen1 from '../pages/Screen1.vue'
import Screen2 from '../pages/Screen2.vue'
import Screen3 from '../pages/Screen3.vue'
import Pie3DChartTest from '../pages/test/Pie3DChartTest.vue'
import SimplePie3DTest from '../pages/test/SimplePie3DTest.vue'
import StackedBarChartTest from '../components/StackedBarChartTest.vue'
import Bar3DTest from '../pages/test/Bar3DTest.vue'
import TestRisk3D from '../views/TestRisk3D.vue'
import TestRisk3DEffect from '../views/TestRisk3DEffect.vue'
import TestRisk3DMonitor from '../views/TestRisk3DMonitor.vue'

const routes = [
  {
    path: '/',
    name: 'Screen1',
    component: Screen1
  },
  {
    path: '/screen1',
    name: 'Screen1Alias',
    component: Screen1
  },
  {
    path: '/screen2',
    name: 'Screen2',
    component: Screen2
  },
  {
    path: '/screen3',
    name: 'Screen3',
    component: Screen3
  },
  {
    path: '/test/pie3d',
    name: 'Pie3DTest',
    component: Pie3DChartTest
  },
  {
    path: '/test/simple',
    name: 'SimplePie3DTest',
    component: SimplePie3DTest
  },
  {
    path: '/test/stacked',
    name: 'StackedBarTest',
    component: StackedBarChartTest
  },
  {
    path: '/test/bar3d',
    name: 'Bar3DTest',
    component: Bar3DTest
  },
  {
    path: '/test/risk3d',
    name: 'TestRisk3D',
    component: TestRisk3D
  },
  {
    path: '/test/risk3d-effect',
    name: 'TestRisk3DEffect',
    component: TestRisk3DEffect
  },
  {
    path: '/test/risk3d-monitor',
    name: 'TestRisk3DMonitor',
    component: TestRisk3DMonitor
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router