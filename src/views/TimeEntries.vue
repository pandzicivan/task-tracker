<script setup>
import { onMounted, ref } from "vue";
import { useDateFormat } from '@vueuse/core';
import { getTimeEntries } from "@/api/index.js";
import { usePaginatedEntities } from "@/composables/usePaginatedEntities";

const { items, error, hasMore, loadMore, loading }  = usePaginatedEntities(getTimeEntries, 20);
const headers = [
  { title: 'ID', key: 'id' },
  { title: 'Comment', key: 'comment' },
  { title: 'Start', key: 'start' },
  { title: 'End', key: 'end' },
  { title: 'Created at', key: 'createdAt' },
];

onMounted(loadMore);

</script>
<template>
  <v-data-table
    :loading="loading"
    :headers="headers"
    :items="items">
    <template v-slot:item.start="{ value }">
      {{ useDateFormat(value, 'DD.MM.YYYY. HH:mm:ss').value }}
    </template>
    <template v-slot:item.end="{ value }">
      {{ useDateFormat(value, 'DD.MM.YYYY. HH:mm:ss').value }}
    </template>
    <template v-slot:item.createdAt="{ value }">
      {{ useDateFormat(value, 'DD.MM.YYYY. HH:mm:ss').value }}
    </template>
  </v-data-table>
</template>