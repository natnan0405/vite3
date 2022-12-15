<!--
 * @Author: NanNan
 * @Date: 2022-11-08 17:08:03
 * @LastEditTime: 2022-12-15 15:19:46
 * @Description: 
-->
<template>
  <div>
    <!-- 头部 -->
    <div class="th flex-class">
      <span class="same flag flex-center-class small">层级</span>
      <span class="same name flex-center-class">名称</span>
    </div>
    <!-- 内容部分 -->
    <div class="content border-left">
      <div class="item flex-class" v-for="item in listData" :key="item.id">
        <div
          class="same flag flex-center-class border-right border-bottom small"
        >
          {{ item.flag }}
        </div>
        <div class="same name flex-center-class border-right border-bottom">
          {{ item.name }}
        </div>
        <!-- more里面是 children 循环 -->
        <div class="more" v-if="item.children.length > 0">
          <div
            class="item flex-class"
            v-for="val in item.children"
            :key="val.id"
          >
            <div
              class="same flag flex-center-class border-right border-bottom small"
            >
              {{ item.flag + '-' + val.flag }}
            </div>
            <div class="same name flex-center-class border-right border-bottom">
              {{ val.name }}
            </div>
            <!-- more里面是 children 循环 -->
            <div class="more" v-if="val.children.length > 0">
              <div
                class="item flex-class"
                v-for="v in val.children"
                :key="v.id"
              >
                <div
                  class="same flag flex-center-class border-right border-bottom small"
                >
                  {{ item.flag + '-' + val.flag + '-' + v.flag }}
                </div>
                <div
                  class="same name flex-center-class border-right border-bottom flex-grow"
                >
                  <p class="ellipsis">{{ v.name }}</p>
                </div>
              </div>
            </div>
            <div class="more" v-if="val.children.length === 0">
              <div
                class="no-children flex-center-class border-right border-bottom"
              >
                暂无数据
              </div>
            </div>
          </div>
        </div>
        <div class="more" v-if="item.children.length === 0">
          <div class="no-children flex-center-class border-right border-bottom">
            暂无数据
          </div>
        </div>
      </div>
    </div>
    <!-- <sameDiv /> -->
  </div>
</template>
<script setup>
import { h, ref } from 'vue';
const listData = ref([
  {
    flag: 1,
    name: '美团',
    id: 1,
    children: [
      {
        flag: 1,
        name: '美团外卖',
        id: 11,
        children: [
          { flag: 1, name: '美食', id: 12 },
          { flag: 2, name: '咖啡/饮品', id: 13 },
          {
            flag: 3,
            name: '超出文本限制出现省略号超出文本限制出现省略号超出文本限制出现省略号超出文本限制出现省略号',
            id: 14,
          },
        ],
      },
      {
        flag: 2,
        name: '跑腿',
        id: 11,
        children: [],
      },
    ],
  },
  {
    flag: 2,
    name: '支付宝',
    id: 2,
    children: [
      // {
      //   flag: 1,
      //   name: '金融',
      //   id: 21,
      //   children: [
      //     { flag: 1, name: '花呗', id: 22 },
      //     { flag: 2, name: '余额宝', id: 23 },
      //   ],
      // },
      // {
      //   flag: 2,
      //   name: '缴费',
      //   id: 11,
      //   children: [
      //     { flag: 1, name: '水、电、天然气', id: 24 },
      //     { flag: 2, name: '话费', id: 25 },
      //   ],
      // },
    ],
  },
]);
</script>
<style lang="less" scoped>
.ellipsis {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  flex: 1;
}
.flex-class {
  display: flex;
  justify-content: left;
  align-items: stretch;
}
.flex-center-class {
  display: flex;
  justify-content: left;
  align-items: center;
}
.border-left {
  border-left: 1px solid #ededed;
}

.border-right {
  border-right: 1px solid #ededed;
}
.border-bottom {
  border-bottom: 1px solid #ededed;
}

.th {
  background: #ededed;
  height: 40px;
  width: 100%;
}

.same {
  width: 120px;
  flex-shrink: 0;
  padding: 0 6px;
  box-sizing: border-box;
  &.small {
    width: 68px !important;
    font-weight: bold;
  }
}
.item {
  min-height: 40px;
  .more {
    flex-grow: 1;
    // background-color: #ededed;
    .no-children {
      color: #999;
      min-height: 40px;
      padding: 0 6px;
    }
  }
  .flex-grow {
    flex-grow: 1;
  }
}
</style>
