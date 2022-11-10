/*
 * @Author: NanNan
 * @Date: 2022-11-05 15:36:44
 * @LastEditTime: 2022-11-05 15:55:21
 * @Description:
 */
import Service from '../index'; //引入封装的axios
export default {
  /**
   * 登录
   */
  login(param) {
    return Service.post(`/rs/user/login`, param);
  },
  /**
   * 是否登录
   */
  isLogin() {
    return Service.post(`/rs/user/isLogin`);
  },
};
