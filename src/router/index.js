import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TeamNew from '../views/team/TeamNew.vue'
import TeamEdit from '../views/team/TeamEdit.vue'
import TeamHomeView from '../views/team/TeamHomeView.vue'
import PlayerNew from '../views/player/PlayerNew.vue'
import PlayerEdit from '../views/player/PlayerEdit.vue'
import PlayerHomeView from '../views/player/PlayerHomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/listT',
    name: 'listT',
    component: TeamHomeView
  },
  {
    path: '/createT',
    name: 'createT',
    component: TeamNew
  },
  {
    path: '/editT/:id',
    name: 'editT',
    component: TeamEdit
  },
  {
    path: '/listP',
    name: 'listP',
    component: PlayerHomeView
  },
  {
    path: '/createP',
    name: 'createP',
    component: PlayerNew
  },
  {
    path: '/editP/:id',
    name: 'editP',
    component: PlayerEdit
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
