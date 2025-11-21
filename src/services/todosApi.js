import { supabase } from './supabaseClient';

export async function getTodos() {
  const { data, error } = await supabase
    .from('todos')
    .select('*')
    .is('parent_id', null)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
}

export async function getSubtasks(parentId) {
  const { data, error } = await supabase
    .from('todos')
    .select('*')
    .eq('parent_id', parentId)
    .order('created_at', { ascending: true });
  
  if (error) throw error;
  return data;
}

export async function getTodayTasks() {
  const { data, error } = await supabase
    .from('todos')
    .select('*')
    .eq('is_today', true)
    .is('parent_id', null)
    .order('priority', { ascending: true });
  
  if (error) throw error;
  return data;
}

export async function addTodo(text, priority = 'media', dueDate = null, tags = [], notes = '', isToday = false, parentId = null) {
  const { data, error } = await supabase
    .from('todos')
    .insert([{ 
      text, 
      done: false, 
      priority,
      due_date: dueDate,
      tags,
      notes,
      is_today: isToday,
      parent_id: parentId
    }])
    .select();
  
  if (error) throw error;
  return data[0];
}

export async function updateTodo(id, updates) {
  const { data, error } = await supabase
    .from('todos')
    .update(updates)
    .eq('id', id)
    .select();
  
  if (error) throw error;
  return data[0];
}

export async function deleteTodo(id) {
  const { error } = await supabase
    .from('todos')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
}

export async function deleteCompletedTodos() {
  const { error } = await supabase
    .from('todos')
    .delete()
    .eq('done', true);
  
  if (error) throw error;
}

export async function getStats() {
  const { data, error } = await supabase
    .from('todos')
    .select('*')
    .is('parent_id', null);
  
  if (error) throw error;
  
  const total = data.length;
  const completed = data.filter(t => t.done).length;
  const today = new Date().toDateString();
  const completedToday = data.filter(t => 
    t.completed_at && new Date(t.completed_at).toDateString() === today
  ).length;
  
  return {
    total,
    completed,
    pending: total - completed,
    completedToday,
    completionRate: total > 0 ? Math.round((completed / total) * 100) : 0
  };
}
