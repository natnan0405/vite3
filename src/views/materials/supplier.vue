<!--
 * @Author: NanNan
 * @Date: 2022-12-08 11:41:48
 * @LastEditTime: 2022-12-08 16:38:01
 * @Description: 全部供应商
-->
<template>
  <div class="page-box">
    <a-typography-title :heading="5">全部供应商</a-typography-title>
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
                placeholder="供应商简称、全称、账号"
                search-button
                allow-clear
                @search="loadList(1)"
                @change="loadList(1)"
                @clear="loadList(1)"
              >
                <template #button-icon>
                  <icon-search />
                </template>
                <template #button-default>查找供应商</template>
              </a-input-search>
            </a-col>
          </a-row>
          <!-- 其余通用大小 -->
          <a-row :gutter="24">
            <a-col :span="8" class="mb14">
              <a-row>
                <a-col flex="94px" class="label">合作人事类型</a-col>
                <a-col flex="auto">
                  <a-select
                    v-model="params.cooperation_personnel_type_id"
                    :default-value="params.cooperation_personnel_type_id"
                    placeholder="全部"
                    allow-clear
                    scrollbar
                    @change="loadList(1)"
                    @clear="loadList(1)"
                  >
                    <a-option
                      v-for="item in _DATA.options.cooperation_personnel_type"
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
                <a-col flex="94px" class="label">产品大类</a-col>
                <a-col flex="auto">
                  <a-select
                    v-model="params.product_category_ids"
                    :default-value="params.product_category_ids"
                    placeholder="全部"
                    multiple
                    :max-tag-count="2"
                    allow-clear
                    scrollbar
                    @change="loadList(1)"
                    @clear="loadList(1)"
                  >
                    <a-option
                      v-for="item in _DATA.options.product_category"
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
                <a-col flex="94px" class="label">产品品牌</a-col>
                <a-col flex="auto">
                  <a-select
                    v-model="params.product_brand_ids"
                    :default-value="params.product_brand_ids"
                    placeholder="全部"
                    multiple
                    :max-tag-count="2"
                    allow-clear
                    scrollbar
                    @change="loadList(1)"
                    @clear="loadList(1)"
                  >
                    <a-option
                      v-for="item in _DATA.options.product_brand"
                      :value="item.id"
                      :label="item.name"
                      :key="item.id"
                    />
                  </a-select>
                </a-col>
              </a-row>
            </a-col>
          </a-row>

          <a-row :gutter="24">
            <a-col :span="8" class="mb14">
              <a-row>
                <a-col flex="94px" class="label">合作状态</a-col>
                <a-col flex="auto">
                  <a-select
                    v-model="params.cooperation_status"
                    :default-value="params.cooperation_status"
                    placeholder="全部"
                    allow-clear
                    scrollbar
                    @change="loadList(1)"
                    @clear="loadList(1)"
                  >
                    <a-option
                      v-for="item in _DATA.options.cooperation_status"
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
                <a-col flex="94px" class="label">销售状态</a-col>
                <a-col flex="auto">
                  <a-select
                    v-model="params.sale_status"
                    :default-value="params.sale_status"
                    placeholder="全部"
                    allow-clear
                    scrollbar
                    @change="loadList(1)"
                    @clear="loadList(1)"
                  >
                    <a-option
                      v-for="item in _DATA.options.sale_status"
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
                <a-col flex="94px" class="label">结算状态</a-col>
                <a-col flex="auto">
                  <a-select
                    v-model="params.settlement_status"
                    :default-value="params.settlement_status"
                    placeholder="全部"
                    allow-clear
                    scrollbar
                    @change="loadList(1)"
                    @clear="loadList(1)"
                  >
                    <a-option
                      v-for="item in _DATA.options.settlement_status"
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
                <a-col flex="94px" class="label">账号状态</a-col>
                <a-col flex="auto">
                  <a-select
                    v-model="params.account_status"
                    :default-value="params.account_status"
                    placeholder="全部"
                    allow-clear
                    scrollbar
                    @change="loadList(1)"
                    @clear="loadList(1)"
                  >
                    <a-option
                      v-for="item in _DATA.options.account_status"
                      :value="item.id"
                      :label="item.name"
                      :key="item.id"
                    />
                  </a-select>
                </a-col>
              </a-row>
            </a-col>
          </a-row>
          <!-- end -->
        </a-col>
        <a-col flex="94px" class="flex-right mb14">
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
    <!-- end -->
    <a-divider />
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
        :scroll="scrollPercent"
        page-position="bottom"
        @page-change="(page) => loadList(page)"
      >
        <template #columns>
          <a-table-column
            title="供应商简称"
            data-index="name"
            :width="140"
            ellipsis
            tooltip
          />
          <a-table-column
            title="供应商全称"
            data-index="full_name"
            :width="220"
            ellipsis
            tooltip
          />
          <a-table-column
            title="供应商账号"
            data-index="account"
            :width="140"
            ellipsis
            tooltip
          />
          <a-table-column
            title="合作产品大类"
            data-index="product_category_name"
            :width="220"
            ellipsis
            tooltip
          />
          <a-table-column
            title="合作产品品牌"
            data-index="product_brand_name"
            :width="220"
            ellipsis
            tooltip
          />
          <a-table-column
            title="合作状态"
            data-index="status_name"
            :width="120"
          />
          <a-table-column
            title="合作人事类型"
            data-index="cooperation_personnel_type_name"
            :width="120"
          />
          <a-table-column
            title="销售状态"
            data-index="sale_status"
            :width="120"
          />
          <a-table-column
            title="结算状态"
            data-index="settlement_status"
            :width="120"
          />
          <a-table-column
            title="账号状态"
            data-index="account_status"
            :width="120"
          />
          <a-table-column
            title="更新时间"
            data-index="update_time"
            :width="140"
          />
          <a-table-column
            title="创建人"
            data-index="create_user_name"
            :width="120"
          />
          <a-table-column title="创建时间" data-index="add_time" :width="140" />
          <a-table-column
            title="操作"
            data-index="full_name"
            :width="100"
            fixed="right"
          >
            <template #cell="{ record }">
              <a-dropdown>
                <a-button>更多</a-button>
                <template #content>
                  <a-doption @click="modalOpen(modal_settlement, record)">
                    设置结算信息
                  </a-doption>
                  <a-doption>重置密码</a-doption>
                </template>
              </a-dropdown>
            </template>
          </a-table-column>
        </template>
      </a-table>
    </div>
    <!-- end -->

    <!-- Modal设置结算信息 -->
    <ModalSettlement
      v-if="modal_settlement.visible"
      ref="modalSettlementRef"
      :id="modal_settlement.id"
      @reviewFunc="reviewFunc"
    />
  </div>
