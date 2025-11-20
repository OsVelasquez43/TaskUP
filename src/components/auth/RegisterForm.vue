<template>
  <form @submit.prevent="handleRegister" class="register-form">
    <h2>Registrarse</h2>
    
    <div class="form-group">
      <label for="name">Nombre completo:</label>
      <input
        type="text"
        id="name"
        v-model="form.name"
        required
        class="form-input"
      >
    </div>

    <div class="form-group">
      <label for="email">Email:</label>
      <input
        type="email"
        id="email"
        v-model="form.email"
        required
        class="form-input"
      >
    </div>

    <div class="form-group">
      <label for="password">Contraseña:</label>
      <input
        type="password"
        id="password"
        v-model="form.password"
        required
        class="form-input"
      >
    </div>

    <button type="submit" class="btn-primary">Registrarse</button>
    
    <p class="login-link">
      ¿Ya tienes cuenta? <router-link to="/">Inicia sesión</router-link>
    </p>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const form = ref({
  name: '',
  email: '',
  password: ''
})

const handleRegister = () => {
  authStore.register(form.value)
  alert('Registro exitoso! Ahora puedes iniciar sesión.')
  router.push('/')
}
</script>

<style scoped>
.register-form {
  max-width: 400px;
  margin: 0 auto;
  padding: 2rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.btn-primary {
  width: 100%;
  padding: 0.75rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.login-link {
  text-align: center;
  margin-top: 1rem;
}
</style>