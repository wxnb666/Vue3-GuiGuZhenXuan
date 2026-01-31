<script setup>
import { ref } from 'vue';
import { loginAPI, registerAPI } from '@/api/login'; 
import { useRouter } from 'vue-router';
const router=useRouter()
const isLoginMode = ref(true); // 控制显示登录还是注册

// 登录相关
const username = ref('');
const password = ref('');
const loginErrorMessage = ref('');

// 注册相关
const registerUsername = ref('');
const registerPassword = ref('');
const confirmPassword = ref('');
const registerErrorMessage = ref('');

// 登录处理函数
const handleLogin = async () => {
  loginErrorMessage.value = '';
  if (!username.value || !password.value) {
    loginErrorMessage.value = '用户名和密码不能为空';
    return;
  }

  try {
    const result = await loginAPI({
      username: username.value,
      password: password.value,
    });
    console.log('登录成功:', result);
    alert('登录成功'); 
    router.push('/Home')
  } catch (error) {
    console.error('登录失败:', error);
    loginErrorMessage.value = error.message || '登录失败，请稍后重试';
  }
};

// 注册处理函数
const handleRegister = async () => {
  registerErrorMessage.value = '';
  if (!registerUsername.value || !registerPassword.value || !confirmPassword.value) {
    registerErrorMessage.value = '请填写所有字段';
    return;
  }
  if (registerPassword.value !== confirmPassword.value) {
    registerErrorMessage.value = '两次输入的密码不一致';
    return;
  }
  if (registerPassword.value.length < 6) {
    registerErrorMessage.value = '密码长度至少为6位';
    return;
  }

  try {
    const result = await registerAPI({
      username: registerUsername.value,
      password: registerPassword.value,
    });
    console.log('注册成功:', result);
    alert('注册成功，请登录');
    // 注册成功后切换到登录模式
    isLoginMode.value = true;
    // 清空注册表单
    registerUsername.value = '';
    registerPassword.value = '';
    confirmPassword.value = '';
  } catch (error) {
    console.error('注册失败:', error);
    registerErrorMessage.value = error.message || '注册失败，请稍后重试';
  }
};

// 切换模式
const toggleMode = () => {
  isLoginMode.value = !isLoginMode.value;
  // 清空两个表单的错误信息
  loginErrorMessage.value = '';
  registerErrorMessage.value = '';
};
</script>

<template>
  <div class="login-page">
    <div class="login-container">
      <div class="login-header">
        <h2>{{ isLoginMode ? '登录' : '注册' }}</h2>
        <p>{{ isLoginMode ? '欢迎回来，请登录您的账户' : '创建新账户' }}</p>
      </div>

      <!-- 登录表单 -->
      <form v-if="isLoginMode" @submit.prevent="handleLogin" class="login-form">
        <div class="input-group">
          <input
            v-model="username"
            type="text"
            placeholder=" "
            id="login-username-input"
            required
          />
          <label for="login-username-input">用户名</label>
        </div>
        <div class="input-group">
          <input
            v-model="password"
            type="password"
            placeholder=" "
            id="login-password-input"
            required
          />
          <label for="login-password-input">密码</label>
        </div>
        <button type="submit" class="login-button">
          <span>登 录</span>
        </button>
        <div class="switch-mode">
          <p>没有账户？<a href="#" @click.prevent="toggleMode">立即注册</a></p>
        </div>
      </form>

      <!-- 注册表单 -->
      <form v-else @submit.prevent="handleRegister" class="login-form">
        <div class="input-group">
          <input
            v-model="registerUsername"
            type="text"
            placeholder=" "
            id="register-username-input"
            required
          />
          <label for="register-username-input">用户名</label>
        </div>
        <div class="input-group">
          <input
            v-model="registerPassword"
            type="password"
            placeholder=" "
            id="register-password-input"
            required
          />
          <label for="register-password-input">密码</label>
        </div>
        <div class="input-group">
          <input
            v-model="confirmPassword"
            type="password"
            placeholder=" "
            id="confirm-password-input"
            required
          />
          <label for="confirm-password-input">确认密码</label>
        </div>
        <button type="submit" class="login-button">
          <span>注 册</span>
        </button>
        <div class="switch-mode">
          <p>已有账户？<a href="#" @click.prevent="toggleMode">立即登录</a></p>
        </div>
      </form>

      <!-- 登录错误信息 -->
      <div v-if="loginErrorMessage && isLoginMode" class="error-message">
        {{ loginErrorMessage }}
      </div>

      <!-- 注册错误信息 -->
      <div v-if="registerErrorMessage && !isLoginMode" class="error-message">
        {{ registerErrorMessage }}
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 页面整体背景 */
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #e0f7fa, #f5f5f5);
  padding: 16px;
  box-sizing: border-box;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* 登录容器卡片 */
