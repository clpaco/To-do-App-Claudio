import { useState, useEffect, useCallback } from 'react';
import * as api from '../services/todosApi';

export function useTodos() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      const data = await api.getTodos();
      setTodos(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const create = useCallback(async (text, priority = 'media', dueDate = null, tags = [], notes = '', isToday = false) => {
    try {
      const newTodo = await api.addTodo(text, priority, dueDate, tags, notes, isToday);
      setTodos(prev => [newTodo, ...prev]);
    } catch (err) {
      setError(err.message);
    }
  }, []);

  const toggle = useCallback(async (id) => {
    const todo = todos.find(t => t.id === id);
    if (!todo) return;

    try {
      await api.updateTodo(id, { done: !todo.done });
      setTodos(prev => prev.map(t => 
        t.id === id ? { ...t, done: !t.done } : t
      ));
    } catch (err) {
      setError(err.message);
    }
  }, [todos]);

  const remove = useCallback(async (id) => {
    try {
      await api.deleteTodo(id);
      setTodos(prev => prev.filter(t => t.id !== id));
    } catch (err) {
      setError(err.message);
    }
  }, []);

  const edit = useCallback(async (id, updates) => {
    try {
      await api.updateTodo(id, updates);
      setTodos(prev => prev.map(t => 
        t.id === id ? { ...t, ...updates } : t
      ));
    } catch (err) {
      setError(err.message);
    }
  }, []);

  const changePriority = useCallback(async (id, newPriority) => {
    try {
      await api.updateTodo(id, { priority: newPriority });
      setTodos(prev => prev.map(t => 
        t.id === id ? { ...t, priority: newPriority } : t
      ));
    } catch (err) {
      setError(err.message);
    }
  }, []);

  const clearCompleted = useCallback(async () => {
    try {
      await api.deleteCompletedTodos();
      setTodos(prev => prev.filter(t => !t.done));
    } catch (err) {
      setError(err.message);
    }
  }, []);

  return {
    todos,
    loading,
    error,
    create,
    toggle,
    remove,
    edit,
    changePriority,
    clearCompleted
  };
}
