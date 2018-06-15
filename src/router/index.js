import Vue from 'vue'
import Router from 'vue-router'
import home from '@/views/home'
import round from '@/views/round'
import newRound from '@/views/newRound'
import scorecard from '@/views/scorecard'
import selectCourse from '@/views/selectCourse'
import selectPlayer from '@/views/selectPlayer'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: home
    },
    {
      path: '/new',
      name: 'New',
      component: newRound
    },
    {
      path: '/course',
      name: 'selectCourse',
      component: selectCourse
    },    
    {
      path: '/players',
      name: 'selectPlayer',
      component: selectPlayer
    }, 
    {
      path: '/round/:num?',
      name: 'Round',
      component: round
    },
    {
      path: '/card',
      name: 'Scorecard',
      component: scorecard
    },    

  ]
})
