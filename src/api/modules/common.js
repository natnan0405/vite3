/*
 * @Author: NanNan
 * @Date: 2022-11-05 15:36:44
 * @LastEditTime: 2022-11-10 10:49:35
 * @Description: 公共参数相关
 */
import Service from '../index'; //引入封装的axios
export default {
  //- 公共搜索参数
  customerSearchParameter() {
    return Service.post(`/rs/public/customerSearchParameter
    `);
  },
};
