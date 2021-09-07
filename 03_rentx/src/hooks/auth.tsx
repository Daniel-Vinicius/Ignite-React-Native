import React, { createContext, useState, useContext, ReactNode } from "react";

import { api } from "../services/api";

interface User {
  id: string;
  name: string;
  email: string;
  driver_license: string;
  avatar?: string;
}

interface AuthState {
  token: string;
  user: User;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  signIn: (credentials: SignInCredentials) => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [data, setData] = useState({} as AuthState);

  async function signIn({ email, password }: SignInCredentials) {
    const response = await api.post<AuthState>('/sessions', { email, password });
    setData(response.data);

    api.defaults.headers.authorization = `Bearer ${response.data.token}`;
  }

  return (
    <AuthContext.Provider
      value={{
        user: data.user,
        signIn
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  const context = useContext(AuthContext);
  return context;
}

export { AuthProvider, useAuth };
