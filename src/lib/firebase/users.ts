import { doc, getDoc, setDoc } from "firebase/firestore";

import { db } from "./config";
import type { UserProfile } from "@/types/auth";

const USERS_COLLECTION = "users";

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  const snapshot = await getDoc(doc(db, USERS_COLLECTION, uid));

  if (!snapshot.exists()) {
    return null;
  }

  const data = snapshot.data() as Omit<UserProfile, "uid">;

  return {
    uid: snapshot.id,
    ...data,
  };
}

export async function upsertUserProfile(
  profile: UserProfile,
): Promise<UserProfile> {
  await setDoc(doc(db, USERS_COLLECTION, profile.uid), profile, { merge: true });
  return profile;
}
