<!--
 * @Author: NanNan
 * @Date: 2022-11-05 16:45:48
 * @LastEditTime: 2022-11-09 18:54:53
 * @Description: login
-->
<template>
  <a-spin dot :loading="loading" style="width: 100%">
    <div class="page-box">
      <div class="left">asdas</div>
      <div class="right">
        <div class="login-box">
          <h1>Hello!</h1>
          <h2>你好尚层家人，登录管理你的客户、订单、任务</h2>
          <a-form
            :model="formState"
            autocomplete="off"
            layout="vertical"
            @submit="handleSubmit"
          >
            <a-form-item
              label="账户名"
              field="account"
              required
              :rules="[
                { required: true, message: '请填写账户名' },
                { minLength: 5, message: '账户名错误' },
              ]"
            >
              <a-input v-model="formState.account" size="large">
                <template #prefix></template>
              </a-input>
            </a-form-item>

            <a-form-item
              label="密码"
              field="password"
              required
              :rules="[{ required: true, message: '请输入密码!' }]"
            >
              <a-input-password v-model="formState.password" size="large">
                <template #prefix></template>
              </a-input-password>
            </a-form-item>

            <a-form-item name="remember">
              <a-checkbox v-model:checked="formState.remember">
                下次免登录
              </a-checkbox>
            </a-form-item>

            <a-form-item>
              <a-button
                type="primary"
                html-type="submit"
                size="large"
                :loading="loadingBtn"
                style="width: 206px"
              >
                登录
              </a-button>
            </a-form-item>
          </a-form>
          <p class="help-text">
            无法登录，查看
            <em>登录帮助</em>
          </p>
        </div>
      </div>
    </div>
  </a-spin>
</template>
<script setup>
import { useRouter } from 'vue-router';
import { reactive, ref, inject } from 'vue';

const router = useRouter();
const $http = inject('$http');
const $message = inject('$message');
const formState = reactive({
  account: 'chenhanbing',
  password: '123456',
  remember: true,
});

const loadingBtn = ref(false);
const loading = ref(false);

const handleSubmit = (value) => {
  if (!value.errors) {
    $http.userApi.login(formState).then((res) => {
      const { code, data } = res;
      loadingBtn.value = false;
      if (code === 0) {
        loading.value = true;
        $message.success({
          content: '登录成功',
          onClose: () => {
            loading.value = false;
            router.push('/work/index');
          },
        });
      } else {
        $message.error(data);
      }
    });
  }
};
</script>
<style lang="less" scoped>
@import 'stys/user/login.less';
</style>
