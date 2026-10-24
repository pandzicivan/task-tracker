<script setup>
import { ref } from "vue";
import { useDateFormat } from '@vueuse/core';
import { getTimeEntries } from "@/api/index.js";
import { usePaginatedEntities } from "@/composables/usePaginatedEntities";

const { items, error, itemsLength, loadPage, loading, hasMore }  = usePaginatedEntities(getTimeEntries, 20);
const headers = [
  { title: 'ID', key: 'id' },
  { title: 'Comment', key: 'comment' },
  { title: 'Start', key: 'start' },
  { title: 'End', key: 'end' },
  { title: 'Created at', key: 'createdAt' },
];
const itemsPerPage = ref(20);
const itemsPerPageOptions = [
  {value: 20, title: '20'},
  {value: 50, title: '50'},
  {value: 100, title: '100'},
];
const page = ref(1);
function onOptions({ page, itemsPerPage }) { 
  loadPage( page, itemsPerPage)
};

</script>
<template>
  <v-data-table-server
    v-model:page="page"
    v-model:items-per-page="itemsPerPage"
    :items-length="itemsLength"
    :loading="loading"
    :headers="headers"
    :items="items"
    @update:options="onOptions">
    <template v-slot:item.start="{ value }">
      {{ useDateFormat(value, 'DD.MM.YYYY. HH:mm:ss').value }}
    </template>
    <template v-slot:item.end="{ value }">
      {{ useDateFormat(value, 'DD.MM.YYYY. HH:mm:ss').value }}
    </template>
    <template v-slot:item.createdAt="{ value }">
      {{ useDateFormat(value, 'DD.MM.YYYY. HH:mm:ss').value }}
    </template>
    <template #bottom>
      <div class="d-flex align-center justify-end ga-2 pa-2">
        <span class="text-body-2">Items per page:</span>
        <v-select
          v-model="itemsPerPage"
          :items="itemsPerPageOptions"
          density="compact"
          variant="outlined"
          hide-details
          style="max-width: 100px" />
        <v-btn
          icon="mdi-chevron-left"
          variant="text"
          :disabled="page === 1 || loading"
          @click="page--" />
        <span class="text-body-2">Page {{ page }}</span>
        <v-btn
          icon="mdi-chevron-right"
          variant="text"
          :disabled="!hasMore || loading"
          @click="page++" />
      </div>
    </template>
  </v-data-table-server>
  <v-snackbar
    :model-value="!!error"
    @update:model-value="v => { if (!v) error = null }"
    color="error"
    prepend-icon="mdi-alert"
    :text="error"
    :timeout="3000"
    title="Unexpected error"
    variant="elevated"
    contained
  />
  <v-fab
    absolute
    location="bottom right"
    @click="console.log('upsert stuff')"
    icon="mdi-plus" />
</template>