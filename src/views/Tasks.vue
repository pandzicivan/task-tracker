<script setup>
import { ref, watch } from "vue";
import ClientsList from '@/components/ClientsList.vue';
import ProjectsList from '@/components/ProjectsList.vue';
import TaskList from '@/components/TaskList.vue';

const selectedClient = ref(null);
const selectedProject = ref(null);

watch(() => selectedClient.value?.id, () => {
  selectedProject.value = null;
});

</script>

<template>
  <v-card
    height="100%"
    elevation="2">
    <v-row no-gutters class="h-100 flex-nowrap">
      <v-col
        class="h-100"
        lg="3">
        <ClientsList
          v-model:selected-client="selectedClient"
        />
      </v-col>
      <v-divider vertical/>
      <v-col
        class="h-100"
        lg="3">
        <ProjectsList 
          :client-id="selectedClient?.id ?? null"
          :client-name="selectedClient?.name ?? null"
          v-model:selected-project="selectedProject"
        />
      </v-col>
      <v-divider vertical/>
      <v-col
        class="h-100"
        lg="6">
        <TaskList 
          :project-id="selectedProject?.id ?? null"
          :project-name="selectedProject?.name ?? null"
        />
      </v-col>
    </v-row>
  </v-card>
</template>