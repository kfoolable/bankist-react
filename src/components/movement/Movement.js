export default function Movement({ movement, index, date }) {
  const isWord = movement > 0 ? "deposit" : "withdrawal";

  return (
    <>
      <div className="movements__row">
        <div className={`movements__type movements__type--${isWord}`}>
          {index} {isWord}
        </div>
        <div className="movements__date">{date}</div>
        <div className="movements__value">{movement} €</div>
      </div>
    </>
  );
}
