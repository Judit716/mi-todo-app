<!-- src/components/auth/RegisterForm.vue -->
<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'

const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const error = ref(null)
const success = ref(false)
const loading = ref(false)

const userStore = useUserStore()

const handleRegister = async () => {
  error.value = null
  success.value = false

  if (password.value !== confirmPassword.value) {
    error.value = 'Las contraseñas no coinciden.'
    return
  }

  loading.value = true
  try {
    await userStore.signUp(email.value, password.value)
    success.value = true
  } catch (err) {
    error.value = err.message || 'Error al registrarse'
  } finally {
    loading.value = false
  }
}
</script>

<template>
    <form @submit.prevent="handleRegister">
      <h2>Crear cuenta</h2>
  
      <div>
        <label for="email">Email:</label>
        <input v-model="email" type="email" required />
      </div>
  
      <div>
        <label for="password">Contraseña:</label>
        <input v-model="password" type="password" required />
      </div>
  
      <div>
        <label for="confirmPassword">Confirmar contraseña:</label>
        <input v-model="confirmPassword" type="password" required />
      </div>
  
      <button type="submit" :disabled="loading">Registrarse</button>
  
      <p v-if="error" class="error">{{ error }}</p>
      <p v-if="success" class="success">
        Se ha enviado un correo de confirmación. Revisa tu bandeja de entrada.
      </p>
    </form>
  </template>
  
  
  <style scoped>
 form {
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

h2 {
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 1.6rem;
  color: #333;
}

div {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}

label {
  margin-bottom: 0.4rem;
  font-weight: 600;
  font-size: 0.95rem;
  color: #444;
}

input {
  padding: 0.5rem 0.6rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
  width: 100%;
  box-sizing: border-box;
}

button {
  margin-top: 1rem;
  padding: 0.75rem;
  background-color: #2196f3;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;
  width: 100%;
}

button:hover:not(:disabled) {
  background-color: #1976d2;
}

button:disabled {
  background-color: #90caf9;
  cursor: not-allowed;
}

.error {
  color: #d32f2f;
  text-align: center;
  margin-top: 1rem;
  font-weight: 500;
}

.success {
  color: #2e7d32;
  text-align: center;
  margin-top: 1rem;
  font-weight: 500;
}

/* Mobile responsive */
@media (max-width: 480px) {
  form {
    margin: 1rem;
    padding: 1.25rem;
  }

  h2 {
    font-size: 1.3rem;
  }

  input {
    font-size: 0.95rem;
    padding: 0.5rem;
  }

  button {
    font-size: 0.95rem;
    padding: 0.65rem;
  }
}

  </style>
  