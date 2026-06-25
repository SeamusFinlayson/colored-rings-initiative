import { ReactionFilled } from "../../icons/ReactionFilled";
import { ReactionOutline } from "../../icons/ReactionOutline";
import { ReadyFilled } from "../../icons/ReadyFilled";
import { ReadyOutline } from "../../icons/ReadyOutline";
import TokenImage from "./TokenImage";
import { IconToggle } from "./IconToggle";
import { updateInitiaitiveData } from "../../helpers/initiativeData";
import type { Token } from "../../types/Token";
import { usePlayerSelection } from "../../helpers/usePlayerSelection";
import { CheckIcon, EyeOffIcon } from "lucide-react";
import { Button } from "../../ui/button";
import {
  getColorfulSurface,
  getDimTintedBackground,
  getTintedBackground,
} from "../../helpers/colorCssHelpers";
import type { TokenGroup } from "../../types/TokenGroup";
import { useContext } from "react";
import { ThemeModeContext } from "../../helpers/ThemeModeContext";

function getTokenMargin(count: number) {
  const itemWidth = 40;
  const containerWidth = 140;
  const targetSpace = containerWidth / count;

  const overflowMargin = itemWidth + 1 - targetSpace;
  const perItemMargin = overflowMargin / count;

  const margin = targetSpace - perItemMargin - itemWidth;

  return margin;
}

