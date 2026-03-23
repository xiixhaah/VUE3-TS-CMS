<template>
  <div class="user">
    <user-search
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
    ></user-search>
    <user-content
      ref="contentRef"
      @new-click="handleNewClick"
      @edit-click="handleEditClick"
    ></user-content>
    <user-model ref="modelRef"></user-model>
  </div>
</template>

<script setup lang="ts">
import userSearch from './c-cpns/user-search.vue'
import userContent from './c-cpns/user-content.vue'
import userModel from './c-cpns/user-model.vue'
import { ref } from 'vue'
import type UserModel from './c-cpns/user-model.vue'

// 对content逐渐进行操作
const contentRef = ref<InstanceType<typeof userContent>>()
function handleQueryClick(formData: any) {
  contentRef.value?.fetchUserListData(formData)
}
function handleResetClick() {
  contentRef.value?.fetchUserListData()
}

// 新增用户操作
const modelRef = ref<InstanceType<typeof UserModel>>()
function handleNewClick() {
  modelRef.value?.setModelVisible()
}
// 编辑用户操作
function handleEditClick(userInfo: any) {
  modelRef.value?.setModelVisible(false, userInfo)
}
</script>

<style lang="less" scoped>
.user {
  border-radius: 8px;
  overflow: hidden;
}
</style>
