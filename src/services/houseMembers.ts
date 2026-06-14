import {
  collection,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";

import { db } from "./firebase";

export const getHouseMembers = async (
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

  const members = await Promise.all(
    snapshot.docs.map(async (member) => {
      const memberData = member.data();

      const userSnap = await getDoc(
        doc(
          db,
          "users",
          memberData.uid
        )
      );

      return {
        uid: memberData.uid,
        ...userSnap.data(),
      };
    })
  );

  return members;
};