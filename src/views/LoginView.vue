<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { User, Lock, BookOpen } from 'lucide-vue-next'

const router = useRouter()
const { login, getUsers } = useAuth()

const users = getUsers()
const selectedUser = ref(users[0].name)
const password = ref('')
const error = ref('')

const handleLogin = () => {
  error.value = ''
  const success = login(selectedUser.value, password.value)
  
  if (success) {
    router.push('/')
  } else {
    error.value = 'Invalid password. Please try again.'
    password.value = ''
  }
}

const handleKeyPress = (e) => {
  if (e.key === 'Enter') {
    handleLogin()
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-background p-4">
    <Card class="w-full max-w-md">
      <CardHeader class="space-y-4 text-center">
        <div class="flex justify-center">
          <div class="p-4 rounded-full bg-primary/10">
            <BookOpen class="w-12 h-12 text-primary" />
          </div>
        </div>
        <CardTitle class="text-3xl font-bold">Personal Journal</CardTitle>
        <p class="text-muted-foreground">Sign in to your journal</p>
      </CardHeader>
      
      <CardContent class="space-y-6">
        <!-- User Selection -->
        <div class="space-y-2">
          <Label for="user" class="flex items-center gap-2">
            <User class="w-4 h-4" />
            Select User
          </Label>
          <div class="grid grid-cols-2 gap-2">
            <Button
              v-for="user in users"
              :key="user.id"
              :variant="selectedUser === user.name ? 'default' : 'outline'"
              @click="selectedUser = user.name"
              class="w-full"
            >
              {{ user.name }}
            </Button>
          </div>
        </div>

        <!-- Password Input -->
        <div class="space-y-2">
          <Label for="password" class="flex items-center gap-2">
            <Lock class="w-4 h-4" />
            Password
          </Label>
          <Input
            id="password"
            type="password"
            v-model="password"
            placeholder="Enter your password"
            @keypress="handleKeyPress"
            autofocus
          />
        </div>

        <!-- Error Message -->
        <div v-if="error" class="text-sm text-destructive text-center">
          {{ error }}
        </div>

        <!-- Login Button -->
        <Button @click="handleLogin" class="w-full" size="lg">
          Sign In
        </Button>

        <!-- Hint -->
        <p class="text-xs text-muted-foreground text-center">
          Default passwords: david123 / patience123 
        </p>
      </CardContent>
    </Card>
  </div>
</template>
