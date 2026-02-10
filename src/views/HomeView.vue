<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useJournal } from '../composables/useJournal'
import Card from '../components/ui/Card.vue'
import Button from '../components/ui/Button.vue'

const router = useRouter()
const { entries } = useJournal()

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateString).toLocaleDateString(undefined, options)
}

const truncate = (text, length = 100) => {
  if (text.length <= length) return text
  return text.substring(0, length) + '...'
}

const createNewEntry = () => {
  router.push('/new')
}

const openEntry = (id) => {
  router.push(`/entry/${id}`)
}
</script>

<template>
  <div class="home-container">
    <header class="header">
      <div>
        <h1 class="title">My Journal</h1>
        <p class="subtitle">Capture your thoughts, ideas, and memories.</p>
      </div>
      <Button @click="createNewEntry" size="lg">New Entry</Button>
    </header>

    <div v-if="entries.length === 0" class="empty-state">
      <div class="empty-content">
        <h3>No entries yet</h3>
        <p>Start writing your first journal entry today.</p>
        <Button variant="secondary" @click="createNewEntry">Create Entry</Button>
      </div>
    </div>

    <div v-else class="entries-grid">
      <Card 
        v-for="entry in entries" 
        :key="entry.id" 
        class="entry-card"
        @click="openEntry(entry.id)"
      >
        <div class="card-content">
          <span class="date">{{ formatDate(entry.date) }}</span>
          <h2 class="entry-title">{{ entry.title || 'Untitled Entry' }}</h2>
          <p class="preview">{{ truncate(entry.content) }}</p>
        </div>
      </Card>
    </div>
  </div>
</template>

<style scoped>
.home-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--space-xl) var(--space-md);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-xl);
}

.title {
  font-size: 2.5rem;
  font-weight: var(--font-weight-bold);
  color: var(--color-text-main);
  background: linear-gradient(135deg, var(--color-primary) 0%, #a855f7 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: var(--space-xs);
}

.subtitle {
  color: var(--color-text-muted);
  font-size: 1.125rem;
}

.empty-state {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  text-align: center;
  background-color: var(--color-surface);
  border-radius: var(--radius-lg);
  border: 2px dashed var(--color-border);
}

.empty-content h3 {
  margin-bottom: var(--space-sm);
  color: var(--color-text-main);
}

.empty-content p {
  margin-bottom: var(--space-lg);
  color: var(--color-text-muted);
}

.entries-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--space-lg);
}

.entry-card {
  cursor: pointer;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.card-content {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.date {
  font-size: 0.875rem;
  color: var(--color-primary);
  font-weight: var(--font-weight-medium);
}

.entry-title {
  font-size: 1.25rem;
  font-weight: var(--font-weight-bold);
  color: var(--color-text-main);
  line-height: 1.4;
}

.preview {
  color: var(--color-text-muted);
  line-height: 1.6;
}
</style>
