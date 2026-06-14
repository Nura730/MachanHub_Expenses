import {
  collection,
  query,
  where,
  getDocs,
  doc,
  setDoc,
} from "firebase/firestore";

import { db } from "./firebase";

export const joinHouseByCode = async (
  code: string,
  uid: string,
  email: string
) => {
  const q = query(
    collection(db, "houses"),
    where("code", "==", code.toUpperCase())
  );

  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    throw new Error("House not found");
  }

  const houseDoc = snapshot.docs[0];

  await setDoc(
    doc(
      db,
      "houses",
      houseDoc.id,
      "members",
      uid
    ),
    {
      uid,
      email,
      joinedAt: Date.now(),
    }
  );

  return houseDoc.id;
};