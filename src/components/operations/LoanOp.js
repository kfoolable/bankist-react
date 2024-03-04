import { useState } from "react";

export default function LoanOp({ currentAccount, onMainOpen }) {
  const [loanAmount, setLoanAmount] = useState(0);

  function handleLoan(e) {
    e.preventDefault();

    const curMov = currentAccount.movements;
    const isAllowed = curMov.some((mov) => mov >= loanAmount * 0.1);
    const currentDate = new Date();

    if (loanAmount > 0 && isAllowed) {
      const updatedMovements = [...currentAccount.movements, loanAmount];
      const updatedMovDates = [...currentAccount?.movementsDates, currentDate];

      const updatedAccount = {
        ...currentAccount,
        movements: updatedMovements,
        movementsDates: updatedMovDates,
      };

      onMainOpen(updatedAccount);
      setLoanAmount(0);
    } else {
      alert("Policy says your account is NOT allowed to loan that amount!");
      setLoanAmount(0);
    }
  }

  function handleLoanAmount(e) {
    const amount = +e.target.value;

    if (!isNaN(amount) && amount >= 0) setLoanAmount(amount);
    else return;
  }

  return (
    <div className="operation operation--loan">
      <h2>Request loan</h2>
      <form className="form form--loan" onSubmit={handleLoan}>
        <input
          type="number"
          className="form__input form__input--loan-amount"
          value={+loanAmount === 0 ? "" : +loanAmount}
          onChange={handleLoanAmount}
        />
        <button className="form__btn form__btn--loan">&rarr;</button>
        <label className="form__label form__label--loan">Amount</label>
      </form>
    </div>
  );
}
