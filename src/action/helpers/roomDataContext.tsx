import { createContext } from "react";
import type { RoomData } from "../types/RoomData";
import { defaultRoomData } from "./roomData";

export const RoomDataContext = createContext<RoomData>(defaultRoomData);
export const SetRoomDataContext = createContext<(roomData: RoomData) => void>(
  () => {},
);
