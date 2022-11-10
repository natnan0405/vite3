/*
 * @Author: NanNan
 * @Date: 2022-11-08 18:48:50
 * @LastEditTime: 2022-11-09 14:18:21
 * @Description:
 */
const routesData = [
  {
    name: '首页',
    class: 'icon-work',
    path: 'work',
    children: [
      {
        name: '工作台',
        path: '/work/index',
        auth: 264,
      },
      {
        name: '待办事项',
        path: '/work/todo',
      },
      {
        name: '我的申请',
        path: '/work/apply',
      },
      {
        name: '我的审批',
        path: '/work/check',
      },
    ],
  },
];
export default routesData;
