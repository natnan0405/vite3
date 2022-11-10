/*
 * @Author: NanNan
 * @Date:  2022-11-08 09:25:57
 * @LastEditTime: 2022-11-09 11:27:27
 * @Description:
 */
import { createRouter, createWebHistory } from 'vue-router';
import routes from './routes';
const router = createRouter({
  // 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHistory(),
  routes, // `routes: routes` 的缩写
});

export default router;
