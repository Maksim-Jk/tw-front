export enum PROTECTED_ROUTES {
  WELCOME = 'welcome',
  CREATE_TASK = 'create_task',
  MESSAGES = 'messages',
  TASK = 'task_by_id',
  NOTIFICATIONS = 'notifications',
  SETTINGS = 'settings',
}

export enum ROUTES {
  LOGIN = '/login',
  REGISTER = '/register',
}

export const DEFAULT_ROUTE = PROTECTED_ROUTES.WELCOME;

export const protectedRoutes = [
  {
    path: '/task',
    children: [
      {
        path: '/',
        name: PROTECTED_ROUTES.WELCOME,
        component: (): Promise<typeof import('@/views/protected/WelcomeView.vue')> =>
          import('@/views/protected/WelcomeView.vue'),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: 'create',
        name: PROTECTED_ROUTES.CREATE_TASK,
        component: (): Promise<typeof import('@/views/protected/CreateTaskView.vue')> =>
          import('@/views/protected/CreateTaskView.vue'),
        meta: {
          title: 'pages.taskCreate',
          requiresAuth: true,
        },
      },
      // {
      //   path: 'result/:id',
      //   name: PROTECTED_ROUTES.FORM_RESULT,
      //   component: (): Promise<typeof import('@/views/FormResult.vue')> =>
      //     import('@/views/FormResult.vue'),
      //   meta: {
      //     title: 'pages.formResultDetails',
      //     requiresAuth: true,
      //   },
      // },
    ],
  },
];

export const publicRoutes = [
  {
    path: '/login',
    name: ROUTES.LOGIN,
    component: (): Promise<typeof import('@/views/public/LoginView.vue')> =>
      import('@/views/public/LoginView.vue'),
    meta: {
      title: 'routes.login',
    },
  },
  {
    path: '/register',
    name: ROUTES.REGISTER,
    component: (): Promise<typeof import('@/views/public/RegisterView.vue')> =>
      import('@/views/public/RegisterView.vue'),
    meta: {
      title: 'routes.register',
    },
  },
];
