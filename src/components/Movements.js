import Movement from "./movement/Movement";

function formatDate(date) {
  const currentDate = new Date();
  const transactionDate = new Date(date);

  const differenceInMs = currentDate - transactionDate;
  const daysPassed = Math.floor(differenceInMs / (1000 * 60 * 60 * 24));

  if (daysPassed === 0) return "Today";
  if (daysPassed === 1) return "1 day ago";
  if (daysPassed <= 7) return `${daysPassed} days ago`;

  return transactionDate.toLocaleDateString();
}
export default function Movements({ userMov, movDate, currentAccount }) {
  return (
    <div className="movements">
      {userMov
        ?.slice()
        .reverse()
        .map((movement, i) => (
          <Movement
            key={i}
            index={userMov.length - i}
            movement={movement}
            date={formatDate(movDate[movDate.length - i - 1])}
            locale={currentAccount?.locale}
          />
        ))}
    </div>
  );
}
