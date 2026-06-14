import {
  collection,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";

import { db } from "./firebase";

export const getUserHouses = async (
  uid: string
) => {
  const housesSnapshot =
    await getDocs(
      collection(db, "houses")
    );

  const houses = [];

  for (const house of housesSnapshot.docs) {
    const memberRef = doc(
      db,
      "houses",
      house.id,
      "members",
      uid
    );

    const memberSnap =
      await getDoc(memberRef);

    if (memberSnap.exists()) {
      houses.push({
        id: house.id,
        ...house.data(),
      });
    }
  }

  return houses;
};