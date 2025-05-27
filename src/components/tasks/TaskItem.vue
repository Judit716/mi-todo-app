<template>
  <li class="task-item">
    <template v-if="editing">
      <input v-model="editedTitle" class="task-input" />
      <div class="action-buttons">
        <button class="btn save" @click="saveEdit">💾 Guardar</button>
        <button class="btn cancel" @click="cancelEdit">❌ Cancelar</button>
      </div>
    </template>

    <template v-else>
      <span :class="['task-title', { done: task.completed }]">
        {{ task.title }}
      </span>
      <div class="action-buttons">
        <button class="btn toggle" @click="toggleComplete">
          {{ task.completed ? '⬅ Volver' : '✔ ' }}
        </button>
        <button class="btn edit" @click="startEdit">✏️</button>
        <button class="btn delete" @click="deleteTask">🗑 </button>
      </div>
    </template>
  </li>
</template>

<script setup>
import { ref } from 'vue'
import { useTaskStore } from '@/stores/task'

const props = defineProps({
  task: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['task-updated', 'task-deleted'])

const taskStore = useTaskStore()

const editing = ref(false)
const editedTitle = ref(props.task.title)

const toggleComplete = async () => {
  const newStatus = !props.task.completed
  try {
    await taskStore.updateTask(props.task.id, { completed: newStatus })
    emit('task-updated')
  } catch (error) {
    console.error('Error al cambiar el estado de la tarea:', error)
  }
}

const deleteTask = async () => {
  await taskStore.deleteTask(props.task.id)
  emit('task-deleted')
}

const startEdit = () => {
  editing.value = true
  editedTitle.value = props.task.title
}

const cancelEdit = () => {
  editing.value = false
}

const saveEdit = async () => {
  if (!editedTitle.value.trim()) return
  await taskStore.updateTask(props.task.id, { title: editedTitle.value })
  emit('task-updated')
  editing.value = false
}
</script>

<style scoped>
.task-item {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #fefefe;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  margin-bottom: 1rem;
}

.task-title {
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  word-break: break-word;
}

.task-title.done {
  text-decoration: line-through;
  color: #888;
}

.task-input {
  padding: 0.5rem;
  font-size: 1rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  width: 100%;
  margin-bottom: 0.5rem;
}

.action-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.btn {
  padding: 0.4rem 0.75rem;
  font-size: 0.9rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s ease;
}

.btn.toggle {
  background-color: #4caf50;
  color: white;
}
.btn.toggle:hover {
  background-color: #388e3c;
}

.btn.edit {
  background-color: #2196f3;
  color: white;
}
.btn.edit:hover {
  background-color: #1976d2;
}

.btn.delete {
  background-color: #f44336;
  color: white;
}
.btn.delete:hover {
  background-color: #d32f2f;
}

.btn.save {
  background-color: #ff9800;
  color: white;
}
.btn.save:hover {
  background-color: #fb8c00;
}

.btn.cancel {
  background-color: #9e9e9e;
  color: white;
}
.btn.cancel:hover {
  background-color: #757575;
}

@media (min-width: 600px) {
  .task-item {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .task-title {
    margin-bottom: 0;
  }

  .task-input {
    margin-bottom: 0;
  }
}
</style>
