import { useState, useEffect } from "react";

export default function LogoutTimer({ currentAccount, onTimerExpire }) {
  const initialTime = 10;
  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    let timer;

    if (currentAccount) {
      setTime(initialTime);

      timer = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime > 1) {
            return prevTime - 1;
          } else {
            onTimerExpire();
            clearInterval(timer);
            return initialTime;
          }
        });
      }, 1000);
    } else {
      clearInterval(timer);
    }

    // Cleanup function to clear the interval when the component unmounts or when currentAccount changes
    return () => clearInterval(timer);
  }, [currentAccount, onTimerExpire, initialTime]);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;

  return (
    <p className="logout-timer">
      You will be logged out in <span className="timer">{formattedTime}</span>
    </p>
  );
}
