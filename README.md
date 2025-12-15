# El Pueblo Duerme

Aplicación web y móvil multijugador del juego de mafia en tiempo real, construida con Next.js 14, Capacitor 6 y Socket.IO.

## 📋 Descripción

"El Pueblo Duerme" es una implementación moderna del clásico juego social de mafia/pueblo duerme. Los jugadores asumen diferentes roles y deben trabajar juntos (o en contra) para eliminar a la mafia o sobrevivir como mafiosos.

## 🚀 Tecnologías

### Frontend
- **Next.js 14+** con App Router
- **TypeScript** con configuración estricta
- **Tailwind CSS v4** para estilos
- **Shadcn/ui** para componentes UI
- **Zustand** para gestión de estado
- **Socket.IO Client** para WebSockets en tiempo real
- **React Hook Form + Zod** para formularios y validación
- **Axios** para llamadas HTTP

### Mobile
- **Capacitor 6** para iOS/Android
- Plugins: app, haptics, push-notifications, local-notifications, preferences, splash-screen, status-bar

## 📁 Estructura del Proyecto

```
/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Layout principal
│   ├── page.tsx                 # Página de inicio/login
│   ├── register/                # Página de registro
│   ├── lobby/                   # Sistema de salas
│   │   ├── page.tsx            # Lista de salas
│   │   ├── create/             # Crear sala
│   │   └── [roomId]/           # Sala específica
│   └── game/                    # Pantalla de juego
│       └── [gameId]/
├── components/
│   ├── ui/                      # Componentes Shadcn/ui
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   └── input.tsx
│   ├── game/                    # Componentes del juego
│   ├── lobby/                   # Componentes del lobby
│   │   ├── RoomCard.tsx
│   │   └── RoomList.tsx
│   └── auth/                    # Componentes de autenticación
│       ├── LoginForm.tsx
│       └── RegisterForm.tsx
├── lib/
│   ├── api/                     # Cliente API
│   │   ├── client.ts           # Cliente HTTP con interceptors
│   │   └── endpoints.ts        # Definición de endpoints
│   ├── socket/                  # WebSocket manager
│   │   └── socket.ts
│   ├── store/                   # Zustand stores
│   │   ├── authStore.ts        # Estado de autenticación
│   │   ├── gameStore.ts        # Estado del juego
│   │   └── lobbyStore.ts       # Estado del lobby
│   ├── hooks/                   # Custom hooks
│   │   ├── useAuth.ts
│   │   ├── useSocket.ts
│   │   └── useGame.ts
│   └── utils/                   # Utilidades
│       ├── cn.ts               # Merge de clases Tailwind
│       └── validators.ts       # Esquemas Zod
├── types/                       # Definiciones de tipos TypeScript
│   ├── game.ts
│   ├── room.ts
│   ├── auth.ts
│   └── api.ts
├── public/                      # Assets estáticos
│   ├── icons/
│   └── splash/
├── capacitor.config.ts          # Configuración de Capacitor
├── next.config.ts               # Configuración de Next.js
└── package.json
```

## 🛠️ Instalación

### Requisitos Previos

- Node.js 20+ y npm
- Git

### Pasos

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/AlejandroRS21/ElPuebloDuerme.git
   cd ElPuebloDuerme
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   
   Copia el archivo de ejemplo y actualiza las variables:
   ```bash
   cp .env.local.example .env.local
   ```
   
   Variables disponibles:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3000
   NEXT_PUBLIC_SOCKET_URL=http://localhost:3000
   NEXT_PUBLIC_APP_NAME=El Pueblo Duerme
   ```

4. **Ejecutar en desarrollo**
   ```bash
   npm run dev
   ```
   
   Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📱 Configuración para Móvil

### Android

1. **Requisitos**
   - Android Studio
   - JDK 11+

2. **Agregar plataforma Android**
   ```bash
   npm run cap:add android
   ```

3. **Sincronizar y abrir Android Studio**
   ```bash
   npm run android
   ```

### iOS

1. **Requisitos**
   - macOS
   - Xcode 14+

2. **Agregar plataforma iOS**
   ```bash
   npm run cap:add ios
   ```

3. **Sincronizar y abrir Xcode**
   ```bash
   npm run ios
   ```

## 📜 Scripts Disponibles

- `npm run dev` - Ejecuta el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run start` - Inicia el servidor de producción
- `npm run lint` - Ejecuta el linter
- `npm run cap:sync` - Sincroniza los cambios web con las plataformas móviles
- `npm run cap:open:android` - Abre el proyecto Android en Android Studio
- `npm run cap:open:ios` - Abre el proyecto iOS en Xcode
- `npm run android` - Build + sync + abre Android Studio
- `npm run ios` - Build + sync + abre Xcode

## 🎮 Cómo Jugar

### Roles Disponibles

- **Mafia**: Elimina jugadores durante la noche
- **Doctor**: Protege a un jugador cada noche
- **Detective**: Investiga la identidad de un jugador
- **Villager**: Vota durante el día para eliminar sospechosos

### Fases del Juego

1. **Noche**: Los roles especiales realizan sus acciones
2. **Día**: Todos discuten y votan
3. **Votación**: Se elimina al jugador con más votos
4. **Resultado**: Se revelan las consecuencias

## 🔗 Integración con Backend

El backend NestJS se encuentra en: `AlejandroRS21/backend-ElPuebloDuerrmeTFC`

### Endpoints Principales

- `POST /auth/login` - Iniciar sesión
- `POST /auth/register` - Registrarse
- `GET /auth/profile` - Obtener perfil
- `POST /rooms/create` - Crear sala
- `GET /rooms` - Listar salas
- `POST /rooms/join` - Unirse a sala
- `GET /games/:id` - Obtener juego

### WebSocket Events

- `room:join` / `room:leave` - Gestión de salas
- `game:start` - Iniciar juego
- `game:phase:change` - Cambio de fase
- `game:vote` - Votar
- `game:action` - Acciones de roles
- `chat:message` - Mensajes del chat

## 🤝 Contribución

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👥 Autor

- **AlejandroRS21** - [GitHub](https://github.com/AlejandroRS21)

## 🙏 Agradecimientos

- Comunidad de Next.js
- Shadcn/ui por los componentes
- Capacitor por el soporte móvil
