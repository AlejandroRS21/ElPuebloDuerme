'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface BotControlsProps {
  onAddBot: () => void;
  onRemoveBot: () => void;
  currentBotCount: number;
  maxPlayers: number;
  currentPlayerCount: number;
  disabled?: boolean;
}

export function BotControls({
  onAddBot,
  onRemoveBot,
  currentBotCount,
  maxPlayers,
  currentPlayerCount,
  disabled = false,
}: BotControlsProps) {
  const [isAddingBot, setIsAddingBot] = useState(false);
  const [isRemovingBot, setIsRemovingBot] = useState(false);

  const canAddBot = currentPlayerCount < maxPlayers && !disabled;
  const canRemoveBot = currentBotCount > 0 && !disabled;

  const handleAddBot = async () => {
    setIsAddingBot(true);
    try {
      await onAddBot();
    } finally {
      setIsAddingBot(false);
    }
  };

  const handleRemoveBot = async () => {
    setIsRemovingBot(true);
    try {
      await onRemoveBot();
    } finally {
      setIsRemovingBot(false);
    }
  };

  return (
    <div className="glass rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-lg font-bold text-white">🤖 Bots</h3>
          <p className="text-xs text-gray-400">
            Bots actuales: {currentBotCount} | Total jugadores: {currentPlayerCount}/{maxPlayers}
          </p>
        </div>
      </div>

      <div className="flex gap-2">
        <Button
          onClick={handleAddBot}
          disabled={!canAddBot || isAddingBot}
          size="sm"
          className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-700 disabled:text-gray-500"
        >
          {isAddingBot ? 'Añadiendo...' : '➕ Añadir Bot'}
        </Button>
        <Button
          onClick={handleRemoveBot}
          disabled={!canRemoveBot || isRemovingBot}
          size="sm"
          variant="outline"
          className="flex-1 border-red-700 text-red-500 hover:bg-red-900/30 disabled:border-gray-700 disabled:text-gray-500"
        >
          {isRemovingBot ? 'Eliminando...' : '➖ Eliminar Bot'}
        </Button>
      </div>

      {!canAddBot && currentPlayerCount >= maxPlayers && (
        <p className="text-xs text-yellow-500 mt-2">
          La sala está llena. No se pueden añadir más bots.
        </p>
      )}
    </div>
  );
}
