'use client';

import { useEffect, useState } from 'react';
import authService, { User } from '../services/auth';
import Logout from './logout';


export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await authService.getCurrentUser();
        if (response) {
          setUser(response.user);
        }
      } catch (err) {
        setError('Failed to fetch user information');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return <div>Not logged in</div>;
  }

  return (
    <div>
      <h2>User Profile</h2>
      <div>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>User ID:</strong> {user.id}</p>

      </div>
      <Logout />
    </div>
  );
} 