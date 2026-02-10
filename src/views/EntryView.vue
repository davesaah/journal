<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useJournal } from '../composables/useJournal'
import Button from '../components/ui/Button.vue'

const route = useRoute()
const router = useRouter()
const { getEntry, deleteEntry } = useJournal()

const entry = computed(() => getEntry(route.params.id))

const formatDate = (dateString) => {
  if (!dateString) return ''
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateString).toLocaleDateString(undefined, options)
}

const editEntry = () => {
  router.push(`/entry/${entry.value.id}/edit`)
}

const deleteAndRedirect = () => {
  if (confirm('Are you sure you want to delete this entry?')) {
    deleteEntry(entry.value.id)
    router.push('/')
  }
}

const goBack = () => {
  router.back()
}
</script>

<template>
  <div v-if="entry" class="entry-container">
    <header class="entry-header">
      <Button variant="ghost" @click="goBack" class="back-btn">
        &larr; Back
      </Button>
      <div class="actions">
        <Button variant="danger" @click="deleteAndRedirect" size="sm">Delete</Button>
        <Button @click="editEntry">Edit</Button>
      </div>
    </header>

    <article class="entry-content">
      <h1 class="title">{{ entry.title || 'Untitled Entry' }}</h1>
      <time class="date">{{ formatDate(entry.date) }}</time>
      <div class="body">
        {{ entry.content }}
      </div>
    </article>
  </div>
  <div v-else class="not-found">
    <p>Entry not found.</p>
    <Button @click="goBack">Go Back</Button>
  </div>
</template>

<style scoped>
.entry-container {
  max-width: 800px;
  margin: 0 auto;
  padding: var(--space-xl) var(--space-md);
}

.entry-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-xl);
}

.title {
  font-size: 2.5rem;
  font-weight: var(--font-weight-bold);
  color: var(--color-text-main);
  margin-bottom: var(--space-sm);
  line-height: 1.2;
}

.date {
  display: block;
  font-size: 1rem;
  color: var(--color-text-muted);
  margin-bottom: var(--space-xl);
  font-weight: var(--font-weight-medium);
}

.body {
  font-size: 1.125rem;
  line-height: 1.8;
  color: var(--color-text-main);
  white-space: pre-wrap;
}

.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50vh;
  gap: var(--space-md);
  color: var(--color-text-muted);
}
</style>
