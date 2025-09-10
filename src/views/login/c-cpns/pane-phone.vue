<template>
  <div class="pane-phone">
    <el-form label-width="60px" size="large">
      <el-form-item label="手机号">
        <el-input />
      </el-form-item>
      <el-form-item label="验证码">
        <div class="verify">
          <el-input />
          <div class="sent">
            <el-button type="primary">获取验证码</el-button>
          </div>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
.pane-phone {
  margin-top: 10px;

  .verify {
    display: flex;
    // justify-content: center;
    // align-items: center;

    .sent {
      margin-left: 10px;
    }
  }
}
</style>
