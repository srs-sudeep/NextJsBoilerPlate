"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFetchData } from "@/core/api/apiConfig";
import { useQuery } from "@tanstack/react-query";
import { Lock, LogIn, Phone } from "lucide-react";
import { useState } from "react";

interface Props {
  user: string | null;
  token: string | null;
}

export default function Login() {
  const [credentials, setCredentials] = useState({ phoneNumber: "", password: "" });

  const handleOnClick = (e: React.FormEvent) => {
    e.preventDefault();
    // refetch(); // Trigger the query manually
    useFetchData({ url: '/v1/auth/login', queryKey: ["auth", credentials], method: "POST", body: credentials });
  };
  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <LogIn size={40} className="text-indigo-600" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight">Welcome back</h2>
          <p className="text-sm text-muted-foreground">
            Enter your credentials to access your account
          </p>
        </CardHeader>
        <form onSubmit={handleOnClick}>
          <CardContent className="space-y-4">
          <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="12345 67890"
                  className="pl-10"
                  value={credentials.phoneNumber}
                  onChange={(e) => setCredentials({phoneNumber: e.target.value, password: credentials.password})}

                  maxLength={14}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  className="pl-10"
                  value={credentials.password}
                  onChange={(e) => setCredentials({phoneNumber: credentials.phoneNumber, password: e.target.value})}
                  required
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full">
              Sign in
            </Button>
            <div className="text-sm text-center text-gray-500">
              Don't have an account?{" "}
              <a href="/sign-up" className="text-indigo-600 hover:text-indigo-500">
                Sign up
              </a>
            </div>
          </CardFooter>
        </form>
      </Card>
    </main>
  );
}