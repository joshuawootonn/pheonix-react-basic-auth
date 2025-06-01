'use client';

import authService from '../services/auth';

export default function Logout() {
  const handleLogout = async () => {
    await authService.logout();
    window.location.href = '/';
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
}