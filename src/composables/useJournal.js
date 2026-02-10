import { ref, watch } from 'vue'

const entries = ref([])

// Load from local storage
const loadEntries = () => {
  const stored = localStorage.getItem('journal_entries')
  if (stored) {
    entries.value = JSON.parse(stored)
  }
}

// Save to local storage
const saveEntries = () => {
  localStorage.setItem('journal_entries', JSON.stringify(entries.value))
}

export function useJournal() {
  // Initialize if empty (singleton pattern effect within app lifecycle)
  if (entries.value.length === 0) {
    loadEntries()
  }

  watch(entries, () => {
    saveEntries()
  }, { deep: true })

  const addEntry = (entry) => {
    entries.value.unshift({
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...entry
    })
  }

  const updateEntry = (id, updatedFields) => {
    const index = entries.value.findIndex(e => e.id === id)
    if (index !== -1) {
      entries.value[index] = {
        ...entries.value[index],
        ...updatedFields,
        updatedAt: new Date().toISOString()
      }
    }
  }

  const deleteEntry = (id) => {
    entries.value = entries.value.filter(e => e.id !== id)
  }

  const getEntry = (id) => {
    return entries.value.find(e => e.id === id)
  }

  return {
    entries,
    addEntry,
    updateEntry,
    deleteEntry,
    getEntry
  }
}
