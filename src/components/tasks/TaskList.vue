<template>
  <div class="task-list">
    <div v-if="tasks.length === 0" class="empty-state">
      <p>No hay tareas para mostrar</p>
    </div>

    <div v-else class="tasks-container">
      <TaskItem
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        @edit="() => $emit('edit-task', task)"
        @delete="() => $emit('delete-task', task.id)"
        @toggle-completion="() => $emit('toggle-completion', task.id)"
      />
    </div>
  </div>
</template>

<script setup>
import TaskItem from './TaskItem.vue'

defineProps({
  tasks: {
    type: Array,
    required: true
  }
})

defineEmits(['edit-task', 'delete-task', 'toggle-completion'])
</script>

<style scoped>
.empty-state {
  text-align: center;
  padding: 3rem;
  color: #6c757d;
}

.tasks-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>