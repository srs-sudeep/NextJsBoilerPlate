// "use client"
import * as React from "react";
import { redirect } from 'next/navigation'
import useAuth from "../hooks/use-auth";


export default function ProtectedRoute({ children, role }:{children:React.ReactNode , role:string}) {
  const { auth } = useAuth();
  
//   const router = useNavigation();

  React.useEffect(() => {
    if (!auth.token) {
      redirect("/login");
    } else if (auth.role !== role) {
      redirect("/unauthorized");
    }
  }, [auth, role]);

  return auth.token && auth.role === role ? children : null;
}







