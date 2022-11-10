<!--
 * @Author: NanNan
 * @Date: 2022-11-05 15:47:09
 * @LastEditTime: 2022-11-10 10:13:12
 * @Description: 
-->
<template>
  <a-layout style="min-height: 100vh">
    <Header :info="_DATA.info" />
    <a-layout>
      <a-layout-sider :trigger="null" collapsible>
        <Sider />
      </a-layout-sider>
      <a-layout>
        <a-layout-content
          :style="{
            padding: '24px',
            minHeight: '280px',
            backgroundColor: 'var(--color-fill-2)',
          }"
        >
          <router-view
            :style="{
              padding: '24px',
              backgroundColor: 'var(--color-white)',
            }"
          />
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>
<script setup>
import { inject, onMounted, reactive, ref } from 'vue';
import Sider from '@/components/layout/sider.vue';
import Header from '@/components/layout/header.vue';

const $http = inject('$http');

onMounted(() => {
  LoadFunc();
});

const _DATA = reactive({
  info: '',
});

/**
 * api
 */
const LoadFunc = () => {
  $http.userApi.isLogin().then((res) => {
    const { code, data } = res;
    if (code === 0) {
      _DATA.info = data;
    } else {
      console.log(data);
    }
  });
};
</script>
