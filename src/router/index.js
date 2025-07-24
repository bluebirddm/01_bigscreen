import { createRouter, createWebHistory } from 'vue-router'
import Screen1 from '../pages/Screen1.vue'
import Pie3DChartTest from '../pages/Pie3DChartTest.vue'
import SimplePie3DTest from '../pages/SimplePie3DTest.vue'
import StackedBarChartTest from '../components/StackedBarChartTest.vue'

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
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router