<script setup>
import { useRouter } from 'vue-router'
import { useJournal } from '../composables/useJournal'
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent 
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'

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
  <div class="container max-w-5xl mx-auto py-12 px-4">
    <header class="flex justify-between items-center mb-12">
      <div>
        <h1 class="text-4xl font-bold tracking-tight mb-2 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
          My Journal
        </h1>
        <p class="text-muted-foreground text-lg">
          Capture your thoughts, ideas, and memories.
        </p>
      </div>
      <Button @click="createNewEntry" size="lg" class="shadow-lg hover:shadow-xl transition-all">
        New Entry
      </Button>
    </header>

    <div v-if="entries.length === 0" class="flex flex-col items-center justify-center min-h-[400px] text-center border-2 border-dashed rounded-lg bg-muted/30">
      <div class="max-w-md space-y-4">
        <h3 class="text-2xl font-semibold">No entries yet</h3>
        <p class="text-muted-foreground">Start writing your first journal entry today.</p>
        <Button variant="secondary" @click="createNewEntry">Create Entry</Button>
      </div>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card 
        v-for="entry in entries" 
        :key="entry.id" 
        class="group cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-muted"
        @click="openEntry(entry.id)"
      >
        <CardHeader class="pb-2">
          <span class="text-xs font-medium text-primary mb-1 block">
            {{ formatDate(entry.date) }}
          </span>
          <CardTitle class="text-xl group-hover:text-primary transition-colors">
            {{ entry.title || 'Untitled Entry' }}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p class="text-muted-foreground line-clamp-3 leading-relaxed">
            {{ truncate(entry.content) }}
          </p>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
