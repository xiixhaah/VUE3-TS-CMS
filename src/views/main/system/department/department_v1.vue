<template>
  <div class="department">
    <page-search
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
    ></page-search>
    <page-content
      ref="contentRef"
      @new-click="handleNewClick"
      @edit-click="handleEditClick"
    ></page-content>
    <page-model ref="modelRef"></page-model>
  </div>
</template>

<script setup lang="ts" name="department">
import pageSearch from './c-cpns/page-search.vue'
import pageContent from './c-cpns/page-content.vue'
import pageModel from './c-cpns/page-model.vue'
import { ref } from 'vue'
import type PageModel from './c-cpns/page-model.vue'

// 对content逐渐进行操作
const contentRef = ref<InstanceType<typeof pageContent>>()
function handleQueryClick(formData: any) {
  contentRef.value?.fetchPageListData(formData)
}
function handleResetClick() {
  contentRef.value?.fetchPageListData()
}

// 新增用户操作
const modelRef = ref<InstanceType<typeof PageModel>>()
function handleNewClick() {
  modelRef.value?.setModelVisible()
}
// 编辑用户操作
function handleEditClick(userInfo: any) {
  console.log(userInfo)
  modelRef.value?.setModelVisible(false, userInfo)
}
</script>

<style scoped>
/* .department {
} */
</style>
