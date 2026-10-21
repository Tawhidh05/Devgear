"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth, isFirebaseConfigured } from "@/lib/firebase";

const AuthContext = createContext(null);

// Keep only the plain fields we need so React re-renders when the profile changes.
const toUser = (u) =>
  u
    ? {
        uid: u.uid,
        displayName: u.displayName || "",
        email: u.email || "",
        photoURL: u.photoURL || "",
      }
    : null;

const ERROR_MESSAGES = {
  "auth/invalid-credential": "Email or password is incorrect.",
  "auth/invalid-email": "Enter a valid email address.",
  "auth/user-not-found": "No account found with that email.",
  "auth/wrong-password": "Email or password is incorrect.",
  "auth/email-already-in-use": "An account with this email already exists. Try logging in.",
  "auth/weak-password": "Password must be at least 6 characters.",
  "auth/too-many-requests": "Too many attempts. Wait a moment and try again.",
  "auth/popup-closed-by-user": "The Google window was closed before finishing.",
  "auth/cancelled-popup-request": "The Google window was closed before finishing.",
  "auth/popup-blocked": "Your browser blocked the Google popup. Allow popups and try again.",
  "auth/network-request-failed": "Network error. Check your connection and try again.",
  "auth/unauthorized-domain":
    "This domain is not authorised in Firebase. Add it under Authentication > Settings > Authorised domains.",
};

export function getAuthErrorMessage(error) {
  if (error?.message === "FIREBASE_NOT_CONFIGURED") {
    return "Firebase is not configured yet. Add your keys to .env.local (see README).";
  }
  return ERROR_MESSAGES[error?.code] || "Something went wrong. Please try again.";
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return undefined;
    }
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(toUser(firebaseUser));
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const ensureAuth = () => {
    if (!auth) throw new Error("FIREBASE_NOT_CONFIGURED");
    return auth;
  };

  const register = useCallback(async ({ name, email, password, photoURL }) => {
    const a = ensureAuth();
    const cred = await createUserWithEmailAndPassword(a, email, password);
    await updateProfile(cred.user, {
      displayName: name,
      ...(photoURL ? { photoURL } : {}),
    });
    setUser(toUser(a.currentUser));
    return cred.user;
  }, []);

  const login = useCallback(async ({ email, password }) => {
    const a = ensureAuth();
    const cred = await signInWithEmailAndPassword(a, email, password);
    return cred.user;
  }, []);

  const loginWithGoogle = useCallback(async () => {
    const a = ensureAuth();
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    const cred = await signInWithPopup(a, provider);
    return cred.user;
  }, []);

  const logout = useCallback(async () => {
    const a = ensureAuth();
    await signOut(a);
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      isFirebaseConfigured,
      register,
      login,
      loginWithGoogle,
      logout,
    }),
    [user, loading, register, login, loginWithGoogle, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