export function GroupCard({
  tokens,
  tokenGroups,
  name,
  color,
  onClick,
  onDoubleClick,
  showReaction = true,
  selected = false,
  mode = "INITIATIVE",
}: {
  tokens: Token[];
  tokenGroups: TokenGroup[];
  name: string;
  color: string | null;
  onClick?: () => void;
  onDoubleClick?: () => void;
  showReaction?: boolean;
  selected?: boolean;
  mode?: "INITIATIVE" | "SELECTION";
}) {
  const playerSelection = usePlayerSelection();
  const themeMode = useContext(ThemeModeContext);

  const reactionsRemaining = tokens.reduce(
    (accum, token) => accum + (token.data.hasReaction ? 1 : 0),
    0,
  );
  const turnsRemaining = tokens.reduce(
    (accum, token) => accum + token.data.turnsRemaining,
    0,
  );
  const totalTurns = tokens.reduce(
    (accum, token) => accum + token.data.totalTurns,
    0,
  );
  const active = tokens.some((token) => token.data.active);

  const hasReaction = reactionsRemaining > 0;
  const hasTurn = turnsRemaining > 0;

  const highlightBar = mode === "INITIATIVE";

  const barColor = highlightBar
    ? (color ?? getTintedBackground(color, themeMode))
    : getColorfulSurface(color, themeMode);

  const backgroundColor = active
    ? getTintedBackground(color, themeMode)
    : getDimTintedBackground(color, themeMode);

  const groupSize = tokens.length;

  const reactionText =
    groupSize > 1 ? `${reactionsRemaining}/${groupSize}` : undefined;
  const turnText =
    totalTurns > 1 ? `${turnsRemaining}/${totalTurns}` : undefined;

  const hiddenTokenCount = tokens.filter((token) => !token.item.visible).length;

  return (
    <div
      style={backgroundColor ? { backgroundColor } : {}}
      className="isolate flex h-12 items-stretch justify-between transition-colors"
    >
      <Button
        core={"none"}
        className="group flex grow gap-0 px-0"
        onClick={onClick}
        onContextMenu={(e) => {
          e.preventDefault();
          if (onDoubleClick) onDoubleClick();
        }}
      >
        <div
          style={
            color === null
              ? { borderWidth: "2px" }
              : { backgroundColor: barColor }
          }
          data-wide={mode === "SELECTION" && selected}
          className="grid w-1.5 shrink-0 place-items-center overflow-clip border-white/60 transition-all data-[wide=true]:w-12"
        >
          <div className="z-50 col-start-1 row-start-1 size-full transition-colors group-hover:bg-white/20"></div>
          <CheckIcon
            data-visible={mode === "SELECTION" && selected}
            className="col-start-1 row-start-1 opacity-0 transition-opacity data-[visible=true]:opacity-100"
          />
        </div>

        <div className="grid grow transition-colors">
          <div className="col-start-1 row-start-1 ml-1 flex self-center">
            {tokens.map((token, index) => {
              return (
                <div
                  key={token.item.id}
                  style={{
                    zIndex: -index + 10000,
                    marginRight:
                      tokens.length < 4 ? 4 : getTokenMargin(tokens.length),
                  }}
                >
                  <TokenImage
                    key={token.item.id}
                    src={token.item.image.url}
                    outline={playerSelection.includes(token.item.id)}
                  />
                </div>
              );
            })}
          </div>
          <div className="relative z-10000 col-start-1 row-start-1 w-full self-end justify-self-start truncate bg-linear-to-r from-white/70 via-white/70 to-white/0 px-1 dark:from-black/60 dark:via-black/20 dark:to-black/0">
            <div className="max-w-full truncate text-left text-xs font-semibold text-nowrap text-ellipsis transition-opacity">
              {name}
            </div>
          </div>
          {hiddenTokenCount > 0 && (
            <div className="z-10000 col-start-1 row-start-1 flex gap-1 self-start justify-self-start px-1 pt-0.5 text-sm">
              <div className="flex items-center gap-1 rounded-full bg-white/70 px-1 font-normal dark:bg-black">
                {tokens.length > 1 && <div>{hiddenTokenCount}</div>}
                <EyeOffIcon className="size-4 stroke-2" />
              </div>
            </div>
          )}
        </div>
      </Button>

      {mode === "INITIATIVE" && showReaction && (
        <IconToggle
          checked={hasReaction}
          onClick={() => {
            const token = tokens.find((token) => token.data.hasReaction);
            updateInitiaitiveData(
              token
                ? [{ itemId: token.item.id, data: { hasReaction: false } }]
                : tokens.map((token) => ({
                    itemId: token.item.id,
                    data: { hasReaction: !hasReaction },
                  })),
            );
          }}
          onContextMenu={() => {
            updateInitiaitiveData(
              tokens.map((token) => ({
                itemId: token.item.id,
                data: { hasReaction: !hasReaction },
              })),
            );
          }}
          text={reactionText}
          checkedIcon={<ReactionFilled />}
          unCheckedIcon={<ReactionOutline />}
          color="yellow"
        />
      )}
      {mode === "INITIATIVE" && (
        <IconToggle
          checked={hasTurn}
          onClick={() => {
            const token = tokens.find((token) => token.data.turnsRemaining > 0);
            updateInitiaitiveData([
              ...(token
                ? [
                    {
                      itemId: token.item.id,
                      data: {
                        turnsRemaining: token.data.turnsRemaining - 1,
                        active: true,
                      },
                    },
                  ]
                : tokens.map((token) => ({
                    itemId: token.item.id,
                    data: {
                      turnsRemaining: hasTurn ? 0 : token.data.totalTurns,
                      active: false,
                    },
                  }))),
              ...tokenGroups
                .flatMap((group) => group.tokens)
                .filter((token) => token.data.active)
                .map((token) => ({
                  itemId: token.item.id,
                  data: { active: false },
                })),
            ]);
          }}
          onContextMenu={() => {
            updateInitiaitiveData([
              ...tokens.map((token) => ({
                itemId: token.item.id,
                data: {
                  turnsRemaining: hasTurn ? 0 : token.data.totalTurns,
                  active: hasTurn,
                },
              })),
              ...tokenGroups
                .flatMap((group) => group.tokens)
                .filter((token) => token.data.active)
                .map((token) => ({
                  itemId: token.item.id,
                  data: { active: false },
                })),
            ]);
          }}
          text={turnText}
          checkedIcon={<ReadyFilled />}
          unCheckedIcon={<ReadyOutline />}
          active={active}
        />
      )}
    </div>
  );
}
