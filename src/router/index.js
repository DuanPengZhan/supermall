import {
  createRouter,
  createWebHistory
} from 'vue-router'


const routes = [{
    path: '',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'Home',
    meta: {
      keepAlive: true,  // 设置页面是否需要使用缓存
      footShow: true,
    },
    component: () => import('../views/home/Home.vue'),
  },
  {
    path: '/cart',
    name: 'Cart',
    meta: {
      keepAlive: true,  // 设置页面是否需要使用缓存
      footShow: true,
    },
    component: () => import('../views/cart/Cart.vue'),
  },
  {
    path: '/category',
    name: 'Category',
    meta: {
      keepAlive: true,  // 设置页面是否需要使用缓存
      footShow: true,
    },
    component: () => import('../views/category/Category.vue'),
  },
  {
    path: '/profile',
    name: 'Profile',
    meta: {
      keepAlive: true,  // 设置页面是否需要使用缓存
      footShow: true,
    },
    component: () => import('../views/profile/Profile.vue'),
  },
  {
    path: '/detail/:iid',
    name: 'Detail',
    meta: {
      keepAlive: true,  // 设置页面是否需要使用缓存
    },
    component: () => import('../views/detail/Detail.vue'),
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router