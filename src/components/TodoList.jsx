import TodoItem from './TodoItem';

export default function TodoList({ items, onToggle, onDelete, onEdit, title }) {
  return (
    <div className="column">
      <div className="column-header">
        <div className="column-title">
          <span>{title}</span>
          <span className="task-count">{items.length}</span>
        </div>
      </div>
      
      <div className="cards-container">
        {items.length === 0 ? (
          <div className="empty-column">
            {title === '📋 Pendientes' 
              ? 'No hay tareas pendientes' 
              : '¡Todas las tareas completadas!'}
          </div>
        ) : (
          items.map(todo => (
            <TodoItem 
              key={todo.id}
              todo={todo}
              onToggle={onToggle}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))
        )}
      </div>
    </div>
  );
}