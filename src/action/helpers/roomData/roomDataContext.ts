import { createContext } from "react";
import { defaultRoomData } from "./defaultRoomData";
import type { RoomData } from "../../types/RoomData";

export const RoomDataContext = createContext<RoomData>(defaultRoomData);
export const SetRoomDataContext = createContext<(roomData: RoomData) => void>(
  () => {},
);
