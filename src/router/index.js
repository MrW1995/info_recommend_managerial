import Vue from 'vue'
import Router from 'vue-router'
const HomePage = () =>import('../components/HomePage/HomePage')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage
    }
  ]
})
