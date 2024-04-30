"use client";

import {
  createContext,
  useState,
  useEffect,
  FC,
  ReactNode,
  useContext,
} from "react";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

type AuthContextType = {
  user: any;
  setUser: React.Dispatch<any>;
  authTokens: any;
  setAuthTokens: React.Dispatch<any>;
  registerUser: (
    email: string,
    username: string,
    password: string,
    password2: string
  ) => void;
  loginUser: (email: string, password: string) => void;
  logoutUser: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [authTokens, setAuthTokens] = useState<any>(() =>
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("authTokens") || "null")
      : null
  );

  const [user, setUser] = useState<any>(() =>
    typeof window !== "undefined"
      ? authTokens
        ? jwtDecode(authTokens.access)
        : null
      : null
  );

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  const loginUser = async (email: string, password: string) => {
    const response = await fetch("http://127.0.0.1:8000/auth/token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await response.json();
    if (response.status === 200) {
      setAuthTokens(data);
      setUser(jwtDecode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
      router.push("/");
      Swal.fire({
        title: "Login Successful",
        icon: "success",
        toast: true,
        timer: 6000,
        position: "top-right",
        timerProgressBar: true,
        showConfirmButton: false,
      });
    } else {
      Swal.fire({
        title: "Username or password does not exist",
        icon: "error",
        toast: true,
        timer: 6000,
        position: "top-right",
        timerProgressBar: true,
        showConfirmButton: false,
      });
    }
  };

  const registerUser = async (
    email: string,
    username: string,
    password: string,
    password2: string
  ) => {
    const response = await fetch("http://127.0.0.1:8000/auth/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        username,
        password,
        password2,
      }),
    });
    if (response.status === 201) {
      router.push("/login");
      Swal.fire({
        title: "Registration Successful, Login Now",
        icon: "success",
        toast: true,
        timer: 6000,
        position: "top-right",
        timerProgressBar: true,
        showConfirmButton: false,
      });
    } else {
      Swal.fire({
        title: "An Error Occurred " + response.status,
        icon: "error",
        toast: true,
        timer: 6000,
        position: "top-right",
        timerProgressBar: true,
        showConfirmButton: false,
      });
    }
  };

  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    router.push("/login");
    Swal.fire({
      title: "You have been logged out",
      icon: "success",
      toast: true,
      timer: 6000,
      position: "top-right",
      timerProgressBar: true,
      showConfirmButton: false,
    });
  };

  useEffect(() => {
    if (authTokens) {
      setUser(jwtDecode(authTokens.access));
    }
    setIsLoading(false);
  }, [authTokens]);

  const contextData: AuthContextType = {
    user,
    setUser,
    authTokens,
    setAuthTokens,
    registerUser,
    loginUser,
    logoutUser,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
