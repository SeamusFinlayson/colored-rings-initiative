import { SingleGroupView } from "./components/singleGroupView/SingleGroupView";
import { MainView } from "./components/MainView";
import { useAppState } from "./helpers/useAppState";

export function App() {
  const appState = useAppState();
  const selectedGroup = appState.selectedGroup;
  const catagories = appState.catagories;
  const tokenGroups = appState.tokenGroups;
  const setGroupSelector = appState.setGroupSelector;

  return (
    <div className="text-black dark:bg-transparent dark:text-white">
      {selectedGroup ? (
        <SingleGroupView
          tokenGroup={selectedGroup}
          catagories={catagories}
          onBackClick={() => setGroupSelector(undefined)}
        />
      ) : (
        <MainView
          catagories={catagories}
          tokenGroups={tokenGroups}
          onSelect={(selector) => setGroupSelector(selector)}
        />
      )}
    </div>
  );
}
