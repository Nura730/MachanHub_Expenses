import { getExpenses } from "./expense";

export const calculateBalances = async (
  houseId: string
) => {
  console.log("HOUSE ID:", houseId);

  const expenses = await getExpenses(houseId);

  console.log("EXPENSES:", expenses);

  const balances: Record<string, number> = {};

  expenses.forEach((expense) => {
  if (
    !expense.splitBetween ||
    expense.splitBetween.length === 0
  ) {
    return;
  }

  const share =
    expense.amount /
    expense.splitBetween.length;

    expense.splitBetween.forEach(
      (uid: string) => {
        balances[uid] =
          (balances[uid] || 0) - share;
      }
    );

    balances[expense.paidBy] =
      (balances[expense.paidBy] || 0) +
      expense.amount;
  });

  console.log("BALANCES:", balances);

  return balances;
};