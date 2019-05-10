import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import User from '@/components/User'
import Raids from '@/components/Raids'
import NewTrashtag from '@/components/NewTrashtag'
import NotFound from '@/components/NotFound'
import Trashmarker from '@/components/Trashmarker'
import Trashtag from '@/components/Trashtag'
import Trashtags from '@/components/Trashtags'
import Raid from '@/components/Raid'
import Contact from '@/components/Contact'
import About from '@/components/About'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/raids',
      name: 'Raids',
      component: Raids
    },
    {
      path: '/newtrashtag',
      name: 'NewTrashtag',
      component: NewTrashtag
    },
    {
      path: '/trashmarker/:id',
      name: 'Trashmarker',
      component: Trashmarker
    },
    {
      path: '/trashtag/:id',
      name: 'Trashtag',
      component: Trashtag
    },
    {
      path: '/trashtags',
      name: 'Trashtags',
      component: Trashtags
    },
    {
      path: '/raid/:id',
      name: 'Raid',
      component: Raid
    },
    {
      path: '/user/:username',
      name: 'User',
      component: User
    },
    {
      path: '/contact',
      name: 'Contact',
      component: Contact
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '*',
      name: 'NotFound',
      component: NotFound
    }
  ]
})
