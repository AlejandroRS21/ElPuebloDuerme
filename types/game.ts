export interface Player {
  id: string;
  username: string;
  avatar?: string;
  isAlive: boolean;
  role?: Role;
  hasVoted?: boolean;
}

export enum Role {
  MAFIA = "MAFIA",
  DOCTOR = "DOCTOR",
  DETECTIVE = "DETECTIVE",
  VILLAGER = "VILLAGER",
}

export interface Game {
  id: string;
  roomId: string;
  players: Player[];
  phase: GamePhase;
  round: number;
  timer: number;
  winner?: "MAFIA" | "VILLAGE";
  votingResults?: VotingResult[];
}

export enum GamePhase {
  WAITING = "WAITING",
  NIGHT = "NIGHT",
  DAY = "DAY",
  VOTING = "VOTING",
  RESULT = "RESULT",
  ENDED = "ENDED",
}

export interface VotingResult {
  playerId: string;
  votes: number;
}

export interface GameAction {
  type: "VOTE" | "KILL" | "HEAL" | "INVESTIGATE";
  targetPlayerId: string;
  actorPlayerId: string;
}
