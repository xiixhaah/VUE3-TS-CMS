<template>
  <div class="login-panel">
    <!-- 标题 -->
    <h1 class="title">后台管理系统</h1>

    <!-- 中间卡片区 -->
    <div class="tabs">
      <el-tabs type="border-card" stretch v-model="activateName">
        <!-- 1.账号登录pane -->
        <el-tab-pane label="账号登录" name="account">
          <template #label>
            <div class="label">
              <el-icon><UserFilled /></el-icon>
              <span class="text">账号登录</span>
            </div>
          </template>
          <pane-account ref="accountRef"></pane-account>
        </el-tab-pane>
        <!-- 2.手机登录pane -->
        <el-tab-pane label="手机登录" name="phone">
          <template #label>
            <div class="label">
              <el-icon><PhoneFilled /></el-icon>
              <span class="text">手机登录</span>
            </div>
          </template>
          <pane-phone></pane-phone>
        </el-tab-pane>
      </el-tabs>
    </div>

    <!-- 底部控制区 -->
    <div class="controls">
      <el-checkbox v-model="isRemPsw" label="记住密码" size="large" />
      <el-link type="primary" :underline="false">忘记密码</el-link>
    </div>
    <el-button
      class="login-btn"
      type="primary"
      size="large"
      @click="handleLoginBtnClick"
    >
      立即登录
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import paneAccount from './pane-account.vue'
import panePhone from './pane-phone.vue'
import { localCache } from '@/utils/cache'

const activateName = ref('account')
const isRemPsw = ref<boolean>(localCache.getCache('isRemPsw') ?? false)
watch(isRemPsw, (newValue) => {
  console.log(newValue)
  localCache.setCache('isRemPsw', newValue)
})
const accountRef = ref<InstanceType<typeof paneAccount>>()

function handleLoginBtnClick() {
  if (activateName.value === 'account') {
    accountRef.value?.loginAction(isRemPsw.value)
  } else {
    console.log('用户进行手机登录')
  }
}
</script>

<style lang="less" scoped>
.login-panel {
  width: 330px;
  // background-color: aquamarine;
  margin-bottom: 150px;

  .title {
    text-align: center;
    margin-bottom: 15px;
  }

  .label {
    display: flex;
    align-items: center;
    justify-content: center;

    .text {
      margin-left: 5px;
    }
  }

  .controls {
    margin-top: 15px;
    display: flex;

    justify-content: space-between;
  }

  .login-btn {
    margin-top: 8px;
    width: 100%;
  }
}
</style>
