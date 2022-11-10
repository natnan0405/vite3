<!--
 * @Author: NanNan
 * @Date: 2022-11-08 17:08:03
 * @LastEditTime: 2022-11-10 12:01:40
 * @Description: 
-->
<template>
  <div class="page-box">
    <!-- 筛选条件 -->
    <div class="searchBox">
      <a-row
        class="grid-demo"
        :gutter="12"
        style="align-items: stretch !important"
      >
        <a-col flex="auto">
          <!-- 搜索框 -->
          <a-row class="mb14">
            <a-col :span="12">
              <a-input-search placeholder="客户姓名/手机号码" search-button>
                <template #button-icon>
                  <icon-search />
                </template>
                <template #button-default>查找客户</template>
              </a-input-search>
            </a-col>
          </a-row>
          <!-- 其余通用大小 -->
          <a-row :gutter="24">
            <a-col :span="8" class="mb14">
              <a-row>
                <a-col flex="100px" class="label">待办类型</a-col>
                <a-col flex="auto">
                  <a-select
                    :default-value="params.type"
                    placeholder="全部"
                    multiple
                    :max-tag-count="2"
                    allow-clear
                    scrollbar
                  >
                    <a-option
                      v-for="item in options.todo_type_list"
                      :value="item.id"
                      :label="item.name"
                      :key="item.id"
                    />
                  </a-select>
                </a-col>
              </a-row>
            </a-col>

            <a-col :span="8" class="mb14">
              <a-row>
                <a-col flex="100px" class="label">一级部门</a-col>
                <a-col flex="auto">
                  <a-select
                    :default-value="params.company_ids"
                    placeholder="全部"
                    multiple
                    :max-tag-count="2"
                    allow-clear
                    scrollbar
                  >
                    <a-option
                      v-for="item in options.company_list"
                      :value="item.id"
                      :label="item.name"
                      :key="item.id"
                    />
                  </a-select>
                </a-col>
              </a-row>
            </a-col>

            <a-col :span="8" class="mb14">
              <a-row>
                <a-col flex="100px" class="label">筛选时间</a-col>
                <a-col flex="auto" style="width: 0">
                  <a-range-picker v-model="rangeValue" style="width: 100%" />
                </a-col>
              </a-row>
            </a-col>

            <a-col :span="8" class="mb14">
              <a-row>
                <a-col flex="100px" class="label">状态</a-col>
                <a-col flex="auto" style="width: 0">
                  <a-select
                    :default-value="params.status"
                    placeholder="全部"
                    allow-clear
                    scrollbar
                  >
                    <a-option
                      v-for="item in options.todo_status_list"
                      :value="item.id"
                      :label="item.name"
                      :key="item.id"
                    />
                  </a-select>
                </a-col>
              </a-row>
            </a-col>
          </a-row>
        </a-col>
        <a-col flex="100px" class="flex-right mb14">
          <a-divider direction="vertical" style="height: 100%" />
          <a-button>
            <template #icon>
              <icon-refresh />
            </template>
            重置
          </a-button>
        </a-col>
      </a-row>
    </div>
    <a-divider />
    <!-- end -->
    <!-- 表格部分 -->
    <div class="tableBox"></div>
    <!-- end -->
  </div>
</template>
<script setup>
import { inject, onMounted, reactive, ref } from 'vue';
import moment from 'moment';

const $http = inject('$http');
const $message = inject('$message');
const params = reactive({
  type: [], //待办类型
  company_ids: [], //一级部门
  date_type: 1,
  start_time: moment(new Date()).format('YYYY-MM-DD'),
  end_time: moment(new Date()).format('YYYY-MM-DD'),
  list_type: 0,
  status: '',
});

const rangeValue = ref([
  moment(new Date()).format('YYYY-MM-DD'),
  moment(new Date()).format('YYYY-MM-DD'),
]);

const pageInfo = reactive({
  page: 1,
  pages: 10,
  count_page: 1,
  total: 8,
});

const options = reactive({});
const list = reactive([]);

onMounted(() => {
  loadParams();
});

/**
 * 接口
 */
//- 公共参数
const loadParams = () => {
  $http.commonApi.customerSearchParameter().then((res) => {
    const { code, data } = res;
    if (code === 0) {
      Object.assign(options, data);
      loadList();
    } else {
      $message.error(data);
    }
  });
};
//- 列表
const loadList = (page) => {
  const params = {
    page: page || 1,
  };
  $http.workApi.todoList(params).then((res) => {
    const { code, data } = res;
    if (code === 0) {
      Object.assign(pageInfo, data.page);
      Object.assign(list, data.list);
      console.log(list);
    } else {
      $message.error(data);
    }
  });
};
</script>
<style lang="less" scoped>
@import 'stys/work/todo.less';
</style>
