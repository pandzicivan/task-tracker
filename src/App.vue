<script setup>
import Tasks from "./views/Tasks.vue";
import TimeEntries from "./views/TimeEntries.vue";
import { ref } from "vue";

const drawer = ref(false);
const component = ref("tasks")

</script>

<template>
  <v-app>
    <v-app-bar>
      <template v-slot:append>
        <v-app-bar-nav-icon  @click="drawer = !drawer"/>
      </template>
      <template #default>  
        <img class="logo" src="./assets/logo.webp" />
      </template>
    </v-app-bar>
    <v-navigation-drawer
        v-model="drawer"
        temporary
        location="right"
      >
        <v-list>
          <v-list-item 
            :active="component === 'tasks'"
            title="Tasks"
            @click="component = 'tasks'"
          />
          <v-list-item 
            :active="component === 'timeEntries'"
            title="Time entries"
            @click="component = 'timeEntries'"
          />
        </v-list>
      </v-navigation-drawer>
    <v-main scrollable>
      <v-container fluid class="h-100">
        <component :is="component === 'tasks' ? Tasks : TimeEntries" />
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped lang="scss">
.logo {
  height: 80%;
}
</style>
