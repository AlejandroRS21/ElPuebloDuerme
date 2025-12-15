'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/hooks/useAuth';
import { Button } from '@/components/ui/button';

export function Header() {
  const pathname = usePathname();
  const { user, logout, isAuthenticated } = useAuth();

  const navigation = [
    { name: 'Inicio', href: '/', public: true },
    { name: 'Cómo Jugar', href: '/how-to-play', public: true },
    { name: 'Cartas', href: '/cards', public: true },
    { name: 'Contacto', href: '/contact', public: true },
    { name: 'Salas', href: '/lobby', public: false },
  ];

  return (
    <header className="sticky top-0 z-50 bg-black/90 backdrop-blur-sm border-b border-red-900/30">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <h1 className="text-2xl md:text-3xl font-bold text-red-600 hover:text-red-500 transition-colors">
              El Pueblo Duerme
            </h1>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            {navigation.map((item) => {
              if (!item.public && !isAuthenticated) return null;
              
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-red-500'
                      : 'text-gray-300 hover:text-red-400'
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Auth Section */}
          <div className="flex items-center space-x-4">
            {isAuthenticated && user ? (
              <>
                <span className="hidden sm:inline text-sm text-gray-300">
                  {user.username}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={logout}
                  className="border-red-900 text-red-500 hover:bg-red-900/20"
                >
                  Cerrar Sesión
                </Button>
              </>
            ) : (
              <Link href="/register">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-red-900 text-red-500 hover:bg-red-900/20"
                >
                  Registrarse
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden pb-4">
          <div className="flex flex-wrap gap-3">
            {navigation.map((item) => {
              if (!item.public && !isAuthenticated) return null;
              
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-xs font-medium transition-colors ${
                    isActive
                      ? 'text-red-500'
                      : 'text-gray-400 hover:text-red-400'
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </header>
  );
}
