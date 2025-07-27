'use client';

import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import Sidebar from '@/components/Sidebar';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const toggleSidebar = useCallback(() => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  }, [isSidebarCollapsed]);

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 'b') {
        event.preventDefault();
        toggleSidebar();
      }
      if (event.key === 'Escape' && isMobileSidebarOpen) {
        setIsMobileSidebarOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileSidebarOpen, toggleSidebar]);

  return (
    <div className="flex w-full h-screen bg-gray-50 dark:bg-gray-900">
      <div className="block">
        <Sidebar isCollapsed={isSidebarCollapsed} onToggle={toggleSidebar} />
      </div>
      {isMobileSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
            onClick={toggleMobileSidebar}
          />
          <div className="absolute left-0 top-0 h-full w-64 transform transition-transform">
            <Sidebar
              isCollapsed={isSidebarCollapsed}
              onToggle={toggleMobileSidebar}
            />
          </div>
        </div>
      )}

      <Button
        onClick={toggleMobileSidebar}
        className="fixed bottom-6 left-6 z-40 lg:hidden w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg transition-all duration-200 hover:scale-110"
        aria-label="Toggle sidebar"
      >
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </Button>
      <div className="w-full">{children}</div>
      <div className="hidden lg:block fixed bottom-4 text-xs text-gray-500 dark:text-gray-400">
        Press{' '}
        <kbd className="px-1 py-0.5 bg-gray-200 dark:bg-gray-700 rounded text-xs">
          Ctrl+B
        </kbd>{' '}
        to toggle sidebar
      </div>
    </div>
  );
}
