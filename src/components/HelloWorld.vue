<script setup>
import { ref } from 'vue';

// eslint-disable-next-line no-undef
defineProps({
  // eslint-disable-next-line vue/require-default-prop
  msg: String,
});

const count = ref(0);

</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <el-button type="primary" @click="count++">
count is {{ count }}
</el-button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank">create-vue</a>, the official Vue + Vite starter
  </p>
  <p>
    Install
    <a href="https://github.com/vuejs/language-tools" target="_blank">Volar</a>
    in your IDE for a better DX
  </p>
  <p class="read-the-docs">
Click on the Vite and Vue logos to learn more
</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
