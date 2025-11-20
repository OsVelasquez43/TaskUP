<template>
  <div class="login-container">
    <div class="login-card">
      <div class="logo">
        <h1>TaskUP</h1>
        <p>Gestiona tus tareas de forma simple</p>
      </div>
      
      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            v-model="form.email"
            required
            class="form-input"
            placeholder="tu@email.com"
          >
        </div>

        <div class="form-group">
          <label for="password">Contraseña</label>
          <input
            type="password"
            id="password"
            v-model="form.password"
            required
            class="form-input"
            placeholder="••••••••"
          >
        </div>

        <button type="submit" class="btn-primary">
          <span v-if="!loading">Iniciar Sesión</span>
          <span v-else class="loading">Cargando...</span>
        </button>
        
        <div class="divider">
          <span>o</span>
        </div>
        
        <router-link to="/register" class="btn-secondary">
          Crear Cuenta Nueva
        </router-link>
      </form>

      <!-- BOTÓN DE DEBUG - AGREGADO AQUÍ -->
      <div class="debug-info">
        <p class="debug-text">
          💡 Para testing: <a href="#" @click.prevent="showDebug" class="debug-link">Ver info de debug</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()
const loading = ref(false)

const form = ref({
  email: '',
  password: ''
})

const handleLogin = async () => {
  // Validación básica
  if (!form.value.email || !form.value.password) {
    alert('Por favor completa todos los campos')
    return
  }

  loading.value = true

  // Pequeño delay para mejor UX
  setTimeout(() => {
    if (authStore.login(form.value.email, form.value.password)) {
      console.log('Redirigiendo al dashboard...')
      router.push('/dashboard')
    } else {
      alert('Email o contraseña incorrectos. Verifica tus credenciales.')
      console.log('Usuarios en sistema:', authStore.getUsers())
    }
    loading.value = false
  }, 800)
}

// FUNCIÓN DE DEBUG - AGREGADA AQUÍ
const showDebug = () => {
  console.log('=== DEBUG INFO ===')
  console.log('Usuarios registrados:', authStore.getUsers())
  console.log('Usuario actual:', authStore.user)
  console.log('LocalStorage users:', localStorage.getItem('users'))
  console.log('LocalStorage user:', localStorage.getItem('user'))
  console.log('=== FIN DEBUG ===')
  alert('Revisa la consola del navegador (F12) para ver la información de debug')
}
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 1rem;
}

.login-card {
  background: white;
  padding: 2.5rem;
  border-radius: 20px;
  box-shadow: 0 15px 35px rgba(0,0,0,0.1);
  width: 100%;
  max-width: 400px;
}

.logo {
  text-align: center;
  margin-bottom: 2rem;
}

.logo h1 {
  color: #333;
  font-weight: 700;
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.logo p {
  color: #666;
  font-size: 0.95rem;
}

.login-form {
  margin-top: 1rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #555;
  font-size: 0.9rem;
}

.form-input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid #e1e5e9;
  border-radius: 10px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: #f8f9fa;
}

.form-input:focus {
  outline: none;
  border-color: #667eea;
  background: white;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.btn-primary {
  width: 100%;
  padding: 0.875rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.3s ease;
  margin-bottom: 1rem;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
}

.btn-secondary {
  width: 100%;
  padding: 0.875rem;
  background: transparent;
  color: #667eea;
  border: 2px solid #667eea;
  border-radius: 10px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  text-align: center;
  display: block;
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  background: #667eea;
  color: white;
  transform: translateY(-2px);
}

.divider {
  text-align: center;
  margin: 1.5rem 0;
  position: relative;
  color: #999;
  font-size: 0.9rem;
}

.divider::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background: #e1e5e9;
  z-index: 1;
}

.divider span {
  background: white;
  padding: 0 1rem;
  position: relative;
  z-index: 2;
}

.loading {
  display: inline-block;
  animation: pulse 1.5s infinite;
}

/* ESTILOS DEL DEBUG - AGREGADOS AQUÍ */
.debug-info {
  margin-top: 2rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 10px;
  border: 1px solid #e1e5e9;
}

.debug-text {
  font-size: 0.8rem;
  color: #666;
  text-align: center;
  margin: 0;
}

.debug-link {
  color: #667eea;
  text-decoration: none;
  font-weight: 500;
}

.debug-link:hover {
  text-decoration: underline;
}

@keyframes pulse {
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
}

/* Responsive */
@media (max-width: 480px) {
  .login-card {
    padding: 2rem 1.5rem;
  }
  
  .logo h1 {
    font-size: 1.75rem;
  }
}
</style>