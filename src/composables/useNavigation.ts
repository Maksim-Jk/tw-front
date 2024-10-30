import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import type { RouteRecordRaw } from 'vue-router';

interface NavItem {
  path: string;
  name: string;
}

export const useNavigation = () => {
  const router = useRouter();
  const { t } = useI18n();

  const getNavigationItems = (routes: RouteRecordRaw[], parentPath: string = ''): NavItem[] => {
    const items: NavItem[] = [];

    const processRoute = (route: RouteRecordRaw, currentPath: string) => {
      const fullPath = currentPath + '/' + route.path.replace(/^\//, '');

      if (route.meta?.showInNav) {
        items.push({
          path: fullPath,
          name: t(route.meta.title as string),
        });
      }

      if (route.children) {
        route.children.forEach((child) => processRoute(child, fullPath));
      }
    };

    const authRoute = routes.find((route) => route.meta?.requiresAuth);
    if (authRoute && authRoute.children) {
      authRoute.children.forEach((route) => processRoute(route, parentPath));
    }

    return items;
  };

  const navItems = computed(() => getNavigationItems(router.options.routes));

  return {
    navItems,
  };
};
