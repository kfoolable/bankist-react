export default function Summary({
  userMov = [],
  currentAccount,
  sortMovements,
}) {
  const incomes = userMov
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);

  const out = userMov
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);

  const interest = userMov
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * currentAccount?.interestRate) / 100)
    .filter((int) => int >= 1)
    .reduce((acc, int) => acc + int, 0);

  return (
    <div className="summary">
      <p className="summary__label">In</p>
      <p className="summary__value summary__value--in">{incomes} €</p>
      <p className="summary__label">Out</p>
      <p className="summary__value summary__value--out">{-out} €</p>
      <p className="summary__label">Interest</p>
      <p className="summary__value summary__value--interest">
        {interest.toFixed(2)} €
      </p>
      <button className="btn--sort" onClick={sortMovements}>
        &darr; SORT
      </button>
    </div>
  );
}
