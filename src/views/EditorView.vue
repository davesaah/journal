<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useJournal } from '../composables/useJournal'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { ArrowLeft, Save } from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()
const { addEntry, getEntry, updateEntry } = useJournal()

const isEditing = ref(false)
const entryId = ref(null)

const form = ref({
  title: '',
  content: '',
  date: new Date().toISOString().split('T')[0] 
})

onMounted(() => {
  if (route.params.id) {
    isEditing.value = true
    entryId.value = route.params.id
    const entry = getEntry(route.params.id)
    if (entry) {
      form.value = { ...entry }
    } else {
      router.push('/')
    }
  }
})

const save = () => {
  if (!form.value.content.trim()) return

  if (isEditing.value) {
    updateEntry(entryId.value, form.value)
  } else {
    addEntry(form.value)
  }
  router.push('/')
}

const cancel = () => {
  router.back()
}
</script>

<template>
  <div class="container max-w-4xl mx-auto py-8 px-4 h-[calc(100vh-2rem)] flex flex-col">
    <header class="flex justify-between items-center mb-6">
      <Button variant="ghost" @click="cancel" class="gap-2 pl-0">
        <ArrowLeft class="w-4 h-4" /> Back
      </Button>
      <Button @click="save" class="gap-2">
        <Save class="w-4 h-4" /> Save
      </Button>
    </header>
    
    <div class="space-y-6 flex-1 flex flex-col">
      <div class="grid gap-4">
        <Input 
          v-model="form.title" 
          placeholder="Entry Title" 
          class="text-2xl font-bold border-none px-0 shadow-none focus-visible:ring-0 placeholder:text-muted-foreground/50 h-auto py-2"
        />
        <div class="flex items-center gap-2 text-muted-foreground">
           <Label for="date" class="sr-only">Date</Label>
           <Input 
              id="date" 
              type="date" 
              v-model="form.date" 
              class="w-auto border-none shadow-none px-0 focus-visible:ring-0 text-sm h-8" 
            />
        </div>
      </div>

      <Textarea 
        v-model="form.content" 
        placeholder="What's on your mind today?" 
        class="flex-1 resize-none border-none p-0 shadow-none focus-visible:ring-0 text-lg leading-relaxed"
      />
    </div>
  </div>
</template>
