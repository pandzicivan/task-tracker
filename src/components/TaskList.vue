<script setup>
import { defineProps, watch } from "vue";
import { usePaginatedEntities } from "@/composables/usePaginatedEntities";
import { getTasks } from "@/api";
import { useDateFormat } from '@vueuse/core';

const props = defineProps({
  projectId: { type: Number, default: null },
  projectName: { type: String, default: null },
});

const { items, error, hasMore, loadMore, reset } = usePaginatedEntities(
  (limit, offset) =>
    props.projectId == null
      ? Promise.resolve([])
      : getTasks(props.projectId, limit, offset),
  10
);

watch(() => props.projectId, reset);

async function onLoad({ done }) {
  await loadMore();
  if (error.value) done("error");
  else done(hasMore.value ? "ok" : "empty");

}

</script>

<template>
  <v-list class="h-100 d-flex flex-column">
    <v-list-subheader>{{ projectName ?? "Tasks" }}</v-list-subheader>
    <v-divider />
    <v-infinite-scroll
      class="flex-grow-1"
      v-if="projectId"
      :key="projectId"
      @load="onLoad"
      mode="intersect"
      empty-text="&nbsp;">
      <v-list-item v-for="item in items"
        :key="item.id"
        :title="item.name"
        :subtitle="useDateFormat(item.createdAt, 'DD.MM.YYYY.').value">
      <template #append>
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

