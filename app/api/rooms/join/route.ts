import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  
  return NextResponse.json({
    id: body.roomId,
    name: 'Sala Unida',
    players: 4,
    maxPlayers: 10,
    status: 'waiting',
    hostId: 'host-1'
  });
}
