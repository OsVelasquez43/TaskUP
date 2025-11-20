import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const users = ref([])

  // Cargar datos al inicializar - CORREGIDO
  const loadFromStorage = () => {
    try {
      const storedUsers = localStorage.getItem('users')
      const storedUser = localStorage.getItem('user')
      
      if (storedUsers) {
        users.value = JSON.parse(storedUsers)
      }
      if (storedUser) {
        user.value = JSON.parse(storedUser)
      }
    } catch (error) {
      console.error('Error loading from storage:', error)
      user.value = null
      users.value = []
    }
  }

  // Ejecutar la carga al crear el store
  loadFromStorage()

  const isAuthenticated = computed(() => !!user.value)

  const register = (userData) => {
    // Verificar si el usuario ya existe
    if (users.value.find(u => u.email === userData.email)) {
      alert('Este email ya está registrado')
      return false
    }

    const newUser = {
      id: Date.now().toString(),
      ...userData,
      createdAt: new Date().toISOString()
    }
    
    users.value.push(newUser)
    localStorage.setItem('users', JSON.stringify(users.value))
    
    alert('✅ ¡Cuenta creada exitosamente! Ahora puedes iniciar sesión.')
    return true
  }

  const login = (email, password) => {
    // Recargar datos siempre desde localStorage
    loadFromStorage()
    
    const foundUser = users.value.find(u => 
      u.email === email && u.password === password
    )
    
    if (foundUser) {
      user.value = foundUser
      localStorage.setItem('user', JSON.stringify(foundUser))
      console.log('✅ Login exitoso:', foundUser)
      return true
    }
    
    alert('❌ Email o contraseña incorrectos')
    return false
  }

  const logout = () => {
    user.value = null
    localStorage.removeItem('user')
    console.log('✅ Logout exitoso')
  }

  // Función para debug
  const getDebugInfo = () => {
    return {
      user: user.value,
      users: users.value,
      isAuthenticated: isAuthenticated.value,
      localStorageUser: localStorage.getItem('user'),
      localStorageUsers: localStorage.getItem('users')
    }
  }

  return {
    user,
    users,
    isAuthenticated,
    register,
    login,
    logout,
    getDebugInfo,
    loadFromStorage
  }
})