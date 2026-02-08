import { useState, useEffect } from 'react';
import { playBeepSound } from '../utils/sound';
import './Countdown.css';

// Inner component that handles the actual countdown
const CountdownTimer = ({ seconds, onComplete }) => {
  const [count, setCount] = useState(seconds);

  useEffect(() => {
    // Play initial beep
    playBeepSound(false);

    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          playBeepSound(true);
          setTimeout(() => {
            onComplete();
          }, 100);
          return 0;
        }
        playBeepSound(false);
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds, onComplete]);

  if (count === 0) return null;

  return (
    <div className="countdown-overlay">
      <div className="countdown-number" key={count}>
        {count}
      </div>
    </div>
  );
};

// Wrapper component that mounts/unmounts the timer based on isActive
const Countdown = ({ seconds, onComplete, isActive }) => {
  if (!isActive) return null;

  return <CountdownTimer seconds={seconds} onComplete={onComplete} />;
};

export default Countdown;
