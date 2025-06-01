import UpdatePassword from '../../../components/update-password';

export default function UpdatePasswordPage({ params }: { params: { token: string } }) {
  return <UpdatePassword token={params.token} />;
} 