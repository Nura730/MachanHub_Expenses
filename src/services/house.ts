import {
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "./firebase";

export const createHouse = async (
  name: string,
  code: string,
  uid: string
) => {
  return await addDoc(
    collection(db, "houses"),
    {
      name,
      code,
      createdBy: uid,
      createdAt: serverTimestamp(),
    }
  );
};