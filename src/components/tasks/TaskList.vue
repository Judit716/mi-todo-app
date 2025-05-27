<!-- src/components/tasks/TaskList.vue -->
<template>
  <ul class="task-list">
    <TaskItem
      v-for="task in tasks"
      :key="task.id"
      :task="task"
      @task-updated="$emit('task-updated')"
      @task-deleted="$emit('task-deleted')"
    />
  </ul>
</template>

<script setup>
import TaskItem from './TaskItem.vue'

const props = defineProps({
  tasks: {
    type: Array,
    required: true
  }
})
</script>

<style scoped>
.task-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
</style>
