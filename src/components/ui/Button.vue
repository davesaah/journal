<script setup>
defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'danger', 'ghost'].includes(value)
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
  },
  block: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <button 
    class="btn" 
    :class="[`btn-${variant}`, `btn-${size}`, { 'btn-block': block }]"
    :disabled="disabled"
  >
    <slot></slot>
  </button>
</template>

<style scoped>
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: var(--font-weight-medium);
  border-radius: var(--radius-md);
  transition: all 0.2s ease;
  cursor: pointer;
  user-select: none;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Variants */
.btn-primary {
  background-color: var(--color-primary);
  color: white;
}
.btn-primary:hover:not(:disabled) {
  background-color: var(--color-primary-hover);
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

.btn-secondary {
  background-color: white;
  color: var(--color-text-main);
  border: 1px solid var(--color-border);
}
.btn-secondary:hover:not(:disabled) {
  background-color: var(--color-background);
  border-color: var(--color-text-muted);
}

.btn-danger {
  background-color: #ef4444;
  color: white;
}
.btn-danger:hover:not(:disabled) {
  background-color: #dc2626;
}

.btn-ghost {
  background-color: transparent;
  color: var(--color-text-main);
}
.btn-ghost:hover:not(:disabled) {
  background-color: rgba(0, 0, 0, 0.05);
}

/* Sizes */
.btn-sm {
  padding: var(--space-xs) var(--space-sm);
  font-size: 0.875rem;
}

.btn-md {
  padding: var(--space-sm) var(--space-md);
  font-size: 1rem;
}

.btn-lg {
  padding: var(--space-md) var(--space-lg);
  font-size: 1.125rem;
}

.btn-block {
  width: 100%;
}
</style>
