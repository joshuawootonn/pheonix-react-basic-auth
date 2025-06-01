import Link from "next/link";
import authService from "@/services/auth";

interface ConfirmEmailPageProps {
  params: {
    token: string;
  };
}

export default async function ConfirmEmailPage(props: ConfirmEmailPageProps) {
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
  } catch (error) {
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
