<script setup>
</script>

<template>
  <div class="card">
    <slot></slot>
  </div>
</template>

<style scoped>
.card {
  background-color: var(--color-surface);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  padding: var(--space-lg);
  transition: box-shadow 0.3s ease, transform 0.3s ease;
  border: 1px solid var(--color-border);
}

.card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-2px);
}
</style>
