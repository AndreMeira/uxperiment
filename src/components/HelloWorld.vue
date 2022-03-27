<script lang="ts" setup>
import TestController from '@/controller/TestController';
import { useChannel, useObservableProp, useStateUpdate } from '@/adapters/vue';

const props = defineProps<{
    msg: string
    likes?: number
}>();

const controller = new TestController(
    useObservableProp(() => props.msg),
    useChannel(),
);

const state = useStateUpdate<{
    message: string,
    quote:string,
}>(controller, controller.RESPONSE_EVENTS, () => ({
    quote: controller.quote,
    message: controller.message,
}));

</script>
<template>
  <div class="hello">
    <h1>{{ state.message }}</h1>
    <p>{{ state.quote }}</p>
    <button
        type="button"
        @click="() => controller.publish('generate-quote', null)">
        Click me
    </button>
  </div>
</template>
<style scoped lang="scss">
</style>
