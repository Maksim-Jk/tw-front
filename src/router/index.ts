import { createRouter, createWebHistory } from 'vue-router';
import { useAuth } from '@/composables/useAuth';
import { DEFAULT_ROUTE, ROUTES, protectedRoutes, publicRoutes } from './routes';

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/layouts/PrivateLayout.vue'),
      meta: {
        requiresAuth: true,
      },
      children: [...protectedRoutes],
    },
    {
      path: '/',
      component: () => import('@/layouts/PublicLayout.vue'),
      children: [...publicRoutes],
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: { name: DEFAULT_ROUTE },
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const auth = useAuth();
  const isAuthenticated = await auth.getCurrentUser();

  if (to.meta.requiresAuth && !isAuthenticated) {
    next(ROUTES.LOGIN);
  }

  if ((to.name === ROUTES.LOGIN || to.name === ROUTES.REGISTER) && isAuthenticated) {
    next(DEFAULT_ROUTE);
  }

  next();
});

export default router;
