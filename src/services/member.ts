import {
  collection,
  query,
  where,
  getDocs,
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";

import { db } from "./firebase";

export const getMembers = async (
  houseId: string
) => {
  const snapshot = await getDocs(
    collection(
      db,
      "houses",
      houseId,
      "members"
    )
  );

  return snapshot.docs.map(
    (doc) => doc.data()
  );
};

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

  const userSnapshot = await getDoc(
    doc(db, "users", uid)
  );

  const userData = userSnapshot.data();

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
      name: userData?.name || "",
      joinedAt: Date.now(),
    }
  );

  return houseDoc.id;
};