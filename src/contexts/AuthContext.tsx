"use client";

import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  User,
  browserLocalPersistence,
  onAuthStateChanged,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { auth } from "@/lib/firebase/config";
import { getUserProfile, upsertUserProfile } from "@/lib/firebase/users";
import type { AuthContextValue, UserProfile } from "@/types/auth";

const AuthContext = createContext<AuthContextValue | undefined>(undefined);
const AUTH_STORAGE_KEY = "edusite.auth.user";

function readStoredUser(): UserProfile | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const cachedValue = window.localStorage.getItem(AUTH_STORAGE_KEY);
    return cachedValue ? (JSON.parse(cachedValue) as UserProfile) : null;
  } catch (error) {
    console.warn("Unable to parse cached auth user", error);
    return null;
  }
}

function persistUser(user: UserProfile | null) {
  if (typeof window === "undefined") {
    return;
  }

  if (!user) {
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
    return;
  }

  window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
}

async function resolveProfileFromFirebaseUser(
  firebaseUser: User,
): Promise<UserProfile> {
  const fallbackName =
    firebaseUser.displayName ||
    firebaseUser.email?.split("@")[0] ||
    "Utilisateur";

  const baseProfile: UserProfile = {
    uid: firebaseUser.uid,
    email: firebaseUser.email ?? "",
    name: fallbackName,
    photoURL: firebaseUser.photoURL,
  };

  try {
    const existingProfile = await getUserProfile(firebaseUser.uid);

    if (!existingProfile) {
      if (baseProfile.email) {
        await upsertUserProfile(baseProfile);
      }
      return baseProfile;
    }

    return { ...baseProfile, ...existingProfile };
  } catch (error) {
    console.error("Unable to fetch the user profile", error);
    return baseProfile;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(() => readStoredUser());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    setPersistence(auth, browserLocalPersistence).catch((error) => {
      console.error("Failed to enforce Firebase persistence", error);
    });

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!isMounted) {
        return;
      }

      if (!firebaseUser) {
        setUser(null);
        persistUser(null);
        setLoading(false);
        return;
      }

      setLoading(true);
      const resolvedProfile = await resolveProfileFromFirebaseUser(firebaseUser);

      if (!isMounted) {
        return;
      }

      setUser(resolvedProfile);
      persistUser(resolvedProfile);
      setLoading(false);
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  }, []);

  const logout = useCallback(async () => {
    await signOut(auth);
    persistUser(null);
    setUser(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      loading,
      login,
      logout,
    }),
    [user, loading, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
