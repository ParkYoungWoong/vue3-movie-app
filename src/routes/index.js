import { createRouter, createWebHistory } from 'vue-router'
import Home from './Home'
import Movie from './Movie'
import About from './About'
import NotFound from './NotFound'

export default createRouter({
  history: createWebHistory(),
  scrollBehavior() {
    return { top: 0 }
  },
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/movie/:id?',
      component: Movie
    },
    {
      path: '/about',
      component: About
    },
    {
      path: '/:pathMatch(.*)*',
      component: NotFound
    }
  ]
})
