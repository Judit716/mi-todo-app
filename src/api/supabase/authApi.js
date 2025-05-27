// src/api/supabase/authApi.js
import { supabase } from './index.js'

export const signUpUser = async (email, password) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password
  })
  if (error) throw error
  return data
}

export const signInUser = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })
  if (error) throw error
  return data
}

export const signOutUser = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

export const fetchCurrentUser = async () => {
  const { data, error } = await supabase.auth.getUser()
  if (error) throw error
  return data.user
}
