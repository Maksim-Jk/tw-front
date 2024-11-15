export enum PROTECTED_ROUTES {
  WELCOME = 'welcome',
  CREATE_TASK = 'create_task',
  EDIT_TASK = 'edit_task',
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
    path: '/',
    name: PROTECTED_ROUTES.WELCOME,
    component: (): Promise<typeof import('@/views/protected/WelcomeView.vue')> =>
      import('@/views/protected/WelcomeView.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/task',
    children: [
      {
        path: 'messages',
        name: PROTECTED_ROUTES.MESSAGES,
        component: (): Promise<typeof import('@/views/protected/TableTasksView.vue')> =>
          import('@/views/protected/TableTasksView.vue'),
        meta: {
          title: 'pages.taskMessages',
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
      {
        path: 'edit/:id',
        name: PROTECTED_ROUTES.EDIT_TASK,
        component: (): Promise<typeof import('@/views/protected/EditTaskView.vue')> =>
          import('@/views/protected/EditTaskView.vue'),
        meta: {
          title: 'pages.taskEdit',
          requiresAuth: true,
        },
      },
      {
        path: 'test',
        name: 'test',
        component: (): Promise<typeof import('@/views/protected/testView.vue')> =>
          import('@/views/protected/testView.vue'),
        meta: {
          title: 'pages.taskEdit',
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
