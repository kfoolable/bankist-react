export default function Balance({ currentBalance, currentDate }) {
  return (
    <div className="balance">
      <div>
        <p className="balance__label">Current balance</p>
        <p className="balance__date">
          As of <span>{currentDate}</span>
        </p>
      </div>
      <p className="balance__value">{currentBalance} €</p>
    </div>
  );
}
