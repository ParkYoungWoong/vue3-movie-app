import { createRouter, createWebHashHistory } from 'vue-router'
import Home from './Home'
import Movie from './Movie'
import About from './About'
import NotFound from './NotFound'

export default createRouter({
  history: createWebHashHistory(),
  scrollBehavior() {
    return { top: 0 }
  },
  routes: [
    {
      name: 'Home',
      path: '/',
      component: Home
    },
    {
      name: 'Movie',
      path: '/movie/:id?',
      component: Movie
    },
    {
      name: 'About',
      path: '/about',
      component: About
    },
    {
      name: 'NotFound',
      path: '/:pathMatch(.*)*',
      component: NotFound
    }
  ]
})
