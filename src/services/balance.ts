import { getExpenses } from "./expense";
import { getSettlements } from "./settlement";

export const calculateBalances = async (houseId: string) => {
  console.log("HOUSE ID:", houseId);

  const expenses = await getExpenses(houseId);
  const settlements = await getSettlements(houseId);

  const balances: Record<string, number> = {};

  expenses.forEach((expense) => {
    if (!expense.splitBetween || expense.splitBetween.length === 0) {
      return;
    }

    const share = expense.amount / expense.splitBetween.length;

    expense.splitBetween.forEach((uid: string) => {
      balances[uid] = (balances[uid] || 0) - share;
    });

    balances[expense.paidBy] = (balances[expense.paidBy] || 0) + expense.amount;
  });

settlements.forEach(
  (settlement: any) => {
    balances[settlement.from] =
      (balances[settlement.from] || 0) +
      settlement.amount;

    balances[settlement.to] =
      (balances[settlement.to] || 0) -
      settlement.amount;
  }
);

  return balances;
};
