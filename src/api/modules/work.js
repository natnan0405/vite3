/*
 * @Author: NanNan
 * @Date: 2022-11-05 15:36:44
 * @LastEditTime: 2022-11-10 10:49:48
 * @Description: 首页相关
 */
import Service from '../index'; //引入封装的axios
export default {
  /**
   * 待办事项相关
   * ----------------------------------
   */
  //- 待办列表
  todoList(param) {
    return Service.post(`/rs/todo/list`, param);
  },
};
