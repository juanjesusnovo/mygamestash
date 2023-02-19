// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '/',
        name: 'HomeView',
        component: () => import('@/views/HomeView.vue'),
      },
      {
        path: '/PcGames',
        name: 'PcGames',
        component: () => import('@/views/PcView.vue'),
      },
      {
        path: '/NintendoGames',
        name: 'NintendoGames',
        component: () => import('@/views/NintendoView.vue'),
      },
      {
        path: '/PlayGames',
        name: 'PlayGames',
        component: () => import('@/views/PsView.vue'),
      },
      {
        path: "/XboxGames",
        name: "XboxGames",
        component: () => import("@/views/XboxView.vue")
      },
      {
        path: "/FilteredGames",
        name: "FilteredGames",
        component: () => import("@/views/FilterGames.vue")
      },
      {
        path: "/Login",
        name: "Login",
        component: () => import("@/views/LoginView.vue")
      },
      {
        path: "/Register",
        name: "Register",
        component: () => import("@/views/RegisterView.vue")
      }
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
