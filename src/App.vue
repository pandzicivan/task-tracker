<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const drawer = ref(false);

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
            to="/"
            :active="route.path === '/'"
            title="Tasks"
          />
          <v-list-item
            to="/time-entries"
            :active="route.path === '/time-entries'"
            title="Time entries"
          />
        </v-list>
      </v-navigation-drawer>
    <v-main scrollable>
      <v-container fluid class="h-100">
        <RouterView />
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped lang="scss">
.logo {
  height: 80%;
}
</style>
