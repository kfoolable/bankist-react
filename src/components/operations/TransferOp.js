import { useState } from "react";

export default function TransferOp({
  accounts,
  onSetMov,
  currentAccount,
  onMainOpen,
  currentBalance,
}) {
  const [userTo, setUserTo] = useState("");
  const [amountTo, setAmountTo] = useState(0);

  function handleTransferTo(e) {
    e.preventDefault();

    const accountTo = accounts?.find((acc) => acc.username === userTo);

    const currentDate = new Date();

    if (!userTo || !amountTo) return;
    if (userTo === currentAccount.username) {
      alert("You cannot send money to your own account");
      setUserTo("");
      setAmountTo(0);
      return;
    }

    if (!accountTo) {
      alert("Account doesn't exist!");
      setUserTo("");
      setAmountTo(0);
      return;
    }

    const updatedMov = [...currentAccount?.movements, -amountTo];
    const updatedMovDates = [...currentAccount?.movementsDates, currentDate];

    // currentAccount?.movements.push(-amountTo);
    const updatedCurrentAccount = {
      ...currentAccount,
      movements: updatedMov,
      movementsDates: updatedMovDates,
    };

    if (amountTo > currentBalance) {
      alert("Insufficient funds! You broke boi!");
      return;
    }

    accountTo.movements.push(amountTo);
    onSetMov(updatedMov[updatedMov.length - 1]);
    onMainOpen(updatedCurrentAccount);
    setUserTo("");
    setAmountTo(0);
  }

  function handleAmount(e) {
    const amount = +e.target.value;

    if (!isNaN(amount) && amount >= 0) setAmountTo(amount);
    else return;
  }

  return (
    <div className="operation operation--transfer">
      <h2>Transfer money</h2>
      <form className="form form--transfer" onSubmit={handleTransferTo}>
        <input
          type="text"
          className="form__input form__input--to"
          value={userTo}
          onChange={(e) => setUserTo(e.target.value)}
        />
        <input
          type="number"
          className="form__input form__input--amount"
          value={+amountTo === 0 ? "" : +amountTo}
          onChange={handleAmount}
        />
        <button className="form__btn form__btn--transfer">&rarr;</button>
        <label className="form__label">Transfer to</label>
        <label className="form__label">Amount</label>
      </form>
    </div>
  );
}
