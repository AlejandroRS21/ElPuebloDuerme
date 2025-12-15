import { create } from 'zustand';
import { Game, GameAction, GamePhase, Player, Role } from '@/types/game';
import { gameApi } from '@/lib/api/endpoints';

interface GameState {
  game: Game | null;
  currentPlayer: Player | null;
  myRole: Role | null;
  isLoading: boolean;
  error: string | null;
  fetchGame: (gameId: string) => Promise<void>;
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
  currentPlayer: null,
  myRole: null,
  isLoading: false,
  error: null,

  fetchGame: async (gameId: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await gameApi.getGame(gameId);
      if (response.success && response.data) {
        const game = response.data;
        // Try to find current player (this would need user id from auth)
        // For now, we'll set it in the component
        set({ game, isLoading: false });
      } else {
        set({ error: response.error || 'Failed to fetch game', isLoading: false });
      }
    } catch (error) {
      set({ error: 'Failed to fetch game', isLoading: false });
    }
  },

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
      currentPlayer: null,
      myRole: null,
      isLoading: false,
      error: null,
    });
  },
}));
