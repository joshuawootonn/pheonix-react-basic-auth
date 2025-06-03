"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import authService from "../services/auth";
import Link from "next/link";

export default function ForgotPassword() {
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [credentials, setCredentials] = useState<{ email: string }>({
    email: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await authService.forgotPassword(credentials);
      router.push("/");
    } catch (err) {
      setError("Invalid email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Forgot password</h1>
      <form onSubmit={handleSubmit}>
        {error && <div>{error}</div>}

        <div>
          <label htmlFor="email">Email address</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={credentials.email}
            onChange={(e) =>
              setCredentials({ ...credentials, email: e.target.value })
            }
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading
            ? "Sending reset password email..."
            : "Send reset password email"}
        </button>
      </form>
      <Link href="/forgot-password">Forgot password?</Link>
    </div>
  );
}
