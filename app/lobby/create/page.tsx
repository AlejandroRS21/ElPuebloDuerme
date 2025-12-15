'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useLobbyStore } from '@/lib/store/lobbyStore';
import { useAuth } from '@/lib/hooks/useAuth';

export default function CreateLobbyPage() {
  const router = useRouter();
  const { user } = useAuth(true);
  const { createRoom } = useLobbyStore();
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    maxPlayers: 10,
    minPlayers: 4,
    isPrivate: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreating(true);

    try {
      const room = await createRoom(formData);
      if (room) {
        router.push(`/lobby/${room.id}`);
      }
    } catch (error) {
      console.error('Error creating room:', error);
    } finally {
      setIsCreating(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : type === 'number' ? Number(value) : value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-red-950/20 to-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-red-600 mb-2">
            Crear Nueva Sala
          </h1>
          <p className="text-gray-300">
            Configura tu sala y invita a tus amigos a jugar
          </p>
        </div>

        <Card className="bg-black/60 border-red-900/50">
          <CardHeader>
            <CardTitle className="text-2xl text-red-500">Configuración de Sala</CardTitle>
            <CardDescription className="text-gray-400">
              Personaliza las opciones de tu partida
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Room Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Nombre de la Sala
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="bg-black/50 border-gray-700 text-white"
                  placeholder="Ej: Sala de AlejandroRS21"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Este nombre será visible para otros jugadores
                </p>
              </div>

              {/* Player Limits */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="minPlayers" className="block text-sm font-medium text-gray-300 mb-2">
                    Mínimo de Jugadores
                  </label>
                  <Input
                    id="minPlayers"
                    name="minPlayers"
                    type="number"
                    min={4}
                    max={15}
                    required
                    value={formData.minPlayers}
                    onChange={handleChange}
                    className="bg-black/50 border-gray-700 text-white"
                  />
                </div>
                <div>
                  <label htmlFor="maxPlayers" className="block text-sm font-medium text-gray-300 mb-2">
                    Máximo de Jugadores
                  </label>
                  <Input
                    id="maxPlayers"
                    name="maxPlayers"
                    type="number"
                    min={4}
                    max={15}
                    required
                    value={formData.maxPlayers}
                    onChange={handleChange}
                    className="bg-black/50 border-gray-700 text-white"
                  />
                </div>
              </div>

              {/* Privacy */}
              <div className="flex items-center space-x-3">
                <input
                  id="isPrivate"
                  name="isPrivate"
                  type="checkbox"
                  checked={formData.isPrivate}
                  onChange={handleChange}
                  className="w-4 h-4 text-red-600 bg-black border-gray-700 rounded focus:ring-red-500"
                />
                <label htmlFor="isPrivate" className="text-sm text-gray-300">
                  Sala Privada (requiere código para unirse)
                </label>
              </div>

              {/* Info Box */}
              <div className="bg-blue-950/30 border border-blue-800 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-blue-400 mb-2">ℹ️ Información</h3>
                <ul className="text-xs text-gray-300 space-y-1">
                  <li>• Como host, podrás iniciar la partida cuando haya suficientes jugadores</li>
                  <li>• Podrás expulsar jugadores de la sala</li>
                  <li>• La sala se cerrará automáticamente si el host se desconecta</li>
                  <li>• Se asignará un código único a tu sala para que otros puedan unirse</li>
                </ul>
              </div>

              {/* Buttons */}
              <div className="flex gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                  className="flex-1 border-gray-700 text-gray-300 hover:bg-gray-800"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  disabled={isCreating}
                  className="flex-1 bg-red-600 hover:bg-red-700"
                >
                  {isCreating ? 'Creando...' : 'Crear Sala'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Tips Section */}
        <div className="mt-8 glass rounded-lg p-6">
          <h2 className="text-xl font-bold text-red-500 mb-4">Consejos para el Host</h2>
          <div className="space-y-2 text-sm text-gray-300">
            <p>• <strong>Jugadores recomendados:</strong> El juego es más divertido con 6-10 jugadores</p>
            <p>• <strong>Salas privadas:</strong> Usa una sala privada para jugar solo con amigos conocidos</p>
            <p>• <strong>Comunicación:</strong> Considera usar Discord o voz para una mejor experiencia</p>
            <p>• <strong>Tiempo:</strong> Una partida típica dura entre 15-30 minutos</p>
          </div>
        </div>
      </div>
    </div>
  );
}
