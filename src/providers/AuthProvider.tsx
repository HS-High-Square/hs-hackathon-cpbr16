"use client";

import { TRegisterForm } from "@/app/auth/register/RegisterForm";
import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext(null as any);

export function AuthProvider(props: { children: React.ReactNode }) {
  const [userdata, setUserdata] = useState<TRegisterForm>();
  return (
    <AuthContext.Provider value={{ userdata, setUserdata }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
