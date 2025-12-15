'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { RoomCard } from './RoomCard';
import { useLobbyStore } from '@/lib/store/lobbyStore';
import { useSocket } from '@/lib/hooks/useSocket';

export function RoomList() {
  const router = useRouter();
  const { rooms, fetchRooms, joinRoom } = useLobbyStore();
  const { on, off } = useSocket();

  useEffect(() => {
    fetchRooms();

    // Listen for room updates
    const handleRoomUpdate = () => {
      fetchRooms();
    };

    on('room:update', handleRoomUpdate);
    on('room:created', handleRoomUpdate);
    on('room:deleted', handleRoomUpdate);

    return () => {
      off('room:update', handleRoomUpdate);
      off('room:created', handleRoomUpdate);
      off('room:deleted', handleRoomUpdate);
    };
  }, [fetchRooms, on, off]);

  const handleJoinRoom = async (roomId: string) => {
    const room = await joinRoom({ roomId });
    if (room) {
      router.push(`/lobby/${room.id}`);
    }
  };

  if (rooms.length === 0) {
    return (
      <div className="text-center py-12">
        {useLobbyStore.getState().error && (
            <p className="text-red-500 mb-4">Error: {useLobbyStore.getState().error}</p>
        )}
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          No hay salas disponibles
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-500">
          ¡Crea una nueva sala para empezar a jugar!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {rooms.map((room) => (
        <RoomCard key={room.id} room={room} onJoin={handleJoinRoom} />
      ))}
    </div>
  );
}
