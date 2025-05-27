<!-- src/components/tasks/TaskForm.vue -->
<template>
    <form @submit.prevent="handleSubmit" class="task-form">
      <input
        v-model="newTask"
        type="text"
        placeholder="Escribe una nueva tarea..."
        required
      />
      <button type="submit" :disabled="loading">Añadir</button>
      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useTaskStore } from '@/stores/task'
  import { useUserStore } from '@/stores/user'
  
  const newTask = ref('')
  const error = ref(null)
  const loading = ref(false)
  
  const taskStore = useTaskStore()
  const userStore = useUserStore()
  
  const emit = defineEmits(['task-added'])
  
  const handleSubmit = async () => {
    error.value = null
    loading.value = true
  
    try {
      if (!userStore.user) {
        throw new Error('No hay usuario logueado')
      }
  
      await taskStore.addTask({
        title: newTask.value,
        completed: false,
        user_id: userStore.user.id
      })
  
      emit('task-added')
      newTask.value = ''
    } catch (err) {
      error.value = err.message || 'Error al añadir la tarea'
    } finally {
      loading.value = false
    }
  }
  </script>
  
  <style scoped>
  .task-form {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 2rem;
}

input {
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
  width: 100%;
  box-sizing: border-box;
}

button {
  padding: 0.75rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

button:hover:not(:disabled) {
  background-color: #0056b3;
}

button:disabled {
  background-color: #a0a0a0;
  cursor: not-allowed;
}

.error {
  color: red;
  font-size: 0.9rem;
}
@media (min-width: 600px) {
  .task-form {
    flex-direction: row;
    align-items: center;
  }

  input {
    flex: 1;
  }

  button {
    width: auto;
  }
}
  </style>
  
