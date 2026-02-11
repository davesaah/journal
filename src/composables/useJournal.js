import { ref, watch } from 'vue'
import { useAuth } from './useAuth'

const SHARED_STORAGE_KEY = 'journal-entries-shared'

export function useJournal() {
  const { currentUser } = useAuth()
  
  const entries = ref([])

  // Load all entries from shared storage
  const loadEntries = () => {
    const stored = localStorage.getItem(SHARED_STORAGE_KEY)
    if (stored) {
      try {
        entries.value = JSON.parse(stored)
      } catch (e) {
        entries.value = []
      }
    } else {
      entries.value = []
    }
  }

  // Save all entries to shared storage whenever they change
  watch(entries, (newEntries) => {
    localStorage.setItem(SHARED_STORAGE_KEY, JSON.stringify(newEntries))
  }, { deep: true })

  // Load entries on init
  loadEntries()

  const addEntry = (entry) => {
    if (!currentUser.value) return
    
    const newEntry = {
      ...entry,
      id: crypto.randomUUID(),
      authorId: currentUser.value.id,
      authorName: currentUser.value.name,
      createdAt: new Date().toISOString()
    }
    entries.value.unshift(newEntry)
  }

  const updateEntry = (id, updates) => {
    const index = entries.value.findIndex(e => e.id === id)
    if (index !== -1) {
      // Only allow updating own entries
      if (entries.value[index].authorId === currentUser.value?.id) {
        entries.value[index] = {
          ...entries.value[index],
          ...updates,
          updatedAt: new Date().toISOString()
        }
      }
    }
  }

  const deleteEntry = (id) => {
    // Only allow deleting own entries
    const entry = entries.value.find(e => e.id === id)
    if (entry && entry.authorId === currentUser.value?.id) {
      entries.value = entries.value.filter(e => e.id !== id)
    }
  }

  const getEntry = (id) => {
    return entries.value.find(e => e.id === id)
  }

  const addAfterthought = (entryId, thought) => {
    const index = entries.value.findIndex(e => e.id === entryId)
    if (index !== -1) {
      // Only allow adding afterthoughts to own entries
      if (entries.value[index].authorId === currentUser.value?.id) {
        if (!entries.value[index].afterthoughts) {
          entries.value[index].afterthoughts = []
        }
        entries.value[index].afterthoughts.push({
          id: crypto.randomUUID(),
          content: thought,
          createdAt: new Date().toISOString()
        })
      }
    }
  }

  const isOwnEntry = (entry) => {
    return entry && entry.authorId === currentUser.value?.id
  }

  return {
    entries,
    addEntry,
    updateEntry,
    deleteEntry,
    getEntry,
    addAfterthought,
    isOwnEntry
  }
}
