import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login/'
import Home from '@/views/home/'
import Layout from '@/views/layout/'
import Article from  '@/views/article/'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    // name: 'layout',
    component: Layout,
    children: [
      {
        path: '',
        name: 'home',
        component: Home
      },
      {
        path: '/article',
        name: 'article',
        component: Article
      }
    ]
  },

]

const router = new VueRouter({
  routes
})

router.beforeEach((to,from,next)=>{
  if(to.path !== '/login'){
    const  user = JSON.parse(window.localStorage.getItem('user'))
    if(user){
      next()
    }else{
      next('/login')
    }
  }else {
    next()
  }

})

export default router
