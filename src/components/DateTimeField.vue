<script setup>
import { useDateFormat } from '@vueuse/core';
import { ref, watch } from 'vue';

const model = defineModel({ type: String, default: null });
const props = defineProps({
  label: { type: String, default: '' },
  rules: { type: Array, default: () => [] },
});
const rules = {
  required: (v) => (v !== null && v !== undefined && v !== '') || 'This field is required',
};

const date = ref(null);
const time = ref(null);
let emitted = null;

watch(model, (value) => {
  if (value === emitted) return;
  date.value = value ? new Date(value) : null;
  time.value = value ? useDateFormat(value, 'HH:mm').value : null;
}, { immediate: true });

function update() {
  if (!date.value || !time.value) {
    emitted = null;
  } else {
    const [hours, minutes] = time.value.split(':').map(Number);
    const next = new Date(date.value);
    next.setHours(hours, minutes, 0, 0);
    emitted = next.toISOString();
  }
  model.value = emitted;
}
</script>

<template>
  <div class="d-flex ga-2">
    <v-date-input
      v-model="date"
      :label="`${label} date`"
      :rules="[...props.rules]"
      input-format="dd.mm.yyyy"
      prepend-icon=""
      prepend-inner-icon="mdi-calendar"
      class="flex-grow-1"
      @update:model-value="update"
    ></v-date-input>
    <v-text-field
      v-model="time"
      :label="`${label} time`"
      :rules="[...props.rules]"
      type="time"
      class="flex-grow-0"
      style="min-width: 130px"
      @update:model-value="update"
    ></v-text-field>
  </div>
</template>
