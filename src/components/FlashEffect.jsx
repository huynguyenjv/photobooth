import { useState, useEffect } from 'react';
import './FlashEffect.css';

const FlashEffect = ({ trigger }) => {
  const [isFlashing, setIsFlashing] = useState(false);

  useEffect(() => {
    if (trigger) {
      setIsFlashing(true);
      const timer = setTimeout(() => {
        setIsFlashing(false);
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [trigger]);

  if (!isFlashing) return null;

  return <div className="flash-overlay" />;
};

export default FlashEffect;
