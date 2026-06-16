import { Settlement } from "../types/settlement";

type BalanceUser = {
  uid: string;
  amount: number;
};

export function calculateSettlements(
  balances: Record<string, number>
): Settlement[] {
  const debtors: BalanceUser[] = [];
  const creditors: BalanceUser[] = [];

  Object.entries(balances).forEach(
    ([uid, amount]) => {
      if (amount < 0) {
        debtors.push({
          uid,
          amount: Math.abs(amount),
        });
      }

      if (amount > 0) {
        creditors.push({
          uid,
          amount,
        });
      }
    }
  );

  const settlements: Settlement[] = [];

  let i = 0;
  let j = 0;

  while (
    i < debtors.length &&
    j < creditors.length
  ) {
    const debtor = debtors[i];
    const creditor = creditors[j];

    const payment = Math.min(
      debtor.amount,
      creditor.amount
    );

    settlements.push({
      from: debtor.uid,
      to: creditor.uid,
      amount: payment,
    });

    debtor.amount -= payment;
    creditor.amount -= payment;

    if (debtor.amount <= 0) i++;
    if (creditor.amount <= 0) j++;
  }

  return settlements;
}