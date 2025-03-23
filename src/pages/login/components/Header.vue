<template>
  <header class="login-header">
    <logo-full-icon class="logo" />
    <div class="operations-container">
      <t-notification
        v-show="show"
        :placement="'top_left'"
        :offset="[100, 400]"
        theme="info"
        title="版权所有"
        content="此项目版权归属赵卫航所有。任何形式的转载、复制、使用和传播，都需要得到作者的授权。"
        :close-btn="true"
        @close-btn-click="show = false"
      />
      <t-button theme="default" shape="square" variant="text" @click="navToInformation">
        <t-icon name="info-circle" class="icon" />
      </t-button>
      <t-button theme="default" shape="square" variant="text" @click="toggleSettingPanel">
        <t-icon name="setting" class="icon" />
      </t-button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import LogoFullIcon from '@/assets/assets-logo-full.svg?component';
import { useSettingStore } from '@/store';

const settingStore = useSettingStore();
const toggleSettingPanel = () => {
  settingStore.updateConfig({
    showSettingPanel: true,
  });
};

const show = ref(false);
const navToInformation = () => {
  show.value = true;
};
</script>

<style lang="less" scoped>
.login-header {
  padding: 0 var(--td-comp-paddingLR-xl);
  display: flex;
  justify-content: space-between;
  align-items: center;
  backdrop-filter: blur(10px);
  color: var(--td-text-color-primary);
  height: var(--td-comp-size-xxxl);

  .logo {
    width: 178px;
    height: var(--td-comp-size-s);
  }

  .operations-container {
    display: flex;
    align-items: center;

    .t-button {
      margin-left: var(--td-comp-margin-l);
    }
  }
}
</style>
