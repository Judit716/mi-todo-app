import { supabase } from './index'

// Obtener todas las tareas del usuario
export const fetchTasks = async (userId) => {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('user_id', userId)
    .order('id', { ascending: false })

  if (error) throw error
  return data
}

// Crear una tarea nueva
export const addTask = async (taskData) => {
  const { data, error } = await supabase
    .from('tasks')
    .insert([taskData])

  if (error) throw error
  return data[0]
}
