<template>
  <t-form
    ref="form"
    :class="['item-container']"
    :data="formData"
    :rules="FORM_RULES"
    label-width="0"
    @submit="onSubmit"
  >
    <t-form-item name="user">
      <t-input v-model="formData.user" :maxlength="11" size="large" placeholder="请输入您的账户名称">
        <template #prefix-icon>
          <t-icon name="user" />
        </template>
      </t-input>
    </t-form-item>

    <t-form-item name="password">
      <t-input
        v-model="formData.password"
        size="large"
        :type="showPsw ? 'text' : 'password'"
        clearable
        placeholder="请输入登录密码"
      >
        <template #prefix-icon>
          <t-icon name="lock-on" />
        </template>
        <template #suffix-icon>
          <t-icon :name="showPsw ? 'browse' : 'browse-off'" @click="showPsw = !showPsw" />
        </template>
      </t-input>
    </t-form-item>

    <t-form-item class="check-container" name="checked">
      <t-checkbox v-model="formData.checked">我已阅读并同意 </t-checkbox> <span>TDesign服务协议</span> 和
      <span>TDesign 隐私声明</span>
    </t-form-item>

    <t-form-item>
      <t-button block size="large" type="submit"> 注册 </t-button>
    </t-form-item>
  </t-form>
</template>

<script setup lang="ts">
import type { FormRule, SubmitContext } from 'tdesign-vue-next';
import { MessagePlugin } from 'tdesign-vue-next';
import { ref } from 'vue';

const INITIAL_DATA = {
  user: '',
  password: '',
  checked: false,
};

const FORM_RULES: Record<string, FormRule[]> = {
  user: [{ required: true, message: '账户名称必填', type: 'error' }],
  password: [{ required: true, message: '密码必填', type: 'error' }],
};

const form = ref();
const formData = ref({ ...INITIAL_DATA });

const showPsw = ref(false);

const emit = defineEmits(['registerSuccess']);

const onSubmit = (ctx: SubmitContext) => {
  if (ctx.validateResult === true) {
    if (!formData.value.checked) {
      MessagePlugin.error('请同意TDesign服务协议和TDesign 隐私声明');
      return;
    }
    MessagePlugin.success('注册成功');
    emit('registerSuccess');
  }
};
</script>

<style lang="less" scoped>
@import '../index.less';
</style>
