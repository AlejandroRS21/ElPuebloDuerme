'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { RoomCode } from '@/components/lobby/RoomCode';
import { PlayerList } from '@/components/lobby/PlayerList';
import { BotControls } from '@/components/lobby/BotControls';
import { useLobbyStore } from '@/lib/store/lobbyStore';
import { useAuth } from '@/lib/hooks/useAuth';
import { useSocket } from '@/lib/hooks/useSocket';
import { RoomStatus } from '@/types/room';

export default function RoomPage() {
  const params = useParams();
  const router = useRouter();
  const roomId = params.roomId as string;
  const { user } = useAuth(true);
  const { currentRoom, leaveRoom, fetchRoom } = useLobbyStore();
  const { emit, on, off } = useSocket();
  const [isStarting, setIsStarting] = useState(false);

  useEffect(() => {
    if (roomId) {
      fetchRoom(roomId);
    }
  }, [roomId, fetchRoom]);

  useEffect(() => {
    // Listen for room updates
    const handleRoomUpdate = (data: any) => {
      if (data.roomId === roomId) {
        fetchRoom(roomId);
      }
    };

    const handleGameStart = (data: any) => {
      if (data.roomId === roomId) {
        router.push(`/game/${data.gameId}`);
      }
    };

    const handleKicked = () => {
      router.push('/lobby');
    };

    on('room:update', handleRoomUpdate);
    on('game:start', handleGameStart);
    on('room:kicked', handleKicked);

    return () => {
      off('room:update', handleRoomUpdate);
      off('game:start', handleGameStart);
      off('room:kicked', handleKicked);
    };
  }, [roomId, on, off, fetchRoom, router]);

  const handleLeaveRoom = async () => {
    await leaveRoom();
    router.push('/lobby');
  };

  const handleStartGame = async () => {
    setIsStarting(true);
    try {
      emit('game:start', { roomId });
    } catch (error) {
      console.error('Error starting game:', error);
      setIsStarting(false);
    }
  };

  const handleKickPlayer = (playerId: string) => {
    emit('room:kick', { roomId, playerId });
  };

  const handleAddBot = () => {
    emit('room:add_bot', { roomId });
  };

  const handleRemoveBot = () => {
    emit('room:remove_bot', { roomId });
  };

  if (!currentRoom) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-red-950/20 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-pulse text-4xl mb-4">⏳</div>
          <p className="text-gray-300">Cargando sala...</p>
        </div>
      </div>
    );
  }

  const isHost = currentRoom.hostId === user?.id;
  const canStart = 
    isHost && 
    currentRoom.players.length >= currentRoom.minPlayers &&
    currentRoom.status === RoomStatus.WAITING;

  const botCount = currentRoom.players.filter(p => p.id.startsWith('bot-')).length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-red-950/20 to-black py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-red-600 mb-1">
                {currentRoom.name}
              </h1>
              <p className="text-gray-400 text-sm">
                {currentRoom.players.length}/{currentRoom.maxPlayers} jugadores
                {currentRoom.isPrivate && ' • Sala Privada'}
              </p>
            </div>
            <Button
              onClick={handleLeaveRoom}
              variant="outline"
              className="border-gray-700 text-gray-300 hover:bg-gray-800"
            >
              🚪 Salir
            </Button>
          </div>

          {/* Room Code */}
          {currentRoom.isPrivate && <RoomCode code={currentRoom.code} />}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Players List */}
          <div className="lg:col-span-2">
            <div className="glass rounded-lg p-6">
              <h2 className="text-2xl font-bold text-white mb-4">
                👥 Jugadores
              </h2>
              <PlayerList
                players={currentRoom.players}
                hostId={currentRoom.hostId}
                currentUserId={user?.id}
                onKickPlayer={handleKickPlayer}
                showKickButton={isHost && currentRoom.status === RoomStatus.WAITING}
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status */}
            <div className="glass rounded-lg p-4">
              <h3 className="text-lg font-bold text-white mb-3">📊 Estado</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Estado:</span>
                  <span className="text-white font-semibold">
                    {currentRoom.status === RoomStatus.WAITING && '⏳ Esperando'}
                    {currentRoom.status === RoomStatus.IN_GAME && '🎮 En juego'}
                    {currentRoom.status === RoomStatus.FINISHED && '✅ Finalizado'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Jugadores:</span>
                  <span className="text-white font-semibold">
                    {currentRoom.players.length}/{currentRoom.maxPlayers}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Mínimo:</span>
                  <span className="text-white font-semibold">
                    {currentRoom.minPlayers}
                  </span>
                </div>
              </div>

              {currentRoom.players.length < currentRoom.minPlayers && (
                <div className="mt-3 p-2 bg-yellow-900/30 border border-yellow-700 rounded text-xs text-yellow-400">
                  Se necesitan al menos {currentRoom.minPlayers} jugadores para comenzar
                </div>
              )}
            </div>

            {/* Bot Controls (Host only) */}
            {isHost && currentRoom.status === RoomStatus.WAITING && (
              <BotControls
                onAddBot={handleAddBot}
                onRemoveBot={handleRemoveBot}
                currentBotCount={botCount}
                maxPlayers={currentRoom.maxPlayers}
                currentPlayerCount={currentRoom.players.length}
              />
            )}

            {/* Start Game Button (Host only) */}
            {isHost && currentRoom.status === RoomStatus.WAITING && (
              <Button
                onClick={handleStartGame}
                disabled={!canStart || isStarting}
                className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-700 disabled:text-gray-500 py-6 text-lg font-bold"
              >
                {isStarting ? '⏳ Iniciando...' : '🎮 Iniciar Partida'}
              </Button>
            )}

            {/* Waiting message for non-hosts */}
            {!isHost && currentRoom.status === RoomStatus.WAITING && (
              <div className="glass rounded-lg p-4 text-center">
                <div className="text-4xl mb-2">⏳</div>
                <p className="text-white font-semibold mb-1">
                  Esperando al host
                </p>
                <p className="text-sm text-gray-400">
                  El host iniciará la partida cuando haya suficientes jugadores
                </p>
              </div>
            )}

            {/* Game Info */}
            <div className="glass rounded-lg p-4">
              <h3 className="text-lg font-bold text-white mb-3">ℹ️ Información</h3>
              <div className="space-y-2 text-xs text-gray-300">
                <p>• El host puede expulsar jugadores y añadir bots</p>
                <p>• Los bots ayudan a completar el número mínimo de jugadores</p>
                <p>• Una vez iniciada la partida, no se pueden unir más jugadores</p>
                <p>• Los roles se asignarán aleatoriamente al inicio</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
