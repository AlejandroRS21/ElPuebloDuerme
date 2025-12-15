'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { RoomList } from '@/components/lobby/RoomList';
import { useAuth } from '@/lib/hooks/useAuth';

export default function LobbyPage() {
  const router = useRouter();
  const { user, logout } = useAuth(true);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-red-950/20 to-black">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h1 className="text-4xl font-bold text-red-600 mb-2">
                Salas Disponibles
              </h1>
              <p className="text-gray-300">
                Únete a una sala existente o crea una nueva para empezar a jugar
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-400">
                👤 {user?.username || 'Jugador'}
              </span>
              <Button 
                variant="outline" 
                size="sm"
                onClick={logout}
                className="border-gray-700 text-gray-300 hover:bg-gray-800"
              >
                Cerrar Sesión
              </Button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <Button 
              onClick={() => router.push('/lobby/create')}
              className="bg-red-600 hover:bg-red-700"
            >
              ➕ Crear Sala
            </Button>
            <Button 
              onClick={() => router.push('/lobby/join')}
              variant="outline"
              className="border-red-900 text-red-500 hover:bg-red-900/20"
            >
              🔑 Unirse con Código
            </Button>
          </div>
        </div>

        <RoomList />
      </div>
    </div>
  );
}
