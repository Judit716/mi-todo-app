<script setup>
import { onMounted, computed } from 'vue'
import { useUserStore } from '@/stores/user'
import { useTaskStore } from '@/stores/task'
import TaskForm from '@/components/tasks/TaskForm.vue'
import TaskList from '@/components/tasks/TaskList.vue'
import LogoutButton from '@/components/auth/LogoutButton.vue'

const userStore = useUserStore()
const taskStore = useTaskStore()

const user = computed(() => userStore.user)

const incompleteTasks = computed(() =>
  taskStore.tasks.filter(task => !task.completed)
)

const completedTasks = computed(() =>
  taskStore.tasks.filter(task => task.completed)
)

const fetchTasks = async () => {
  if (user.value) {
    await taskStore.fetchTasks(user.value.id)
  }
}

onMounted(fetchTasks)
</script>

<template>
  <section class="dashboard">
    <h1>¡Hola, {{ user?.email }}!</h1>
    

    <div class="asideButton">
      <LogoutButton />
    </div>
    

    <TaskForm @task-added="fetchTasks" />

    <h2>Tareas pendientes</h2>
    <TaskList
      :tasks="incompleteTasks"
      @task-updated="fetchTasks"
      @task-deleted="fetchTasks"
    />

    <h2>Tareas completadas</h2>
    <TaskList
      :tasks="completedTasks"
      @task-updated="fetchTasks"
      @task-deleted="fetchTasks"
    />
  </section>
</template>

<style scoped>
.dashboard {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f9f9f9;
  min-height: 100vh;
  box-sizing: border-box;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.dashboard-header h1 {
  font-size: 1.8rem;
  color: #333;
}

.form-wrapper {
  margin-bottom: 2rem;
}

.task-section {
  margin-bottom: 2.5rem;
}

.task-section h2 {
  font-size: 1.4rem;
  margin-bottom: 1rem;
  color: #444;
}
.asideButton {
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 10;
}


/* Responsive */
@media (max-width: 600px) {
  .dashboard {
    padding: 1rem;
  }

  .dashboard-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .dashboard-header h1 {
    font-size: 1.5rem;
  }
}
</style>
