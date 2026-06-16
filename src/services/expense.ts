import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

import { db } from "./firebase";

import { Expense } from "../types/expense";

export const createExpense = async (
  expense: Omit<Expense, "id">
) => {
  await addDoc(
    collection(
      db,
      "houses",
      expense.houseId,
      "expenses"
    ),
    expense
  );
};

export const getExpenses = async (
  houseId: string
) => {
  const q = query(
    collection(
      db,
      "houses",
      houseId,
      "expenses"
    ),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Expense[];
};

export const updateExpense = async (
  expense: Expense
) => {
  await updateDoc(
    doc(
      db,
      "houses",
      expense.houseId,
      "expenses",
      expense.id
    ),
    {
  title: expense.title,
  amount: expense.amount,
  paidBy: expense.paidBy,
  splitBetween: expense.splitBetween,
  category: expense.category,
}
  );
};

export const deleteExpense = async (
  houseId: string,
  expenseId: string
) => {
  await deleteDoc(
    doc(
      db,
      "houses",
      houseId,
      "expenses",
      expenseId
    )
  );
};