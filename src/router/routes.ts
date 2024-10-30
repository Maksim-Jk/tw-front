export enum PROTECTED_ROUTES {
  FORM = '/form',
  FORM_RESULT = '/form-result/:id',
}

export enum ROUTES {
  LOGIN = '/login',
  REGISTER = '/register',
}

export const DEFAULT_ROUTE = PROTECTED_ROUTES.FORM;

export const protectedRoutes = [
  {
    path: '/form',
    name: PROTECTED_ROUTES.FORM,
    component: () => import('@/views/FormView.vue'),
    meta: {
      title: 'pages.form',
      showInNav: true,
      requiresAuth: true,
    },
  },
  {
    path: '/form-result/:id',
    name: PROTECTED_ROUTES.FORM_RESULT,
    component: () => import('@/views/FormResult.vue'),
    meta: {
      title: 'formResultDetails',
      requiresAuth: true,
    },
  },
];

export const publicRoutes = [
  {
    path: '/login',
    name: ROUTES.LOGIN,
    component: () => import('@/views/LoginView.vue'),
    meta: {
      title: 'routes.login',
    },
  },
  {
    path: '/register',
    name: ROUTES.REGISTER,
    component: () => import('@/views/RegisterView.vue'),
    meta: {
      title: 'routes.register',
    },
  },
];
