<!--
 * @Author: NanNan
 * @Date: 2022-11-05 15:47:16
 * @LastEditTime: 2022-11-10 10:08:26
 * @Description: 公共头部
-->
<template>
  <a-layout-header style="background: #fff; padding: 0">
    <div class="header-box">
      <div class="logo">
        <img :src="getAssetsImages('arco.svg')" alt="" />
        <h1>arco design</h1>
      </div>
      <div class="right">
        <a-button shape="circle" class="mr10"><icon-sun-fill /></a-button>

        <a-button shape="circle" class="mr10">
          <icon-notification />
        </a-button>

        <a-dropdown position="br">
          <a class="user-img" @click.prevent>
            <img :src="$host + info.face_image" alt="" srcset="" />
          </a>
          <template #content>
            <div class="pop-box">
              <img
                :src="$host + info.face_image"
                alt=""
                srcset=""
                class="avder-img"
              />
              <a-divider orientation="center">{{ info.name }}</a-divider>

              <p>{{ getStr('/', info.post_name, info.department_name) }}</p>

              <div class="icon-box">
                <!-- <UserOutlined class="icon-same" />
                <a-divider type="vertical" />
                <LockOutlined class="icon-same" />
                <a-divider type="vertical" />
                <LogoutOutlined class="icon-same" /> -->
              </div>
            </div>
          </template>
        </a-dropdown>
      </div>
    </div>
  </a-layout-header>
</template>
<script setup>
import { ref, defineProps, computed, inject } from 'vue';

import { getAssetsImages, getStr } from '@/untils/capsulation.js';

const $host = inject('$host');
const props = defineProps(['info']);
const info = computed(() => props.info);
console.log(info.value);
</script>

<style lang="less" scoped>
@import 'stys/layout/header.less';
</style>
