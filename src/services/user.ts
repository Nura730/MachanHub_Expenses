import {
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";

import { db } from "./firebase";

export const createUserProfile = async (
  uid: string,
  name: string,
  email: string
) => {
  await setDoc(
    doc(db, "users", uid),
    {
      uid,
      name,
      email,
      createdAt: Date.now(),
    }
  );
};

export const getUserProfile = async (
  uid: string
) => {
  const snapshot = await getDoc(
    doc(db, "users", uid)
  );

  return snapshot.data();
};