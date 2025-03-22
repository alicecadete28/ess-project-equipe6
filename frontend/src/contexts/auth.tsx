"use client";

import api from "@/service/api";
import { decode, JwtPayload } from "jsonwebtoken";
import { useRouter } from "next/navigation";
import { createContext, useEffect, useState, type ReactNode } from "react";

// Define user type
export type User = {
  id: string;
  email: string;
  name?: string;
};

// Define auth context type
type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  error: string | null;
};

// Create the auth context with default values
export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => false,
  logout: () => {},
  error: null,
});

// Auth provider props
type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const route = useRouter();
  // Check if user is already logged in (from localStorage)
  useEffect(() => {
    const checkLoggedIn = () => {
      try {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (err) {
        console.error("Failed to restore authentication state:", err);
      } finally {
        setIsLoading(false);
      }
    };

    checkLoggedIn();
  }, []);

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    setError(null);
    setIsLoading(true);

    try {
      // In a real app, you would make an API call here
      // This is a mock implementation for demonstration

      // Simulate API call delay

      if (!email || !password) {
        throw new Error("Email and password are required");
      }
      const response = await api("api/login", {
        body: JSON.stringify({
          email,
          password,
        }),
        method: "POST",
      });

      const { token } = response?.data;

      const data = decode(token) as JwtPayload & {
        id: string;
        email: string;
      };

      // Mock successful login
      const newUser: User = {
        id: data.id,
        email: data?.email || "",
        name: email.split("@")[0],
      };

      // Save to state and localStorage
      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
      localStorage.setItem("accessToken", token);

      route.push("/");
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to login");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // Provide auth context value
  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
