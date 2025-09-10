<template>
  <div class="model">
    <el-dialog
      v-model="dialogVisible"
      :title="
        isNewRef ? modelConfig.header.newTitle : modelConfig.header.editTitle
      "
      width="30%"
      center
    >
      <div class="form">
        <el-form :model="formData" label-width="80px" size="large">
          <template v-for="item in modelConfig.formItems" :key="item.prop">
            <el-form-item :label="item.label" :prop="item.prop">
              <template v-if="item.type === 'input'">
                <el-input
                  v-model="formData[item.prop]"
                  :placeholder="item.placeholder"
                />
              </template>
              <template v-if="item.type === 'date-picker'">
                <el-date-picker
                  v-model="formData[item.prop]"
                  type="daterange"
                  range-separator="-"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                />
              </template>
              <template v-if="item.type === 'select'">
                <el-select
                  v-model="formData[item.prop]"
                  :placeholder="item.placeholder"
                  style="width: 100%"
                >
                  <template v-for="option in item.options" :key="option.value">
                    <el-option :label="option.label" :value="option.value" />
                  </template>
                </el-select>
              </template>
              <template v-if="item.type === 'custom'">
                <slot :name="item.slotName"></slot>
              </template>
            </el-form-item>
          </template>
        </el-form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import useSystemStore from '@/store/main/system/system'
import { reactive, ref } from 'vue'
import type { IModalProps } from './type.ts'

// interface IModalProps {
//   modelConfig: {
//     pageName: string
//     header: {
//       newTitle: string
//       editTitle: string
//     }
//     formItems: any[]
//   }
// }
const props = defineProps<IModalProps>()

// 1.定义内部属性
const dialogVisible = ref(false)
const initialData: any = {}
for (const item of props.modelConfig.formItems) {
  initialData[item.prop] = item.initialValue ?? ''
}
const formData = reactive<any>(initialData)
const isNewRef = ref(true)
const editData = ref()

// 2.获取roles/departments数据
const systemStore = useSystemStore()

// 2.定义设置setModelVisible方法
const setModelVisible = function (isNew: boolean = true, userInfo?: any) {
  dialogVisible.value = true
  isNewRef.value = isNew

  if (!isNew && userInfo) {
    // 编辑数据
    for (const key in formData) {
      formData[key] = userInfo[key]
    }

    editData.value = userInfo
  } else {
    // 新增数据
    for (const key in formData) {
      const item = props.modelConfig.formItems.find(
        (item: any) => item.prop === key
      )
      formData[key] = item ? item.initialValue : ''
    }
    editData.value = null
  }
}

// 3.点击新增确定的逻辑
function handleConfirmClick() {
  dialogVisible.value = false

  let infoData = formData
  if (props.otherInfo) {
    infoData = { ...infoData, ...props.otherInfo }
  }

  if (!isNewRef.value && editData.value) {
    // 发送编辑用户信息请求
    systemStore.editPageDataAction(
      props.modelConfig.pageName,
      editData.value.id,
      infoData
    )
  } else {
    // 发送新增用户信息请求
    systemStore.creatPageDataAction(props.modelConfig.pageName, infoData)
  }
}

// 暴露的属性和方法
defineExpose({ setModelVisible })
</script>

<style lang="less" scoped>
.form {
  padding: 20px 20px 0px;
}

::v-deep .el-dialog__footer {
  padding: 0px;
}

::v-deep .el-dialog__header {
  padding-top: 10px !important;
  padding-bottom: 1px !important;
}
</style>
