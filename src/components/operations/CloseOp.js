import { useState } from "react";

export default function CloseOp({
  accounts,
  currentAccount,
  onSetAccounts,
  onMainOpen,
}) {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  function handleCloseAccount(e) {
    e.preventDefault();

    if (user === currentAccount?.username && password === currentAccount?.pin) {
      const updatedAccounts = accounts.filter(
        (acc) => acc.username !== currentAccount.username
      );

      onMainOpen(undefined);
      onSetAccounts(updatedAccounts);
      setUser("");
      setPassword("");
    } else {
      setUser("");
      setPassword("");
      return;
    }
  }

  return (
    <div className="operation operation--close">
      <h2>Close account</h2>
      <form className="form form--close" onSubmit={handleCloseAccount}>
        <input
          type="text"
          className="form__input form__input--user"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
        <input
          type="password"
          maxLength="4"
          className="form__input form__input--pin"
          value={password}
          onChange={(e) => setPassword(+e.target.value)}
        />
        <button className="form__btn form__btn--close">&rarr;</button>
        <label className="form__label">Confirm user</label>
        <label className="form__label">Confirm PIN</label>
      </form>
    </div>
  );
}
