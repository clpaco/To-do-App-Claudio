import { useState } from 'react';

export default function TodoItem({ todo, onToggle, onDelete, onEdit, onPriorityChange, minimal = false }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [showNotes, setShowNotes] = useState(false);
  const [showPriorityMenu, setShowPriorityMenu] = useState(false);

  const handleSave = () => {
    if (editText.trim()) {
      onEdit(todo.id, { text: editText });
      setIsEditing(false);
    } else {
      setEditText(todo.text);
      setIsEditing(false);
    }
  };

  const priorityConfig = {
    alta: { label: 'Alta', color: '#ef4444', icon: '●' },
    media: { label: 'Media', color: '#f59e0b', icon: '●' },
    baja: { label: 'Baja', color: '#10b981', icon: '●' }
  };

  const currentPriority = priorityConfig[todo.priority] || priorityConfig.media;
  
  const isOverdue = todo.due_date && new Date(todo.due_date) < new Date() && !todo.done;
  const dueToday = todo.due_date && new Date(todo.due_date).toDateString() === new Date().toDateString();

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) return 'Hoy';
    if (date.toDateString() === tomorrow.toDateString()) return 'Mañana';
    
    return date.toLocaleDateString('es-ES', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className={`minimal-task ${todo.done ? 'completed' : ''} ${isOverdue ? 'overdue' : ''}`}>
      <div className="task-main">
        <label className="task-checkbox">
          <input
            type="checkbox"
            checked={todo.done}
            onChange={() => onToggle(todo.id)}
          />
          <span className="checkbox-custom"></span>
        </label>

        {isEditing ? (
          <input
            className="task-edit-input"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleSave}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSave();
              if (e.key === 'Escape') {
                setEditText(todo.text);
                setIsEditing(false);
              }
            }}
            autoFocus
          />
        ) : (
          <div className="task-content">
            <p className="task-text" onClick={() => setIsEditing(true)}>
              {todo.text}
            </p>
            
            <div className="task-meta">
              {todo.is_today && !todo.due_date && (
                <span className="task-badge today-badge">Hoy</span>
              )}
              
              {todo.due_date && (
                <span className={`task-due ${dueToday ? 'today' : ''} ${isOverdue ? 'overdue' : ''}`}>
                  📅 {formatDate(todo.due_date)}
                </span>
              )}
              
              {todo.tags && todo.tags.length > 0 && (
                <div className="task-tags">
                  {todo.tags.map((tag, i) => (
                    <span key={i} className="task-tag">{tag}</span>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        <div className="task-actions">
          <button
            className="priority-dot"
            style={{ color: currentPriority.color }}
            onClick={() => setShowPriorityMenu(!showPriorityMenu)}
            title={currentPriority.label}
          >
            {currentPriority.icon}
          </button>

          {showPriorityMenu && (
            <div className="priority-dropdown">
              {Object.entries(priorityConfig).map(([key, config]) => (
                <button
                  key={key}
                  className="priority-option-minimal"
                  onClick={() => {
                    onPriorityChange(todo.id, key);
                    setShowPriorityMenu(false);
                  }}
                >
                  <span style={{ color: config.color }}>{config.icon}</span>
                  {config.label}
                </button>
              ))}
            </div>
          )}

          {todo.notes && (
            <button
              className="task-action-btn"
              onClick={() => setShowNotes(!showNotes)}
              title="Ver notas"
            >
              📝
            </button>
          )}

          <button
            className="task-action-btn delete"
            onClick={() => onDelete(todo.id)}
            title="Eliminar"
          >
            ×
          </button>
        </div>
      </div>

      {showNotes && todo.notes && (
        <div className="task-notes">
          <div className="notes-header">📝 Notas:</div>
          {todo.notes}
        </div>
      )}
    </div>
  );
}
