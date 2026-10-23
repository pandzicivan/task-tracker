<script setup>
import { defineModel, defineProps, watch } from "vue";
import { usePaginatedEntities } from "@/composables/usePaginatedEntities";
import { getProjects } from "@/api";

const selectedProject = defineModel("selectedProject");
const props = defineProps({
  clientId: { type: Number, default: null },
  clientName: { type: String, default: null },
});

const { items, error, hasMore, loadMore, reset } = usePaginatedEntities(
  (limit, offset) =>
    props.clientId == null
      ? Promise.resolve([])
      : getProjects(props.clientId, limit, offset),
  10
);

watch(() => props.clientId, reset);

function projectSelected(project) {
  return project.id === selectedProject.value?.id;
}

async function onLoad({ done }) {
  await loadMore();
  if (error.value) done("error");
  else done(hasMore.value ? "ok" : "empty");

}

</script>

<template>
  <v-list class="h-100 d-flex flex-column">
    <v-list-subheader>{{ clientName ?? "Projects" }}</v-list-subheader>
    <v-divider />
    <v-infinite-scroll
      class="flex-grow-1"
      v-if="clientId"
      :key="clientId"
      @load="onLoad"
      mode="intersect"
      empty-text="&nbsp;">
      <v-list-item v-for="item in items"
        :active="projectSelected(item)"
        @click="selectedProject = item"
        :key="item.id"
        :title="item.name">
      <template #subtitle>
        <v-chip
          color="blue"
          v-if="item.status === 'in-progress'">
          In Progress
        </v-chip>
        <v-chip
          color="grey"
          v-if="item.status === 'pending'">
          To Do
        </v-chip>
        <v-chip
          color="green"
          v-if="item.status === 'completed'">
          Done
        </v-chip>
      </template>
      </v-list-item>
      <template #error="{ props }">
        <div class="text-center">
          <div class="text-error mb-2">{{ error }}</div>
          <v-btn v-bind="props" variant="outlined">Retry</v-btn>
        </div>
      </template>
    </v-infinite-scroll>
  </v-list>
</template>

