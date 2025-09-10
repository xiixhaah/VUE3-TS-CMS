import { ref } from 'vue'
import type pageModel from '@/components/page-model/page-model.vue'

type EditFnType = (data?: any) => void

function usePageModel(newCallback?: EditFnType, editCallback?: EditFnType) {
  // 新增用户操作
  const modelRef = ref<InstanceType<typeof pageModel>>()
  function handleNewClick() {
    modelRef.value?.setModelVisible()
    if (newCallback) newCallback()
  }
  // 编辑用户操作
  function handleEditClick(itemData: any) {
    modelRef.value?.setModelVisible(false, itemData)
    if (editCallback) {
      editCallback(itemData)
    }
  }

  return {
    modelRef,
    handleEditClick,
    handleNewClick
  }
}

export default usePageModel
