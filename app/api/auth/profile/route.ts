import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    id: 'mock-user-id',
    username: 'Usuario Mock',
    email: 'mock@example.com'
  });
}
