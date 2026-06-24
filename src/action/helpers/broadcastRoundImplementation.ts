import OBR from "@owlbear-rodeo/sdk";
import {
  ROUND_CHANGE_EVENT_CHANNEL,
  type RoundChangeData,
  SET_ROUND_CHANNEL,
  type SetRoundData,
} from "../types/broadcastRoundProtocol";

// Round change event messaging
export function broadcastRoundChangeEventMessage(round: number | null) {
  OBR.broadcast.sendMessage(
    ROUND_CHANGE_EVENT_CHANNEL,
    {
      round,
    } satisfies RoundChangeData,
    { destination: "ALL" },
  );
}
export function handleRoundChangeEventMessage(
  callback: (data: RoundChangeData) => void,
) {
  return OBR.broadcast.onMessage(ROUND_CHANGE_EVENT_CHANNEL, (event) => {
    const data = event.data as RoundChangeData;
    callback(data);
  });
}

// Set round event messaging
export function broadcastSetroundMessage(round: number) {
  OBR.broadcast.sendMessage(
    SET_ROUND_CHANNEL,
    {
      round,
    } satisfies SetRoundData,
    { destination: "LOCAL" },
  );
}
export function handleSetroundMessage(callback: (data: SetRoundData) => void) {
  return OBR.broadcast.onMessage(SET_ROUND_CHANNEL, (event) => {
    const data = event.data as SetRoundData;
    callback(data);
  });
}
