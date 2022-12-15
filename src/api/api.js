/*
 * @Author: NanNan
 * @Date: 2022-11-05 15:36:35
 * @LastEditTime: 2022-12-08 11:49:21
 * @Description: api封装
 */
import commonApi from '@/api/modules/common.js'; //引入公共api

import userApi from '@/api/modules/user.js'; //引入用户api
import workApi from '@/api/modules/work.js'; //引入首页api
import materialsApi from '@/api/modules/materials.js'; //引入材料

export default {
  commonApi,
  userApi,
  workApi,
  materialsApi,
};
