<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useJournal } from '../composables/useJournal'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Trash2, Edit } from 'lucide-vue-next'

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

    <article class="prose dark:prose-invert lg:prose-xl max-w-none">
      <h1 class="mb-2 text-4xl font-extrabold tracking-tight">{{ entry.title || 'Untitled Entry' }}</h1>
      <time class="block text-muted-foreground mb-8 text-lg">{{ formatDate(entry.date) }}</time>
      <div class="whitespace-pre-wrap leading-relaxed text-foreground">
        {{ entry.content }}
      </div>
    </article>
  </div>
  
  <div v-else class="flex flex-col items-center justify-center min-h-[50vh] text-center">
    <h3 class="text-xl font-semibold mb-2">Entry not found</h3>
    <Button @click="goBack">Go Back</Button>
  </div>
</template>
