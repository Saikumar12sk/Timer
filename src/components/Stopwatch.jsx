import { useState, useEffect } from "react";
import "./App.css";

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 10);
    } else if (!isActive && time !== 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, time]);

  const start = () => {
    setIsActive(true);
  };

  const pause = () => {
    setIsActive(false);
  };

  const reset = () => {
    setIsActive(false);
    setTime(0);
  };

  const formatTime = () => {
    const milliseconds = time % 100;
    const seconds = Math.floor(time / 100) % 60;
    const minutes = Math.floor(time / 6000) % 60;
    const hours = Math.floor(time / 360000);

    return `${addZero(hours)}:${addZero(minutes)}:${addZero(seconds)}:${addZero(milliseconds)}`;
  };

  const addZero = (num) => (num < 10 ? `0${num}` : num);

  return (
    <div className="main">
      <div className="container">
        <h1 className="time">{formatTime()}</h1>
        <button onClick={start} className="start m-3 w-25">
          Start
        </button>
        <button onClick={pause} className="Pause m-3 w-25">
          Pause
        </button>
        <button onClick={reset} className="Reset m-3 w-25">
          Reset
        </button>
      </div>
    </div>
  );
};

export default Stopwatch;
