<template>
  <div :class="['task-item', { completed: task.completed }]">
    <div class="task-content">
      <div class="task-header">
        <h3 class="task-title">{{ task.title }}</h3>
        <span :class="['priority-badge', task.priority]">
          {{ task.priority }}
        </span>
      </div>
      
      <p class="task-description">{{ task.description }}</p>
      
      <div class="task-meta">
        <span class="due-date" v-if="task.dueDate">
          Vence: {{ formatDate(task.dueDate) }}
        </span>
        <span class="created-date">
          Creada: {{ formatDate(task.createdAt) }}
        </span>
      </div>
    </div>

    <div class="task-actions">
      <button 
        @click="$emit('toggle-completion')" 
        :class="['btn-status', task.completed ? 'completed' : 'pending']"
      >
        {{ task.completed ? 'Completada' : 'Pendiente' }}
      </button>
      
      <button 
        @click="$emit('edit')" 
        class="btn-edit"
      >
        Editar
      </button>
      
      <button 
        @click="$emit('delete')" 
        class="btn-delete"
      >
        Eliminar
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  task: {
    type: Object,
    required: true
  }
})

defineEmits(['edit', 'delete', 'toggle-completion'])

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('es-CO')
}
</script>

<style scoped>
.task-item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  border-left: 4px solid #4CAF50;
}

.task-item.completed {
  opacity: 0.7;
  border-left-color: #6c757d;
}

.task-content {
  flex: 1;
}

.task-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.5rem;
}

.task-title {
  margin: 0;
  color: #333;
}

.task-item.completed .task-title {
  text-decoration: line-through;
}

.priority-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: bold;
  text-transform: capitalize;
}

.priority-badge.alta {
  background-color: #f8d7da;
  color: #721c24;
}

.priority-badge.media {
  background-color: #fff3cd;
  color: #856404;
}

.priority-badge.baja {
  background-color: #d1ecf1;
  color: #0c5460;
}

.task-description {
  color: #666;
  margin-bottom: 1rem;
}

.task-meta {
  display: flex;
  gap: 1rem;
  font-size: 0.9rem;
  color: #888;
}

.task-actions {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-left: 1rem;
}

.btn-status,
.btn-edit,
.btn-delete {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  white-space: nowrap;
}

.btn-status.completed {
  background-color: #28a745;
  color: white;
}

.btn-status.pending {
  background-color: #ffc107;
  color: black;
}

.btn-edit {
  background-color: #17a2b8;
  color: white;
}

.btn-delete {
  background-color: #dc3545;
  color: white;
}
</style>