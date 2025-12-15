import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  
  await new Promise(resolve => setTimeout(resolve, 500));

  return NextResponse.json({
    accessToken: 'mock-access-token-' + Math.random().toString(36),
    refreshToken: 'mock-refresh-token',
    user: {
      id: 'mock-user-id-' + Math.random().toString(36),
      username: body.username,
      email: body.email
    }
  });
}
