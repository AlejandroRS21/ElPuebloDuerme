'use client';

import { useEffect } from 'react';
import { useGameStore } from '@/lib/store/gameStore';
import { useSocket } from './useSocket';
import { Game, GamePhase, Player } from '@/types/game';

export function useGame(gameId?: string) {
  const { game, myRole, isLoading, error, setGame, setMyRole, updatePhase, updateTimer, updatePlayers, performAction, vote, reset } = useGameStore();
  const { on, off, emit } = useSocket();

  useEffect(() => {
    if (!gameId) return;

    // Listen for game updates
    const handleGameUpdate = (updatedGame: Game) => {
      setGame(updatedGame);
    };

    const handlePhaseChange = (phase: GamePhase) => {
      updatePhase(phase);
    };

    const handleTimerUpdate = (timer: number) => {
      updateTimer(timer);
    };

    const handlePlayersUpdate = (players: Player[]) => {
      updatePlayers(players);
    };

    const handleRoleAssignment = (role: any) => {
      setMyRole(role);
    };

    on('game:update', handleGameUpdate);
    on('game:phase:change', handlePhaseChange);
    on('game:timer', handleTimerUpdate);
    on('game:players', handlePlayersUpdate);
    on('game:role', handleRoleAssignment);

    // Cleanup
    return () => {
      off('game:update', handleGameUpdate);
      off('game:phase:change', handlePhaseChange);
      off('game:timer', handleTimerUpdate);
      off('game:players', handlePlayersUpdate);
      off('game:role', handleRoleAssignment);
    };
  }, [gameId, on, off, setGame, setMyRole, updatePhase, updateTimer, updatePlayers]);

  return {
    game,
    myRole,
    isLoading,
    error,
    performAction,
    vote,
    reset,
  };
}
