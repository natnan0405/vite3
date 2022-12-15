<!--
 * @Author: NanNan
 * @Date: 2022-12-08 16:05:22
 * @LastEditTime: 2022-12-09 10:26:46
 * @Description: modal 设置结算信息
-->
<template>
  <a-modal
    v-model:visible="_DATA.visible"
    @ok="handleOk"
    @cancel="handleCancel"
    fullscreen
  >
    <!-- 内容 -->
    <div class="modal-content">
      <a-typography-title :heading="5">结算信息</a-typography-title>
      <a-typography-paragraph>
        填充的数据为最新编辑的内容，不一定为正在使用的结算信息；可去详情查看正在使用的结算信息。
      </a-typography-paragraph>

      <!-- 表格开始 -->
      <a-form :model="_DATA.info.detail_list" :loading="_DATA.loading">
        <a-table :data="_DATA.info?.detail_list">
          <template #columns>
            <a-table-column title="序号" :width="60">
              <template #cell="{ rowIndex }">
                {{ rowIndex + 1 }}
              </template>
            </a-table-column>

            <a-table-column title="产品大类" :width="180">
              <template #cell="{ record, rowIndex }">
                <a-form-item
                  :field="`_DATA.info.detail_list.${rowIndex}.product_category_ids`"
                >
                  <a-select
                    v-model="record.product_category_ids"
                    :options="_DATA.options.category_list"
                    :field-names="fieldNames"
                    multiple
                    :bordered="false"
                  ></a-select>
                </a-form-item>
              </template>
            </a-table-column>

            <a-table-column title="结算方式" :width="180">
              <template #cell="{ record, rowIndex }">
                <a-form-item
                  :field="`_DATA.info.detail_list.${rowIndex}.product_category_ids`"
                >
                  <a-select
                    v-model="record.settlement_proportion_id"
                    :options="_DATA.options.settlement_proportion_list"
                    :field-names="fieldNames_settlement"
                    :bordered="false"
                  ></a-select>
                </a-form-item>
              </template>
            </a-table-column>
          </template>
        </a-table>
      </a-form>
      <!-- end -->
    </div>
    <!-- 表头 -->
    <template #title>设置结算信息</template>
  </a-modal>
</template>

<script setup>
import {
  reactive,
  ref,
  inject,
  onMounted,
  defineProps,
  defineEmits,
} from 'vue';

const $http = inject('$http');
const $message = inject('$message');
const props = defineProps(['id']);
const emit = defineEmits(['reviewFunc']);

const _DATA = reactive({
  visible: false,
  loading: false,
  info: {
    detail_list: [{ product_category_ids: [], settlement_proportion_id: '' }],
  },
  options: '',
});
const fieldNames = { value: 'id', label: 'name' };
const fieldNames_settlement = {
  value: 'settlement_proportion_id',
  label: 'settlement_proportion_name',
};
onMounted(() => {
  loadParams();
});

/**
 * 接口
 */
// -- 获取详情
const loadInfo = () => {
  $http.materialsApi
    .supplierSettlementInfo({ supplier_id: props.id })
    .then((res) => {
      const { code, data } = res;
      if (code === 0) {
        data.detail_list.map((item) => {
          const child = item.children;
          delete item.children;
          item.sub_children = child;
        });
        _DATA.info = data;
      } else {
        $message.error(data);
      }
      _DATA.loading = false;
    });
};

// -- 参数接口
const loadParams = () => {
  _DATA.loading = true;
  $http.materialsApi
    .supplierSettlementParam({ supplier_id: props.id })
    .then((res) => {
      const { code, data } = res;
      if (code === 0) {
        _DATA.options = data;
        loadInfo();
      } else {
        $message.error(data);
      }
    });
};

const handleClick = () => {
  _DATA.visible = true;
};
const handleOk = () => {
  _DATA.visible = false;
};
const handleCancel = () => {
  _DATA.visible = false;
  emit('reviewFunc', 'settlement', 'cancel');
};

/**
 * 操作
 */
const modalOpen = () => {
  _DATA.visible = true;
};

defineExpose({ modalOpen });
</script>
