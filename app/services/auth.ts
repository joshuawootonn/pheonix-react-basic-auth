const API_URL = 'http://localhost:4567'; // Update this to match your Phoenix server URL

export interface LoginCredentials {
  email: string;
  password: string;
  remember_me?: boolean;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  password_confirmation: string;
}

export interface ForgotPasswordCredentials {
  email: string;
}

export interface AuthResponse {
  user: {
    email: string;
    id: number;
  };
  status: string;
}

export interface User {
  id: number;
  email: string;
}

export interface UserResponse {
  status: string;
  user: User;
}

export interface UpdatePasswordCredentials {
  password: string;
  password_confirmation: string;
}

export interface ConfirmEmailResponse {
  status: string;
  message: string;
  user?: {
    email: string;
  };
}

const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await fetch(`${API_URL}/api/users/log_in`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ user: credentials })
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    return response.json();
  },

  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    const response = await fetch(`${API_URL}/api/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ user: credentials })
    });

    if (!response.ok) {
      throw new Error('Registration failed');
    }

    return response.json();
  },

  async forgotPassword(credentials: ForgotPasswordCredentials): Promise<AuthResponse> {
    const response = await fetch(`${API_URL}/api/users/reset_password`, {
      method: 'POST',
      body: JSON.stringify({ user: { email: credentials.email } }),
      headers: {
        'Content-Type': 'application/json',
      }, 
    });

    if (!response.ok) {
      throw new Error('Failed to send reset password email');
    }

    return response.json();
  },

  async logout(): Promise<void> {
    const response = await fetch(`${API_URL}/api/users/log_out`, {
      method: 'DELETE',
      credentials: 'include'
    });

    if (!response.ok) {
      throw new Error('Logout failed');
    }
  },

  async updatePassword(token: string, credentials: UpdatePasswordCredentials): Promise<AuthResponse> {
    const response = await fetch(`${API_URL}/api/users/reset_password/${token}`, {
      method: 'PUT',
      body: JSON.stringify({ user: credentials }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to update password');
    }

    return response.json();
  },

  async getCurrentUser(): Promise<AuthResponse | null> {
    try {
      const response = await fetch(`${API_URL}/api/users/me`, {
        credentials: 'include'
      });

      if (!response.ok) {
        return null;
      }

      return response.json();
    } catch (error) {
      return null;
    }
  },

  async confirmEmail(token: string): Promise<ConfirmEmailResponse> {
    const response = await fetch(`${API_URL}/api/users/confirm/${token}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });


    if (!response.ok) {
      throw new Error('Failed to confirm email');
    }

    return response.json();
  }
};

export default authService; 