import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";

import { db } from "./firebase";

export async function createSettlement(
  houseId: string,
  from: string,
  to: string,
  amount: number
) {
  await addDoc(
    collection(
      db,
      "houses",
      houseId,
      "settlements"
    ),
    {
      from,
      to,
      amount,
      settledAt: Date.now(),
    }
  );
}

export async function getSettlements(
  houseId: string
) {
  const q = query(
    collection(
      db,
      "houses",
      houseId,
      "settlements"
    ),
    orderBy(
      "settledAt",
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
  );
}