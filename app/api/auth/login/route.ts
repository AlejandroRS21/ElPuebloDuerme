import { NextResponse } from 'next/server';
import { MOCK_USERS } from '@/lib/mock/data';

export async function POST(request: Request) {
  const body = await request.json();
  
  await new Promise(resolve => setTimeout(resolve, 500));

  // Buscar usuario en los datos mock
  const user = MOCK_USERS.find(u => u.username === body.username || u.email === body.email);

  // Permitir login si el usuario existe (cualquier password por ahora para facilitar tests)
  // O permitir si es un usuario nuevo (simulado)
  if (!user && body.username !== 'error') {
     // Si no existe, simulamos login exitoso como si fuera "cualquiera" para no bloquear
     // pero preferimos los mock users
  }

  if (body.username === 'error') {
    return NextResponse.json(
      { message: 'Credenciales inválidas' },
      { status: 401 }
    );
  }

  const userData = user || {
      id: 'mock-user-id-' + Math.random().toString(36),
      username: body.username || 'Usuario Mock',
      email: 'mock@example.com'
  };

  return NextResponse.json({
    accessToken: 'mock-access-token-' + Math.random().toString(36),
    refreshToken: 'mock-refresh-token',
    user: {
      id: userData.id,
      username: userData.username,
      email: userData.email
    }
  });
}
