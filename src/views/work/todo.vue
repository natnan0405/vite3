<!--
 * @Author: NanNan
 * @Date: 2022-11-08 17:08:03
 * @LastEditTime: 2022-11-10 18:33:13
 * @Description: 
-->
<template>
  <div class="page-box">
    <a-radio-group
      v-model="params.list_type"
      type="button"
      size="large"
      style="margin-bottom: 24px"
      @change="(value) => changeTabs(value)"
    >
      <a-radio :value="0">全部待办</a-radio>
      <a-radio :value="4">处理不及时</a-radio>
    </a-radio-group>
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
              <a-input-search
                v-model="params.kw"
                placeholder="客户姓名/手机号码"
                search-button
                allow-clear
                @search="loadList(1)"
                @change="loadList(1)"
                @clear="loadList(1)"
              >
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
                <a-col flex="80px" class="label">待办类型</a-col>
                <a-col flex="auto">
                  <a-select
                    v-model="params.type"
                    :default-value="params.type"
                    placeholder="全部"
                    multiple
                    :max-tag-count="2"
                    allow-clear
                    scrollbar
                    @change="loadList(1)"
                    @clear="loadList(1)"
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
                <a-col flex="80px" class="label">一级部门</a-col>
                <a-col flex="auto">
                  <a-select
                    v-model="params.company_ids"
                    :default-value="params.company_ids"
                    placeholder="全部"
                    multiple
                    :max-tag-count="2"
                    allow-clear
                    scrollbar
                    @change="loadList(1)"
                    @clear="loadList(1)"
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
                <a-col flex="80px" class="label">筛选时间</a-col>
                <a-col flex="auto" style="width: 0">
                  <a-range-picker
                    v-model="rangeValue"
                    style="width: 100%"
                    @change="(value) => changeDate(value)"
                  />
                </a-col>
              </a-row>
            </a-col>

            <a-col :span="8" class="mb14">
              <a-row>
                <a-col flex="80px" class="label">状态</a-col>
                <a-col flex="auto" style="width: 0">
                  <a-select
                    v-model="params.status"
                    :default-value="params.status"
                    placeholder="全部"
                    allow-clear
                    scrollbar
                    @change="loadList(1)"
                    @clear="loadList(1)"
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
        <a-col flex="80px" class="flex-right mb14">
          <a-divider direction="vertical" style="height: 100%" />
          <a-button @click="resetFunc()">
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
    <div class="tableBox">
      <a-table
        :loading="_DATA.loading"
        :data="_DATA.list"
        :pagination="{
          page: pagination.page,
          pageSize: pagination.pages,
          total: pagination.total,
          showTotal: true,
        }"
        :expandable="expandable"
        :scroll="scrollPercent"
        :scrollbar="scrollbar"
        page-position="bottom"
        @page-change="(page) => loadList(page)"
      >
        <template #columns>
          <a-table-column title="状态" data-index="type_str" :width="140">
            <template #cell="{ record }">
              <a-tag :color="getColor(record.status)" class="mr4">
                {{ record.status_str }}
              </a-tag>
              <span
                class="font12"
                style="color: rgb(var(--red-6))"
                v-if="record.decline_day"
              >
                {{ '延期' + record.decline_day + '天' }}
              </span>
            </template>
          </a-table-column>
          <a-table-column title="类型" data-index="type_str" :width="180" />

          <a-table-column
            title="一级部门"
            data-index="company_name"
            :width="180"
          />
          <a-table-column
            title="提交人"
            data-index="operator_user_str"
            :width="240"
          >
            <template #cell="{ record }">
              <p>{{ record.operator_user_str }}</p>
              <p>
                {{
                  getStr(
                    '/',
                    record.operator_user_dep,
                    record.operator_user_pos
                  )
                }}
              </p>
              <p>{{ record.operator_user_phone }}</p>
            </template>
          </a-table-column>
          <a-table-column
            title="提交时间"
            data-index="operator_time"
            :width="180"
          />
          <a-table-column title="处理人" data-index="company_name" :width="240">
            <template #cell="{ record }">
              <p>{{ record.approver_user_str }}</p>
              <p>
                {{
                  getStr(
                    '/',
                    record.approver_user_dep,
                    record.approver_user_pos
                  )
                }}
              </p>
              <p>{{ record.approver_user_phone }}</p>
            </template>
          </a-table-column>
          <a-table-column
            title="处理时间"
            data-index="approver_time"
            :min-width="280"
          />
          <a-table-column title="操作" fixed="right" :width="200">
            <template #cell="{ record }">
              <em
                :style="{ color: 'rgb(var(--primary-6))', cursor: 'pointer' }"
                @click="$modal.info({ title: 'Name', content: record.name })"
              >
                去处理
              </em>
            </template>
          </a-table-column>
        </template>
      </a-table>
    </div>
    <!-- end -->
  </div>
</template>
<script setup>
import { inject, onMounted, reactive, ref, h } from 'vue';
import moment from 'moment';
import { getStr } from '@/untils/capsulation.js';

const $http = inject('$http');
const $message = inject('$message');

const scrollbar = ref(true);

const scrollPercent = {
  x: '120%',
  y: '100%',
};

const expandable = reactive({
  width: 80,
  expandedRowRender: (record) => {
    const temp = [];
    if (record?.content) {
      Object.keys(record?.content).forEach((key) => {
        temp.push(h('li', { key: key }, key + '：' + record.content[key]));
      });
      return h(
        'ul',
        { class: 'flex ', style: { padding: '0 0 0 80px' } },
        temp
      );
    }
  },
});

const todayDate = moment(new Date()).format('YYYY-MM-DD');

const params = reactive({
  type: [], //待办类型
  company_ids: [], //一级部门
  date_type: 1,
  start_time: todayDate,
  end_time: todayDate,
  list_type: 0, //0全部待办，4处理不及时
  status: '',
});

const paramsReset = reactive({});

const tagColors = [
  { id: 1, color: 'orangered' },
  { id: 2, color: 'arcoblue' },
  { id: 3, color: 'gray' },
];

const rangeValue = ref([todayDate, todayDate]);

const pagination = reactive({
  page: 1,
  pages: 10,
  total: 0,
});

const options = reactive({});

const _DATA = reactive({
  list: [],
});

onMounted(() => {
  Object.assign(paramsReset, JSON.parse(JSON.stringify(params)));
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
  _DATA.loading = true;
  const obj = {
    page: page || 1,
    pages: pagination.pages,
    ...params,
  };
  $http.workApi.todoList(obj).then((res) => {
    const { code, data } = res;
    if (code === 0) {
      data.list.map((item, index) => (item.key = index));
      Object.assign(pagination, data.page);
      _DATA.list = data.list;
    } else {
      $message.error(data);
    }
    _DATA.loading = false;
  });
};

/**
 * 方法
 */
const getColor = (status) => {
  const new_arr = tagColors.filter((item) => item.id == status);
  return new_arr[0].color;
};

//- 时间组件
const changeDate = (value) => {
  console.log(value);
  if (value) {
    params.start_time = value[0];
    params.end_time = value[1];
  } else {
    params.start_time = '';
    params.end_time = '';
  }
  loadList(1);
};

//- 重置
const resetFunc = () => {
  Object.assign(params, JSON.parse(JSON.stringify(paramsReset)));
  rangeValue.value = [todayDate, todayDate];
  loadList(1);
};

//- tab切换
const changeTabs = (value) => {
  paramsReset.list_type = value;
  resetFunc();
};
</script>
<style lang="less" scoped>
@import 'stys/work/todo.less';
</style>
