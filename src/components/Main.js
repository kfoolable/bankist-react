import { useState, useEffect } from "react";
import Balance from "./Balance";
import Movements from "./Movements";
import Summary from "./Summary";
import Operations from "./Operations";
import LogoutTimer from "./LogoutTimer";

export default function Main({
  mainOpen,
  currentAccount,
  currentDate,
  accounts,
  onMainOpen,
  onSetAccounts,
}) {
  const initialMov = currentAccount?.movements;
  const movDates = currentAccount?.movementsDates;
  const [userMov, setUserMov] = useState(initialMov);
  const [movDate, setMovDate] = useState("");
  const [isSorted, setIsSorted] = useState(false);
  const balance = currentAccount?.movements.reduce((acc, cur) => acc + cur, 0);
  const [currentBalance, setCurrentBalance] = useState(balance);

  function handleSetMov(movement) {
    setUserMov((mov) => [...mov, movement]);
    console.log(movement);
  }

  function handleTimerExpire() {
    setTimeout(() => {
      onMainOpen();
    });
  }

  useEffect(() => {
    setUserMov(initialMov);
  }, [initialMov]);

  useEffect(() => {
    setMovDate(movDates);
  }, [movDates]);

  useEffect(() => {
    setCurrentBalance(balance);
  }, [balance]);

  function sortMovements() {
    setIsSorted((sort) => !sort);

    setUserMov((prevMovements) => {
      if (!isSorted) {
        return [...prevMovements].sort((a, b) => a - b);
      } else {
        return initialMov;
      }
    });
  }

  return (
    <main className="app" style={{ opacity: mainOpen }}>
      <Balance currentBalance={currentBalance} currentDate={currentDate} />
      <Movements
        accounts={accounts}
        currentAccount={currentAccount}
        userMov={userMov}
        movDate={movDate}
      />
      <Summary
        userMov={userMov}
        currentAccount={currentAccount}
        sortMovements={sortMovements}
      />
      <Operations
        accounts={accounts}
        currentAccount={currentAccount}
        currentBalance={currentBalance}
        onSetMov={handleSetMov}
        onMainOpen={onMainOpen}
        onSetAccounts={onSetAccounts}
      />
      <LogoutTimer
        currentAccount={currentAccount}
        onTimerExpire={handleTimerExpire}
        accounts={accounts}
        onSetAccounts={onSetAccounts}
      />
    </main>
  );
}
