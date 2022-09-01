<script setup lang="ts">
import { reactive, watch } from 'vue';

const props = defineProps<{
    test: string;
    message: string;
}>();

const emit = defineEmits<{
    (e: 'change', id: number): void;
    (e: 'update', value: string): void;
}>();

const state = reactive({
    test: '',
    message: props.message,
});

watch(props, (diff) => Object.assign(state, diff));

</script>
<template>
  <div class="about">
    <h1>{{ state.message }}</h1>
    <button @click="emit('update', 'this is a message from component')">click me</button>
  </div>
</template>
