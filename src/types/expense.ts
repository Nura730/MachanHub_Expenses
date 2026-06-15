export interface Expense {
  id: string;

  houseId: string;

  title: string;

  amount: number;

  paidBy: string;

  splitBetween: string[];

  createdAt: number;
}