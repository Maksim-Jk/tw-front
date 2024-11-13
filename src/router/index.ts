import { createRouter, createWebHistory } from 'vue-router';
import { DEFAULT_ROUTE, protectedRoutes, publicRoutes } from './routes';
import { TokenService } from '@/services/token.service';

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes: [
    {
      path: '/',
      component: (): Promise<typeof import('@/layouts/PrivateLayout.vue')> =>
        import('@/layouts/PrivateLayout.vue'),
      meta: {
        requiresAuth: true,
      },
      children: [...protectedRoutes],
    },
    {
      path: '/',
      component: (): Promise<typeof import('@/layouts/PublicLayout.vue')> =>
        import('@/layouts/PublicLayout.vue'),
      children: [...publicRoutes],
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: { name: DEFAULT_ROUTE },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const isAuthenticated = TokenService.isTokenValid();

  if (requiresAuth && !isAuthenticated) {
    next('/login');
  } else if (!requiresAuth && isAuthenticated) {
    next('/');
  } else {
    next();
  }
});

export default router;
