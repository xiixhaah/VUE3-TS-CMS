<template>
  <div class="pan-account">
    <el-form
      label-width="60px"
      size="large"
      :model="account"
      :rules="accountRules"
      ref="formRef"
    >
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="account.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import type { FormRules, ElForm } from 'element-plus'
// import { accountLoginRequest } from '@/service/login/login'
import useLoginStore from '@/store/login/login'
import { localCache } from '@/utils/cache'

// 1.定义account数据
const account = reactive({
  name: localCache.getCache('name') ?? '',
  password: localCache.getCache('password') ?? ''
})

//2.定义account校验规则
const accountRules: FormRules = {
  name: [
    { required: true, message: '必须输入账号信息~', trigger: 'blur' },
    {
      pattern: /^[a-z0-9]{6,20}$/,
      message: '必须是6~20位数字或字母组成~',
      trigger: 'blur'
    }
  ],
  password: [
    { required: true, message: '必须输入密码信息~', trigger: 'blur' },
    {
      pattern: /^[a-z0-9]{6,20}$/,
      message: '必须是6~20位数字或字母组成~',
      trigger: 'blur'
    }
  ]
}

// 3.执行账号的登录逻辑
const formRef = ref<InstanceType<typeof ElForm>>()
const loginStore = useLoginStore()
function loginAction(isRemPsw: boolean) {
  // console.log(account.name, account.password)
  formRef.value?.validate((valid) => {
    if (valid) {
      // 1.获取用户输入的账号和密码
      const name = account.name
      const password = account.password

      // 2.发送post请求（携带账号和密码）
      // accountLoginRequest({ name, password }).then((res: any) => {
      //   console.log(res)
      // })
      loginStore.loginAccountAction({ name, password }).then(() => {
        if (isRemPsw) {
          localCache.setCache('name', name)
          localCache.setCache('password', password)
        } else {
          localCache.removeCache('name')
          localCache.removeCache('password')
        }
      })
    } else {
      console.log('error submit!')
      ElMessage.error('Oops, 帐号或密码格式不符合要求，请重新输入~')
    }
  })
}

defineExpose({
  loginAction
})
</script>

<style lang="less" scoped>
.pan-account {
  margin-top: 10px;
}
</style>
