import TransferOp from "./operations/TransferOp";
import LoanOp from "./operations/LoanOp";
import CloseOp from "./operations/CloseOp";

export default function Operations({
  accounts,
  onSetMov,
  currentAccount,
  onMainOpen,
  currentBalance,
  onSetAccounts,
}) {
  return (
    <>
      <TransferOp
        accounts={accounts}
        onSetMov={onSetMov}
        currentAccount={currentAccount}
        onMainOpen={onMainOpen}
        currentBalance={currentBalance}
        onSetAccounts={onSetAccounts}
      />
      <LoanOp
        currentAccount={currentAccount}
        currentBalance={currentBalance}
        onSetAccounts={onSetAccounts}
        account={accounts}
        onMainOpen={onMainOpen}
      />
      <CloseOp
        accounts={accounts}
        currentAccount={currentAccount}
        onSetAccounts={onSetAccounts}
        onMainOpen={onMainOpen}
      />
    </>
  );
}
