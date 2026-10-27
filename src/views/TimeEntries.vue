<script setup>
import TaskUpsert from "@/components/TaskUpsert.vue";
import { ref, watch } from "vue";
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
const dialog = ref(false);
const selectedTask = ref(null);
const itemsPerPageOptions = [
  {value: 20, title: '20'},
  {value: 50, title: '50'},
  {value: 100, title: '100'},
];
const page = ref(1);
function editEntry(e, { item }) { 
  selectedTask.value = item;
  dialog.value = true;
};
function onOptions({ page, itemsPerPage }) { 
  loadPage(page, itemsPerPage)
};
const snackbarTypes = {
  success: { color: 'success', icon: 'mdi-check-circle' },
  error: { color: 'error', icon: 'mdi-alert' },
};
const snackbar = ref({
  show: false, 
  type: 'success', 
  title: '', 
  text: '' 
});
function notify(type, title, text = '') {
  snackbar.value = { show: true, type, title, text };
};
watch(error, (value) => {
  if (value) notify('error', 'Unexpected error', value?.message ?? String(value));
});
function taskUpserted({ id, action }) {
  notify('success', `Time entry ${action}`, `ID: ${id}`);
  loadPage(page.value, itemsPerPage.value);
};
function upsertFailed(value) {
  notify('error', 'Saving time entry failed', value?.message ?? String(value));
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
    @click:row="editEntry"
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
  <v-dialog
    v-model="dialog"
    max-width="540"
  >
    <TaskUpsert
      v-model="dialog"
      :existing-task="selectedTask"
      @success="taskUpserted"
      @error="upsertFailed"/>
  </v-dialog>
  <v-snackbar
    v-model="snackbar.show"
    :color="snackbarTypes[snackbar.type].color"
    :prepend-icon="snackbarTypes[snackbar.type].icon"
    :title="snackbar.title"
    :text="snackbar.text"
    :timeout="3000"
    variant="elevated"
    contained
  />
  <v-fab
    absolute
    location="bottom right"
    @click="selectedTask = null; dialog = true"
    icon="mdi-plus" />
</template>