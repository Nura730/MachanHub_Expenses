import {
  addDoc,
  collection,
  doc,
  setDoc,
} from "firebase/firestore";

import { db } from "./firebase";

export const createHouse = async (
  name: string,
  code: string,
  uid: string,
  email: string
) => {
  const houseRef = await addDoc(
    collection(db, "houses"),
    {
      name,
      code,
      createdBy: uid,
      createdAt: Date.now(),
    }
  );

  await setDoc(
    doc(
      db,
      "houses",
      houseRef.id,
      "members",
      uid
    ),
    {
      uid,
      email,
      joinedAt: Date.now(),
    }
  );

  return houseRef;
};