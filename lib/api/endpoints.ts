import { apiClient } from './client';
import { AuthCredentials, AuthResponse, RegisterDto } from '@/types/auth';
import { CreateRoomDto, JoinRoomDto, Room } from '@/types/room';
import { Game } from '@/types/game';

export const authApi = {
  login: (credentials: AuthCredentials) =>
    apiClient.post<AuthResponse>('/auth/login', credentials),
  
  register: (data: RegisterDto) =>
    apiClient.post<AuthResponse>('/auth/register', data),
  
  getProfile: () =>
    apiClient.get('/auth/profile'),
  
  refreshToken: (refreshToken: string) =>
    apiClient.post<AuthResponse>('/auth/refresh', { refreshToken }),
};

export const roomApi = {
  getRooms: () =>
    apiClient.get<Room[]>('/rooms'),
  
  getRoom: (roomId: string) =>
    apiClient.get<Room>(`/rooms/${roomId}`),
  
  createRoom: (data: CreateRoomDto) =>
    apiClient.post<Room>('/rooms/create', data),
  
  joinRoom: (data: JoinRoomDto) =>
    apiClient.post<Room>('/rooms/join', data),
  
  leaveRoom: (roomId: string) =>
    apiClient.post(`/rooms/${roomId}/leave`),
};

export const gameApi = {
  getGame: (gameId: string) =>
    apiClient.get<Game>(`/games/${gameId}`),
  
  startGame: (roomId: string) =>
    apiClient.post<Game>(`/games/start`, { roomId }),
  
  performAction: (gameId: string, action: any) =>
    apiClient.post(`/games/${gameId}/action`, action),
  
  vote: (gameId: string, targetPlayerId: string) =>
    apiClient.post(`/games/${gameId}/vote`, { targetPlayerId }),
};
