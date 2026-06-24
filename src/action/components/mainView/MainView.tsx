import OBR from "@owlbear-rodeo/sdk";
import HeightMatch from "../../helpers/HeightMatch";
import type { TokenGroup } from "../../types/TokenGroup";
import { GroupCard } from "../groupCard/GroupCard";
import { ScrollArea } from "../../ui/scrollArea";
import type { AppState } from "../../types/AppState";
import { RoundCounter } from "./RoundCounter";
import { ResetButton } from "./ResetButton";

export function MainView({
  catagories,
  tokenGroups,
  round,
  updateround,
  setAppState,
}: {
  catagories: string[];
  tokenGroups: TokenGroup[];
  round: number;
  updateround: (round: number) => void;
  setAppState: React.Dispatch<React.SetStateAction<AppState>>;
}) {
  return (
    <div className="flex h-screen flex-col">
      <div className="flex h-12 items-center justify-between font-bold">
        <div className="ml-2.5">Initiative</div>

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
                      onClick={() =>
                        setAppState((prev) => ({
                          ...prev,
                          groupSelector: {
                            color: group.color,
                            catagory: group.catagory,
                            name: group.name,
                          },
                        }))
                      }
                      onDoubleClick={() =>
                        setAppState((prev) => ({
                          ...prev,
                          selectedItems: group.tokens.map(
                            (token) => token.item.id,
                          ),
                          groupSelector: {
                            color: group.color,
                            catagory: group.catagory,
                            name: group.name,
                          },
                        }))
                      }
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
