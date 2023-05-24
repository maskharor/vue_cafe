import Vue from 'vue'
import VueRouter from 'vue-router'

// All Accesss
import LoginView from '../views/LoginView.vue'
import BookView from '../views/BookView.vue'
import CantView from '../views/CantView.vue'
import NotFound from '../views/NotFound.vue'

// kasir
import MenuView from '../views/kasir/MenuView.vue'
import HistoryView from '../views/kasir/HistoryView.vue'
import OngoingView from '../views/kasir/OngoingView.vue'
import CartView from '../views/kasir/KeranjangView.vue'
import PrintNota from '../views/kasir/PrintNota.vue'

// Admin
import DataMenu from '../views/admin/DataMenu.vue'
import DataMeja from '../views/admin/DataMeja.vue'
import DataPetugas from '../views/admin/DataPetugas.vue'



// Manager
import ProfitView from '../views/manager/ProfitView.vue'
import FilterView from '../views/manager/FilterView.vue'
import AllView from '../views/manager/AllView.vue'

Vue.use(VueRouter)

const routes = [
  // ALL Access
  {
    path: '/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/cant',
    name: 'cant',
    component: CantView
  },
  {
    path: '*',
    name: 'notfound',
    component: NotFound
  },

  // Kasir Acsess
  {
    path: '/menu',
    name: 'menu',
    component: MenuView,
    meta: {
      requiresAuth: true,
      allowedRoles: ['kasir']
    }
  },
  {
    path: '/history',
    name: 'history',
    component: HistoryView,
    meta: {
      requiresAuth: true,
      allowedRoles: ['kasir']
    }
  },
  {
    path: '/ongoing',
    name: 'ongoing',
    component: OngoingView,
    meta: {
      requiresAuth: true,
      allowedRoles: ['kasir']
    }
  },
  {
    path: '/cart',
    name: 'cart',
    component: CartView,
    meta: {
      requiresAuth: true,
      allowedRoles: ['kasir']
    }
  },
  {
    path: '/printnota/:code',
    name: 'printnota',
    component: PrintNota,
    meta: {
      requiresAuth: true,
      allowedRoles: ['kasir']
    }
  },


  // Admin ACCESS
  {
    path: '/datamenu',
    name: 'datamenu',
    component: DataMenu,
    meta: {
      requiresAuth: true,
      allowedRoles: ['admin']
    }
  },
  {
    path: '/datameja',
    name: 'datameja',
    component: DataMeja,
    meta: {
      requiresAuth: true,
      allowedRoles: ['admin']
    }
  },
  {
    path: '/datapetugas',
    name: 'datapetugas',
    component: DataPetugas,
    meta: {
      requiresAuth: true,
      allowedRoles: ['admin']
    }
  },

  {
    path: '/book',
    name: 'book',
    component: BookView
  },

  // Manager ACCESS
  {
    path: '/profit',
    name: 'profit',
    component: ProfitView,
    meta: {
      requiresAuth: true,
      allowedRoles: ['manager']
    }
  },
  {
    path: '/filter',
    name: 'filter',
    component: FilterView,
    meta: {
      requiresAuth: true,
      allowedRoles: ['manager']
    }
  },
  
  {
    path: '/all',
    name: 'all',
    component: AllView,
    meta: {
      requiresAuth: true,
      allowedRoles: ['manager']
    }
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

router.beforeEach((to, form, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
  if (requiresAuth) {
    const userRole = localStorage.getItem("role")
    if (!userRole) {
      next({
        path: '/'
      })
    } else {
      if (to.meta.allowedRoles.includes(userRole)) {
        next()
      } else {
        next({
          path: '/cant'
        })
      }
    }
  } else {
    next();
  }
})