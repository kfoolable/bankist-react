import { useState, useEffect } from "react";
import Nav from "./components/Nav";
import Main from "./components/Main";

alert("Log in with mock user: js and pin: 1111");

const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    "2019-01-28T09:15:04.904Z",
    "2019-04-01T10:17:24.185Z",
    "2019-05-27T17:01:17.194Z",
    "2019-07-11T23:36:17.929Z",
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-03-08T14:11:59.604Z",
    "2024-03-02T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "pt-PT",
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    "2019-01-25T14:18:46.235Z",
    "2019-02-05T16:33:06.386Z",
    "2019-03-10T14:43:26.374Z",
    "2019-04-25T18:49:59.371Z",
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-02-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const initialAccounts = [account1, account2, account3, account4];

function createUsernames(accs) {
  accs.forEach((acc) => {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
  });
}
createUsernames(initialAccounts);

export default function App() {
  const [isMainOpen, setIsMainOpen] = useState(0);
  const [accounts, setAccounts] = useState(initialAccounts);
  const [currentAccount, setCurrentAccount] = useState(null);

  const currentDate = new Date().toLocaleDateString();

  useEffect(() => {
    setAccounts(accounts);
  }, [accounts]);

  function handleSetAccounts(account) {
    setAccounts(account);
  }

  function handleMainOpen(account) {
    if (account) {
      setCurrentAccount(account);
      setIsMainOpen(1);
    } else {
      setCurrentAccount(account);
      setIsMainOpen(0);
    }
  }

  return (
    <>
      <Nav
        onMainOpen={handleMainOpen}
        accounts={accounts}
        currentAccount={currentAccount}
        onSetAccounts={handleSetAccounts}
      />
      <Main
        mainOpen={isMainOpen}
        currentAccount={currentAccount}
        currentDate={currentDate}
        accounts={accounts}
        onMainOpen={handleMainOpen}
        onSetAccounts={handleSetAccounts}
      />
    </>
  );
}
