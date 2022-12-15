/*
 * @Author: NanNan
 * @Date: 2022-12-08 11:45:25
 * @LastEditTime: 2022-12-15 17:06:31
 * @Description: 材料
 */
import Service from '../index'; //引入封装的axios

export default {
  /**
   * 供应商 公共参数
   */
  supplierParam(param) {
    return Service.post(`/rs/public/supplierParam`, param);
  },
  /**
   * 供应商列表
   */
  supplierList(param) {
    return Service.post(`/rs/supplier/supplierList`, param);
  },
  /**
   * 供应商结算信息设置
   */
  supplierSettlementEdit(param) {
    return Service.post(`/rs/supplier/supplierSettlementEdit`, param);
  },
  /**
   * 供应商结算信息(编辑)详情
   */
  supplierSettlementInfo(param) {
    return Service.post(`/rs/supplier/supplierSettlementInfo`, param);
  },
  /**
   * 供应商结算信息参数
   */
  supplierSettlementParam(param) {
    return Service.post(`/rs/public/supplierSettlementParam`, param);
  },

  /**
   * /rs/construction/nodeList
   */
  getNodeList(param) {
    return Service.post(`/rs/construction/nodeList`, param);
  },
};
