import { api } from './api';
import { AxiosError } from 'axios';
import { deleteCookie } from './cookies';

export interface LoginFormData {
  username: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  token?: string;
  role?: string;
  error?: string;
}

export interface User {
  id: string;
  username: string;
  name: string;
  lastName: string;
  email: string;
  role: string;
}

interface BackendUser {
  id: string;
  username: string;
  ime: string;
  prezime: string;
  email: string;
  role: string;
}

export const loginUser = async (
  data: LoginFormData
): Promise<LoginResponse> => {
  try {
    const response = await api.post('/login', {
      username: data.username,
      password: data.password,
    });

    return response.data;
  } catch (error) {
    console.log('Full error object:', error);

    if (error instanceof AxiosError) {
      console.log('Error response:', error.response?.data);
      console.log('Error status:', error.response?.status);

      if (error.response?.status === 401) {
        const errorMessage =
          error.response.data?.error || 'Invalid username or password';
        throw new Error(errorMessage);
      } else if (error.response?.status === 400) {
        const errorMessage = error.response.data?.error || 'Invalid request';
        throw new Error(errorMessage);
      } else if (error.response?.status && error.response.status >= 500) {
        throw new Error('Server error. Please try again later.');
      } else if (error.request) {
        throw new Error('Network error. Please check your connection.');
      }
    }

    throw new Error('Login failed. Please try again.');
  }
};

export const logoutUser = async (): Promise<void> => {
  try {
    await api.post('/logout');
    deleteCookie('authToken');
    localStorage.removeItem('userRole');
  } catch (error) {
    console.error('Logout error:', error);
    deleteCookie('authToken');
    localStorage.removeItem('userRole');
  }
};

export const getUser = async (): Promise<User> => {
  try {
    const response = await api.get('/me');
    const backendUser: BackendUser = response.data;

    const user: User = {
      id: backendUser.id,
      username: backendUser.username,
      name: backendUser.ime,
      lastName: backendUser.prezime,
      email: backendUser.email,
      role: backendUser.role,
    };

    return user;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw new Error('Failed to fetch user data');
  }
};
