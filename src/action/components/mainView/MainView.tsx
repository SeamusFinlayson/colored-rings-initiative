import OBR from "@owlbear-rodeo/sdk";
import HeightMatch from "../../helpers/HeightMatch";
import { GroupCard } from "../groupCard/GroupCard";
import { ScrollArea } from "../../ui/scrollArea";
import { RoundCounter } from "./RoundCounter";
import { ResetButton } from "./ResetButton";
import { SettingsPopover } from "./SettingsPopover";
import { useContext } from "react";
import {
  InitiativeStateContext,
  InitiativeStateDispatchContext,
} from "../../helpers/initiativeState/inititativeStateContext";

export function MainView({
  round,
  updateround,
}: {
  round: number;
  updateround: (round: number) => void;
}) {
  const initiativeState = useContext(InitiativeStateContext);
  const initiativeStateDispatch = useContext(InitiativeStateDispatchContext);

  const tokenGroups = initiativeState.tokenGroups;
  const catagories = initiativeState.catagories;

  return (
    <div className="flex h-screen flex-col">
      <div className="flex h-12 items-center justify-between">
        <SettingsPopover />

        <div className="flex">
          <RoundCounter round={round} updateround={updateround} />
          <ResetButton
            tokenGroups={tokenGroups}
            round={round}
            updateround={updateround}
          />
        </div>
      </div>
      <div className="mx-2.5 border-b border-white/12" />
      <ScrollArea className="h-0 grow">
        <HeightMatch
          setHeight={(height) =>
            OBR.action.setHeight(Math.max(300, height + 48 + 1))
          }
        >
          <div className="pb-4">
            {catagories.map((catagory) => (
              <div key={catagory} className="flex flex-col">
                <div className="mt-2 mb-2 ml-2.5 text-sm text-black/60 uppercase dark:text-white/70">
                  {catagory}
                </div>
                {tokenGroups
                  .filter((group) => group.catagory === catagory)
                  .map((group) => (
                    <GroupCard
                      key={
                        group.tokens[0].item.id +
                        group.catagory +
                        group.name +
                        group.color
                      }
                      color={group.color}
                      name={group.name}
                      tokens={group.tokens}
                      tokenGroups={tokenGroups}
                      onClick={() =>
                        initiativeStateDispatch({
                          type: "setGroupSelector",
                          groupSelector: {
                            color: group.color,
                            catagory: group.catagory,
                            name: group.name,
                          },
                        })
                      }
                      onDoubleClick={() => {
                        initiativeStateDispatch({
                          type: "setGroupSelector",
                          groupSelector: {
                            color: group.color,
                            catagory: group.catagory,
                            name: group.name,
                          },
                        });
                        initiativeStateDispatch({
                          type: "setSelectedItems",
                          selectedItems: group.tokens.map(
                            (token) => token.item.id,
                          ),
                        });
                      }}
                    />
                  ))}
              </div>
            ))}
          </div>
        </HeightMatch>
      </ScrollArea>
    </div>
  );
}
