/*
 * @Author: NanNan
 * @Date: 2022-12-08 11:40:05
 * @LastEditTime: 2022-12-15 15:35:28
 * @Description:
 */
import SupplierPage from '@/views/materials/supplier.vue';
import SupplierProgressPage from '@/views/materials/progress.vue';

const materialsRoutes = [
  {
    path: '/materials/supplier',
    name: 'supplier',
    component: SupplierPage,
    meta: {
      is_login: false,
    },
  },
  {
    path: '/materials/progress',
    name: 'supplier',
    component: SupplierProgressPage,
    meta: {
      is_login: false,
    },
  },
];
export default materialsRoutes;
