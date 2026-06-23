import { SingleGroupView } from "./components/singleGroupView/SingleGroupView";
import { MainView } from "./components/MainView";
import { useAppState } from "./helpers/useAppState";
import { getSelectedGroup } from "./helpers/getSelectedGroup";

export function App() {
  const [appState, setAppState] = useAppState();
  const catagories = appState.catagories;
  const tokenGroups = appState.tokenGroups;
  const groupSelector = appState.groupSelector;
  const selectedItems = appState.selectedItems;

  const selectedGroup = getSelectedGroup(tokenGroups, groupSelector);

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
          catagories={catagories}
          tokenGroups={tokenGroups}
          setAppState={setAppState}
        />
      )}
    </div>
  );
}
