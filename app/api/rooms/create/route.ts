import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  
  return NextResponse.json({
    id: 'mock-room-' + Math.random().toString(36).substr(2, 5),
    name: body.name || 'Nueva Sala',
    players: 1,
    maxPlayers: body.maxPlayers || 10,
    status: 'waiting',
    hostId: 'mock-user-id'
  });
}
