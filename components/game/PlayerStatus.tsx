'use client';

import { Player } from '@/types/game';

interface PlayerStatusProps {
  player: Player;
  isCurrentPlayer?: boolean;
  onSelect?: () => void;
  selectable?: boolean;
  selected?: boolean;
}

export function PlayerStatus({
  player,
  isCurrentPlayer = false,
  onSelect,
  selectable = false,
  selected = false,
}: PlayerStatusProps) {
  return (
    <div
      onClick={selectable ? onSelect : undefined}
      className={`relative p-4 rounded-lg border-2 transition-all ${
        isCurrentPlayer
          ? 'bg-blue-900/30 border-blue-600'
          : player.isAlive
          ? 'bg-black/50 border-gray-700'
          : 'bg-red-900/20 border-red-900'
      } ${
        selectable
          ? 'cursor-pointer hover:border-red-500 hover:bg-red-900/20'
          : ''
      } ${selected ? 'border-red-500 bg-red-900/30' : ''}`}
    >
      {/* Dead overlay */}
      {!player.isAlive && (
        <div className="absolute inset-0 bg-black/70 rounded-lg flex items-center justify-center">
          <div className="text-4xl">💀</div>
        </div>
      )}

      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${
          player.isAlive
            ? 'bg-gradient-to-br from-red-600 to-red-900'
            : 'bg-gradient-to-br from-gray-600 to-gray-900'
        }`}>
          {player.username.charAt(0).toUpperCase()}
        </div>

        {/* Player info */}
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className={`font-semibold ${player.isAlive ? 'text-white' : 'text-gray-500'}`}>
              {player.username}
            </span>
            {isCurrentPlayer && (
              <span className="px-2 py-0.5 bg-blue-600 text-blue-100 text-xs rounded-full font-semibold">
                Tú
              </span>
            )}
            {player.hasVoted && (
              <span className="px-2 py-0.5 bg-green-600 text-green-100 text-xs rounded-full font-semibold">
                ✓ Votó
              </span>
            )}
          </div>
          <div className="text-xs text-gray-400 mt-1">
            {player.isAlive ? 'Vivo' : 'Eliminado'}
          </div>
        </div>

        {/* Selection indicator */}
        {selected && (
          <div className="text-2xl animate-pulse">
            🎯
          </div>
        )}
      </div>
    </div>
  );
}
