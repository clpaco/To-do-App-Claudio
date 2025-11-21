import { useState } from 'react';

export default function AddTodo({ onAdd, focusMode = false }) {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState('media');
  const [dueDate, setDueDate] = useState('');
  const [tags, setTags] = useState('');
  const [notes, setNotes] = useState('');
  const [isToday, setIsToday] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      const tagsArray = tags.split(',').map(t => t.trim()).filter(t => t);
      onAdd(text, priority, dueDate || null, tagsArray, notes, isToday);
      setText('');
      setPriority('media');
      setDueDate('');
      setTags('');
      setNotes('');
      setIsToday(false);
      setShowAdvanced(false);
    }
  };

  const handleQuickToday = () => {
    setIsToday(true);
    setShowAdvanced(true);
  };

  return (
    <form onSubmit={handleSubmit} className="add-task-minimal">
      <div className="add-task-main">
        <input
          type="text"
          className="add-task-input"
          placeholder="Agregar tarea... (Ctrl+T)"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        
        {!focusMode && (
          <>
            <button
              type="button"
              className="quick-btn"
              onClick={handleQuickToday}
              title="Agregar para hoy"
            >
              📅
            </button>
            
            <button
              type="button"
              className="toggle-advanced-btn"
              onClick={() => setShowAdvanced(!showAdvanced)}
              title="Opciones avanzadas"
            >
              {showAdvanced ? '−' : '+'}
            </button>
          </>
        )}

        <button type="submit" className="add-task-btn" disabled={!text.trim()}>
          Agregar
        </button>
      </div>

      {showAdvanced && !focusMode && (
        <div className="advanced-options">
          <div className="option-row">
            <label className="option-label">
              <input
                type="checkbox"
                checked={isToday}
                onChange={(e) => setIsToday(e.target.checked)}
              />
              <span>Para hoy</span>
            </label>

            <select 
              value={priority} 
              onChange={(e) => setPriority(e.target.value)}
              className="priority-select-minimal"
            >
              <option value="baja">🟢 Baja</option>
              <option value="media">🟡 Media</option>
              <option value="alta">🔴 Alta</option>
            </select>

            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="date-input-minimal"
              min={new Date().toISOString().split('T')[0]}
            />
          </div>

          <input
            type="text"
            placeholder="Etiquetas (trabajo, personal, compras...)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="tags-input-minimal"
          />

          <textarea
            placeholder="Notas adicionales (opcional)..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="notes-input-minimal"
            rows="2"
          />
        </div>
      )}
    </form>
  );
}
