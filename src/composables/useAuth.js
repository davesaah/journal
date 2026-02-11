import { ref, computed } from 'vue'

// Hardcoded users - you can change these credentials
const USERS = [
  { id: 'user1', name: 'David', password: 'david123' },
  { id: 'user2', name: 'Patience', password: 'patience123' }
]

const STORAGE_KEY = 'journal-current-user'

export function useAuth() {
  const currentUser = ref(null)

  // Load current user from localStorage on init
  const loadUser = () => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        currentUser.value = JSON.parse(stored)
      } catch (e) {
        localStorage.removeItem(STORAGE_KEY)
      }
    }
  }

  // Initialize
  loadUser()

  const isAuthenticated = computed(() => currentUser.value !== null)

  const login = (username, password) => {
    const user = USERS.find(u => u.name === username && u.password === password)
    if (user) {
      const userData = { id: user.id, name: user.name }
      currentUser.value = userData
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userData))
      return true
    }
    return false
  }

  const logout = () => {
    currentUser.value = null
    localStorage.removeItem(STORAGE_KEY)
  }

  const getUsers = () => {
    return USERS.map(u => ({ id: u.id, name: u.name }))
  }

  return {
    currentUser,
    isAuthenticated,
    login,
    logout,
    getUsers
  }
}
