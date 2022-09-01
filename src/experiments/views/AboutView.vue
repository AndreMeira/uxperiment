<script lang="ts" setup>
import { useStateAsOutput } from '@/framework/universal/adapters/vue';
import Dummy from '../components/Dummy.vue';
import DummyController from '../controllers/DummyController';

const self = new DummyController(
    useStateAsOutput({
        message: 'Hello from connection',
    }),
);
</script>
<template>
  <Dummy
    :message="self.message"
    test="this is a test"
    @update="(message) => self.generateMessage(message)"></Dummy>
</template>
