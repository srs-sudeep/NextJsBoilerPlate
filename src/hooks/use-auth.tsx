import { useState, useEffect } from "react";
import {jwtDecode, JwtPayload} from 'jwt-decode'

interface CustomJwtPayload extends JwtPayload {
    role?: string;
  }

export default function useAuth() {
    const [auth, setAuth] = useState<{ token: string | null; role: string | null }>({
        token: null,
        role: null,
      });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode<CustomJwtPayload>(token);
      setAuth({
        token,
        role: decoded?.role ?? null,
      });
    }
  }, []);

  const login = ({token, role}:{token: string, role: string}) => {
    localStorage.setItem("token", token);
    setAuth({ token, role });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setAuth({ token: null, role: null });
  };

  return { auth, login, logout };
}
