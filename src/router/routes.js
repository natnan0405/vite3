/*
 * @Author: NanNan
 * @Date: 2022-11-08 09:28:02
 * @LastEditTime: 2022-11-10 10:18:26
 * @Description: 路由
 */
import LayoutPage from '@/components/layout/index.vue';
import userRoutes from './modules/user';
//
import WorkIndexPage from '@/views/work/index.vue';
import WorkCheckPage from '@/views/work/check.vue';
import WorkApplyPage from '@/views/work/apply.vue';
import WorkTodoPage from '@/views/work/todo.vue';

const routes = [
  {
    path: '/',
    component: LayoutPage,
    redirect: '/work/index',
    children: [
      {
        path: '/work/index',
        name: ['首页', '工作台'],
        component: WorkIndexPage,
      },
      {
        path: '/work/todo',
        name: ['首页', '待办事项'],
        component: WorkTodoPage,
      },
      {
        path: '/work/check',
        name: ['首页', '我的申请'],
        component: WorkCheckPage,
      },
      {
        path: '/work/apply',
        name: ['首页', '我的审批'],
        component: WorkApplyPage,
      },
    ],
  },
  ...userRoutes,
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/404.vue'),
  },
];
export default routes;
