import { useState, useMemo, useEffect } from 'react';
import AddTodo from '../components/AddTodo';
import TodoItem from '../components/TodoItem';
import Toast from '../components/Toast';
import PomodoroTimer from '../components/PomodoroTimer';
import { useTodos } from '../hooks/useTodos';

export default function TodosPage() {
  const { todos, loading, error, create, toggle, remove, edit, changePriority, clearCompleted } = useTodos();
  const [search, setSearch] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [view, setView] = useState('all');
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });
  const [showPomodoro, setShowPomodoro] = useState(false);
  const [focusMode, setFocusMode] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  // Keyboard shortcuts - ATAJO CAMBIADO A CTRL+T
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.ctrlKey || e.metaKey) {
        if (e.key === 'k') {
          e.preventDefault();
          document.querySelector('.search-input')?.focus();
        }
        if (e.key === 't') {
          e.preventDefault();
          document.querySelector('.add-task-input')?.focus();
        }
        if (e.key === 'p') {
          e.preventDefault();
          setShowPomodoro(!showPomodoro);
        }
        if (e.key === 'd') {
          e.preventDefault();
          setDarkMode(!darkMode);
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [showPomodoro, darkMode]);

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };

  const handleCreate = async (text, priority, dueDate, tags, notes, isToday) => {
    await create(text, priority, dueDate, tags, notes, isToday);
    showToast('✨ Tarea creada');
  };

  const handleToggle = async (id) => {
    const todo = todos.find(t => t.id === id);
    await toggle(id);
    showToast(todo.done ? '↩️ Reactivada' : '✓ Completada', 'success');
  };

  const handleDelete = async (id) => {
    await remove(id);
    showToast('🗑 Eliminada', 'warning');
  };

  const handlePriorityChange = async (id, newPriority) => {
    await changePriority(id, newPriority);
    showToast(`Prioridad: ${newPriority}`, 'info');
  };

  const filteredTodos = useMemo(() => {
    let filtered = todos.filter(t => {
      if (search && !t.text.toLowerCase().includes(search.toLowerCase())) return false;
      if (priorityFilter !== 'all' && t.priority !== priorityFilter) return false;
      return true;
    });

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const weekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

    switch (view) {
      case 'today':
        filtered = filtered.filter(t => {
          if (t.is_today) return true;
          if (t.due_date) {
            const dueDate = new Date(t.due_date);
            dueDate.setHours(0, 0, 0, 0);
            return dueDate.getTime() === today.getTime();
          }
          return false;
        });
        break;
      case 'week':
        filtered = filtered.filter(t => t.due_date && new Date(t.due_date) <= weekFromNow && !t.done);
        break;
      case 'completed':
        filtered = filtered.filter(t => t.done);
        break;
      default:
        filtered = filtered.filter(t => !t.done);
    }

    return filtered.sort((a, b) => {
      const priorityOrder = { alta: 0, media: 1, baja: 2 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
  }, [todos, search, priorityFilter, view]);

  const stats = useMemo(() => {
    const total = todos.length;
    const completed = todos.filter(t => t.done).length;
    const today = new Date().toDateString();
    const completedToday = todos.filter(t => 
      t.completed_at && new Date(t.completed_at).toDateString() === today
    ).length;
    const overdue = todos.filter(t => 
      !t.done && t.due_date && new Date(t.due_date) < new Date()
    ).length;
    const highPriority = todos.filter(t => t.priority === 'alta' && !t.done).length;

    return { total, completed, pending: total - completed, completedToday, overdue, highPriority };
  }, [todos]);

  if (loading) return (
    <div className="minimal-loading">
      <div className="minimal-spinner"></div>
    </div>
  );

  return (
    <div className={`minimal-layout ${darkMode ? 'dark' : ''} ${focusMode ? 'focus' : ''}`}>
      {toast.show && <Toast message={toast.message} type={toast.type} />}
      
      {error && <div className="error-banner">⚠️ {error}</div>}

      <header className="minimal-header">
        <div className="header-content">
          <h1 className="app-title">✅ To Do App Claudio</h1>
          
          {!focusMode && (
            <div className="header-stats">
              <span className="stat">{stats.pending} pendientes</span>
              <span className="stat-separator">·</span>
              <span className="stat">{stats.completedToday} hoy</span>
              {stats.overdue > 0 && (
                <>
                  <span className="stat-separator">·</span>
                  <span className="stat urgent">{stats.overdue} vencidas</span>
                </>
              )}
              {stats.highPriority > 0 && (
                <>
                  <span className="stat-separator">·</span>
                  <span className="stat high">{stats.highPriority} urgentes</span>
                </>
              )}
            </div>
          )}

          <div className="header-actions">
            <button 
              className="icon-action"
              onClick={() => setShowPomodoro(!showPomodoro)}
              title="Pomodoro (Ctrl+P)"
            >
              🍅
            </button>
            <button 
              className="icon-action"
              onClick={() => setFocusMode(!focusMode)}
              title="Modo enfoque"
            >
              {focusMode ? '👁️' : '🎯'}
            </button>
            <button 
              className="icon-action"
              onClick={() => setDarkMode(!darkMode)}
              title="Tema (Ctrl+D)"
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
          </div>
        </div>

        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Buscar tareas... (Ctrl+K)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {!focusMode && (
          <div className="controls-row">
            <div className="view-tabs">
              <button 
                className={`tab ${view === 'all' ? 'active' : ''}`}
                onClick={() => setView('all')}
              >
                Todas
              </button>
              <button 
                className={`tab ${view === 'today' ? 'active' : ''}`}
                onClick={() => setView('today')}
              >
                Hoy
              </button>
              <button 
                className={`tab ${view === 'week' ? 'active' : ''}`}
                onClick={() => setView('week')}
              >
                Semana
              </button>
              <button 
                className={`tab ${view === 'completed' ? 'active' : ''}`}
                onClick={() => setView('completed')}
              >
                Completadas ({stats.completed})
              </button>
            </div>

            <select 
              value={priorityFilter} 
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="priority-filter"
            >
              <option value="all">Todas las prioridades</option>
              <option value="alta">🔴 Alta</option>
              <option value="media">🟡 Media</option>
              <option value="baja">🟢 Baja</option>
            </select>
          </div>
        )}
      </header>

      {showPomodoro && (
        <PomodoroTimer onClose={() => setShowPomodoro(false)} />
      )}

      <main className="minimal-main">
        <div className="tasks-container">
          <AddTodo onAdd={handleCreate} focusMode={focusMode} />
          
          <div className="tasks-list">
            {filteredTodos.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={handleToggle}
                onDelete={handleDelete}
                onEdit={edit}
                onPriorityChange={handlePriorityChange}
                minimal={true}
              />
            ))}

            {filteredTodos.length === 0 && (
              <div className="empty-minimal">
                <div className="empty-icon">
                  {view === 'completed' ? '✓' : view === 'today' ? '📅' : view === 'week' ? '📆' : '✨'}
                </div>
                <p className="empty-text">
                  {view === 'completed' ? 'Sin tareas completadas' : 
                   view === 'today' ? 'Sin tareas para hoy' :
                   view === 'week' ? 'Sin tareas esta semana' : 
                   'Sin tareas pendientes'}
                </p>
                <p className="empty-subtext">
                  {view === 'all' && 'Agrega una nueva tarea para comenzar'}
                </p>
              </div>
            )}
          </div>
        </div>

        {!focusMode && (
          <aside className="minimal-sidebar">
            <div className="stats-card">
              <h3 className="stats-title">Resumen</h3>
              
              <div className="stat-row">
                <span className="stat-label">Total</span>
                <span className="stat-value">{stats.total}</span>
              </div>
              
              <div className="stat-row">
                <span className="stat-label">Completadas</span>
                <span className="stat-value stat-success">{stats.completed}</span>
              </div>
              
              <div className="stat-row">
                <span className="stat-label">Pendientes</span>
                <span className="stat-value stat-warning">{stats.pending}</span>
              </div>

              {stats.highPriority > 0 && (
                <div className="stat-row">
                  <span className="stat-label">Alta prioridad</span>
                  <span className="stat-value stat-danger">{stats.highPriority}</span>
                </div>
              )}

              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${stats.total > 0 ? (stats.completed / stats.total) * 100 : 0}%` }}
                ></div>
              </div>
              
              <p className="progress-text">
                {stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0}% completado
              </p>

              {view === 'completed' && stats.completed > 0 && (
                <button 
                  className="clear-btn"
                  onClick={() => {
                    clearCompleted();
                    showToast('🗑 Completadas eliminadas', 'info');
                  }}
                >
                  Limpiar completadas
                </button>
              )}
            </div>

            <div className="shortcuts-card">
              <h3 className="stats-title">Atajos</h3>
              <div className="shortcut-row">
                <div>
                  <kbd>Ctrl</kbd> + <kbd>K</kbd>
                </div>
                <span>Buscar</span>
              </div>
              <div className="shortcut-row">
                <div>
                  <kbd>Ctrl</kbd> + <kbd>T</kbd>
                </div>
                <span>Nueva tarea</span>
              </div>
              <div className="shortcut-row">
                <div>
                  <kbd>Ctrl</kbd> + <kbd>P</kbd>
                </div>
                <span>Pomodoro</span>
              </div>
              <div className="shortcut-row">
                <div>
                  <kbd>Ctrl</kbd> + <kbd>D</kbd>
                </div>
                <span>Tema</span>
              </div>
            </div>
          </aside>
        )}
      </main>
    </div>
  );
}
