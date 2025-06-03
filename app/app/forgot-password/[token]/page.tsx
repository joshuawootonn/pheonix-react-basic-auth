import UpdatePassword from '../../../components/update-password';

export default async function UpdatePasswordPage(props: { params: Promise<{ token: string }> }) {
  const params = await props.params;
  const token = params.token;

  return <UpdatePassword token={token} />;
} 