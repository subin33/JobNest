<script setup>
import { ref, onMounted } from "vue";
import Navbar from "./components/Navbar.vue";

const isMobile = ref(false);

const checkScreenSize = () => {
  isMobile.value = window.innerWidth <= 768;
};

onMounted(() => {
  checkScreenSize();
  window.addEventListener("resize", checkScreenSize);
});
</script>

<template>
  <div v-if="!isMobile" class="mobile-only-message">
    <div class="message-container">
      <div class="mobile-icon">📱</div>
      <h1>모바일에서 접속해주세요</h1>
      <p>JobNest는 모바일 환경에 최적화되어 있습니다.</p>
      <p>더 나은 경험을 위해 모바일 기기로 접속해주세요.</p>
    </div>
  </div>

  <div v-else class="mobile-app">
    <Navbar />
    <router-view />
  </div>
</template>

<style scoped lang="scss">
  .mobile-only-message {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
  }

  .message-container {
    text-align: center;
    color: white;
    padding: 2rem;
    max-width: 500px;
  }

  .mobile-icon {
    font-size: 4rem;
    margin-bottom: 1rem;
    animation: bounce 2s infinite;
  }

  .message-container h1 {
    font-size: 2rem;
    margin-bottom: 1rem;
    font-weight: 600;
  }

  .message-container p {
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
    opacity: 0.9;
    line-height: 1.5;
  }

  @keyframes bounce {
    0%,
    20%,
    50%,
    80%,
    100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-10px);
    }
    60% {
      transform: translateY(-5px);
    }
  }

  .mobile-app {
    width: 100%;
    height: 100%;
  }
</style>
