# El Pueblo Duerme

Aplicación web y móvil multijugador del juego de mafia en tiempo real, construida con Next.js 14, Capacitor 6 y Socket.IO.

> **✅ Migración Completa desde Angular/Ionic**  
> Este proyecto ha sido completamente migrado desde el proyecto original [ElPuebloDuerme-TFC](https://github.com/AlejandroRS21/ElPuebloDuerme-TFC) en Angular/Ionic a Next.js 14 con un diseño visual mejorado y funcionalidades completas.

## 📋 Descripción

"El Pueblo Duerme" es una implementación moderna del clásico juego social de mafia/pueblo duerme. Los jugadores asumen diferentes roles y deben trabajar juntos (o en contra) para eliminar a la mafia o sobrevivir como mafiosos.

## 🎨 Características Visuales

- **Tema Oscuro/Horror**: Diseño visual completamente oscuro con acentos rojos
- **Fuentes Temáticas**: 
  - Jolly Lodger para títulos (fuente de terror/misterio)
  - Merriweather para texto (elegante y legible)
- **Animaciones CSS**:
  - Flip 3D para revelación de cartas
  - Melt animation para efectos de eliminación
  - Fade in/out para transiciones suaves
  - Pulse para elementos importantes
- **Glass Morphism**: Efectos de cristal para tarjetas y paneles
- **Diseño Responsive**: Adaptado para móvil, tablet y escritorio

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
│   ├── layout.tsx               # Layout principal con Header/Footer
│   ├── page.tsx                 # Página de inicio/login
│   ├── register/                # Página de registro
│   ├── how-to-play/             # Manual de reglas del juego
│   ├── cards/                   # Galería de roles/cartas
│   ├── contact/                 # Página de contacto
│   ├── lobby/                   # Sistema de salas
│   │   ├── page.tsx            # Lista de salas
│   │   ├── create/             # Crear sala
│   │   ├── join/               # Unirse con código
│   │   └── [roomId]/           # Sala específica (sala de espera)
│   ├── game/                    # Pantalla de juego
│   │   └── [gameId]/           # Vista de jugador
│   └── game-master/            # Panel de narrador
│       └── [gameId]/
├── components/
│   ├── ui/                      # Componentes Shadcn/ui
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   └── modal.tsx           # Modal reutilizable
│   ├── layout/                  # Componentes de layout
│   │   ├── Header.tsx          # Navegación principal
│   │   └── Footer.tsx          # Pie de página
│   ├── game/                    # Componentes del juego
│   │   ├── CardFlip.tsx        # Carta con flip 3D
│   │   └── PlayerStatus.tsx    # Estado de jugador
│   ├── lobby/                   # Componentes del lobby
│   │   ├── RoomCard.tsx        # Tarjeta de sala
│   │   ├── RoomList.tsx        # Lista de salas
│   │   ├── RoomCode.tsx        # Código de sala con copiar
│   │   ├── PlayerList.tsx      # Lista de jugadores con expulsar
│   │   └── BotControls.tsx     # Controles de bots
│   ├── contact/                 # Componentes de contacto
│   │   └── ContactForm.tsx     # Formulario de contacto
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
│   └── assets/
│       ├── backgrounds/        # Imágenes de fondo
│       ├── cards/              # Imágenes de cartas
│       ├── icons/              # Iconos
│       └── roles/              # Imágenes de roles
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

### Páginas Principales

1. **Inicio**: Página de login/registro
2. **Cómo Jugar**: Manual completo con reglas, roles y estrategias
3. **Cartas**: Galería interactiva de todos los roles con descripciones detalladas
4. **Contacto**: Formulario de contacto y preguntas frecuentes
5. **Lobby**: Lista de salas disponibles
6. **Crear Sala**: Configura tu propia sala de juego
7. **Unirse con Código**: Únete a una sala privada con código
8. **Sala de Espera**: Espera a que el host inicie la partida
9. **Juego**: Vista de jugador con tu rol y acciones
10. **Panel de Narrador**: Vista completa del juego con todos los roles visibles

### Roles Disponibles

- **🔪 Mafia**: Elimina jugadores durante la noche
- **💊 Doctor**: Protege a un jugador cada noche
- **🔍 Detective**: Investiga la identidad de un jugador
- **👤 Aldeano**: Vota durante el día para eliminar sospechosos

### Fases del Juego

1. **🌙 Noche**: Los roles especiales realizan sus acciones
2. **☀️ Día**: Todos discuten y comparten información
3. **🗳️ Votación**: Se vota para eliminar a un jugador
4. **📊 Resultado**: Se revelan las consecuencias

### Características del Sistema de Salas

- **Salas Públicas**: Visibles para todos los jugadores
- **Salas Privadas**: Requieren código de 8 caracteres
- **Control de Host**: El creador de la sala puede:
  - Expulsar jugadores
  - Añadir/eliminar bots
  - Iniciar la partida
- **Rango de Jugadores**: 4-15 jugadores
- **Bots**: Sistema de bots para completar el número mínimo

## 🔗 Integración con Backend

El backend NestJS se encuentra en: `AlejandroRS21/backend-ElPuebloDuerrmeTFC`

### Endpoints Principales

- `POST /auth/login` - Iniciar sesión
- `POST /auth/register` - Registrarse
- `GET /auth/profile` - Obtener perfil
- `POST /rooms/create` - Crear sala
- `GET /rooms` - Listar salas
- `GET /rooms/:id` - Obtener sala específica
- `POST /rooms/join` - Unirse a sala
- `POST /rooms/:id/leave` - Salir de sala
- `GET /games/:id` - Obtener juego
- `POST /games/start` - Iniciar juego
- `POST /games/:id/action` - Realizar acción de rol
- `POST /games/:id/vote` - Votar

### WebSocket Events

**Eventos de Sala:**
- `room:join` / `room:leave` - Gestión de entrada/salida
- `room:update` - Actualización de sala
- `room:kicked` - Jugador expulsado
- `room:add_bot` / `room:remove_bot` - Gestión de bots

**Eventos de Juego:**
- `game:start` - Iniciar juego
- `game:phase:change` - Cambio de fase
- `game:update` - Actualización del estado
- `game:vote` - Registro de voto
- `game:action` - Acción de rol
- `game:end` - Fin del juego
- `game:next_phase` - Avanzar a siguiente fase (narrador)

## 📝 Notas sobre la Migración

### Cambios Principales desde Angular/Ionic

1. **Framework**: Angular → Next.js 14 con App Router
2. **Estilos**: Ionic CSS → Tailwind CSS v4 + CSS personalizado
3. **Estado**: RxJS → Zustand
4. **Enrutamiento**: Angular Router → Next.js App Router
5. **Componentes UI**: Ionic Components → Shadcn/ui

### Mejoras Implementadas

- ✅ Diseño visual completamente renovado con tema oscuro/horror
- ✅ Navegación mejorada con Header/Footer persistentes
- ✅ Sistema de animaciones CSS (flip 3D, melt, fade)
- ✅ Componentes reutilizables mejor organizados
- ✅ Tipado TypeScript más estricto
- ✅ Mejores prácticas de React (hooks, composición)
- ✅ Optimización de rendimiento con Next.js
- ✅ Sistema de WebSockets más robusto
- ✅ Gestión de estado simplificada con Zustand

### Assets Pendientes

Los siguientes assets deben reemplazarse con los originales del proyecto Angular:

- `public/assets/backgrounds/pueblo1.png` - Fondo principal del pueblo
- `public/assets/cards/*.png` - Imágenes de las cartas de roles
- `public/assets/icons/*.png` - Iconos personalizados

**Nota**: Los README en las carpetas de assets indican las especificaciones necesarias.

## 🤝 Contribución

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

### Guía de Desarrollo

**Estructura de Componentes:**
- Componentes de UI genéricos en `components/ui/`
- Componentes específicos de juego en `components/game/`
- Componentes de lobby en `components/lobby/`
- Componentes de layout en `components/layout/`

**Estilos:**
- Usa Tailwind CSS para estilos base
- Clases CSS personalizadas en `app/globals.css`
- Animaciones definidas con `@keyframes`
- Tema oscuro por defecto

**Estado:**
- Auth: `useAuth()` hook + `authStore`
- Lobby: `useLobbyStore()` para salas
- Game: `useGameStore()` para partidas
- WebSocket: `useSocket()` para eventos en tiempo real

**Tipos:**
- Define tipos en archivos separados en `types/`
- Usa interfaces para objetos complejos
- Usa enums para valores fijos (Role, GamePhase, RoomStatus)

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👥 Autor

- **AlejandroRS21** - [GitHub](https://github.com/AlejandroRS21)

## 🙏 Agradecimientos

- Comunidad de Next.js
- Shadcn/ui por los componentes
- Capacitor por el soporte móvil
