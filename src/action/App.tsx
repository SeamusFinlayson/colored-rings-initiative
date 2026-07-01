import { MainView } from "./components/mainView/MainView";
import { useAppState } from "./helpers/useAppState";
import { getSelectedGroup } from "./helpers/getSelectedGroup";
import { SingleGroupView } from "./components/singleGroupView/SingleGroupView";
import { useSceneMetadata } from "./helpers/useSceneMetadata";
import { getPluginId } from "../getPluginId";
import { PartialSceneDataZod, type SceneData } from "./types/SceneData";
import { useCallback, useContext, useEffect } from "react";
import {
  broadcastRoundChangeEventMessage,
  handleSetRoundNumberMessage,
} from "./helpers/broadcastRoundImplementation";
import { defaultSceneData } from "./helpers/sceneData";
import { RoomDataContext } from "./helpers/roomDataContext";

export function App() {
  const settings = useContext(RoomDataContext);

  const [appState, setAppState] = useAppState();
  const catagories = appState.catagories;
  const tokenGroups = appState.tokenGroups;
  const groupSelector = appState.groupSelector;
  const selectedItems = appState.selectedItems;

  const selectedGroup = getSelectedGroup(tokenGroups, groupSelector);

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

  return (
    <div className="text-black dark:bg-transparent dark:text-white">
      {selectedGroup ? (
        <SingleGroupView
          selectedItems={selectedItems}
          tokenGroup={selectedGroup}
          tokenGroups={tokenGroups}
          catagories={catagories}
          setAppState={setAppState}
        />
      ) : (
        <MainView
          round={sceneData.value.round}
          updateround={updateRound}
          catagories={catagories}
          tokenGroups={tokenGroups}
          setAppState={setAppState}
        />
      )}
    </div>
  );
}
