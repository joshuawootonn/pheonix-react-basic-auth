'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import authService, { RegisterCredentials } from '../services/auth';

export default function Signup() {
  const router = useRouter();
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [credentials, setCredentials] = useState<RegisterCredentials>({
    email: '',
    password: '',
    password_confirmation: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await authService.register(credentials);
      router.push('/dashboard');
    } catch (err) {
      setError('Registration failed. Please check your information and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div>
      <h1>Signup</h1>
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
          <label htmlFor="password_confirmation">Confirm Password</label>
          <input
            id="password_confirmation"
            name="password_confirmation"
            type="password"
            required
            value={credentials.password_confirmation}
            onChange={handleChange}
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Creating account...' : 'Create account'}
        </button>
      </form>
    </div>
  );
} 