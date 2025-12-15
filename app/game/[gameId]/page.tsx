'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { CardFlip } from '@/components/game/CardFlip';
import { PlayerStatus } from '@/components/game/PlayerStatus';
import { Modal } from '@/components/ui/modal';
import { useGameStore } from '@/lib/store/gameStore';
import { useAuth } from '@/lib/hooks/useAuth';
import { useSocket } from '@/lib/hooks/useSocket';
import { GamePhase, Role } from '@/types/game';

export default function GamePage() {
  const params = useParams();
  const router = useRouter();
  const gameId = params.gameId as string;
  const { user } = useAuth(true);
  const gameStore = useGameStore();
  const { game, fetchGame } = gameStore;
  const { emit, on, off } = useSocket();
  const [selectedPlayerId, setSelectedPlayerId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState<{ title: string; message: string } | null>(null);

  // Get current player from game
  const currentPlayer = game?.players.find(p => p.id === user?.id) || null;

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

    const handlePhaseChange = (data: any) => {
      if (data.gameId === gameId) {
        setModalContent({
          title: getPhaseTitle(data.phase),
          message: getPhaseMessage(data.phase),
        });
        setShowModal(true);
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
    on('game:phase:change', handlePhaseChange);
    on('game:end', handleGameEnd);

    return () => {
      off('game:update', handleGameUpdate);
      off('game:phase:change', handlePhaseChange);
      off('game:end', handleGameEnd);
    };
  }, [gameId, on, off, fetchGame]);

  const getPhaseTitle = (phase: GamePhase) => {
    switch (phase) {
      case GamePhase.NIGHT:
        return '🌙 Fase de Noche';
      case GamePhase.DAY:
        return '☀️ Fase de Día';
      case GamePhase.VOTING:
        return '🗳️ Fase de Votación';
      case GamePhase.RESULT:
        return '📊 Resultados';
      default:
        return 'Fase del Juego';
    }
  };

  const getPhaseMessage = (phase: GamePhase) => {
    switch (phase) {
      case GamePhase.NIGHT:
        return 'El pueblo duerme. Los roles especiales realizan sus acciones.';
      case GamePhase.DAY:
        return 'El pueblo despierta. Discutan y descubran quién es la mafia.';
      case GamePhase.VOTING:
        return 'Es hora de votar. Elige a quién eliminar del pueblo.';
      case GamePhase.RESULT:
        return 'Se revelan los resultados de la votación.';
      default:
        return '';
    }
  };

  const handleAction = () => {
    if (!selectedPlayerId || !currentPlayer?.role) return;

    const actionType = currentPlayer.role === Role.MAFIA ? 'KILL' :
                       currentPlayer.role === Role.DOCTOR ? 'HEAL' :
                       currentPlayer.role === Role.DETECTIVE ? 'INVESTIGATE' : null;

    if (!actionType) return;

    emit('game:action', {
      gameId,
      type: actionType,
      targetPlayerId: selectedPlayerId,
      actorPlayerId: user?.id,
    });

    setSelectedPlayerId(null);
  };

  const handleVote = () => {
    if (!selectedPlayerId) return;

    emit('game:vote', {
      gameId,
      targetPlayerId: selectedPlayerId,
    });

    setSelectedPlayerId(null);
  };

  const handleLeaveGame = () => {
    router.push('/lobby');
  };

  if (!game || !currentPlayer) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-red-950/20 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-pulse text-4xl mb-4">⏳</div>
          <p className="text-gray-300">Cargando juego...</p>
        </div>
      </div>
    );
  }

  const canPerformAction = 
    game.phase === GamePhase.NIGHT && 
    currentPlayer.role !== Role.VILLAGER && 
    currentPlayer.isAlive &&
    !currentPlayer.hasVoted;

  const canVote = 
    game.phase === GamePhase.VOTING && 
    currentPlayer.isAlive && 
    !currentPlayer.hasVoted;

  const otherPlayers = game.players.filter(p => p.id !== user?.id);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-red-950/20 to-black py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-red-600 mb-1">
              {getPhaseTitle(game.phase)}
            </h1>
            <p className="text-gray-400 text-sm">
              Ronda {game.round} • Tiempo restante: {game.timer}s
            </p>
          </div>
          <Button
            onClick={handleLeaveGame}
            variant="outline"
            className="border-gray-700 text-gray-300 hover:bg-gray-800"
          >
            🚪 Salir
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Your Card */}
          <div className="lg:col-span-1">
            <div className="glass rounded-lg p-6">
              <h2 className="text-xl font-bold text-white mb-4">Tu Rol</h2>
              <div className="h-80">
                <CardFlip role={currentPlayer.role || null} revealed={true} />
              </div>
            </div>

            {/* Status */}
            <div className="glass rounded-lg p-4 mt-6">
              <h3 className="text-lg font-bold text-white mb-3">📊 Estado</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Fase:</span>
                  <span className="text-white font-semibold">
                    {game.phase}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Jugadores vivos:</span>
                  <span className="text-white font-semibold">
                    {game.players.filter(p => p.isAlive).length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Tu estado:</span>
                  <span className={`font-semibold ${currentPlayer.isAlive ? 'text-green-400' : 'text-red-400'}`}>
                    {currentPlayer.isAlive ? 'Vivo' : 'Eliminado'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Players */}
          <div className="lg:col-span-2">
            <div className="glass rounded-lg p-6">
              <h2 className="text-xl font-bold text-white mb-4">
                {canPerformAction ? 'Elige tu objetivo' : canVote ? 'Vota para eliminar' : 'Jugadores'}
              </h2>
              
              <div className="space-y-3 max-h-[600px] overflow-y-auto">
                {otherPlayers.map((player) => (
                  <PlayerStatus
                    key={player.id}
                    player={player}
                    selectable={canPerformAction || canVote}
                    selected={selectedPlayerId === player.id}
                    onSelect={() => setSelectedPlayerId(player.id)}
                  />
                ))}
              </div>

              {/* Action Buttons */}
              {(canPerformAction || canVote) && (
                <div className="mt-6 flex gap-3">
                  <Button
                    onClick={canPerformAction ? handleAction : handleVote}
                    disabled={!selectedPlayerId}
                    className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-gray-700 disabled:text-gray-500"
                  >
                    {canPerformAction ? 'Realizar Acción' : 'Confirmar Voto'}
                  </Button>
                  {selectedPlayerId && (
                    <Button
                      onClick={() => setSelectedPlayerId(null)}
                      variant="outline"
                      className="border-gray-700 text-gray-300 hover:bg-gray-800"
                    >
                      Cancelar
                    </Button>
                  )}
                </div>
              )}

              {!currentPlayer.isAlive && (
                <div className="mt-4 p-4 bg-red-900/30 border border-red-700 rounded-lg text-center">
                  <p className="text-red-300 font-semibold">
                    Has sido eliminado. Puedes seguir observando la partida.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Phase Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={modalContent?.title}
        footer={
          <Button onClick={() => setShowModal(false)} className="w-full bg-red-600 hover:bg-red-700">
            Continuar
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