</template>

<script setup>
import { inject, nextTick, onMounted, reactive, ref } from 'vue';
import ModalSettlement from './Modal/ModalSettlement.vue';

const $http = inject('$http');
const $message = inject('$message');

const _DATA = reactive({ loading: false, options: {}, list: [] });

const params = reactive({
  cooperation_personnel_type_id: '', //合作人事类型
  cooperation_status: '', //合作状态
  product_category_ids: [], //产品大类
  product_brand_ids: [], //产品品牌
  sale_status: '', //销售状态
  settlement_status: '', //结算状态
  account_status: '', //账号状态
});
const paramsReset = reactive({});

const pagination = reactive({
  page: 1,
  pages: 10,
  total: 0,
});

const scrollPercent = {
  x: '120%',
  y: '100%',
};

const modal_settlement = reactive({
  visible: false,
  id: '',
});

onMounted(() => {
  Object.assign(paramsReset, JSON.parse(JSON.stringify(params)));
  loadParams();
  loadList();
});

/**
 * 接口
 */
// -- 公共参数
const loadParams = () => {
  $http.materialsApi.supplierParam().then((res) => {
    const { code, data } = res;
    if (code === 0) {
      _DATA.options = data;
    } else {
      $message.error(data);
    }
  });
};

// -- 列表
const loadList = (page) => {
  _DATA.loading = true;
  const obj = {
    page: page || 1,
    pages: pagination.pages,
    ...params,
  };
  $http.materialsApi.supplierList(obj).then((res) => {
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

// -- 重置
const resetFunc = () => {
  Object.assign(params, JSON.parse(JSON.stringify(paramsReset)));
  loadList(1);
};

// -- modal 结算信息
const modalSettlementRef = ref(null);
const modalOpen = (name, row) => {
  console.log(name, row);
  name.visible = true;
  name.id = row.id;
  nextTick(() => {
    modalSettlementRef.value.modalOpen();
  });
};

// -- modal 关闭
const reviewFunc = (type, value) => {
  if (type === 'settlement') {
    modal_settlement.visible = false;
    value === 'ok' && loadList(pagination.page);
  }
};
</script>

<style lang="less" scoped>
@import 'stys/materials/supplier.less';
</style>
