import { useState, useEffect, useRef } from 'react';

export default function PomodoroTimer({ onClose }) {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState('work');
  const [sessions, setSessions] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isActive && (minutes > 0 || seconds > 0)) {
      intervalRef.current = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            setIsActive(false);
            playSound();
            handleSessionComplete();
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isActive, minutes, seconds]);

  const playSound = () => {
    try {
      const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBTGH0fPTgjMGHm7A7+OZURE');
      audio.play();
    } catch (e) {
      console.log('Audio not available');
    }
  };

  const handleSessionComplete = () => {
    if (mode === 'work') {
      const newSessions = sessions + 1;
      setSessions(newSessions);
      
      if (newSessions % 4 === 0) {
        setMode('longBreak');
        setMinutes(15);
      } else {
        setMode('shortBreak');
        setMinutes(5);
      }
    } else {
      setMode('work');
      setMinutes(25);
    }
    setSeconds(0);
  };

  const toggle = () => setIsActive(!isActive);

  const reset = () => {
    setIsActive(false);
    if (mode === 'work') {
      setMinutes(25);
    } else if (mode === 'shortBreak') {
      setMinutes(5);
    } else {
      setMinutes(15);
    }
    setSeconds(0);
  };

  const switchMode = (newMode) => {
    setIsActive(false);
    setMode(newMode);
    if (newMode === 'work') {
      setMinutes(25);
    } else if (newMode === 'shortBreak') {
      setMinutes(5);
    } else {
      setMinutes(15);
    }
    setSeconds(0);
  };

  const getModeLabel = () => {
    switch(mode) {
      case 'work': return '🍅 Trabajo';
      case 'shortBreak': return '☕ Descanso corto';
      case 'longBreak': return '🌴 Descanso largo';
      default: return '🍅 Pomodoro';
    }
  };

  const getModeColor = () => {
    switch(mode) {
      case 'work': return '#ef4444';
      case 'shortBreak': return '#10b981';
      case 'longBreak': return '#3b82f6';
      default: return '#ef4444';
    }
  };

  return (
    <div className="pomodoro-container">
      <div className="pomodoro-card" style={{ borderTopColor: getModeColor() }}>
        <div className="pomodoro-header">
          <h3>{getModeLabel()}</h3>
          <button onClick={onClose} className="close-btn">×</button>
        </div>
        
        <div className="pomodoro-timer" style={{ color: getModeColor() }}>
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </div>

        <div className="sessions-counter">
          Sesiones completadas: {sessions}
        </div>

        <div className="pomodoro-controls">
          <button 
            onClick={toggle} 
            className="pomodoro-btn primary"
            style={{ backgroundColor: getModeColor() }}
          >
            {isActive ? '⏸ Pausar' : '▶ Iniciar'}
          </button>
          <button onClick={reset} className="pomodoro-btn secondary">
            ⟲ Reiniciar
          </button>
        </div>

        <div className="mode-switches">
          <button 
            className={`mode-btn ${mode === 'work' ? 'active' : ''}`}
            onClick={() => switchMode('work')}
          >
            Trabajo
          </button>
          <button 
            className={`mode-btn ${mode === 'shortBreak' ? 'active' : ''}`}
            onClick={() => switchMode('shortBreak')}
          >
            Descanso
          </button>
          <button 
            className={`mode-btn ${mode === 'longBreak' ? 'active' : ''}`}
            onClick={() => switchMode('longBreak')}
          >
            Descanso largo
          </button>
        </div>
      </div>
    </div>
  );
}
