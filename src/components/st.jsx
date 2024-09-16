import { useState, useEffect } from "react";

const Stopwatch = () => {
  const [time, setTime] = useState(0); // Stores the elapsed time in milliseconds
  const [isActive, setIsActive] = useState(false); // Controls whether the stopwatch is running or paused

  // useEffect to handle the stopwatch updates
  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1); // Increment time every 10 milliseconds (for finer control)
      }, 1000);
    } else if (!isActive && time !== 0) {
      clearInterval(interval); // Clear the interval if paused
    } 

    return () => clearInterval(interval); // Cleanup interval on unmount or pause
  }, [isActive, time]);

  // Start the stopwatch
  const Start = () => {
    setIsActive(true);
  };

  // Pause the stopwatch
  const Pause = () => {
    setIsActive(false);
  };

  // Reset the stopwatch
  const Reset = () => {
    setIsActive(false);
    setTime(0); // Set time back to zero
  };

  // Formatting the time for display
  const formatTime = () => {
    const milliseconds = time % 100;
    const seconds = Math.floor(time / 100) % 60;
    const minutes = Math.floor(time / 6000);

    return (
      `${AddZero(minutes)}:${AddZero(seconds)}:${AddZero(milliseconds)}`
    );
  };

  // Helper function to add leading zeros to numbers less than 10
  const AddZero = (num) => {
    return num < 10 ? `0${num}` : num;
  };

  return (
    <div className="container p-2">
      <h1>{formatTime()}</h1>
      <button onClick={Start} className="start btn btn-outline-success">
        Start
      </button>
      <button onClick={Pause} className="Pause btn btn-outline-primary">
        Pause
      </button>
      <button onClick={Reset} className="Reset btn btn-outline-danger">
        Reset
      </button>
    </div>
  );
};

export default Stopwatch;