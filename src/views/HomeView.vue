<script setup>
import { useRouter } from 'vue-router'
import { useJournal } from '../composables/useJournal'
import { useAuth } from '../composables/useAuth'
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent 
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar, BookOpen, LogOut } from 'lucide-vue-next'

const router = useRouter()
const { entries } = useJournal()
const { currentUser, logout } = useAuth()

const handleLogout = () => {
  logout()
  router.push('/login')
}

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
  <div class="container max-w-6xl mx-auto py-8 px-4">
    <header class="mb-12">
      <div class="flex items-center justify-between mb-6">
        <div>
          <h1 class="text-4xl font-extrabold tracking-tight mb-2">My Journal</h1>
          <p class="text-muted-foreground">Welcome back, {{ currentUser?.name }}!</p>
        </div>
        <div class="flex items-center gap-3">
          <Button @click="createNewEntry" size="lg" class="gap-2">
            <BookOpen class="w-5 h-5" />
            New Entry
          </Button>
          <Button @click="handleLogout" variant="outline" size="lg" class="gap-2">
            <LogOut class="w-4 h-4" />
            Logout
          </Button>
        </div>
      </div>
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
        class="group cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-muted overflow-hidden"
        @click="openEntry(entry.id)"
      >
        <CardHeader class="space-y-3">
          <div class="flex items-center justify-between gap-2">
            <div class="flex items-center gap-2 text-xs text-muted-foreground">
              <Calendar class="w-3.5 h-3.5" />
              <span>{{ formatDate(entry.date) }}</span>
            </div>
            <span 
              class="text-xs px-2 py-0.5 rounded-full font-medium"
              :class="entry.authorId === currentUser?.id 
                ? 'bg-primary/20 text-primary' 
                : 'bg-muted text-muted-foreground'"
            >
              {{ entry.authorName || 'Unknown' }}
            </span>
          </div>
          <div class="flex items-start gap-3">
            <div class="mt-1 text-primary/80">
              <BookOpen class="w-5 h-5" />
            </div>
            <CardTitle class="text-xl group-hover:text-primary transition-colors leading-tight">
              {{ entry.title || 'Untitled Entry' }}
            </CardTitle>
          </div>
        </CardHeader>
      </Card>
    </div>
  </div>
</template>
