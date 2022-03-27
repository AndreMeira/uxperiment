<script lang="ts" setup>
import HelloWorld from '@/components/HelloWorld.vue';
import { ref } from 'vue';

const msg = ref<string>('test');
// setTimeout(() => { msg.value = 'test 2'; }, 5000);
</script>
<template>
  <div class="home">
    <HelloWorld :msg="msg"/>
  </div>
</template>
