import { useState, useEffect } from "react";

export default function Nav({ onMainOpen, accounts, currentAccount }) {
  const [isLoggedIn, setIsLoggedIn] = useState(!!currentAccount);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    setIsLoggedIn(!!currentAccount);
  }, [currentAccount]);

  function handleLogin(e) {
    e.preventDefault();

    if (!userName || !password) return;

    const currentAccount = accounts?.find((acc) => acc.username === userName);

    if (
      currentAccount?.username === userName &&
      currentAccount?.pin === +password
    ) {
      onMainOpen(currentAccount);
      setUserName("");
      setPassword("");
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
      alert("No account found!");
    }
  }

  const firstName = currentAccount?.owner.split(" ")[0];

  return (
    <nav>
      <p className="welcome">
        {isLoggedIn ? `Welcome, ${firstName}!` : "Log in to get started"}
      </p>
      <img src="./logo.png" alt="Logo" className="logo" />
      <form className="login" onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="user"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="login__input login__input--user"
        />

        <input
          type="text"
          placeholder="PIN"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          maxLength={4}
          className="login__input login__input--pin"
        />

        <button type="submit" className="login__btn">
          &rarr;
        </button>
      </form>
    </nav>
  );
}
