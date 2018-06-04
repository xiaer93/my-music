import Vue from 'vue'
import Router from 'vue-router'
import Recommend from 'components/recommend/recommend'
import HotMusic from 'components/hot-music/hot-music'
import Search from 'components/search/search'
import PlayList from 'components/play-list/play-list'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/recommend',
      component: Recommend,
      children: [
        {
          path: ':id',
          component: PlayList
        }
      ]
    },
    {
      path: '/hotmusic',
      component: HotMusic
    },
    {
      path: '/search',
      component: Search
    }
  ]
})
