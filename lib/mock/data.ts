// import { RoomStatus } from '@/types/room';

export const MOCK_USERS = Array.from({ length: 10 }, (_, i) => ({
  id: `mock-user-${i + 1}`,
  username: `jugador${i + 1}`,
  email: `jugador${i + 1}@ejemplo.com`,
  password: 'password123',
  avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=jugador${i + 1}`,
  isAlive: true
}));

export const MOCK_ROOMS = [
  {
    id: 'room-1',
    name: 'Sala de Principiantes',
    code: 'ROOM1',
    hostId: 'mock-user-1',
    players: MOCK_USERS.slice(0, 4).map(u => ({
      id: u.id,
      username: u.username,
      avatar: u.avatar,
      isAlive: true,
      hasVoted: false
    })),
    maxPlayers: 10,
    minPlayers: 4,
    isPrivate: false,
    status: 'WAITING',
    createdAt: new Date().toISOString()
  },
  {
    id: 'room-2',
    name: 'Expertos',
    code: 'ROOM2',
    hostId: 'mock-user-2',
    players: MOCK_USERS.slice(4, 8).map(u => ({
      id: u.id,
      username: u.username,
      avatar: u.avatar,
      isAlive: true,
      hasVoted: false
    })),
    maxPlayers: 12,
    minPlayers: 6,
    isPrivate: true,
    status: 'IN_GAME',
    createdAt: new Date().toISOString()
  }
];
