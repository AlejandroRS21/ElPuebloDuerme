'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Role } from '@/types/game';

interface CardData {
  role: Role;
  name: string;
  description: string;
  ability: string;
  team: 'Pueblo' | 'Mafia';
  color: string;
  borderColor: string;
  icon: string;
  image: string;
}

const cards: CardData[] = [
  {
    role: Role.MAFIA,
    name: 'Mafia',
    description: 'Miembro de la organización criminal que opera en las sombras.',
    ability: 'Elimina a un jugador cada noche trabajando con otros miembros de la mafia.',
    team: 'Mafia',
    color: 'bg-gradient-to-br from-red-900 to-red-950',
    borderColor: 'border-red-700',
    icon: '🔪',
    image: '/assets/cards/mafia.png'
  },
  {
    role: Role.DOCTOR,
    name: 'Doctor',
    description: 'El médico del pueblo, dedicado a salvar vidas.',
    ability: 'Protege a un jugador cada noche (incluido él mismo) de ser eliminado.',
    team: 'Pueblo',
    color: 'bg-gradient-to-br from-green-900 to-green-950',
    borderColor: 'border-green-700',
    icon: '💊',
    image: '/assets/cards/doctor.png'
  },
  {
    role: Role.DETECTIVE,
    name: 'Detective',
    description: 'Investigador experto en descubrir la verdad.',
    ability: 'Investiga a un jugador cada noche para saber si es miembro de la mafia.',
    team: 'Pueblo',
    color: 'bg-gradient-to-br from-blue-900 to-blue-950',
    borderColor: 'border-blue-700',
    icon: '🔍',
    image: '/assets/cards/detective.png'
  },
  {
    role: Role.VILLAGER,
    name: 'Aldeano',
    description: 'Ciudadano común del pueblo que lucha por la justicia.',
    ability: 'Participa en las discusiones y votaciones para eliminar sospechosos.',
    team: 'Pueblo',
    color: 'bg-gradient-to-br from-gray-800 to-gray-900',
    borderColor: 'border-gray-700',
    icon: '👤',
    image: '/assets/cards/villager.png'
  },
];

export default function CardsPage() {
  const [selectedCard, setSelectedCard] = useState<CardData | null>(null);
  const [filter, setFilter] = useState<'Todos' | 'Pueblo' | 'Mafia'>('Todos');

  const filteredCards = cards.filter((card) => {
    if (filter === 'Todos') return true;
    return card.team === filter;
  });

  return (
    <div className="min-h-screen bg-black/70 backdrop-blur-sm py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-red-600 text-center mb-4">
          Galería de Cartas
        </h1>
        <p className="text-center text-gray-300 mb-8">
          Conoce todos los roles disponibles en El Pueblo Duerme
        </p>

        {/* Filter Buttons */}
        <div className="flex justify-center gap-4 mb-8">
          {(['Todos', 'Pueblo', 'Mafia'] as const).map((filterOption) => (
            <button
              key={filterOption}
              onClick={() => setFilter(filterOption)}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                filter === filterOption
                  ? 'bg-red-600 text-white scale-105'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {filterOption}
            </button>
          ))}
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {filteredCards.map((card) => (
            <div
              key={card.role}
              className={`${card.color} ${card.borderColor} border-2 rounded-lg p-6 cursor-pointer transform transition-all hover:scale-105 hover:shadow-2xl flex flex-col items-center`}
              onClick={() => setSelectedCard(card)}
            >
              <div className="text-center mb-4 flex flex-col items-center w-full">
                <div className="relative w-32 h-44 mb-4">
                  <Image
                    src={card.image}
                    alt={card.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">{card.name}</h3>
                <span className="text-sm text-gray-300">{card.team}</span>
              </div>
              <p className="text-sm text-gray-200 text-center">
                {card.description}
              </p>
            </div>
          ))}
        </div>

        {/* Selected Card Details */}
        {selectedCard && (
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedCard(null)}
          >
            <div
              className={`${selectedCard.color} ${selectedCard.borderColor} border-4 rounded-xl p-8 max-w-2xl w-full transform transition-all`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-6">
                <div className="text-8xl mb-4">{selectedCard.icon}</div>
                <h2 className="text-4xl font-bold text-white mb-2">{selectedCard.name}</h2>
                <span className="inline-block px-4 py-1 bg-black/50 rounded-full text-sm text-gray-200">
                  Equipo: {selectedCard.team}
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Descripción</h3>
                  <p className="text-gray-200">{selectedCard.description}</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Habilidad</h3>
                  <p className="text-gray-200">{selectedCard.ability}</p>
                </div>

                <div className="bg-black/30 rounded-lg p-4">
                  <h3 className="text-lg font-bold text-white mb-2">Estrategia</h3>
                  <p className="text-sm text-gray-300">
                    {selectedCard.role === Role.MAFIA && 
                      'Trabaja en secreto con tus compañeros de mafia. Vota estratégicamente durante el día para evitar sospechas.'}
                    {selectedCard.role === Role.DOCTOR && 
                      'Protege a los jugadores clave sin hacer obvio tu patrón. Considera protegerte a ti mismo cuando seas sospechoso.'}
                    {selectedCard.role === Role.DETECTIVE && 
                      'Investiga a los jugadores más sospechosos. Comparte tu información estratégicamente para no convertirte en objetivo.'}
                    {selectedCard.role === Role.VILLAGER && 
                      'Observa cuidadosamente el comportamiento de otros jugadores. Tu voto es crucial para eliminar a la mafia.'}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedCard(null)}
                className="mt-6 w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-colors"
              >
                Cerrar
              </button>
            </div>
          </div>
        )}

        {/* Additional Info */}
        <div className="glass rounded-lg p-6 mt-8">
          <h2 className="text-2xl font-bold text-red-500 mb-4">Información Adicional</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-bold text-white mb-2">Balance del Juego</h3>
              <p className="text-sm text-gray-300">
                El número de cada rol se ajusta automáticamente según la cantidad de jugadores en la partida 
                para mantener el juego equilibrado y emocionante.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-2">Roles Secretos</h3>
              <p className="text-sm text-gray-300">
                Tu rol es asignado aleatoriamente al inicio del juego y permanece secreto. Solo tú conoces 
                tu rol, excepto la mafia que conoce a sus compañeros.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
