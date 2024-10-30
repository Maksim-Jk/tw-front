export enum PROTECTED_ROUTES {
  FORM_LIST = '/form-list',
  FORM_CREATE = '/form-create',
  FORM_RESULT = '/form-result/:id',
}

export enum ROUTES {
  LOGIN = '/login',
  REGISTER = '/register',
}

export const DEFAULT_ROUTE = PROTECTED_ROUTES.FORM_LIST;

export const protectedRoutes = [
  {
    path: '/form',
    children: [
      {
        path: 'list',
        name: PROTECTED_ROUTES.FORM_LIST,
        component: () => import('@/views/FormList.vue'),
        meta: {
          title: 'pages.formList',
          showInNav: true,
          requiresAuth: true,
        },
      },
      {
        path: 'create',
        name: PROTECTED_ROUTES.FORM_CREATE,
        component: () => import('@/views/FormCreate.vue'),
        meta: {
          title: 'pages.formCreate',
          showInNav: true,
          requiresAuth: true,
        },
      },
      {
        path: 'result/:id',
        name: PROTECTED_ROUTES.FORM_RESULT,
        component: () => import('@/views/FormResult.vue'),
        meta: {
          title: 'pages.formResultDetails',
          requiresAuth: true,
        },
      },
    ],
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
