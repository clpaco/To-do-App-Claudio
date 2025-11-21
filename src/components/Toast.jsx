export default function Toast({ message, type = 'success' }) {
  const config = {
    success: { icon: '✓', color: '#10b981' },
    warning: { icon: '⚠', color: '#f59e0b' },
    info: { icon: 'ℹ', color: '#3b82f6' },
    error: { icon: '✕', color: '#ef4444' }
  };

  const { icon, color } = config[type] || config.success;

  return (
    <div className="toast" style={{ borderLeftColor: color }}>
      <span className="toast-icon" style={{ color }}>{icon}</span>
      <span className="toast-message">{message}</span>
    </div>
  );
}
