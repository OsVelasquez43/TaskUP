import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useAuthStore } from './auth'

export const useTasksStore = defineStore('tasks', () => {
  const tasks = ref(JSON.parse(localStorage.getItem('tasks')) || [])
  const authStore = useAuthStore()

  // Obtener tareas del usuario actual
  const userTasks = computed(() => {
    if (!authStore.user) return []
    return tasks.value.filter(task => task.userId === authStore.user.id)
  })

  const addTask = (taskData) => {
    const newTask = {
      id: Date.now(),
      userId: authStore.user.id,
      createdAt: new Date().toISOString(),
      completed: false,
      ...taskData
    }
    tasks.value.push(newTask)
    saveToLocalStorage()
  }

  const updateTask = (taskId, updates) => {
    const taskIndex = tasks.value.findIndex(task => task.id === taskId)
    if (taskIndex !== -1) {
      tasks.value[taskIndex] = { ...tasks.value[taskIndex], ...updates }
      saveToLocalStorage()
    }
  }

  const deleteTask = (taskId) => {
    tasks.value = tasks.value.filter(task => task.id !== taskId)
    saveToLocalStorage()
  }

  const toggleTaskCompletion = (taskId) => {
    const task = tasks.value.find(task => task.id === taskId)
    if (task) {
      task.completed = !task.completed
      saveToLocalStorage()
    }
  }

  const saveToLocalStorage = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks.value))
  }

  return {
    tasks: userTasks,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskCompletion
  }
})