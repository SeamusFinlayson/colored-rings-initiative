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
  fallbackColor,
  getColorfulSurface,
  getDimTintedBackground,
  getTintedBackground,
} from "../../helpers/colorCssHelpers";
import type { TokenGroup } from "../../types/TokenGroup";
import { useContext } from "react";
import { ThemeModeContext } from "../../helpers/ThemeModeContext";
import { RoomDataContext } from "../../helpers/roomDataContext";
import { updateLabels } from "../../helpers/labelItems";
import type { PartialInitiativeData } from "../../types/InitiativeData";
import OBR from "@owlbear-rodeo/sdk";

function getTokenMargin(count: number, containerWidth: number) {
  if (count < 4 && containerWidth < 145) return 4;
  if (count < 5 && containerWidth > 191) return 4;

  const itemWidth = 40;
  const rightMargin = 4;

  const availableSpace = containerWidth - rightMargin;
  const targetSpace = availableSpace / count;

  const overflowMargin = itemWidth + 1 - targetSpace;
  const perItemMargin = overflowMargin / count;

  const margin = targetSpace - perItemMargin - itemWidth;

  return margin;
}

function processTurnUpdates(
  updates: {
    token: Token;
    data: PartialInitiativeData;
  }[],
  onMapTurnIndicator: "NONE" | "SELECT" | "LABEL",
) {
  updateInitiaitiveData(
    updates.map((val) => ({
      itemId: val.token.item.id,
      data: val.data,
    })),
  );
  if (onMapTurnIndicator === "LABEL")
    updateLabels(
      updates.map((val) => ({
        token: val.token,
        active: !!val.data.active,
      })),
    );
  if (onMapTurnIndicator === "SELECT")
    OBR.player.select(
      updates.filter((val) => val.data.active).map((val) => val.token.item.id),
      true,
    );
}

export function GroupCard({
  tokens,
  tokenGroups,
  name,
  color,
  onClick,
  onDoubleClick,
  selected = false,
  mode = "INITIATIVE",
}: {
  tokens: Token[];
  tokenGroups: TokenGroup[];
  name: string;
  color: string | null;
  onClick?: () => void;
  onDoubleClick?: () => void;
  selected?: boolean;
  mode?: "INITIATIVE" | "SELECTION";
}) {
  const playerSelection = usePlayerSelection();
  const themeMode = useContext(ThemeModeContext);
  const settings = useContext(RoomDataContext);

  const [reactions, reactionsMaximum, turns, turnsMaximum, active] = [
    tokens.reduce((accum, token) => accum + token.data.reactions, 0),
    tokens.reduce((accum, token) => accum + token.data.reactionsMaximum, 0),
    tokens.reduce((accum, token) => accum + token.data.turns, 0),
    tokens.reduce((accum, token) => accum + token.data.turnsMaximum, 0),
    tokens.some((token) => token.data.active),
  ];

  const hasReaction = reactions > 0;
  const hasTurn = turns > 0;

  const barColor =
    mode === "INITIATIVE"
      ? (color ?? fallbackColor)
      : getColorfulSurface(color, themeMode);

  const backgroundColor =
    active && mode === "INITIATIVE"
      ? getTintedBackground(color, themeMode)
      : getDimTintedBackground(color, themeMode);

  const reactionText =
    reactionsMaximum > 1 ? `${reactions}/${reactionsMaximum}` : undefined;
  const turnText = turnsMaximum > 1 ? `${turns}/${turnsMaximum}` : undefined;

  const hiddenTokenCount = tokens.filter((token) => !token.item.visible).length;

  return (
    <div
      style={backgroundColor ? { backgroundColor } : {}}
      className="isolate flex h-12 items-stretch justify-between transition-colors duration-150"
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
          style={{ backgroundColor: barColor }}
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
                    marginRight: getTokenMargin(
                      tokens.length,
                      settings.hideReaction ? 192 : 144,
                    ),
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

      {mode === "INITIATIVE" && !settings.hideReaction && (
        <IconToggle
          checked={hasReaction}
          onClick={() => {
            const token = tokens.find((token) => token.data.reactions > 0);
            updateInitiaitiveData([
              ...(token
                ? [
                    {
                      itemId: token.item.id,
                      data: {
                        reactions: token.data.reactions - 1,
                      },
                    },
                  ]
                : tokens.map((token) => ({
                    itemId: token.item.id,
                    data: {
                      reactions: hasReaction ? 0 : token.data.reactionsMaximum,
                    },
                  }))),
            ]);
          }}
          onContextMenu={() => {
            updateInitiaitiveData([
              ...tokens.map((token) => ({
                itemId: token.item.id,
                data: {
                  reactions: hasReaction ? 0 : token.data.reactionsMaximum,
                },
              })),
            ]);
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
            const token = tokens.find((token) => token.data.turns > 0);
            const updates = [
              ...(token
                ? [
                    {
                      token,
                      data: {
                        turns: token.data.turns - 1,
                        active: true,
                      },
                    },
                  ]
                : tokens.map((token) => ({
                    token,
                    data: {
                      turns: hasTurn ? 0 : token.data.turnsMaximum,
                      active: false,
                    },
                  }))),
              ...tokenGroups
                .flatMap((group) => group.tokens)
                .filter((token) => token.data.active)
                .map((token) => ({
                  token,
                  data: { active: false },
                })),
            ];
            processTurnUpdates(updates, settings.onMapTurnIndicator);
          }}
          onContextMenu={() => {
            const updates = [
              ...tokens.map((token) => ({
                token,
                data: {
                  turns: hasTurn ? 0 : token.data.turnsMaximum,
                  active: token.data.turns > 0,
                },
              })),
              ...tokenGroups
                .flatMap((group) => group.tokens)
                .filter((token) => token.data.active)
                .map((token) => ({
                  token,
                  data: { active: false },
                })),
            ];
            processTurnUpdates(updates, settings.onMapTurnIndicator);
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
