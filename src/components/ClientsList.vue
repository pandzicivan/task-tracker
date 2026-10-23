<script setup>
import { defineModel } from "vue";
import { usePaginatedEntities } from "@/composables/usePaginatedEntities";
import { getClients } from "@/api";

const { items, error, hasMore, loadMore }  = usePaginatedEntities(getClients, 20);

const selectedClient = defineModel("selectedClient");

function clientSelected(client) {
  return client.id === selectedClient.value?.id;
}

async function onLoad({ done }) {
  await loadMore();
  if (error.value) done("error");
  else done(hasMore.value ? "ok" : "empty");
}

</script>

<template>
  <v-list class="h-100 d-flex flex-column">
    <v-list-subheader>Select client</v-list-subheader>
    <v-divider />
    <v-infinite-scroll
      class="flex-grow-1"
      @load="onLoad"
      mode="intersect"
      empty-text="&nbsp;">
      <v-list-item v-for="item in items"
        :active="clientSelected(item)"
        @click="selectedClient = item"
        :key="item.id"
        :title="item.name" 
        :subtitle="item.description"/>

       <template #error="{ props }">
        <div class="text-center">
          <div class="text-error mb-2">{{ error?.message }}</div>
          <v-btn v-bind="props" variant="outlined">Retry</v-btn>
        </div>
      </template>
    </v-infinite-scroll>
  </v-list>
</template>

