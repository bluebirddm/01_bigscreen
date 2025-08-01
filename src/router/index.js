import { createRouter, createWebHistory } from 'vue-router'
import Screen1 from '../pages/Screen1.vue'
import Screen2 from '../pages/Screen2.vue'
import Screen3 from '../pages/Screen3.vue'
import Screen4 from '../pages/Screen4.vue'
import Screen5 from '../pages/Screen5.vue'
import Screen6 from '../pages/Screen6.vue'
import Screen7 from '../pages/Screen7.vue'
import Pie3DChartTest from '../pages/test/Pie3DChartTest.vue'
import SimplePie3DTest from '../pages/test/SimplePie3DTest.vue'
import StackedBarChartTest from '../components/StackedBarChartTest.vue'
import Bar3DTest from '../pages/test/Bar3DTest.vue'
import Circle3DBarTest from '../pages/test/Circle3DBarTest.vue'
import TestRisk3D from '../views/TestRisk3D.vue'
import TestRisk3DEffect from '../views/TestRisk3DEffect.vue'
import TestRisk3DMonitor from '../views/TestRisk3DMonitor.vue'
import PieSunburstTest from '../pages/test/PieSunburstTest.vue'
import StackedCircle3DTest from '../pages/test/StackedCircle3DTest.vue'

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
    path: '/screen4',
    name: 'Screen4',
    component: Screen4
  },
  {
    path: '/screen5',
    name: 'Screen5',
    component: Screen5
  },
  {
    path: '/screen6',
    name: 'Screen6',
    component: Screen6
  },
  {
    path: '/screen7',
    name: 'Screen7',
    component: Screen7
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
    path: '/test/circle3d',
    name: 'Circle3DBarTest',
    component: Circle3DBarTest
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
  },
  {
    path: '/test/pie-sunburst',
    name: 'PieSunburstTest',
    component: PieSunburstTest
  },
  {
    path: '/test/stacked-circle3d',
    name: 'StackedCircle3DTest',
    component: StackedCircle3DTest
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router