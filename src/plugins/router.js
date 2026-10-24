import { createWebHistory, createRouter } from 'vue-router'

import Tasks from "@/views/Tasks.vue";
import TimeEntries from "@/views/TimeEntries.vue";

const routes = [
  { path: '/', component: Tasks },
  { path: '/time-entries', component: TimeEntries },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})