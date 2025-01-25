"use client";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

interface Props {
  user: string | null;
  token: string | null;
}

export default function Login() {
  const [credentials, setCredentials] = useState({ phoneNumber: "", password: "" });

  const { data: payload, refetch, isError, error } = useQuery<Props>({
    queryKey: ["auth", credentials],
    queryFn: () =>
      fetch(`http://10.50.49.216:5000/v1/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      }).then((res) => {
        console.log(credentials);
        console.log(res);
        return res.json();
      }),
    enabled: false, // Disable automatic fetching
  });

  const handleOnClick = (e: React.FormEvent) => {
    e.preventDefault();
console.log(credentials);
    refetch(); // Trigger the query manually
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleOnClick}>
        <div>
          <input
            name="phoneNumber"
            placeholder="Phone Number"
            required
            autoComplete="phoneNumber"
            value={credentials.phoneNumber}
            onChange={(e) =>
              setCredentials({ ...credentials, phoneNumber: e.target.value })
            }
          />
        </div>
        <div>
          <input
            name="password"
            type="password"
            placeholder="Password"
            required
            autoComplete="current-password"
            value={credentials.password}
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
          />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
        <div>
          {payload && <pre>{JSON.stringify(payload, null, 2)}</pre>}
        </div>
        {isError && (
          <p style={{ color: "red" }}>{error?.message || "Invalid credentials"}</p>
        )}
      </form>
    </div>
  );
}