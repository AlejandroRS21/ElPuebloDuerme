import { Player } from "./game";

export interface Room {
  id: string;
  name: string;
  code: string;
  hostId: string;
  players: Player[];
  maxPlayers: number;
  minPlayers: number;
  isPrivate: boolean;
  status: RoomStatus;
  createdAt: string;
}

export enum RoomStatus {
  WAITING = "WAITING",
  IN_GAME = "IN_GAME",
  FINISHED = "FINISHED",
}

export interface CreateRoomDto {
  name: string;
  maxPlayers: number;
  minPlayers: number;
  isPrivate: boolean;
}

export interface JoinRoomDto {
  roomId: string;
  code?: string;
}
