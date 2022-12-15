/*
 * @Author: NanNan
 * @Date: 2022-11-08 18:48:50
 * @LastEditTime: 2022-12-15 15:35:41
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

  {
    name: '材料',
    class: 'icon-work',
    path: 'work',
    children: [
      {
        name: '全部供应商',
        path: '/materials/supplier',
      },
      {
        name: '进度计划表',
        path: '/materials/progress',
      },
    ],
  },
];
export default routesData;
