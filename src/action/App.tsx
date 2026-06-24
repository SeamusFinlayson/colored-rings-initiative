import { MainView } from "./components/MainView";
import { useAppState } from "./helpers/useAppState";
import { getSelectedGroup } from "./helpers/getSelectedGroup";
import { SingleGroupView } from "./components/singleGroupView/SingleGroupView";
import { useSceneMetadata } from "./helpers/useSceneMetadata";
import { getPluginId } from "../getPluginId";
import { SceneDataZod } from "./types/SceneData";

export function App() {
  const [appState, setAppState] = useAppState();
  const catagories = appState.catagories;
  const tokenGroups = appState.tokenGroups;
  const groupSelector = appState.groupSelector;
  const selectedItems = appState.selectedItems;

  const selectedGroup = getSelectedGroup(tokenGroups, groupSelector);

  const sceneData = useSceneMetadata(
    getPluginId("Initiative"),
    SceneDataZod.parse,
    { round: 1 },
  );

  return (
    <div className="text-black dark:bg-transparent dark:text-white">
      {selectedGroup ? (
        <SingleGroupView
          selectedItems={selectedItems}
          tokenGroup={selectedGroup}
          catagories={catagories}
          setAppState={setAppState}
        />
      ) : (
        <MainView
          roundNumber={sceneData.value.round}
          updateRoundNumber={(number) => sceneData.update({ round: number })}
          catagories={catagories}
          tokenGroups={tokenGroups}
          setAppState={setAppState}
        />
      )}
    </div>
  );
}
