import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/Index.vue';
import User from '@/pages/User.vue';

const routes = [
    { path: '/', name: 'index', component: Home},
    { path: '/users/:username', name: 'user', component: User}
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

export default router;