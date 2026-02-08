<script setup>
import { Promotion } from '@element-plus/icons-vue'
import { aiAskAPI } from '@/api/ai'
import { ref } from 'vue'
const input = ref('')
const answer=ref('')
const handleAsk = async () => {
  const res=await aiAskAPI({ question: input.value })
  answer.value=res.answer
  console.log(answer.value)
}
</script>

<template>
  <div class="common-layout">
    <el-container class="container">
      <el-header>
        <div class="head">鑫哥GPT</div>
      </el-header>
      <el-main>
        <!-- 主区域，可以放更多内容 -->
        Main
      </el-main>
      <el-footer>
        <!-- 输入框父容器，使用 flex 居中显示 -->
        <div class="input-wrapper">
          <el-input v-model="input" placeholder="有问题,尽管问" style="width: 800px">
            <template #suffix>
              <el-icon :size="20" style="color: #409eff; cursor: pointer" @click="handleAsk">
                <Promotion />
              </el-icon>
            </template>
          </el-input>
        </div>
      </el-footer>
    </el-container>
  </div>
</template>

<style scoped>
/* 让整个页面的容器占满屏幕 */
.container {
  min-height: 97vh;
  background-image: url(../assets/image.png);
}

/* 头部 */
.head {
  display: flex;
  justify-content: center;
  color: white;
  font-size: 18px;
  margin-top: 10px;
}

/* 使输入框的父容器居中 */
.input-wrapper {
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  height: 100%; /* 父容器的高度需要占满 */
}
</style>
