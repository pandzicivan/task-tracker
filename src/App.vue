<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import { useTheme } from "vuetify";

const route = useRoute();
const drawer = ref(false);
const theme = useTheme();
function toggleTheme()  {
  theme.toggle();
  localStorage.setItem("theme", theme.name.value);
}

</script>

<template>
  <v-app>
    <v-app-bar color="primary">
      <template v-slot:append>
        <v-switch
          class="mr-2"
          :model-value="!theme.current.value.dark"
          @update:model-value="toggleTheme()"
          size="large"
          hide-details
          true-icon="mdi-white-balance-sunny"
          false-icon="mdi-weather-night"
        ></v-switch>
        <v-app-bar-nav-icon  @click="drawer = !drawer"/>
      </template>
      <template #default>  
        <RouterLink
          to="/"
          class="fill-height d-flex align-center">
          <img
            class="logo"
            src="./assets/logo.webp" />
        </RouterLink>
      </template>
    </v-app-bar>
    <v-navigation-drawer
        color="primary"
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
