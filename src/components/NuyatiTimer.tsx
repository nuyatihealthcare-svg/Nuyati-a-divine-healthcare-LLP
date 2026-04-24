import React, { useState, useEffect } from 'react';

export const NuyatiTimer: React.FC = () => {
  const [time, setTime] = useState(467); // 7m 47s in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const mins = Math.floor(time / 60);
  const secs = time % 60;

  return (
    <div className="bg-nuyati-red text-white py-2 px-6 font-mono font-bold text-2xl inline-block">
      {mins.toString().padStart(2, '0')}m : {secs.toString().padStart(2, '0')}s
    </div>
  );
};
