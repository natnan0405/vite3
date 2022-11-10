/*
 * @Author: NanNan
 * @Date: 2022-11-08 14:03:24
 * @LastEditTime: 2022-11-09 16:19:38
 * @Description: 封装方法
 */
// 获取静态图片
const getAssetsImages = (name) => {
  return new URL(`/src/assets/images/${name}`, import.meta.url).href;
};
// 字符串拼接
const getStr = (split_str, ...arr) => {
  const new_arr = arr.filter((item) => item !== '');
  return new_arr?.length > 0 ? new_arr.join(split_str) : '';
};
export { getAssetsImages, getStr };
