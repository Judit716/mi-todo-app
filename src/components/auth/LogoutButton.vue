<!-- src/components/auth/LogoutButton.vue -->
<template>
    <button @click="handleLogout" class="logout-btn">
      Cerrar sesión
    </button>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router'
  import { useUserStore } from '@/stores/user'
  
  const userStore = useUserStore()
  const router = useRouter()
  
  const handleLogout = async () => {
    try {
      await userStore.signOut()
      router.push('/auth') // redirigir al login
    } catch (error) {
      console.error('Error al cerrar sesión:', error)
    }
  }
  </script>
  
  <style scoped>
  .logout-btn {
    background-color: #f44336;
    color: white;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 8px;
    cursor: pointer;
  }
  .logout-btn:hover {
    background-color: #d32f2f;
  }
  </style>
  