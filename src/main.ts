import { createApp as createUI } from 'vue';
import { createApp } from '@/framework/universal';
import { createRouter, createWebHistory } from 'vue-router';
import Root from './composition/Root.vue';
import experiments from './experiments/route';

createApp({});

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes: [
        ...experiments,
    ],
});

createUI(Root).use(router).mount('#app');
