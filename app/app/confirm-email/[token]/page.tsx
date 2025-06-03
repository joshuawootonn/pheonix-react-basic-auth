import Link from "next/link";
import authService from "@/services/auth";

export default async function ConfirmEmailPage(props: {
  params: Promise<{ token: string }>;
}) {
  const params = await props.params;
  const token = params.token;

  try {
    const response = await authService.confirmEmail(token);

    return (
      <div>
        <h2>{response.message}</h2>
        <div>
          <Link href="/">Go to Home</Link>
        </div>
      </div>
    );
  } catch (_) {
    return (
      <div>
        <h2>Failed to confirm email</h2>
        <div>
          <Link href="/login">Go to Login</Link>
          <Link href="/signup">Go toSignup</Link>
        </div>
      </div>
    );
  }
}