.login-container {
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12), 0 4px 16px rgba(0, 0, 0, 0.08);
  width: 100%;
  max-width: 420px;
  padding: 40px 32px;
  position: relative;
  z-index: 10;
}

/* 标题区 */
.login-header {
  text-align: center;
  margin-bottom: 32px;
}

.login-header h2 {
  font-size: 28px;
  font-weight: 700;
  color: #1a73e8;
  margin: 0 0 8px 0;
}

.login-header p {
  font-size: 14px;
  color: #666666;
  margin: 0;
}

/* 表单 */
.login-form {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* 输入框组合 */
.input-group {
  position: relative;
  margin-bottom: 20px;
}

.input-group input {
  width: 100%;
  padding: 16px 16px 16px 16px;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  font-size: 16px;
  background-color: #fafafa;
  transition: all 0.3s ease;
  box-sizing: border-box;
  outline: none;
}

.input-group input:focus {
  border-color: #1a73e8;
  background-color: #ffffff;
  box-shadow: 0 0 0 3px rgba(26, 115, 232, 0.15);
  transform: translateY(-2px);
}

.input-group input:hover {
  border-color: #c0c0c0;
}

.input-group label {
  position: absolute;
  left: 16px;
  top: 16px;
  font-size: 16px;
  color: #999999;
  pointer-events: none;
  transition: all 0.2s ease;
  background-color: #ffffff;
  padding: 0 4px;
  margin-left: -4px;
}

.input-group input:focus + label,
.input-group input:not(:placeholder-shown) + label {
  top: 0;
  left: 12px;
  font-size: 12px;
  color: #1a73e8;
  font-weight: 500;
}

/* 登录按钮 */
.login-button {
  background: linear-gradient(135deg, #1a73e8, #4285f4);
  color: white;
  border: none;
  border-radius: 10px;
  padding: 16px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  margin-top: 8px;
  box-shadow: 0 4px 12px rgba(26, 115, 232, 0.25);
}

.login-button:hover {
  background: linear-gradient(135deg, #4285f4, #1a73e8);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(26, 115, 232, 0.35);
}

.login-button:active {
  transform: translateY(0);
  box-shadow: 0 2px 8px rgba(26, 115, 232, 0.25);
}

/* 切换模式链接 */
.switch-mode {
  text-align: center;
  margin-top: -12px; /* 调整与按钮的距离 */
}

.switch-mode p {
  font-size: 14px;
  color: #666;
}

.switch-mode a {
  color: #1a73e8;
  text-decoration: none;
  font-weight: 500;
  cursor: pointer;
}

.switch-mode a:hover {
  text-decoration: underline;
}

/* 错误信息 */
.error-message {
  color: #ea4335;
  font-size: 14px;
  text-align: center;
  margin-top: 16px;
  padding: 8px 12px;
  background-color: #fce8e6;
  border-radius: 8px;
  border: 1px solid #f19999;
  animation: shake 0.3s ease-in-out;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20%, 60% { transform: translateX(-4px); }
  40%, 80% { transform: translateX(4px); }
}

/* 响应式设计 */
@media (max-width: 480px) {
  .login-container {
    padding: 32px 24px;
    margin: 16px;
  }

  .login-header h2 {
    font-size: 24px;
  }

  .login-button {
    padding: 14px;
    font-size: 15px;
  }
}
</style>