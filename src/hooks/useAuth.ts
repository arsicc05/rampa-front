import { useUser } from '@/contexts/UserContext';

export const useAuth = () => {
  const { user, isAuthenticated, isLoading, logout, refreshUser } = useUser();

  return {
    user,
    isAuthenticated,
    isLoading,
    logout,
    refreshUser,
    isAdmin: user?.role === 'admin',
    isUser: user?.role === 'user',
  };
};

export default useAuth;
