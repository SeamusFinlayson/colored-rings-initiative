import { getPluginId } from "../../getPluginId";
import { PartialRoomDataZod, type RoomData } from "../types/RoomData";
import { defaultRoomData } from "./roomData";
import { RoomDataContext, SetRoomDataContext } from "./roomDataContext";
import { useRoomMetadata } from "./useRoomMetadata";

export function RoomDataProvider({ children }: { children: React.ReactNode }) {
  const roomData = useRoomMetadata(
    getPluginId("initiaitve"),
    (value) =>
      ({
        ...defaultRoomData,
        ...PartialRoomDataZod.parse(value),
      }) satisfies RoomData,
    defaultRoomData,
  );

  return (
    <RoomDataContext value={roomData.value}>
      <SetRoomDataContext value={roomData.update}>
        {children}
      </SetRoomDataContext>
    </RoomDataContext>
  );
}
