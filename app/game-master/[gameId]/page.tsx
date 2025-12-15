'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { PlayerStatus } from '@/components/game/PlayerStatus';
import { Modal } from '@/components/ui/modal';
import { useGameStore } from '@/lib/store/gameStore';
import { useSocket } from '@/lib/hooks/useSocket';
import { GamePhase, Role } from '@/types/game';

export default function GameMasterPage() {
  const params = useParams();
  const router = useRouter();
  const gameId = params.gameId as string;
  const { game, fetchGame } = useGameStore();
  const { emit, on, off } = useSocket();
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState<{ title: string; message: string } | null>(null);

  useEffect(() => {
    if (gameId) {
      fetchGame(gameId);
    }
  }, [gameId, fetchGame]);

  useEffect(() => {
    // Listen for game updates
    const handleGameUpdate = (data: any) => {
      if (data.gameId === gameId) {
        fetchGame(gameId);
      }
    };

    const handleGameEnd = (data: any) => {
      if (data.gameId === gameId) {
        setModalContent({
          title: data.winner === 'VILLAGE' ? '🎉 ¡Victoria del Pueblo!' : '💀 Victoria de la Mafia',
          message: data.winner === 'VILLAGE' 
            ? '¡El pueblo ha eliminado a toda la mafia!'
            : '¡La mafia ha tomado el control del pueblo!',
        });
        setShowModal(true);
      }
    };

    on('game:update', handleGameUpdate);
    on('game:end', handleGameEnd);

    return () => {
      off('game:update', handleGameUpdate);
      off('game:end', handleGameEnd);
    };
  }, [gameId, on, off, fetchGame]);

  const handleNextPhase = () => {
    emit('game:next_phase', { gameId });
  };

  const handleEndGame = () => {
    if (confirm('¿Estás seguro de que quieres terminar el juego?')) {
      emit('game:end', { gameId });
      router.push('/lobby');
    }
  };

  const getPhaseDisplay = (phase: GamePhase) => {
    switch (phase) {
      case GamePhase.WAITING:
        return { emoji: '⏳', name: 'Esperando', color: 'text-gray-400' };
      case GamePhase.NIGHT:
        return { emoji: '🌙', name: 'Noche', color: 'text-purple-400' };
      case GamePhase.DAY:
        return { emoji: '☀️', name: 'Día', color: 'text-yellow-400' };
      case GamePhase.VOTING:
        return { emoji: '🗳️', name: 'Votación', color: 'text-orange-400' };
      case GamePhase.RESULT:
        return { emoji: '📊', name: 'Resultado', color: 'text-blue-400' };
      case GamePhase.ENDED:
        return { emoji: '🏁', name: 'Finalizado', color: 'text-red-400' };
      default:
        return { emoji: '❓', name: 'Desconocido', color: 'text-gray-400' };
    }
  };

  const getRoleDisplay = (role: Role) => {
    switch (role) {
      case Role.MAFIA:
        return { emoji: '🔪', name: 'Mafia', color: 'text-red-500' };
      case Role.DOCTOR:
        return { emoji: '💊', name: 'Doctor', color: 'text-green-500' };
      case Role.DETECTIVE:
        return { emoji: '🔍', name: 'Detective', color: 'text-blue-500' };
      case Role.VILLAGER:
        return { emoji: '👤', name: 'Aldeano', color: 'text-gray-400' };
      default:
        return { emoji: '❓', name: 'Sin rol', color: 'text-gray-500' };
    }
  };

  if (!game) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-red-950/20 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-pulse text-4xl mb-4">⏳</div>
          <p className="text-gray-300">Cargando juego...</p>
        </div>
      </div>
    );
  }

  const phaseDisplay = getPhaseDisplay(game.phase);
  const alivePlayers = game.players.filter(p => p.isAlive);
  const deadPlayers = game.players.filter(p => !p.isAlive);
  const mafiaCount = alivePlayers.filter(p => p.role === Role.MAFIA).length;
  const villageCount = alivePlayers.length - mafiaCount;

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-red-950/20 to-black py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-red-600 mb-1">
                🎭 Panel de Narrador
              </h1>
              <p className="text-gray-400">
                Vista completa del juego • Ronda {game.round}
              </p>
            </div>
            <Button
              onClick={handleEndGame}
              variant="outline"
              className="border-red-700 text-red-500 hover:bg-red-900/30"
            >
              🛑 Finalizar Juego
            </Button>
          </div>

          {/* Phase Control */}
          <div className="glass rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="text-5xl">{phaseDisplay.emoji}</div>
                <div>
                  <h2 className={`text-2xl font-bold ${phaseDisplay.color}`}>
                    Fase: {phaseDisplay.name}
                  </h2>
                  <p className="text-gray-400 text-sm">
                    Tiempo restante: {game.timer}s
                  </p>
                </div>
              </div>
              {game.phase !== GamePhase.ENDED && (
                <Button
                  onClick={handleNextPhase}
                  className="bg-red-600 hover:bg-red-700"
                >
                  ⏭️ Siguiente Fase
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Game Stats */}
          <div className="lg:col-span-1 space-y-6">
            {/* Balance */}
            <div className="glass rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-4">⚖️ Balance</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Pueblo:</span>
                  <span className="text-blue-400 font-bold text-xl">{villageCount}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Mafia:</span>
                  <span className="text-red-500 font-bold text-xl">{mafiaCount}</span>
                </div>
                <div className="pt-3 border-t border-gray-700">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Total vivos:</span>
                    <span className="text-white font-bold">{alivePlayers.length}</span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-gray-400">Total muertos:</span>
                    <span className="text-gray-500 font-bold">{deadPlayers.length}</span>
                  </div>
                </div>
              </div>

              {/* Win condition warning */}
              {mafiaCount >= villageCount && (
                <div className="mt-4 p-3 bg-red-900/30 border border-red-700 rounded-lg">
                  <p className="text-red-400 text-sm font-semibold">
                    ⚠️ La mafia está cerca de ganar
                  </p>
                </div>
              )}
            </div>

            {/* Role Distribution */}
            <div className="glass rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-4">📋 Roles</h3>
              <div className="space-y-2">
                {Object.values(Role).map((role) => {
                  const count = game.players.filter(p => p.role === role).length;
                  const roleDisplay = getRoleDisplay(role);
                  return (
                    <div key={role} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{roleDisplay.emoji}</span>
                        <span className={`text-sm ${roleDisplay.color}`}>
                          {roleDisplay.name}
                        </span>
                      </div>
                      <span className="text-white font-semibold">{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Actions Log */}
            <div className="glass rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-4">📝 Registro</h3>
              <div className="space-y-2 text-sm text-gray-400 max-h-48 overflow-y-auto">
                <p>• Juego iniciado</p>
                <p>• Ronda {game.round} en progreso</p>
                {game.votingResults && game.votingResults.length > 0 && (
                  <>
                    <p className="text-yellow-400">• Últimos votos:</p>
                    {game.votingResults.map((result, i) => (
                      <p key={i} className="ml-4">
                        - Jugador {result.playerId}: {result.votes} votos
                      </p>
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Players List */}
          <div className="lg:col-span-2 space-y-6">
            {/* Alive Players */}
            <div className="glass rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-4">
                👥 Jugadores Vivos ({alivePlayers.length})
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {alivePlayers.map((player) => {
                  const roleDisplay = getRoleDisplay(player.role || Role.VILLAGER);
                  return (
                    <div key={player.id} className="bg-black/50 border border-gray-800 rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-600 to-red-900 flex items-center justify-center text-white font-bold">
                          {player.username.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-white">
                            {player.username}
                          </div>
                          <div className={`text-xs ${roleDisplay.color} flex items-center gap-1`}>
                            <span>{roleDisplay.emoji}</span>
                            <span>{roleDisplay.name}</span>
                          </div>
                        </div>
                      </div>
                      {player.hasVoted && (
                        <div className="text-xs text-green-400 flex items-center gap-1">
                          <span>✓</span>
                          <span>Ha votado</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Dead Players */}
            {deadPlayers.length > 0 && (
              <div className="glass rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-400 mb-4">
                  💀 Jugadores Eliminados ({deadPlayers.length})
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {deadPlayers.map((player) => {
                    const roleDisplay = getRoleDisplay(player.role || Role.VILLAGER);
                    return (
                      <div key={player.id} className="bg-red-900/20 border border-red-900 rounded-lg p-4 opacity-60">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-600 to-gray-900 flex items-center justify-center text-white font-bold">
                            {player.username.charAt(0).toUpperCase()}
                          </div>
                          <div className="flex-1">
                            <div className="font-semibold text-gray-400">
                              {player.username}
                            </div>
                            <div className={`text-xs ${roleDisplay.color} flex items-center gap-1`}>
                              <span>{roleDisplay.emoji}</span>
                              <span>{roleDisplay.name}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* End Game Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          router.push('/lobby');
        }}
        title={modalContent?.title}
        footer={
          <Button
            onClick={() => {
              setShowModal(false);
              router.push('/lobby');
            }}
            className="w-full bg-red-600 hover:bg-red-700"
          >
            Volver al Lobby
          </Button>
        }
      >
        <p className="text-gray-300 text-center text-lg">
          {modalContent?.message}
        </p>
      </Modal>
    </div>
  );
}
