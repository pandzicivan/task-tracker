<script setup>
import { ref, watch } from "vue";
import { useDisplay } from "vuetify";
import ClientsList from '@/components/ClientsList.vue';
import ProjectsList from '@/components/ProjectsList.vue';
import TaskList from '@/components/TaskList.vue';

const { xs } = useDisplay();

const selectedClient = ref(null);
const selectedProject = ref(null);
const mobileStep = ref(0);

watch(() => selectedClient.value?.id, () => {
  selectedProject.value = null;
});

</script>

<template>
  <v-toolbar
    v-if="xs && mobileStep > 0"
    density="compact"
    color="transparent">
    <v-btn
      size="small"
      @click="mobileStep--"
      icon="mdi-arrow-left"
      />
    <v-toolbar-title class="title ms-1">
      {{ mobileStep === 1 ? "Clients" : selectedClient?.name }}
    </v-toolbar-title>
  </v-toolbar>
  <v-card
    height="100%"
    class="d-flex flex-column">
    <v-row no-gutters class="flex-grow-1 flex-nowrap overflow-hidden">
      <v-col
        v-show="!xs || mobileStep === 0"
        class="h-100"
        cols="12"
        sm
        lg="3">
        <ClientsList
          v-model:selected-client="selectedClient"
          @update:selected-client="mobileStep = 1"
        />
      </v-col>
      <v-divider v-if="!xs" vertical/>
      <v-col
        v-show="!xs || mobileStep === 1"
        class="h-100"
        cols="12"
        sm
        lg="3">
        <ProjectsList
          :client-id="selectedClient?.id ?? null"
          :client-name="selectedClient?.name ?? null"
          v-model:selected-project="selectedProject"
          @update:selected-project="mobileStep = 2"
        />
      </v-col>
      <v-divider v-if="!xs" vertical/>
      <v-col
        v-show="!xs || mobileStep === 2"
        class="h-100"
        cols="12"
        sm
        lg="6">
        <TaskList 
          :project-id="selectedProject?.id ?? null"
          :project-name="selectedProject?.name ?? null"
        />
      </v-col>
    </v-row>
  </v-card>
</template>

<style scoped lang="scss">
.title {
  font-size: 14px;
}
</style>