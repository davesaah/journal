<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useJournal } from '../composables/useJournal'
import Button from '../components/ui/Button.vue'

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
  <div class="editor-container">
    <header class="editor-header">
      <input 
        v-model="form.title" 
        placeholder="Entry Title" 
        class="title-input"
        autofocus
      />
      <div class="actions">
        <Button variant="ghost" @click="cancel">Cancel</Button>
        <Button @click="save">Save</Button>
      </div>
    </header>
    
    <div class="meta-data">
        <label>Date: <input type="date" v-model="form.date" /></label>
    </div>

    <textarea 
      v-model="form.content" 
      placeholder="What's on your mind today?" 
      class="content-input"
    ></textarea>
  </div>
</template>

<style scoped>
.editor-container {
  max-width: 800px;
  margin: 0 auto;
  padding: var(--space-xl) var(--space-md);
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.editor-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-lg);
}

.title-input {
  font-size: 2rem;
  font-weight: var(--font-weight-bold);
  border: none;
  background: transparent;
  width: 100%;
  color: var(--color-text-main);
  outline: none;
}

.title-input::placeholder {
  color: var(--color-text-muted);
  opacity: 0.5;
}

.actions {
  display: flex;
  gap: var(--space-sm);
}

.meta-data {
    margin-bottom: var(--space-md);
    color: var(--color-text-muted);
    font-size: 0.875rem;
}

.content-input {
  flex: 1;
  width: 100%;
  border: none;
  background: transparent;
  resize: none;
  font-size: 1.125rem;
  line-height: 1.6;
  color: var(--color-text-main);
  outline: none;
  font-family: inherit;
}

.content-input::placeholder {
  color: var(--color-text-muted);
  opacity: 0.5;
}
</style>
