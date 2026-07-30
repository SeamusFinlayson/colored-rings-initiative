import { MainView } from "./components/mainView/MainView";
import { SingleGroupView } from "./components/singleGroupView/SingleGroupView";
import { useSceneMetadata } from "./helpers/sceneData/useSceneMetadata";
import { getPluginId } from "../getPluginId";
import { PartialSceneDataZod, type SceneData } from "./types/SceneData";
import { useCallback, useContext, useEffect } from "react";
import {
  broadcastRoundChangeEventMessage,
  handleSetRoundNumberMessage,
} from "./helpers/broadcastRoundImplementation";
import { defaultSceneData } from "./helpers/sceneData/defaultSceneData";
import { RoomDataContext } from "./helpers/roomData/roomDataContext";
import { getSelectedGroup } from "./helpers/getSelectedGroup";
import { InitiativeStateContext } from "./helpers/initiativeState/inititativeStateContext";

export function App() {
  const settings = useContext(RoomDataContext);

  const sceneData = useSceneMetadata(
    getPluginId("Initiative"),
    (value) =>
      ({
        ...defaultSceneData,
        ...PartialSceneDataZod.parse(value),
      }) satisfies SceneData,
    defaultSceneData,
  );

  const updateSceneData = sceneData.update;
  const updateRound = useCallback(
    (round: number) => {
      updateSceneData({ round });
      if (!settings.disableRoundBroadcasting) {
        broadcastRoundChangeEventMessage(round);
      }
    },
    [updateSceneData, settings.disableRoundBroadcasting],
  );

  useEffect(() => {
    handleSetRoundNumberMessage((data) => updateRound(data.roundNumber));
  }, [updateRound]);

  const initiative = useContext(InitiativeStateContext);

  const selectedGroup = getSelectedGroup(
    initiative.tokenGroups,
    initiative.groupSelector,
  );

  return (
    <div className="text-black dark:bg-transparent dark:text-white">
      {selectedGroup ? (
        <SingleGroupView tokenGroup={selectedGroup} />
      ) : (
        <MainView round={sceneData.value.round} updateround={updateRound} />
      )}
    </div>
  );
}
