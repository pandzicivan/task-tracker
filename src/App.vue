<script setup>
import Tasks from './views/Tasks.vue'
</script>

<template>
  <v-app>
    <v-app-bar>
      <template v-slot:append>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
      </template>
      <template #default>  
        <img class="logo" src="./assets/logo.webp" />
      </template>
    </v-app-bar>
    <v-main scrollable>
      <v-container fluid class="h-100">
        <Tasks />
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped lang="scss">
.logo {
  height: 80%;
}
</style>
