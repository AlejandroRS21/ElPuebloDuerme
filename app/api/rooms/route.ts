import { NextResponse } from 'next/server';

const MOCK_ROOMS = [
  {
    id: 'room-1',
    name: 'Sala de Principiantes',
    code: 'ROOM1',
    hostId: 'mock-user-1',
    players: [
      { id: '1', username: 'jugador1', isAlive: true, hasVoted: false },
      { id: '2', username: 'jugador2', isAlive: true, hasVoted: false },
      { id: '3', username: 'jugador3', isAlive: true, hasVoted: false },
      { id: '4', username: 'jugador4', isAlive: true, hasVoted: false },
    ],
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
    players: [],
    maxPlayers: 12,
    minPlayers: 6,
    isPrivate: true,
    status: 'IN_GAME',
    createdAt: new Date().toISOString()
  }
];

export async function GET() {
  try {
    return NextResponse.json(MOCK_ROOMS);
  } catch (error) {
    console.error('Error in GET /api/rooms:', error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
