'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Room, RoomStatus } from '@/types/room';

interface RoomCardProps {
  room: Room;
  onJoin: (roomId: string) => void;
}

export function RoomCard({ room, onJoin }: RoomCardProps) {
  const statusColors = {
    [RoomStatus.WAITING]: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    [RoomStatus.IN_GAME]: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    [RoomStatus.FINISHED]: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200',
  };

  const statusLabels = {
    [RoomStatus.WAITING]: 'Esperando',
    [RoomStatus.IN_GAME]: 'En juego',
    [RoomStatus.FINISHED]: 'Finalizado',
  };

  const canJoin = room.status === RoomStatus.WAITING && room.players.length < room.maxPlayers;

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle>{room.name}</CardTitle>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[room.status]}`}>
            {statusLabels[room.status]}
          </span>
        </div>
        <CardDescription>
          Sala creada por {room.hostId}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">
            Jugadores: {room.players.length}/{room.maxPlayers}
          </span>
          {room.isPrivate && (
            <span className="text-gray-600 dark:text-gray-400">🔒 Privada</span>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={() => onJoin(room.id)}
          disabled={!canJoin}
          className="w-full"
        >
          {canJoin ? 'Unirse' : 'No disponible'}
        </Button>
      </CardFooter>
    </Card>
  );
}
