import LoginPage from '@/views/user/login.vue';

const userRoutes = [
  {
    path: '/login',
    name: 'login',
    component: LoginPage,
    meta: {
      is_login: false,
    },
  },
];
export default userRoutes;
