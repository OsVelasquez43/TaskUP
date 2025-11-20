<template>
  <form @submit.prevent="handleSubmit" class="task-form">
    <h3>{{ isEditing ? 'Editar Tarea' : 'Nueva Tarea' }}</h3>
    
    <div class="form-group">
      <label for="title">Título:</label>
      <input
        type="text"
        id="title"
        v-model="formData.title"
        required
        class="form-input"
        placeholder="¿Qué necesitas hacer?"
      >
    </div>

    <div class="form-group">
      <label for="description">Descripción:</label>
      <textarea
        id="description"
        v-model="formData.description"
        class="form-input"
        rows="3"
        placeholder="Detalles de la tarea..."
      ></textarea>
    </div>

    <div class="form-row">
      <div class="form-group">
        <label for="dueDate">Fecha de vencimiento:</label>
        <input
          type="date"
          id="dueDate"
          v-model="formData.dueDate"
          class="form-input"
        >
      </div>

      <div class="form-group">
        <label for="priority">Prioridad:</label>
        <select id="priority" v-model="formData.priority" class="form-input">
          <option value="baja">Baja</option>
          <option value="media">Media</option>
          <option value="alta">Alta</option>
        </select>
      </div>
    </div>

    <div class="form-actions">
      <button type="submit" class="btn-primary">
        {{ isEditing ? 'Actualizar' : 'Crear' }} Tarea
      </button>
      <button v-if="isEditing" type="button" @click="cancelEdit" class="btn-secondary">
        Cancelar
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import { useTasksStore } from '@/stores/tasks'

const tasksStore = useTasksStore()
const emit = defineEmits(['task-saved'])

const props = defineProps({
  editingTask: {
    type: Object,
    default: null
  }
})

// Datos del formulario
const formData = ref({
  title: '',
  description: '',
  dueDate: '',
  priority: 'media'
})

// Computed para saber si estamos editando
const isEditing = computed(() => !!props.editingTask)

// Función para resetear el formulario
const resetForm = () => {
  formData.value = {
    title: '',
    description: '',
    dueDate: '',
    priority: 'media'
  }
}

// Watcher simplificado - sin immediate
watch(() => props.editingTask, (newTask) => {
  if (newTask) {
    // Si hay una tarea para editar, llenar el formulario
    formData.value = { ...newTask }
  } else {
    // Si no hay tarea, resetear el formulario
    resetForm()
  }
})

// Manejar envío del formulario
const handleSubmit = () => {
  if (!formData.value.title.trim()) {
    alert('Por favor ingresa un título para la tarea')
    return
  }

  if (props.editingTask) {
    // Editar tarea existente
    tasksStore.updateTask(props.editingTask.id, formData.value)
  } else {
    // Crear nueva tarea
    tasksStore.addTask(formData.value)
  }
  
  // Resetear y emitir evento
  resetForm()
  emit('task-saved')
}

// Cancelar edición
const cancelEdit = () => {
  resetForm()
  emit('task-saved')
}

// Inicializar el formulario
resetForm()
</script>

<style scoped>
.task-form {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  margin-bottom: 2rem;
}

.task-form h3 {
  margin: 0 0 1.5rem 0;
  color: #333;
  font-size: 1.25rem;
  font-weight: 600;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #333;
  font-size: 0.9rem;
}

.form-input {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
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

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-actions {
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  flex: 1;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.btn-secondary {
  background: #6c757d;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  background: #5a6268;
  transform: translateY(-2px);
}

/* Responsive */
@media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .form-actions {
    flex-direction: column;
  }
}
</style>