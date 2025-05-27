// src/stores/task.js
import { defineStore } from 'pinia'
import { supabase } from '@/api/supabase'

export const useTaskStore = defineStore('tasks', {
  state: () => ({
    tasks: [],
  }),

  actions: {
    async fetchTasks(userId) {
      console.log('Llamando a fetchTasks con:', userId)
      const { data, error } = await supabase
        .from('UserTasks')
        .select('*')
        .eq('user_id', userId)
        .order('id', { ascending: false })

      if (error) {
        console.error('Error al traer tareas:', error)
      } else {
        console.log('TAREAS OBTENIDAS:', data)
        this.tasks = data
      }
    },

    async addTask(taskData) {
      const { error } = await supabase
        .from('UserTasks')
        .insert([taskData])
      if (error) throw error
    },

    async updateTask(id, updates) {
      console.log('ACTUALIZANDO TAREA:', id, updates)
      const { error } = await supabase
        .from('UserTasks')
        .update(updates)
        .eq('id', id)
      if (error) {
        console.error('Error al actualizar tarea:', error)
        throw error
      }
    },

    async deleteTask(id) {
      const { error } = await supabase
        .from('UserTasks')
        .delete()
        .eq('id', id)
      if (error) throw error
    }
  }
})


  