<template>
  <div class="dashboard">
    <!-- Header renovado -->
    <header class="dashboard-header">
      <div class="header-content">
        <div class="header-main">
          <div class="logo">
            <span class="logo-icon">✅</span>
            <h1>TaskUP</h1>
          </div>
          <p class="welcome">Hola, <strong>{{ authStore.user?.name }}</strong> </p>
        </div>
        <button @click="logout" class="btn-logout">
          <span class="logout-icon">🚪</span>
          Cerrar Sesión
        </button>
      </div>
    </header>

    <!-- Contenido principal con nuevo diseño -->
    <main class="dashboard-content">
      <!-- Sección de creación -->
      <section class="creation-section">
        <div class="section-card">
          <TaskForm 
            :editing-task="editingTask"
            @task-saved="handleTaskSaved"
          />
        </div>
      </section>

      <!-- Sección de filtros -->
      <section class="filters-section">
        <div class="section-card">
          <TaskFilter @filters-change="handleFiltersChange" />
        </div>
      </section>

      <!-- Sección de tareas -->
      <section class="tasks-section">
        <div class="section-header">
          <h2 class="section-title">
            <span class="task-icon">📋</span>
            Mis Tareas 
            <span class="task-count">({{ filteredTasks.length }})</span>
          </h2>
          <div class="task-stats">
            <div class="stat-item completed">
              <span class="stat-number">{{ completedTasks }}</span>
              <span class="stat-label">Completadas</span>
            </div>
            <div class="stat-item pending">
              <span class="stat-number">{{ pendingTasks }}</span>
              <span class="stat-label">Pendientes</span>
            </div>
          </div>
        </div>
        
        <div class="tasks-container">
          <TaskList 
            :tasks="filteredTasks"
            @edit-task="handleEditTask"
            @delete-task="handleDeleteTask"
            @toggle-completion="handleToggleCompletion"
          />
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useTasksStore } from '@/stores/tasks'
import TaskForm from '@/components/tasks/TaskForm.vue'
import TaskList from '@/components/tasks/TaskList.vue'
import TaskFilter from '@/components/tasks/TaskFilter.vue'

const authStore = useAuthStore()
const tasksStore = useTasksStore()

const editingTask = ref(null)
const currentFilters = ref({
  search: '',
  status: '',
  priority: ''
})

// LOGOUT GARANTIZADO
const logout = () => {
  authStore.logout()
  window.location.href = window.location.origin + '/'
}

// Computed properties para estadísticas
const completedTasks = computed(() => 
  tasksStore.tasks.filter(task => task.completed).length
)

const pendingTasks = computed(() => 
  tasksStore.tasks.filter(task => !task.completed).length
)

// Tareas filtradas
const filteredTasks = computed(() => {
  return tasksStore.tasks.filter(task => {
    const matchesSearch = !currentFilters.value.search || 
      task.title.toLowerCase().includes(currentFilters.value.search.toLowerCase()) ||
      task.description.toLowerCase().includes(currentFilters.value.search.toLowerCase())
    
    const matchesStatus = !currentFilters.value.status || 
      (currentFilters.value.status === 'completada' ? task.completed : !task.completed)
    
    const matchesPriority = !currentFilters.value.priority || 
      task.priority === currentFilters.value.priority

    return matchesSearch && matchesStatus && matchesPriority
  })
})

const handleFiltersChange = (filters) => {
  currentFilters.value = filters
}

const handleEditTask = (task) => {
  editingTask.value = task
}

const handleDeleteTask = (taskId) => {
  if (confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
    tasksStore.deleteTask(taskId)
  }
}

const handleToggleCompletion = (taskId) => {
  tasksStore.toggleTaskCompletion(taskId)
}

const handleTaskSaved = () => {
  editingTask.value = null
}
</script>

<style scoped>
.dashboard {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  padding: 0;
}

/* Header renovado */
.dashboard-header {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: 1.5rem 0;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.08);
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-main {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.logo-icon {
  font-size: 2rem;
}

.logo h1 {
  color: #2d3748;
  margin: 0;
  font-size: 1.75rem;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.welcome {
  color: #718096;
  margin: 0;
  font-size: 1.1rem;
}

.welcome strong {
  color: #4a5568;
}

/* Botón de logout renovado */
.btn-logout {
  background: linear-gradient(135deg, #fc8181 0%, #f56565 100%);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 4px 12px rgba(245, 101, 101, 0.3);
}

.btn-logout:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(245, 101, 101, 0.4);
}

.logout-icon {
  font-size: 1.1rem;
}

/* Contenido principal */
.dashboard-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

/* Tarjetas de sección */
.section-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

/* Header de tareas renovado */
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding: 0 1rem;
}

.section-title {
  color: #2d3748;
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.task-icon {
  font-size: 1.5rem;
}

.task-count {
  color: #718096;
  font-weight: 500;
  font-size: 1.1rem;
}

/* Estadísticas renovadas */
.task-stats {
  display: flex;
  gap: 1.5rem;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem 1.5rem;
  border-radius: 12px;
  min-width: 100px;
}

.stat-item.completed {
  background: linear-gradient(135deg, #c6f6d5 0%, #9ae6b4 100%);
  color: #22543d;
}

.stat-item.pending {
  background: linear-gradient(135deg, #fed7d7 0%, #feb2b2 100%);
  color: #742a2a;
}

.stat-number {
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1;
}

.stat-label {
  font-size: 0.85rem;
  font-weight: 600;
  margin-top: 0.25rem;
}

/* Contenedor de tareas */
.tasks-container {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

/* Responsive */
@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
    padding: 0 1.5rem;
  }
  
  .header-main {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .section-header {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
  
  .task-stats {
    justify-content: center;
  }
  
  .dashboard-content {
    padding: 1.5rem;
    gap: 1.5rem;
  }
  
  .logo h1 {
    font-size: 1.5rem;
  }
  
  .welcome {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .task-stats {
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .stat-item {
    flex-direction: row;
    justify-content: space-between;
    min-width: auto;
  }
  
  .dashboard-content {
    padding: 1rem;
  }
}
</style>