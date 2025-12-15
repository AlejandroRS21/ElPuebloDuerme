'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { RoomList } from '@/components/lobby/RoomList';
import { useAuth } from '@/lib/hooks/useAuth';

export default function LobbyPage() {
  const router = useRouter();
  const { user, logout } = useAuth(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              El Pueblo Duerme
            </h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {user?.username || 'Jugador'}
              </span>
              <Button variant="outline" onClick={logout}>
                Cerrar Sesión
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Salas Disponibles
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Únete a una sala o crea una nueva para empezar a jugar
            </p>
          </div>
          <Button onClick={() => router.push('/lobby/create')}>
            Crear Sala
          </Button>
        </div>

        <RoomList />
      </main>
    </div>
  );
}
