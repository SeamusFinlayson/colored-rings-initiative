import { useContext } from "react";
import { Button } from "../../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "../../ui/popover";
import {
  RoomDataContext,
  SetRoomDataContext,
} from "../../helpers/roomDataContext";

function Toggle({
  text,
  active,
  onClick,
}: {
  text: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <Button
      className="grow"
      variant={active ? "active" : "transparent"}
      size={"sm"}
      onClick={onClick}
    >
      {text}
    </Button>
  );
}

export function SettingsPopover() {
  const roomData = useContext(RoomDataContext);
  const setRoomData = useContext(SetRoomDataContext);

  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button className="grow justify-start px-2.5">Initiative</Button>
        }
      />
      <PopoverContent className="overflow-y-auto">
        <PopoverHeader>
          <PopoverTitle>Settings</PopoverTitle>
        </PopoverHeader>
        <div className="space-y-2.5 p-2.5 pt-0">
          <div className="mb-0.5">Broadcast Round</div>
          <div className="flex gap-1">
            <Toggle
              text="Disabled"
              active={roomData.disableRoundBroadcasting === true}
              onClick={() =>
                setRoomData({ ...roomData, disableRoundBroadcasting: true })
              }
            />
            <Toggle
              text="Enabled"
              active={roomData.disableRoundBroadcasting === false}
              onClick={() =>
                setRoomData({ ...roomData, disableRoundBroadcasting: false })
              }
            />
          </div>
          <div className="mb-0.5">Triggered Actions</div>
          <div className="flex gap-1">
            <Toggle
              text="Disabled"
              active={roomData.hideReaction === true}
              onClick={() => setRoomData({ ...roomData, hideReaction: true })}
            />
            <Toggle
              text="Enabled"
              active={roomData.hideReaction === false}
              onClick={() => setRoomData({ ...roomData, hideReaction: false })}
            />
          </div>
          <div className="mb-0.5">Indicator</div>
          <div className="flex gap-1">
            <Toggle
              text="None"
              active={roomData.onMapTurnIndicator === "NONE"}
              onClick={() =>
                setRoomData({ ...roomData, onMapTurnIndicator: "NONE" })
              }
            />
            <Toggle
              text="Select"
              active={roomData.onMapTurnIndicator === "SELECT"}
              onClick={() =>
                setRoomData({ ...roomData, onMapTurnIndicator: "SELECT" })
              }
            />
            <Toggle
              text="Label"
              active={roomData.onMapTurnIndicator === "LABEL"}
              onClick={() =>
                setRoomData({ ...roomData, onMapTurnIndicator: "LABEL" })
              }
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
