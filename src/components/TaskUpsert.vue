<script setup>
import { useCloned } from '@vueuse/core';
import { computed, ref } from 'vue';
import DateTimeField from '@/components/DateTimeField.vue';

const form = ref();
const dialog = defineModel({ type: Boolean, default: false });
const props = defineProps({
  existingTask: { type: Object, default: null },
});

const createEmptyTask = () => ({
  id: null,
  taskId: null,
  comment: '',
  start: null,
  end: null,
});

const rules = {
  required: (v) => (v !== null && v !== undefined && v !== '') ||
    'This field is required',
  afterStart: () => !task.value.start ||
    !task.value.end || 
    new Date(task.value.end) > new Date(task.value.start) ||
    'End date must be after start',
};

const isEditMode = computed(() => Number.isInteger(props.existingTask?.id));
const { cloned: task } = useCloned(() => props.existingTask ?? createEmptyTask());

async function save(){
  const { valid } = await form.value.validate();
  if(!valid) {
    return;
  }
  
}

</script>

<template>
  <v-card>
    <v-card-title>
      {{ isEditMode ? `Edit task ${task.taskId}` : "Create new task" }}
    </v-card-title>
    <v-card-text>
      <v-form ref="form">
        <v-text-field
          v-model="task.taskId"
          label="Task ID"
          type="number"
          :rules="[rules.required]"
        ></v-text-field>
        <v-text-field
          v-model="task.comment"
          label="Comment"
          :rules="[rules.required]"
        ></v-text-field>
        <DateTimeField
          v-model="task.start"
          label="Start"
          :rules="[rules.required]"
        ></DateTimeField>
        <DateTimeField
          v-model="task.end"
          label="End"
          :rules="[rules.required, rules.afterStart]"
        ></DateTimeField>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn
          variant="elevated"
          @click="save"
        >
          Save
        </v-btn>

        <v-btn
          error
          variant="elevated"
          @click="dialog = false"
        >
          Cancel
        </v-btn>
    </v-card-actions>
  </v-card>
</template>