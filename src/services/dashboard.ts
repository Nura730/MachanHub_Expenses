import { getExpenses } from "./expense";
import { getMembers } from "./member";
import { calculateBalances } from "./balance";

export async function getHouseSummary(
  houseId: string
) {
  const expenses =
    await getExpenses(houseId);

  const members =
    await getMembers(houseId);

  const balances =
    await calculateBalances(
      houseId
    );

  const totalExpenses =
    expenses.reduce(
      (sum, expense) =>
        sum + expense.amount,
      0
    );

  const totalMembers =
    members.length;

  const pendingSettlement =
    Object.values(
      balances
    ).reduce(
      (sum: number, amount: any) =>
        amount > 0
          ? sum + Number(amount)
          : sum,
      0
    );

  return {
    totalExpenses,
    totalMembers,
    pendingSettlement,
  };
}