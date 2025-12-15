'use client';

import { Player } from '@/types/game';
import { Button } from '@/components/ui/button';

interface PlayerListProps {
  players: Player[];
  hostId: string;
  currentUserId?: string;
  onKickPlayer?: (playerId: string) => void;
  showKickButton?: boolean;
}

export function PlayerList({
  players,
  hostId,
  currentUserId,
  onKickPlayer,
  showKickButton = false,
}: PlayerListProps) {
  const isHost = currentUserId === hostId;

  return (
    <div className="space-y-2">
      {players.map((player) => {
        const isCurrentPlayer = player.id === currentUserId;
        const isPlayerHost = player.id === hostId;
        const canKick = isHost && showKickButton && !isPlayerHost && !isCurrentPlayer;

        return (
          <div
            key={player.id}
            className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
              isCurrentPlayer
                ? 'bg-red-900/30 border border-red-700'
                : 'bg-black/50 border border-gray-800'
            }`}
          >
            <div className="flex items-center gap-3">
              {/* Avatar placeholder */}
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-600 to-red-900 flex items-center justify-center text-white font-bold">
                {player.username.charAt(0).toUpperCase()}
              </div>

              {/* Player info */}
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-white">
                    {player.username}
                  </span>
                  {isPlayerHost && (
                    <span className="px-2 py-0.5 bg-yellow-600 text-yellow-100 text-xs rounded-full font-semibold">
                      Host
                    </span>
                  )}
                  {isCurrentPlayer && (
                    <span className="px-2 py-0.5 bg-blue-600 text-blue-100 text-xs rounded-full font-semibold">
                      Tú
                    </span>
                  )}
                </div>
                {!player.isAlive && (
                  <span className="text-xs text-gray-500">Eliminado</span>
                )}
              </div>
            </div>

            {/* Kick button */}
            {canKick && onKickPlayer && (
              <Button
                onClick={() => onKickPlayer(player.id)}
                size="sm"
                variant="outline"
                className="border-red-700 text-red-500 hover:bg-red-900/30"
              >
                ❌ Expulsar
              </Button>
            )}
          </div>
        );
      })}

      {players.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No hay jugadores en la sala
        </div>
      )}
    </div>
  );
}
