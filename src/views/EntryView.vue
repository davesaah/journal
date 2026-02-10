<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useJournal } from '../composables/useJournal'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Trash2, Edit } from 'lucide-vue-next'
import { marked } from 'marked'

const route = useRoute()
const router = useRouter()
const { getEntry, deleteEntry } = useJournal()

const entry = computed(() => getEntry(route.params.id))

// Configure marked for better rendering
marked.setOptions({
  breaks: true,
  gfm: true,
})

const renderedContent = computed(() => {
  if (!entry.value?.content) return ''
  return marked(entry.value.content)
})

const formatDate = (dateString) => {
  if (!dateString) return ''
  const options = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }
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
  <div v-if="entry" class="container max-w-3xl mx-auto py-12 px-4">
    <header class="flex justify-between items-center mb-8">
      <Button variant="ghost" @click="goBack" class="gap-2 pl-0 hover:pl-2 transition-all">
        <ArrowLeft class="w-4 h-4" /> Back
      </Button>
      <div class="flex gap-2">
        <Button variant="destructive" size="sm" @click="deleteAndRedirect" class="gap-2">
          <Trash2 class="w-4 h-4" /> Delete
        </Button>
        <Button variant="outline" size="sm" @click="editEntry" class="gap-2">
          <Edit class="w-4 h-4" /> Edit
        </Button>
      </div>
    </header>

    <article>
      <h1 class="mb-2 text-4xl font-extrabold tracking-tight">{{ entry.title || 'Untitled Entry' }}</h1>
      <time class="block text-muted-foreground mb-8 text-lg">{{ formatDate(entry.date) }}</time>
      <div 
        class="prose prose-lg dark:prose-invert max-w-none"
        v-html="renderedContent"
      />
    </article>
  </div>
  
  <div v-else class="flex flex-col items-center justify-center min-h-[50vh] text-center">
    <h3 class="text-xl font-semibold mb-2">Entry not found</h3>
    <Button @click="goBack">Go Back</Button>
  </div>
</template>

<style scoped>
/* Custom prose styling for markdown rendering */
:deep(.prose) {
  color: hsl(var(--foreground));
}

:deep(.prose h1),
:deep(.prose h2),
:deep(.prose h3),
:deep(.prose h4) {
  color: hsl(var(--foreground));
  font-weight: 700;
  margin-top: 2rem;
  margin-bottom: 1rem;
}

:deep(.prose h1) {
  font-size: 2.25rem;
  margin-top: 0;
}

:deep(.prose h2) {
  font-size: 1.875rem;
}

:deep(.prose h3) {
  font-size: 1.5rem;
}

:deep(.prose p) {
  margin-bottom: 1.25rem;
  line-height: 1.75;
}

:deep(.prose a) {
  color: hsl(var(--primary));
  text-decoration: underline;
  transition: opacity 0.2s;
}

:deep(.prose a:hover) {
  opacity: 0.8;
}

:deep(.prose strong) {
  font-weight: 700;
  color: hsl(var(--foreground));
}

:deep(.prose em) {
  font-style: italic;
}

:deep(.prose code) {
  background: hsl(var(--muted));
  padding: 0.125rem 0.375rem;
  border-radius: 0.25rem;
  font-size: 0.875em;
  font-family: monospace;
}

:deep(.prose pre) {
  background: hsl(var(--muted));
  padding: 1.5rem;
  border-radius: 0.5rem;
  overflow-x: auto;
  margin: 1.5rem 0;
}

:deep(.prose pre code) {
  background: transparent;
  padding: 0;
}

:deep(.prose blockquote) {
  border-left: 4px solid hsl(var(--primary));
  padding-left: 1.5rem;
  margin-left: 0;
  font-style: italic;
  color: hsl(var(--muted-foreground));
}

:deep(.prose ul),
:deep(.prose ol) {
  padding-left: 2rem;
  margin-bottom: 1.25rem;
}

:deep(.prose ul) {
  list-style-type: disc;
}

:deep(.prose ul li::marker) {
  color: hsl(var(--primary));
  font-weight: bold;
}

:deep(.prose ol li::marker) {
  color: hsl(var(--primary));
  font-weight: 600;
}

:deep(.prose li) {
  margin-bottom: 0.5rem;
}

:deep(.prose hr) {
  border-color: hsl(var(--border));
  margin: 2rem 0;
}

:deep(.prose img) {
  border-radius: 0.5rem;
  margin: 1.5rem 0;
}

:deep(.prose table) {
  width: 100%;
  border-collapse: collapse;
  margin: 1.5rem 0;
}

:deep(.prose th),
:deep(.prose td) {
  border: 1px solid hsl(var(--border));
  padding: 0.75rem;
  text-align: left;
}

:deep(.prose th) {
  background: hsl(var(--muted));
  font-weight: 600;
}
</style>
