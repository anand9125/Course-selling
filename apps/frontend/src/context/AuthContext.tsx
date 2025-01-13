import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import {   useSetRecoilState } from "recoil";
import { dataAtom } from "../Recoil/dataAtom";
import { auth } from "../firebase/firebaseConfig";
import { backendUrl } from "../lib/backendUrl";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut, 
  onAuthStateChanged, 
  User 
} from "firebase/auth";
import axios from "axios";

const googleProvider = new GoogleAuthProvider();

interface AuthContextType {
  currentUser: User | null;
  registerUser: (email: string, password: string) => Promise<void>;
  loginUser: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  logOut: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const token =localStorage.getItem('jwt')
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // Initially true to handle loading during user state check
  const setSignupState = useSetRecoilState(dataAtom)
  const registerUser = async (email: string, password: string): Promise<void> => {
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Registration error", error);
    } finally {
      setLoading(false);
    }
  };

  const loginUser = async (email: string, password: string): Promise<void> => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Login error", error);
    }
  };

  const signInWithGoogle = async (): Promise<void> => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const idToken = await result.user.getIdToken();
      console.log("Google sign-in successful, ID Token:", idToken);

      // Send the ID token to the backend
     const response =await axios.post(`${backendUrl}/authenticate`, { idToken }, { withCredentials: true })
     console.log("Hii i am herer")
        setSignupState(response.data);
        localStorage.setItem("jwt",response.data.token)
        localStorage.setItem("profilePic",response.data.profilePic)
        console.log("Backend response:", response.data);
        } 
     catch (error) {
      console.error("Google sign-in error", error);
    }
  };

  const logOut = async (): Promise<void> => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout error", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value: AuthContextType = {
    currentUser,
    registerUser,
    loginUser,
    signInWithGoogle,
    logOut,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
