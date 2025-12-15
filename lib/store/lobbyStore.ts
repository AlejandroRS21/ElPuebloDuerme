import { create } from 'zustand';
import { Room, CreateRoomDto, JoinRoomDto } from '@/types/room';
import { roomApi } from '@/lib/api/endpoints';

interface LobbyState {
  rooms: Room[];
  currentRoom: Room | null;
  isLoading: boolean;
  error: string | null;
  fetchRooms: () => Promise<void>;
  createRoom: (data: CreateRoomDto) => Promise<Room | null>;
  joinRoom: (data: JoinRoomDto) => Promise<Room | null>;
  leaveRoom: () => Promise<boolean>;
  setCurrentRoom: (room: Room | null) => void;
  updateRoom: (room: Room) => void;
  clearError: () => void;
}

export const useLobbyStore = create<LobbyState>((set, get) => ({
  rooms: [],
  currentRoom: null,
  isLoading: false,
  error: null,

  fetchRooms: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await roomApi.getRooms();
      if (response.success && response.data) {
        set({ rooms: response.data, isLoading: false });
      } else {
        set({ error: response.error || 'Failed to fetch rooms', isLoading: false });
      }
    } catch (error) {
      set({ error: 'Failed to fetch rooms', isLoading: false });
    }
  },

  createRoom: async (data: CreateRoomDto) => {
    set({ isLoading: true, error: null });
    try {
      const response = await roomApi.createRoom(data);
      if (response.success && response.data) {
        set({
          currentRoom: response.data,
          isLoading: false,
        });
        return response.data;
      } else {
        set({ error: response.error || 'Failed to create room', isLoading: false });
        return null;
      }
    } catch (error) {
      set({ error: 'Failed to create room', isLoading: false });
      return null;
    }
  },

  joinRoom: async (data: JoinRoomDto) => {
    set({ isLoading: true, error: null });
    try {
      const response = await roomApi.joinRoom(data);
      if (response.success && response.data) {
        set({
          currentRoom: response.data,
          isLoading: false,
        });
        return response.data;
      } else {
        set({ error: response.error || 'Failed to join room', isLoading: false });
        return null;
      }
    } catch (error) {
      set({ error: 'Failed to join room', isLoading: false });
      return null;
    }
  },

  leaveRoom: async () => {
    const currentRoom = get().currentRoom;
    if (!currentRoom) return false;

    set({ isLoading: true, error: null });
    try {
      const response = await roomApi.leaveRoom(currentRoom.id);
      if (response.success) {
        set({
          currentRoom: null,
          isLoading: false,
        });
        return true;
      } else {
        set({ error: response.error || 'Failed to leave room', isLoading: false });
        return false;
      }
    } catch (error) {
      set({ error: 'Failed to leave room', isLoading: false });
      return false;
    }
  },

  setCurrentRoom: (room: Room | null) => {
    set({ currentRoom: room });
  },

  updateRoom: (room: Room) => {
    set({ currentRoom: room });
  },

  clearError: () => set({ error: null }),
}));
