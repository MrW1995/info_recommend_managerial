import Vue from 'vue'
import Router from 'vue-router'
const Login = () =>import('../pages/Login/Login')
const HomePage = () =>import('../pages/HomePage/HomePage')
const InfoEcharts = () =>import('../pages/InfoEcharts/InfoEcharts')
const UserSearch = () =>import('../pages/UserSearch/UserSearch')
const ArticleCountPage = () =>import('../pages/ArticleCountPage/ArticleCountPage')
const FeedBack = () =>import('../pages/FeedBack/FeedBack')
const Manager = () =>import('../pages/Manager/Manager')
const addSort = () =>import('../pages/addSort/addSort')

Vue.use(Router)

let router =  new Router({
  routes: [
    {
      path: '/',
      redirect:'/login'
    },
    {
      path:'/login',
      component:Login
    },
    {
      path:'/homePage',
      component:HomePage,
      children:[
        {
          path:'/homePage',
          redirect: '/homePage/infoEcharts'
        },
        {
          path:'/homePage/infoEcharts',
          component:InfoEcharts
        },
        {
          path:'/homePage/userSearch',
          component:UserSearch
        },
        {
          path:'/homePage/articleCountPage',
          component:ArticleCountPage
        },
        {
          path:'/homePage/feedBack',
          component:FeedBack
        },
        {
          path:'/homePage/manager',
          component:Manager
        },
        {
          path:'/homePage/addSort',
          component:addSort
        },
      ]
    }

  ]
})

router.beforeEach((to,from,next) =>{
  if(to.path.startsWith("/login")){
    window.localStorage.removeItem("token");
    next();
  }else{
    let token = window.localStorage.getItem("token");
    if(!token){
      next("/login");
    }else{
      next();
    }
  }
})

export default router
