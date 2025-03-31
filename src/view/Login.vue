<template>
  <div class="loading_info" v-if="isLoading">
    <p>로그인 처리 중 ...</p>
  </div>
  <div class="form-container">
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="email">Email</label>
        <input 
          type="email" 
          id="email" 
          placeholder="이메일 입력"
          required
          v-model="email"
          :class="{ error: loginError }"
          @input="resetLoginError"
        />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input 
          type="password" 
          id="password" 
          placeholder="비밀번호 입력"
          required
          v-model="password"
          :class="{ error: loginError }"
          @input="resetLoginError"
        />
      </div>
      <button type="submit">로그인</button>
      <router-link to="/signup">회원가입</router-link>
      <p v-if="loginError" class="error-message">아이디와 비밀번호를 정확히 입력해 주세요.</p>
    </form>
  </div>
</template>
  
<script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import supabase from '../supabase';

  const email = ref('');
  const password = ref('');
  const isLoading = ref(false);
  const loginError = ref(false);

  const router = useRouter();

  const handleLogin = async () => {
    console.log(email.value, password.value);
    isLoading.value = true;
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    });

    if (error) {
      alert("아이디 또는 비밀번호가 잘못 되었습니다.");
      isLoading.value = false;
      loginError.value = true;
    } else {
      alert('로그인 성공');
      isLoading.value = false;
      router.push('/job-list');
    }
  };

  const resetLoginError = () => {
    loginError.value = false;
  };
</script>
  
<style scoped>
  @use "../style/form.scss";

</style>
