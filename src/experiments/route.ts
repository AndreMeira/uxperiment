import HomeView from '@/experiments/views/HomeView.vue';
import TestOutput from '@/experiments/views/TestOutput.vue';
import { RouteRecordRaw } from 'vue-router';

export default [
    {
        path: '/',
        name: 'home',
        component: HomeView,
    },
    {
        path: '/test-output',
        name: 'test-output',
        component: TestOutput,
        props: { msg: '' },
    },
    {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '@/experiments/views/AboutView.vue'),
    },
] as RouteRecordRaw[];
