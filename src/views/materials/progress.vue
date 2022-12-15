<!--
 * @Author: NanNan
 * @Date: 2022-12-15 15:34:44
 * @LastEditTime: 2022-12-15 18:27:07
 * @Description: 施工进度计划表
-->
<template>
  <div class="page-box">
    <a-table
      :bordered="{ cell: true }"
      :scroll="{ x: 2000 }"
      :columns="columnsFunc()"
      :data="_DATA.list"
    />
  </div>
</template>
<script setup>
import { inject, onMounted, reactive, ref } from 'vue';
import moment from 'moment';

const $http = inject('$http');
const _DATA = reactive({
  info: '',
  loading: false,
  list: [],
});
const columnsFunc = () => {
  const month = [...Array(31).keys()];
  const columns = [
    {
      title: '序号',
      dataIndex: 'sort_id',
      width: 66,
    },
    {
      title: '节点类别',
      dataIndex: 'node_type_name',
      width: 94,
    },
    {
      title: '节点名称',
      dataIndex: 'node_name_id_name',
      width: 94,
      ellipsis: true,
      tooltip: true,
    },
    {
      title: '节点工期/天',
      dataIndex: 'schedule',
      width: 112,
    },
    {
      title: '年月',
      // dataIndex: 'sort_id',
      width: 86,
      fixed: 'left',
      render: (data) => {
        return (
          data.record.end_time &&
          moment(data.record.end_time).year() +
            '-' +
            (moment(data.record.end_time).month() + 1)
        );
      },
    },
  ];
  month.map((item) => {
    let obj = {
      title: item + 1,
      width: 40,
    };
    columns.push(obj);
  });
  return columns;
};

onMounted(() => {
  loadList().then((response) => {
    if (response) {
      let new_arr = [];
      response.list.map((item) => {
        item.list.map((val) => {
          val.status > 1 && new_arr.push(val);
        });
      });
      _DATA.list = new_arr;
      console.log(new_arr);
    }
  });
});
/**
 * 接口
 */
// -- list
const loadList = () => {
  _DATA.loading = true;
  return new Promise((resolve) => {
    $http.materialsApi.getNodeList({ construction_id: 2 }).then((res) => {
      const { code, data } = res;
      if (code === 0) {
        _DATA.info = data;
        resolve(data);
      }
    });
  });
};
</script>
<style lang="less">
@import 'stys/materials/progress.less';
</style>
