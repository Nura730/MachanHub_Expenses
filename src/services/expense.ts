import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";

import { db } from "./firebase";

import { Expense } from "../types/expense";

export const createExpense =
  async (
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

export const getExpenses =
  async (houseId: string) => {
    const q = query(
      collection(
        db,
        "houses",
        houseId,
        "expenses"
      ),
      orderBy(
        "createdAt",
        "desc"
      )
    );

    const snapshot =
      await getDocs(q);

    return snapshot.docs.map(
      (doc) => ({
        id: doc.id,
        ...doc.data(),
      })
    ) as Expense[];
  };