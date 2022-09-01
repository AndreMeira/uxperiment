<script lang="ts" setup>
import OtherController from '@/experiments/controllers/OtherController';
import { useStateAsOutput, useObservableProp } from '@/framework/universal/adapters/vue';
import { reactive, ref } from 'vue';

const props = defineProps<{
    msg: string;
    likes?: number;
}>();

const self = new OtherController(
    useObservableProp(() => props.msg),
    useStateAsOutput<{ msg:string, quote:string }>({
        msg: props.msg,
        quote: '',
    }),
);

</script>
<template>
  <div class="hello">
    <p>{{ self.truncatedQuote }}</p>
    <button
        type="button"
        @click="() => self.generateQuote()">
        Click me
    </button>
  </div>
</template>
<style scoped lang="scss">
</style>
