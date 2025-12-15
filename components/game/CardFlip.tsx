'use client';

import { useState } from 'react';
import { Role } from '@/types/game';

interface CardFlipProps {
  role: Role | null;
  revealed?: boolean;
  onFlip?: () => void;
  className?: string;
}

const roleData = {
  [Role.MAFIA]: {
    name: 'Mafia',
    icon: '🔪',
    color: 'from-red-900 to-red-950',
    description: 'Eliminas a un jugador cada noche',
  },
  [Role.DOCTOR]: {
    name: 'Doctor',
    icon: '💊',
    color: 'from-green-900 to-green-950',
    description: 'Proteges a un jugador cada noche',
  },
  [Role.DETECTIVE]: {
    name: 'Detective',
    icon: '🔍',
    color: 'from-blue-900 to-blue-950',
    description: 'Investigas a un jugador cada noche',
  },
  [Role.VILLAGER]: {
    name: 'Aldeano',
    icon: '👤',
    color: 'from-gray-800 to-gray-900',
    description: 'Votas durante el día',
  },
};

export function CardFlip({ role, revealed = false, onFlip, className = '' }: CardFlipProps) {
  const [isFlipped, setIsFlipped] = useState(revealed);

  const handleClick = () => {
    if (onFlip) {
      onFlip();
    } else {
      setIsFlipped(!isFlipped);
    }
  };

  const cardData = role ? roleData[role] : null;

  return (
    <div className={`flip-card ${isFlipped ? 'flipped' : ''} ${className}`} onClick={handleClick}>
      <div className="flip-card-inner">
        {/* Front of card (hidden) */}
        <div className="flip-card-front">
          <div className="w-full h-full bg-gradient-to-br from-gray-900 to-black border-4 border-red-900 rounded-xl flex flex-col items-center justify-center p-6 cursor-pointer hover:border-red-700 transition-colors">
            <div className="text-6xl mb-4">❓</div>
            <h3 className="text-xl font-bold text-red-500">Tu Rol</h3>
            <p className="text-sm text-gray-400 mt-2 text-center">
              Haz clic para revelar
            </p>
          </div>
        </div>

        {/* Back of card (revealed role) */}
        <div className="flip-card-back">
          {cardData ? (
            <div className={`w-full h-full bg-gradient-to-br ${cardData.color} border-4 border-red-900 rounded-xl flex flex-col items-center justify-center p-6`}>
              <div className="text-8xl mb-4">{cardData.icon}</div>
              <h3 className="text-3xl font-bold text-white mb-2">{cardData.name}</h3>
              <p className="text-sm text-gray-200 text-center">
                {cardData.description}
              </p>
              <div className="mt-6 px-4 py-2 bg-black/30 rounded-lg">
                <p className="text-xs text-gray-300 text-center">
                  Mantén tu rol en secreto
                </p>
              </div>
            </div>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-900 to-black border-4 border-gray-700 rounded-xl flex items-center justify-center p-6">
              <p className="text-gray-500">Sin rol asignado</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
