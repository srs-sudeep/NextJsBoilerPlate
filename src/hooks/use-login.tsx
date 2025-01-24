// "use client"
import { useMutation } from "@tanstack/react-query";

// Define types for input and response
interface LoginInput {
  username: string;
  password: string;
}

interface LoginResponse {
  token: string;
  role: string;
}

export default function useLogin() {
  const mutation = useMutation<LoginResponse, Error, LoginInput>({
    mutationFn: async ({ username, password }: LoginInput) => {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      return response.json();
    },
    onSuccess: (data) => {
      // Handle success (e.g., store token, redirect user)
      console.log("Login successful", data);
    },
    onError: (error) => {
      // Handle error (e.g., display error message)
      console.error("Login failed", error);
    },
    onSettled: () => {
      // Runs after mutation is completed (either success or error)
      console.log("Mutation has completed.");
    },
  });

  return mutation;
}

