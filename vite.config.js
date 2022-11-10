/*
 * @Author: NanNan
 * @Date: 2022-11-05 15:18:22
 * @LastEditTime: 2022-11-08 15:34:36
 * @Description: 配置项
 */
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd());
  console.log(env);
  return {
    plugins: [vue()],
    // base: './',
    resolve: {
      //别名
      alias: {
        '@': path.resolve(__dirname, 'src'),
        comps: path.resolve(__dirname, '/src/components'),
        stys: path.resolve(__dirname, '/src/assets/styles'),
        imgs: path.resolve(__dirname, '/src/assets/images'),
      },
    },
    server: {
      proxy: {
        // 选项写法
        '/api': {
          target: env.VITE_APP_DEV_URL, //服务器端接口地址
          secure: false, //起初没有设置，vite运行报错
          changeOrigin: true, //是否跨域
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
    css: {
      preprocessorOptions: {
        less: {
          charset: false,
          additionalData: '@import "./src/assets/styles/base.less";',
        },
      },
    },
  };
});
