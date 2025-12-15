'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useLobbyStore } from '@/lib/store/lobbyStore';
import { useAuth } from '@/lib/hooks/useAuth';

const MIN_ROOM_CODE_LENGTH = 4;

export default function JoinLobbyPage() {
  const router = useRouter();
  const { user } = useAuth(true);
  const { joinRoom } = useLobbyStore();
  const [roomCode, setRoomCode] = useState('');
  const [isJoining, setIsJoining] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsJoining(true);

    try {
      // Format the code (remove spaces and convert to uppercase)
      const formattedCode = roomCode.replace(/\s/g, '').toUpperCase();
      
      const room = await joinRoom({ roomId: formattedCode, code: formattedCode });
      if (room) {
        router.push(`/lobby/${room.id}`);
      }
    } catch (err) {
      setError('No se pudo unir a la sala. Verifica el código e intenta nuevamente.');
      console.error('Error joining room:', err);
    } finally {
      setIsJoining(false);
    }
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Auto-format the code as user types (add spaces every 4 characters)
    let value = e.target.value.replace(/\s/g, '').toUpperCase();
    if (value.length > 0) {
      // More robust formatting that handles any length
      value = value.replace(/(.{4})/g, '$1 ').trim();
    }
    setRoomCode(value);
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-red-950/20 to-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-red-600 mb-2">
            Unirse a una Sala
          </h1>
          <p className="text-gray-300">
            Ingresa el código de la sala para unirte
          </p>
        </div>

        <Card className="bg-black/60 border-red-900/50">
          <CardHeader>
            <CardTitle className="text-2xl text-red-500">Código de Sala</CardTitle>
            <CardDescription className="text-gray-400">
              Introduce el código que te compartió el host
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Room Code Input */}
              <div>
                <label htmlFor="roomCode" className="block text-sm font-medium text-gray-300 mb-2">
                  Código de Sala
                </label>
                <Input
                  id="roomCode"
                  name="roomCode"
                  type="text"
                  required
                  value={roomCode}
                  onChange={handleCodeChange}
                  className="bg-black/50 border-gray-700 text-white text-center text-2xl font-mono tracking-wider"
                  placeholder="XXXX XXXX"
                  maxLength={9} // 8 characters + 1 space
                  autoComplete="off"
                />
                <p className="mt-2 text-xs text-gray-500 text-center">
                  El código suele tener 8 caracteres
                </p>
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-4 bg-red-900/30 border border-red-700 rounded-lg text-red-300 text-sm">
                  {error}
                </div>
              )}

              {/* Info Box */}
              <div className="bg-blue-950/30 border border-blue-800 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-blue-400 mb-2">ℹ️ ¿No tienes un código?</h3>
                <p className="text-xs text-gray-300 mb-2">
                  Puedes crear tu propia sala o buscar salas públicas en la lista de salas disponibles.
                </p>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => router.push('/lobby')}
                    className="flex-1 border-blue-700 text-blue-400 hover:bg-blue-900/20"
                  >
                    Ver Salas
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => router.push('/lobby/create')}
                    className="flex-1 border-blue-700 text-blue-400 hover:bg-blue-900/20"
                  >
                    Crear Sala
                  </Button>
                </div>
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
                  disabled={isJoining || roomCode.replace(/\s/g, '').length < MIN_ROOM_CODE_LENGTH}
                  className="flex-1 bg-red-600 hover:bg-red-700"
                >
                  {isJoining ? 'Uniéndose...' : 'Unirse'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Tips Section */}
        <div className="mt-8 glass rounded-lg p-6">
          <h2 className="text-xl font-bold text-red-500 mb-4">Consejos</h2>
          <div className="space-y-2 text-sm text-gray-300">
            <p>• El código es proporcionado por el host de la sala</p>
            <p>• Los códigos distinguen entre mayúsculas y minúsculas</p>
            <p>• Si la sala está llena, no podrás unirte</p>
            <p>• Una vez en la sala, espera a que el host inicie la partida</p>
          </div>
        </div>
      </div>
    </div>
  );
}
