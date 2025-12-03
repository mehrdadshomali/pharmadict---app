import { useState, useEffect } from 'react';

export default function PharmadicTitle() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
    const interval = setInterval(() => {
      setAnimate(prev => !prev);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}
    >
      <div
        style={{
          width: '30px',
          height: '30px',
          borderRadius: '50%',
          background: `radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transform: animate ? 'scale(1.2)' : 'scale(1)',
          transition: 'transform 2s ease-in-out'
        }}
      >
        <span
          style={{
            fontSize: '16px',
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #3B82F6 0%, #06B6D4 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            transform: animate ? 'rotate(360deg)' : 'rotate(0deg)',
            transition: 'transform 2s ease-in-out'
          }}
        >
          🏥
        </span>
      </div>
      <div
        style={{
          fontSize: '24px',
          fontWeight: 'bold',
          background: animate
            ? 'linear-gradient(135deg, #3B82F6 0%, #06B6D4 50%, #10B981 100%)'
            : 'linear-gradient(135deg, #10B981 0%, #3B82F6 50%, #06B6D4 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          transition: 'background 2s ease-in-out',
          textShadow: '0 1px 2px rgba(59, 130, 246, 0.3)'
        }}
      >
        Pharmadict
      </div>
    </div>
  );
}

