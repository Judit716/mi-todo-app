<template>
  <form @submit.prevent="handleLogin" class="login-form">
    <h2>Iniciar sesión</h2>

    <div class="form-group">
      <label for="email">Email</label>
      <input
        id="email"
        v-model="email"
        type="email"
        required
        placeholder="ejemplo@correo.com"
      />
    </div>

    <div class="form-group">
      <label for="password">Contraseña</label>
      <input
        id="password"
        v-model="password"
        type="password"
        required
        placeholder="Tu contraseña"
      />
    </div>

    <button type="submit" :disabled="loading">
      {{ loading ? 'Cargando...' : 'Entrar' }}
    </button>

    <p v-if="error" class="error">{{ error }}</p>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref(null)

const userStore = useUserStore()
const router = useRouter()

const handleLogin = async () => {
  loading.value = true
  error.value = null

  try {
    await userStore.signIn(email.value, password.value)
    if (userStore.user) {
      router.push('/')
    }
  } catch (err) {
    error.value = err.message || 'Error al iniciar sesión'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-form {
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

.form-group {
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
  background-color: #4caf50;
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
  background-color: #43a047;
}

button:disabled {
  background-color: #a5d6a7;
  cursor: not-allowed;
}

.error {
  color: #d32f2f;
  text-align: center;
  margin-top: 1rem;
  font-weight: 500;
}

/* Mejora responsive */
@media (max-width: 480px) {
  .login-form {
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
