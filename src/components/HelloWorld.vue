<script setup>
import { ref } from 'vue'
import { useHead } from '@vueuse/head' // ✅ 메타태그 설정용

defineProps({
  msg: String,
})

const count = ref(0)

useHead({
  title: '알바잇 - Vue3 테스트 컴포넌트',
  meta: [
    { name: 'description', content: '알바가 필요할 때 알바잇' },
    { property: 'og:title', content: '알바잇' },
    { property: 'og:description', content: '알바가 필요할 때 알바잇' },
    { property: 'og:image', content: 'https://job-nest-ocoqw9l5b-subin-project.vercel.app/job-list/icon-512x512.png' },
    { property: 'og:url', content: 'https://job-nest-ocoqw9l5b-subin-project.vercel.app/job-list' },
  ]
})
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Learn more about IDE Support for Vue in the
    <a
      href="https://vuejs.org/guide/scaling-up/tooling.html#ide-support"
      target="_blank"
      >Vue Docs Scaling up Guide</a
    >.
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
