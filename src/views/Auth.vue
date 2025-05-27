<script setup>
import { ref } from 'vue'
import LoginForm from '@/components/auth/LoginForm.vue'
import RegisterForm from '@/components/auth/RegisterForm.vue'

const isLogin = ref(true)
</script>

<template>
    <section class="auth-container">
      <div class="toggle-buttons">
        <button @click="isLogin = true" :class="{ active: isLogin }">Iniciar sesión</button>
        <button @click="isLogin = false" :class="{ active: !isLogin }">Crear cuenta</button>
      </div>
  
      <div class="form-container">
        <LoginForm v-if="isLogin" />
        <RegisterForm v-else />
      </div>
    </section>
  </template>
  

  
  <style scoped>
  .auth-container {
    max-width: 400px;
    margin: 3rem auto;
    padding: 2rem;
    border: 1px solid #ccc;
    border-radius: 10px;
    background: #f9f9f9;
  }
  
  .toggle-buttons {
    display: flex;
    justify-content: space-around;
    margin-bottom: 1rem;
  }
  
  button {
    padding: 0.5rem 1rem;
    border: none;
    cursor: pointer;
    background-color: #eee;
    border-radius: 5px;
  }
  
  button.active {
    background-color: #333;
    color: white;
  }
  
  .form-container {
    margin-top: 1rem;
  }
  </style>
  