'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, getUser } from '@/lib/auth';
import { getCookie, deleteCookie } from '@/lib/cookies';

interface UserContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  refreshUser: () => Promise<void>;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

interface UserProviderProps {
  children: React.ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshUser = async () => {
    try {
      setIsLoading(true);
      const userData = await getUser();
      setUser(userData);
    } catch (error) {
      console.error('Failed to fetch user:', error);
      setUser(null);
      deleteCookie('authToken');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    deleteCookie('authToken');
    localStorage.removeItem('userRole');
  };

  useEffect(() => {
    const authToken = getCookie('authToken');

    if (authToken) {
      refreshUser();
    } else {
      setIsLoading(false);
    }
  }, []);

  const value: UserContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    setUser,
    refreshUser,
    logout,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
