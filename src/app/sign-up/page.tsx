"use client"
import { redirect } from "next/navigation";
import useAuth from "../../hooks/use-auth";
import useLogin from "../../hooks/use-login";

export default function Login() {
//   const router = useRouter();
  const { login } = useAuth();
  const { mutate: loginUser, isError, error } = useLogin(); // Now isLoading is correctly destructured

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    loginUser(
      { username, password },
      {
        onSuccess: (data) => {
            const { token, role } = data;
            login({ token, role });
            if (data.role === "ROLE_ADMIN") {
            redirect("/admin/dashboard");
          } else if (data.role === "ROLE_PATIENT") {
            redirect("/patient/home");
          }
        },
      }
    );
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            name="username"
            placeholder="Username"
            required
            autoComplete="username"
          />
        </div>
        <div>
          <input
            name="password"
            type="password"
            placeholder="Password"
            required
            autoComplete="current-password"
          />
        </div>
        <div>
          <button type="submit" >Login</button>
        </div>
        {isError && <p style={{ color: "red" }}>{error?.message || "Invalid credentials"}</p>}
      </form>
    </div>
  );
}
