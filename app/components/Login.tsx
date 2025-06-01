'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import authService, { LoginCredentials } from '../services/auth';
import Link from 'next/link';

export default function Login() {
  const router = useRouter();
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: '',
    password: '',
    remember_me: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await authService.login(credentials);
      router.push('/');
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div>
      <h1>Login</h1>
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
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            required
            value={credentials.password}
            onChange={handleChange}
          />
        </div>

        <div>
          <input
            id="remember_me"
            name="remember_me"
            type="checkbox"
            checked={credentials.remember_me}
            onChange={handleChange}
          />
          <label htmlFor="remember_me">Remember me</label>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Signing in...' : 'Sign in'}
        </button>
      </form>
    </div>
  );
} 