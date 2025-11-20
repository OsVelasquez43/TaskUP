<template>
  <div class="task-filters">
    <div class="search-group">
      <label for="search">Buscar:</label>
      <input
        type="text"
        id="search"
        v-model="filters.search"
        placeholder="Buscar por título o descripción..."
        class="form-input"
      >
    </div>

    <div class="filter-group">
      <label for="status">Estado:</label>
      <select id="status" v-model="filters.status" class="form-input">
        <option value="">Todos</option>
        <option value="pendiente">Pendiente</option>
        <option value="completada">Completada</option>
      </select>
    </div>

    <div class="filter-group">
      <label for="priority">Prioridad:</label>
      <select id="priority" v-model="filters.priority" class="form-input">
        <option value="">Todas</option>
        <option value="alta">Alta</option>
        <option value="media">Media</option>
        <option value="baja">Baja</option>
      </select>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const filters = ref({
  search: '',
  status: '',
  priority: ''
})

const emit = defineEmits(['filters-change'])

// Emitir cambios en los filtros
watch(filters, (newFilters) => {
  emit('filters-change', newFilters)
}, { deep: true })
</script>

<style scoped>
.task-filters {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.search-group,
.filter-group {
  display: flex;
  flex-direction: column;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #333;
}
</style>