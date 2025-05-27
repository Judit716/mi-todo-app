// src/stores/user.js
import { defineStore } from 'pinia'
import {
  signInUser,
  signUpUser,
  signOutUser,
  fetchCurrentUser
} from '../api/supabase/authApi'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    loading: false,
    error: null
  }),

  actions: {
    async fetchUser() {
      try {
        this.loading = true
        this.user = await fetchCurrentUser()
      } catch (error) {
        this.user = null
      } finally {
        this.loading = false
      }
    },

    async signUp(email, password) {
      try {
        this.loading = true
        await signUpUser(email, password)
      } catch (error) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    },

    async signIn(email, password) {
      try {
        this.loading = true
        await signInUser(email, password)
        await this.fetchUser()
      } catch (error) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    },

    async signOut() {
      try {
        await signOutUser()
        this.user = null
      } catch (error) {
        this.error = error.message
      }
    }
  }
})
