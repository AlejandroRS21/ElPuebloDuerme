import { create } from 'zustand';
import { Game, GameAction, GamePhase, Player, Role } from '@/types/game';
import { gameApi } from '@/lib/api/endpoints';

interface GameState {
  game: Game | null;
  myRole: Role | null;
  isLoading: boolean;
  error: string | null;
  setGame: (game: Game) => void;
  setMyRole: (role: Role) => void;
  updatePhase: (phase: GamePhase) => void;
  updateTimer: (timer: number) => void;
  updatePlayers: (players: Player[]) => void;
  performAction: (action: GameAction) => Promise<boolean>;
  vote: (targetPlayerId: string) => Promise<boolean>;
  reset: () => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  game: null,
  myRole: null,
  isLoading: false,
  error: null,

  setGame: (game: Game) => {
    set({ game, error: null });
  },

  setMyRole: (role: Role) => {
    set({ myRole: role });
  },

  updatePhase: (phase: GamePhase) => {
    const game = get().game;
    if (game) {
      set({ game: { ...game, phase } });
    }
  },

  updateTimer: (timer: number) => {
    const game = get().game;
    if (game) {
      set({ game: { ...game, timer } });
    }
  },

  updatePlayers: (players: Player[]) => {
    const game = get().game;
    if (game) {
      set({ game: { ...game, players } });
    }
  },

  performAction: async (action: GameAction) => {
    const game = get().game;
    if (!game) return false;

    set({ isLoading: true, error: null });
    try {
      const response = await gameApi.performAction(game.id, action);
      if (response.success) {
        set({ isLoading: false });
        return true;
      } else {
        set({ error: response.error || 'Action failed', isLoading: false });
        return false;
      }
    } catch (error) {
      set({ error: 'Action failed', isLoading: false });
      return false;
    }
  },

  vote: async (targetPlayerId: string) => {
    const game = get().game;
    if (!game) return false;

    set({ isLoading: true, error: null });
    try {
      const response = await gameApi.vote(game.id, targetPlayerId);
      if (response.success) {
        set({ isLoading: false });
        return true;
      } else {
        set({ error: response.error || 'Vote failed', isLoading: false });
        return false;
      }
    } catch (error) {
      set({ error: 'Vote failed', isLoading: false });
      return false;
    }
  },

  reset: () => {
    set({
      game: null,
      myRole: null,
      isLoading: false,
      error: null,
    });
  },
}));
