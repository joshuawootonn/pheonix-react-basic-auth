"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import authService from "../services/auth";

export default function UpdatePassword({ token }: { token: string }) {
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [credentials, setCredentials] = useState<{
    password: string;
    password_confirmation: string;
  }>({
    password: "",
    password_confirmation: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await authService.updatePassword(token, credentials);
      router.push("/");
    } catch (err) {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Update password</h1>
      <form onSubmit={handleSubmit}>
        {error && <div>{error}</div>}

        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            required
            value={credentials.password}
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
          />
        </div>

        <div>
          <label htmlFor="password_confirmation">Password confirmation</label>
          <input
            id="password_confirmation"
            name="password_confirmation"
            type="password"
            required
            value={credentials.password_confirmation}
            onChange={(e) =>
              setCredentials({
                ...credentials,
                password_confirmation: e.target.value,
              })
            }
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Updating password..." : "Update password"}
        </button>
      </form>
    </div>
  );
}
