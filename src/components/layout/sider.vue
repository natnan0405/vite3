<!--
 * @Author: NanNan
 * @Date: 2022-11-05 15:47:30
 * @LastEditTime: 2022-11-10 10:15:17
 * @Description: layout - sider
-->
<template>
  <a-menu
    :defaultOpenKeys="defaultOpenKeys"
    :defaultSelectedKeys="defaultSelectedKeys"
  >
    <a-sub-menu v-for="item in routesData" :key="item.path">
      <template #title>
        <SliderIcon :dataClass="item.class" />
        <span style="margin: 0 0 0 12px">{{ item.name }}</span>
      </template>

      <!-- 嵌套菜单 -->
      <a-menu-item
        v-for="val in item.children"
        :key="val.path"
        @click="menuClick(val.path)"
      >
        {{ val.name }}
      </a-menu-item>
    </a-sub-menu>
  </a-menu>
</template>
<script setup>
import { ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import routesData from '@/untils/routes.js';
import SliderIcon from './SliderIcon.vue';

const router = useRouter();
const route = useRoute();

const defaultSelectedKeys = ref([route.path]);
const defaultOpenKeys = ref([route.path.split('/')[1]]);

console.log(route);

const menuClick = (path) => {
  console.log(path);
  router.push(path);
};
</script>
