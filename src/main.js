/*
 * @Author: NanNan
 * @Date: 2022-11-05 15:18:22
 * @LastEditTime: 2022-11-09 18:56:29
 * @Description: main.js 注入
 */
import { createApp } from 'vue';
import 'stys/common.less';
import ArcoVue, { Message } from '@arco-design/web-vue';
import ArcoVueIcon from '@arco-design/web-vue/es/icon';

import App from './App.vue';
import router from '@/router';

import Api from '@/api/api';
import '@arco-design/web-vue/dist/arco.css';

const app = createApp(App);

app.provide('$http', Api); //provie方法 以来注入，所有组件通过inject获取
app.provide('$host', process.env.NODE_ENV === 'production' ? '' : '/api');
app.provide('$message', Message);
app.use(router);
app.use(ArcoVue);
app.use(ArcoVueIcon);
app.mount('#app');
